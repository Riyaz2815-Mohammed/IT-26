# 🔐 CodeCrypt Solutions & Walkthrough

This document contains the official solutions for all rounds in the **CodeCrypt** CTF event. Use this for verifying game logic or for post-event analysis.

---

## 🟢 Round 1: The Fragmentation (SQL Logic)
**Objective:** Drag and drop scrambled SQL keywords to reconstruct valid queries.

| Challenge ID | Correct Query Construction |
| :--- | :--- |
| **1** | \`SELECT name FROM students WHERE marks > 80\` |
| **2** | \`SELECT * FROM logs WHERE status = 'error' ORDER BY created_at DESC\` |
| **3** | \`SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5\` |
| **4** | \`SELECT users.name, orders.amount FROM users JOIN orders ON users.id = orders.user_id\` |

> **Unlock Code:** `CRPT-7712` (Location: Canteen)

---

## 🟡 Round 2: Data Forensics (Analysis)
**Objective:** Analyze the provided datasets (Students, Departments, Assignments) to extract specific insights using SQL.

### Q1: Identify the Target
**Task:** Find the ID and Score of student 'Rahul' in subject 'DB_MS'.
**Answer:**
```sql
SELECT id, score 
FROM students 
JOIN assignments ON students.id = assignments.student_id 
WHERE students.name = 'Rahul' AND assignments.subject = 'DB_MS'
```

### Q2: Performance Track
**Task:** Find all assignment scores for Student ID 101.
**Answer:**
```sql
SELECT * FROM assignments WHERE student_id = 101
```

### Q3: Top Scorers
**Task:** Find top scorers in each department with attendance > 90%.
**Answer:**
```sql
SELECT name, score 
FROM students 
JOIN assignments ON students.id = assignments.student_id 
WHERE students.attendance > 90 
ORDER BY assignments.score DESC
```

### Q4: Full Profile
**Task:** Show Rahul's Name, Department Head, and Assignment Subject.
**Answer:**
```sql
SELECT students.name, departments.head, assignments.subject 
FROM students 
JOIN departments ON students.dept = departments.code 
JOIN assignments ON students.id = assignments.student_id 
WHERE students.id = 101
```

> **Unlock Code:** `CRPT-5521` (Location: Open Audi)

---

## 🔴 Round 3: Memory Stream (Flash)
**Objective:** Memorize high-speed fleeting data tables and answer questions under time pressure.

1. **Root Cause Analysis (Crash)**
   - **Answer:** `NetStorm - High Error Rate` (or "High CPU Load", "High Users")
   - *Context:* The NetStorm event showed critical failure metrics.

2. **Forensic Reconstruction (Query)**
   - **Answer:** `SELECT name, (cpu_load/users) as efficiency FROM events WHERE status = "CRITICAL" ORDER BY error_rate DESC`
   - *Context:* Retype the query exactly as shown.

3. **Status Audit**
   - **Answer:** `stable`
   - *Context:* Status of the 'CyberWall' event.

4. **Warning Logic**
   - **Answer:** `LogicLoop - High Error Rate`
   - *Context:* Why 'LogicLoop' was in WARNING state (High error rate of 4.5%).

5. **Mental Execution**
   - **Answer:** `HackRush`
   - *Context:* Result of query filtering for CRITICAL/CRASHED, CPU > 75, Users < 300.

---

## 🟣 Round 4: The Advantage (Reasoning)
**Objective:** Debug broken SQL queries and match logic to outputs.

### Phase 1: Match the Logic
Match the Query ID to the correct Output ID.
- **Q1 ➔ O3** (`SELECT ... LIMIT 1` matches single row output)
- **Q2 ➔ O5** (Aggregates by department matches department totals)
- **Q3 ➔ O1** (HAVING COUNT >= 2 matches Alpha, Beta, Gamma with 2 projects each)
- **Q4 ➔ O4** (LEFT JOIN with tasks matches WebApp & MobileApp)
- **Q5 ➔ O2** (Priority 'Critical' & Budget > 70k matches Security, Analytics, MobileApp)

### Phase 2: Fix the System
Correct the logic errors in the provided SQL queries.

**Q1: Simple Logic Error**
- *Issue:* Uses `OR`, should be `AND`.
- *Fix:* `SELECT * FROM projects WHERE priority = "Critical" AND budget > 50000`

**Q2: Missing Join Condition**
- *Issue:* Cartesian product (CROSS JOIN).
- *Fix:* `... JOIN tasks t ON p.id = t.project_id`

**Q3: Aggregate Error**
- *Issue:* Selecting column without grouping.
- *Fix:* `... GROUP BY team_id`

**Q4: Multi-Row Subquery**
- *Issue:* Subquery returns multiple values for a comparison.
- *Fix:* `... WHERE budget > (SELECT MAX(budget) ...)`

**Q5: Filtering Aggregates**
- *Issue:* Using `WHERE` for aggregates.
- *Fix:* `... GROUP BY team_id HAVING COUNT(*) > 1`

> **Unlock Code:** `CRPT-8124` (Location: Oval)
