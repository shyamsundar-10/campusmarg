# Campus Marg: Smart Student Commute Planner

## Table of Contents
1. Introduction
2. Features
3. Technologies Used
4. File Structure

## Introduction
Campus Marg is a mobile application designed to optimize school bus routes based on student attendance. This project aims to reduce fuel consumption and carbon emissions by dynamically updating bus routes using real-time student attendance data.

## Features
- Student attendance confirmation before bus starts.
- Real-time route optimization for school bus drivers.
- Dynamic display of bus routes with green paths for attending students and red for non-attending students.
- Shortest and most fuel-efficient route calculation.
- User-friendly interface for both students and drivers.

## Technologies Used
- React Native for mobile app development.
- Node.js for backend services.
- Firebase for real-time database and authentication.
- Google Maps API for real-time mapping and GPS integration.
- Google OR-Tools for route optimization.

## File Structure
campusmarg/  
│  
├── app/  
│   ├── components/  
│   │   ├── AttendanceForm.js  
│   │   ├── BusRouteMap.js  
│   │   └── ...  
│   ├── screens/  
│   │   ├── HomeScreen.js  
│   │   ├── AttendanceScreen.js  
│   │   ├── RouteScreen.js  
│   │   └── ...  
│   ├── services/  
│   │   ├── attendanceService.js  
│   │   ├── routeService.js  
│   │   └── ...  
│   ├── App.js  
│   ├── ...  
│  
├── backend/  
│   ├── controllers/  
│   │   ├── attendanceController.js  
│   │   ├── routeController.js  
│   │   └── ...  
│   ├── models/  
│   │   ├── Student.js  
│   │   └── ...  
│   ├── routes/  
│   │   ├── attendanceRoutes.js  
│   │   ├── routeRoutes.js  
│   │   └── ...  
│   ├── index.js  
│   ├── ...  
│  
├── config/  
│   ├── fireb  aseConfig.js
│   ├── ...  
│    
├── public/    
│   ├── images/  
│   ├── ...  
│    
├── README.md  
├── package.json  
├── ...  

