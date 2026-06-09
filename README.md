# MovieHub

A modern movie discovery web application built with React, Firebase, Firestore, and the TMDB API. Users can browse trending movies, search for titles, view movie details, authenticate with Firebase, and maintain a personalized watchlist synced in real time.

## Live Demo

https://moviehub-frontend-seven.vercel.app

## Features

* Browse trending, popular, top-rated, and upcoming movies
* Search movies with debounced API requests
* Infinite scrolling for seamless content loading
* Detailed movie information page
* Google Authentication with Firebase
* Email/Password Authentication
* Protected routes for authenticated users
* Real-time watchlist using Firestore and onSnapshot
* Add and remove movies from watchlist
* Persistent authentication across sessions
* Responsive design for desktop and mobile devices
* Deployed on Vercel

## Tech Stack

### Frontend

* React
* React Router DOM
* Tailwind CSS
* React Icons

### Backend Services

* Firebase Authentication
* Cloud Firestore

### External APIs

* TMDB (The Movie Database) API

## Project Architecture

src/

├── components/

├── pages/

├── context/

├── hooks/

├── services/

├── utils/

└── App.jsx

### Key Concepts Implemented

* React Context API
* Custom Hooks
* Protected Routes
* Firebase Authentication
* Firestore Database Integration
* Real-Time Data Synchronization
* Infinite Scroll
* Debounced Search
* Responsive UI Design
* State Management

## Authentication

Users can authenticate using:

* Google Sign-In
* Email and Password

Authenticated users can:

* Access protected watchlist routes
* Save movies to their personal watchlist
* Remove movies from their watchlist
* Maintain watchlist data across devices

## Watchlist System

The watchlist is stored in Firestore using the following structure:

users/
└── userId/
└── watchlist/
└── movieDocument

Real-time updates are handled using Firestore onSnapshot listeners.

## Installation

Clone the repository:

git clone https://github.com/Sumytth/moviehub-frontend.git

Navigate to the project:

cd moviehub-frontend

Install dependencies:

npm install

Create a .env file and add:

VITE_FIREBASE_API_KEY=

VITE_FIREBASE_AUTH_DOMAIN=

VITE_FIREBASE_PROJECT_ID=

VITE_FIREBASE_STORAGE_BUCKET=

VITE_FIREBASE_MESSAGING_SENDER_ID=

VITE_FIREBASE_APP_ID=

VITE_TMDB_API_KEY=

Run locally:

npm run dev

## Deployment

The application is deployed on Vercel.

Any push to the main branch automatically triggers a new production deployment.

## Learning Outcomes

This project helped strengthen understanding of:

* React fundamentals
* Component architecture
* React Router
* Context API
* Firebase Authentication
* Firestore Database
* Real-time applications with onSnapshot
* API integration
* Responsive design
* State management patterns

## Future Improvements

* React Hook Form integration
* Toast notifications instead of browser alerts
* Movie trailers integration
* User profile page
* Theme switching
* Pagination controls
* Unit and integration testing

## Author

Aadesh Umale

Frontend Developer | React, JavaScript, Firebase
