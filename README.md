# 🔐 CODECRYPT // INTELLECT '26
### The Ultimate Cinematic Technical CTF Experience

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🚀 Overview
**CodeCrypt** is a high-fidelity, hacker-themed Capture The Flag (CTF) platform built for **Intellect '26**. It simulates a critical system breach where players must use their technical skills to navigate through cryptographic puzzles, SQL injections, data forensics, and high-pressure logic challenges.

Designed with a **cinematic dark-mode UI**, real-time leaderboards, and branching game paths, CodeCrypt delivers an immersive competitive experience for developers and hackers alike.

---

## ✨ Key Features

- **🕵️‍♂️ Immersive Hacker Interface**: A sleek, terminal-inspired UI with CRT effects, glitch animations, and sound design.
- **⚡ Real-Time Logic**: High-performance backend handling concurrent team submissions with millisecond precision.
- **🔄 Anti-Cheat System**: Randomized round orders for every team (4 unique paths) to prevent answer sharing.
- **📊 Live Leaderboard**: Dynamic ranking system based on Score > Progression > Time Taken.
- **🧩 Multi-Disciplinary Rounds**:
  - **Round 1 (SQL Construction)**: Drag-and-drop query building.
  - **Round 2 (Forensics)**: Complex SQL analysis on large datasets.
  - **Round 3 (Flash Memory)**: Rapid-fire visual memory and retyping challenges.
  - **Round 4 (Debugging)**: Logic matching and query repair.
- **✉️ Email & Physical Integration**: Hybrid gameplay requiring physical clues and automated email triggers.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TailwindCSS, Framer Motion (Animations), Howler.js (Audio)
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 📸 Screenshots

| Login Terminal | Live Leaderboard |
| :---: | :---: |
| ![Login Screen](screenshots/login.png) | ![Leaderboard](screenshots/leaderboard.png) |

| SQL Builder (Round 1) | Data Forensics (Round 2) |
| :---: | :---: |
| ![Round 1](screenshots/round1.png) | ![Round 2](screenshots/round2.png) |

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL Database

### 2. Installation
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install
```

### 3. Running Locally
```bash
# Run both frontend and backend concurrently
npm run dev
```
- **Frontend**: `http://localhost:5173`
- **Admin Panel**: `http://localhost:5173/admin` (Default: `admin` / `admin123`)

---

## 📂 Project Structure
```
/src
  /components  # Reusable UI widgets (Terminal, Buttons, CRT Overlay)
  /context     # Global State Management
  /data        # Game Logic & Challenge Data
  /screens     # React Views (Lobby, Game Rounds, Admin)
/backend       # API & Game State Logic
/database      # SQL Initializers
```

---

_Built with ❤️ for INTELLECT '26_
