# 🚍 CampusMarg - A Route Optimization Mobile Application

A full-featured React Native + Expo app that simplifies student commutes in Silicon University with live tracking, push notifications, and attendance—all tailored for a campus environment.

---

## 📲 Download the App

The CampusMarg app is live!

🌐 **Download for Android** 👉 [`https://campusmarg.netlify.app`](https://campusmarg.netlify.app)

You can install the APK directly from the site for testing on Android devices.

---

## ▶️ Run the Project

### Start Frontend (Expo)

```bash
npm install
npm start
```
### Start Backend (FastAPI)
From the backend directory (campusmarg/ or wherever main.py is located):

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
![Fast API](https://github.com/user-attachments/assets/b30799a0-e2a2-4a41-a22b-1a2df3852820)

---

## 📸 App Preview

<img width="3464" height="1949" alt="1" src="https://github.com/user-attachments/assets/3b7891ac-6c91-4c62-a38b-0a4333746746" />

<img width="3464" height="1949" alt="2" src="https://github.com/user-attachments/assets/24bf20b3-9ca4-49a0-8220-394b2a57fdb0" />

---

## ✨ Features

- **Welcome Screen with SIC Validation**
  - Select role: Student / Driver / Conductor
  - Validate SIC (e.g., `21BCSB14`, `21DRVR01`) from `Users.json`
  - Store user info locally in AsyncStorage

- **Real-time Map with Routing**
  - **Drivers**: See all bus stops from assigned route (Routes.json) with realistic OpenRouteService (ORS) path
  - **Students**: View route from driver to their stop with ETA
  - Animated bus icon showing live progress on path
  - Route coloring: 🔶 orange path → 🔴 red progress

- **Push Notifications (Expo)**
  - Drivers can notify students at upcoming stop
  - Push appears in mobile notification tray
  - Notification includes student name and stop info

- **Attendance System (MySQL + FastAPI)**
  - Students tap to submit attendance via frontend
  - Conductor sees live updates in `Conductor.tsx` screen
  - Backend uses FastAPI to communicate with a MySQL database

- **Role-Based Home Screens**
  - Students, Drivers, and Conductors all get different map logic and actions

---

## 🖥️ Tech Stack

| Tech / Library             | Purpose                                  |
|----------------------------|------------------------------------------|
| **React Native + Expo**    | App development (Android/iOS/web)        |
| **TypeScript**             | Static typing                            |
| **expo-router**            | File-based navigation                    |
| **AsyncStorage**           | Local storage for user/session           |
| **UI Kitten + Eva Design** | UI library with theming                  |
| **OpenRouteService API**   | Realistic driving path + ETA             |
| **Expo Notifications**     | Push notifications (local + remote)      |
| **Expo Location**          | Access current GPS coordinates           |
| **FastAPI (Python)**       | Backend API framework                    |
| **MySQL**                  | Database to store student and attendance |

---

## 👤 SIC Format Guide

Every user must enter a valid **SIC** in the Welcome screen:

| Type    | Example     | Rule                 |
|---------|-------------|----------------------|
| Student | `21BCSB14`  | 21B + _ _ (Branch) + _ _ _ (Random) |
| Driver  | `21DRVR01`  | Fixed for demo drivers |

✔️ Validated using local `Users.json` file.  
If valid:

- ✅ Saves user data to **AsyncStorage**
- ✅ Redirects to bottom tab app flow

---

## 🔔 Push Notifications Flow

- On first app load, **Expo registers** the device for notifications
- **Driver presses Notify Student** button:
  - App finds students at the **next stop**
  - Sends Expo push to their **registered token**
- Student receives native notification like:

> 🛎️ _"Your bus is approaching [Khandagiri Stop]"_

---

## 📝 Attendance Flow (Backend)

- Attendance records are handled by the **FastAPI** backend
- Frontend sends attendance submission request to backend
- Backend writes attendance data to **MySQL** tables
- **Conductor.tsx** polls backend to fetch real-time updates

Database contains:
- `students` table
- `attendance` table

---

## 📁 Demo Data Overview

### Users.json (in `assets/`)

- **5 Drivers**: `21DRVR01` → `21DRVR05`
- **5 Students**: `21BCSB14` → `21BCTC09`

Each student has:
- `name`, `phone`, `blood group`
- `lat/lon` for pickup location
- `SIC` and `assigned route`

---

### Routes.json (in `assets/`)

- **5 Routes**: `Route1` → `Route5`

Each route includes:
- `BusNo`, `Driver Name`, `Phone`
- `Stops[]` → Each with:
  - `Name`
  - `Coordinates` (lat/lon)

---

## 🎨 App Color Palette

| Element             | Color Code |
|---------------------|------------|
| Background (Light)  | `#fff9eb`  |
| Text & Icons        | `#4b472b`  |
| Top/Bottom Bars     | `#f3eee0`  |
| Pill Highlights     | `#ebe3bd`  |

![App Logo](https://github.com/user-attachments/assets/9362d158-0278-4934-8e44-9d8db3cd14d8)

---

## 🧾 License

This project is for **learning**, **demo**, and **prototype** purposes only.  Not intended for commercial distribution or deployment.
