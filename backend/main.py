from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import date
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
import uvicorn
from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey, and_
from fastapi.middleware.cors import CORSMiddleware

# Database setup
DATABASE_URL = "sqlite:///./attendance.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# Database models
class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True,autoincrement= True, index=True)
    photo = Column(String)
    name = Column(String)
    sic = Column(String, unique=True, index=True)
    phone = Column(String)
    bloodGroup = Column(String)
    usertype = Column(String)
    address = Column(String)
    route = Column(String)

    attendances = relationship("Attendance", back_populates="student")

class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(Integer, primary_key=True, index=True, autoincrement= True)
    sic = Column(String, ForeignKey("students.sic"))
    status = Column(String)  # 'present' or 'absent'
    date = Column(Date)

    student = relationship("Student", back_populates="attendances")

Base.metadata.create_all(bind=engine)

# Pydantic schemas
class StudentBase(BaseModel):
    photo: str
    name: str
    sic: str
    phone: str
    bloodGroup: str
    usertype: str
    address: str
    route: str

class StudentCreate(StudentBase):
    pass

class StudentOut(StudentBase):
    class Config:
        orm_mode = True

class AttendanceBase(BaseModel):
    sic: str
    status: str  # 'present' or 'absent'
    date: date

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceOut(AttendanceBase):
    id: int
    class Config:
        orm_mode = True

origins = [
    "http://localhost:19006",  # React Native Web
    "http://localhost:3000",   # Web dev
    "http://192.168.X.X:19000", # Local IP for Expo Go on phone
    "*"  # (Optional) Allow all origins – not recommended in production
]

# FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # Allowed domains
    allow_credentials=True,          # Allow cookies/auth headers
    allow_methods=["*"],             # Allow all HTTP methods
    allow_headers=["*"],             # Allow all headers
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API Endpoints
@app.post("/students/", response_model=StudentOut)
def create_student(student: StudentCreate):
    db = next(get_db())
    db_student = db.query(Student).filter(Student.sic == student.sic).first()
    if db_student:
        raise HTTPException(status_code=400, detail="SIC already registered")
    new_student = Student(**student.dict())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

@app.get("/students/", response_model=List[StudentOut])
def read_students():
    db = next(get_db())
    return db.query(Student).all()

@app.post("/attendance/", response_model=AttendanceOut)
def mark_attendance(attendance: AttendanceCreate):
    db = next(get_db())

    student = db.query(Student).filter(Student.sic == attendance.sic).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found.")

    #  Prevent multiple entries per day
    existing = db.query(Attendance).filter(
        and_(Attendance.sic == attendance.sic, Attendance.date == attendance.date)
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Attendance already marked for today.")

    new_record = Attendance(**attendance.dict())
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record


@app.get("/attendance/", response_model=List[AttendanceOut])
def get_attendance_records(sic: Optional[str] = None):
    db = next(get_db())
    query = db.query(Attendance)
    if sic:
        query = query.filter(Attendance.sic == sic)
    return query.all()

#  Student marks attendance (present/absent)
@app.post("/attendance/", response_model=AttendanceOut)
def mark_attendance(attendance: AttendanceCreate):
    db = next(get_db())

    student = db.query(Student).filter(Student.sic == attendance.sic).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found.")

    # Check if attendance already marked for this date
    existing = db.query(Attendance).filter(
        and_(Attendance.sic == attendance.sic, Attendance.date == attendance.date)
    ).first()

    if existing:
        # Update the existing status
        existing.status = attendance.status
        db.commit()
        return existing

    # New attendance record
    new_record = Attendance(**attendance.dict())
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    return new_record

#  Get all students present on a given date
@app.get("/attendance/present/", response_model=List[StudentOut])
def get_present_students(date: date):
    db = next(get_db())

    present_sics = db.query(Attendance.sic).filter(
        and_(Attendance.date == date, Attendance.status == "present")
    ).all()

    present_sics = [s[0] for s in present_sics]

    return db.query(Student).filter(Student.sic.in_(present_sics)).all()

if __name__ == '__main__':
    uvicorn.run(app)

