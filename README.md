# Amex
# 📌 Scheduled Command Executor – JavaScript Solution

## ✅ Problem Statement

Create a utility to execute scheduled commands from a file. The commands can be one-time or recurring, defined in a specific format.

---

## 🧠 Solution Overview

This Node.js utility reads scheduled commands from `input-cmd.txt`, distinguishes between one-time and recurring commands, and executes them at the right time using built-in scheduling functions (`setTimeout`, `setInterval`).

---


---

## 🛠 Technologies Used

- Node.js
- `fs/promises` to read files
- `child_process.exec` to execute commands

---

## 📦 Setup Instructions

1. **Install Node.js** (if not already installed):  
   [https://nodejs.org](https://nodejs.org)

2. **Update file `input-cmd.txt`** with your scheduled commands.

3. **Run the script:**
```bash
node scheduler.js


