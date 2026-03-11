# 🔐 TECH TRACE // TECHNOVATE '26
### The Ultimate Cinematic Technical CTF Experience

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🚀 Overview
**Live Project:** [https://it-26.vercel.app/](https://it-26.vercel.app/)

**TECH TRACE** is a high-fidelity, hacker-themed Capture The Flag (CTF) platform built for **Technovate '26**. It simulates a critical system breach where players must use their technical skills to navigate through cryptographic puzzles, SQL injections, data forensics, and high-pressure logic challenges.

Designed with a **cinematic dark-mode UI**, real-time leaderboards, and branching game paths, CodeCrypt delivers an immersive competitive experience for developers and hackers alike.

---

## ✨ Key Features

- **🕵️‍♂️ Immersive Hacker Interface**: A sleek, terminal-inspired UI with CRT effects, glitch animations, and sound design.
- **⚡ Real-Time Logic**: High-performance backend handling concurrent team submissions with millisecond precision.
- **🔄 Anti-Cheat System**: Randomized round orders for every team (4 unique paths) to prevent answer sharing.
- **📊 Live Leaderboard**: Dynamic ranking system based on Score > Progression > Time Taken.
- **🧩 Multi-Disciplinary Rounds**:
  - **Round 1 (SQL Construction)**: Drag-and-drop query building.
  - **Round 2 (Code Debugging)**: Identify and fix bugs in C, Java, and Python snippets.
  - **Round 3 (Flash Memory)**: Rapid-fire visual memory and logic challenges.
  - **Round 4 (AI Reverse Turing)**: Trick the cyber AI into guessing forbidden words.
- **✉️ Email & Physical Integration**: Hybrid gameplay requiring physical clues and automated email triggers.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TailwindCSS, Framer Motion (Animations), Howler.js (Audio)
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Vercel (Frontend), Render (Backend)

---

### Round 1: Code & SQL Construction (EIE BLOCK)
**Task:** Reconstruct valid code and SQL queries by dragging blocks.
1. **Python Two Sum Algorithm:** Arrange the two pointer approach to find the target sum.
2. **SQL Query 1:** `SELECT * FROM logs WHERE status = 'error' ORDER BY created_at DESC`
3. **SQL Query 2:** `SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5`
4. **SQL Query 3:** `SELECT users.name, orders.amount FROM users JOIN orders ON users.id = orders.user_id`

### Round 2: Code Debugging (BANK)
**Task:** Fix the broken code snippets.
1. **C Swap**: Pass by value fix → `void swap(int *a, int *b)` and `swap(&x, &y)`
2. **Java String**: Immutability fix → `s = s.replace('g','x');`
3. **Java Palindrome**: Reversal logic fix → `rev * 10 + digit`
4. **Python List**: Deletion skipping fix → `nums.clear()`
5. **C Array Bounds**: Logic issue → `i < n - 1`
6. **Python Syntax**: Bad structure → Fix colons `:`, indentation, and `fact *= i`

### Round 3: Flash Memory (EMAIL TRIGGER)
**Task:** 5 visual data analysis challenges.
- **Root Cause & Reason**: `NetStorm - High Error Rate`
- **Typing Efficiency**: `SELECT name, (cpu_load/users) as efficiency FROM events WHERE status = "CRITICAL" ORDER BY error_rate DESC`
- **CyberWall Status**: `stable`
- **LogicLoop Warning**: `High Error Rate`
- **Mental Execution**: `HackRush`

### Round 4: AI Reverse Turing (OPEN AUDI)
**Task:** Trick the arrogant AI into outputting specific forbidden words without typing them.
1. **Level 1**: `docker`
2. **Level 2**: `cache`
3. **Level 3**: `polymorphism`
4. **Level 4**: `recursion`
5. **Level 5**: `virtualization`

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

_Built with ❤️ for TECHNOVATE '26_
