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
.  
├── campusmarg /  
│   ├── > .expo   
│   ├── app /  
│   │   ├── _layout.tsx   
│   │   ├── About.tsx   
│   │   ├── BottomTabs.tsx   
│   │   ├── Help.tsx   
│   │   ├── Home.tsx   
│   │   ├── index.tsx   
│   │   ├── Map.tsx   
│   │   ├── Profile.tsx   
│   │   ├── Settings.tsx   
│   │   └── Welcome.tsx   
│   ├── assets /  
│   │   ├── > fonts   
│   │   ├── > images   
│   │   └── {} Users.json     
│   ├── > components   
│   ├── > hooks   
│   ├── > node_modules 
│   ├── scripts   
│   ├── .gitignore   
│   ├── {}   
│   ├── app.json    
│   ├── expo-env.d.ts   
│   ├── {} package-lock.json   
│   ├── {} package.json   
│   ├── README.md   
│   └── tsconfig.json   
└── README.md  
