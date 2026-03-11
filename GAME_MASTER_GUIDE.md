# 🎮 TECH TRACE - Game Master Reference Guide

## 📋 Quick Reference

### Physical Location Codes
| Round | Location | Access Code |
|-------|----------|-------------|
| Round 1 | **EIE BLOCK** | `TRACE-7712` |
| Round 2 | **BANK** | `TRACE-5521` |
| Round 4 | **OPEN AUDI** | `TRACE-8124` |

### Email Advantage
- **Trigger**: Completing Round 3 (Flash/Memory)
- **Reward**: Email with code for next round in team's sequence
- **Purpose**: Skip physical location visit for one round

---

## 🎯 Round 1: Code & SQL Syntax (Drag & Drop)

**Location**: EIE BLOCK  
**Code**: `TRACE-7712`  
**Stages**: 1 Python and 3 SQL reconstruction challenges

### Answers

**Stage 1:** Two Sum Python
```python
def twosum(nums,target):
nums.sort()
l,r=0,len(nums)-1
while l<r:
sum=nums[l]+nums[r]
if sum==target: return [l,r]
elif sum<target: l+=1
else: r-=1
return []
```

**Stage 2:**
```sql
SELECT * FROM logs WHERE status = 'error' ORDER BY created_at DESC
```

**Stage 3:**
```sql
SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5
```

**Stage 4:**
```sql
SELECT users.name, orders.amount FROM users JOIN orders ON users.id = orders.user_id
```

---

## 🎯 Round 2: C & Java Code Fixes

**Location**: BANK  
**Code**: `TRACE-5521`  
**Stages**: 6 code debugging challenges

### Answers

**Stage 1:** C swap logic
```c
#include <stdio.h>

void swap(int a, int b){
    int temp = a;
    a = b;
    b = temp;
}

int main(){
    int x = 10, y = 20;
    swap(x, y);
    printf("%d %d", x, y);
    return 0;
}
```
- **Issue**: Pass by value doesn't change original variables.
- **Answer**: `void swap(int *a, int *b)` and passing `&x, &y`.

**Stage 2:** Java String immutability
```java
class Test {

    public static void main(String[] args){

        String s = "programming";

        s.replace('g','x');

        System.out.println(s);
    }
}
```
- **Issue**: Strings are immutable, so `.replace()` returns a new string.
- **Answer**: `s = s.replace('g','x');`

**Stage 3:** Java Logic Reversal
```java
public class Palindrome {

    public static void main(String args[]) {

        int num = 12321;
        int rev = 0;
        int temp = num;

        while(num > 0) {

            int digit = num % 10;
            rev = rev + digit;
            num = num / 10;
        }

        if(temp == rev)
            System.out.println("Palindrome");
        else
            System.out.println("Not Palindrome");
    }
}
```
- **Issue**: Incorrect reversal formula.
- **Answer**: `rev * 10 + digit`

**Stage 4:** Python list removal
```python
nums = [10,20,30,40]

for i in range(len(nums)):
    nums.remove(nums[i])

print(nums)
```
- **Issue**: Removing elements while iterating causes skipped items.
- **Answer**: `nums.clear()` or `nums = []`

**Stage 5:** C Logic out of bounds
```c
#include<stdio.h>

int main(){

    int nums[] = {1,2,2,3,4,4,5};
    int n = sizeof(nums)/sizeof(nums[0]);

    int unique = 0;

    for(int i=0;i<n;i++){
        if(nums[i] != nums[i+1])
            unique++;
    }

    printf("Unique elements: %d", unique);

    return 0;
}
```
- **Issue**: `i+1` goes out of bounds.
- **Answer**: `i < n - 1`

**Stage 6:** Python Syntax
```python
def factorial(n)

    fact = 1
    for i in range(1,n+1)
        fact = fact.multiply(i)

    print("Factorial =", fact)

factorial(5)
```
- **Issue**: Missing colons, bad indentation, made-up `.multiply()` method.
- **Answer**: Fix `:` on def/loop, fix indentation, `fact *= i` instead of `.multiply()`

---

## 🎯 Round 3: Flash/Memory Analysis

**Stages**: 5 flash memory challenges  
**Special**: Completing this round triggers email advantage

### Events Table (Flash Data)
| id | name | users | cpu_load | error_rate | status |
|----|------|-------|----------|------------|--------|
| E-101 | CodeCrypt | 120 | 45 | 0.5 | STABLE |
| E-102 | HackRush | 260 | 92 | 12.4 | CRITICAL |
| E-103 | DataQuest | 150 | 55 | 1.2 | STABLE |
| E-104 | LogicLoop | 230 | 78 | 4.5 | WARNING |
| E-105 | CyberWall | 80 | 30 | 0.1 | STABLE |
| E-106 | NetStorm | 310 | 98 | 18.2 | CRASHED |

### Answers

**Stage 1:** Root cause analysis
- **Answer**: `NetStorm - High Error Rate` (or High CPU Load, or High Users)
- **Validation**: Must include "NetStorm" and a reason (cpu/load/error/high)

**Stage 2:** Retype efficiency query
```sql
SELECT name, (cpu_load/users) as efficiency 
FROM events 
WHERE status = "CRITICAL" 
ORDER BY error_rate DESC
```

**Stage 3:** CyberWall status
- **Answer**: `stable`

**Stage 4:** LogicLoop warning reason
- **Answer**: `High Error Rate` (or High CPU load, or High users)
- **Validation**: Must include "error" or "rate" or "high" or "4.5"

**Stage 5:** Execute query mentally
- **Query**: `SELECT name FROM events WHERE (status = "CRITICAL" OR status = "CRASHED") AND cpu_load > 75 and users < 300`
- **Answer**: `HackRush`

---

## 🎯 Round 4: AI Reverse Turing Test

**Location**: OPEN AUDI  
**Code**: `TRACE-8124`  
**Stages**: 5 AI Guess Challenges

### Phase 1: Trick the AI

The goal is to get the AI to say the specific technical word WITHOUT using it in the prompt. The AI acts arrogant. 

**Correct Words:**
- Level 1: `docker`
- Level 2: `cache`
- Level 3: `polymorphism`
- Level 4: `recursion`
- Level 5: `virtualization`

### Phase 3: Code Entry
- Teams enter physical location code: `CRPT-8124`
- Or email code (if received after Round 3)

---

## 🏆 Scoring System

### Points Breakdown
- **Round 1**: ~100 points per stage (4 stages)
- **Round 2**: ~100 points per stage (4 stages)
- **Round 3**: ~100 points per stage (5 stages)
- **Round 4**: 
  - Phase 1: 150 points
  - Phase 2: 150 points

### Time Bonus
- **Formula**: `(600 - time_taken_seconds) × 0.2`
- **Max Time**: 600 seconds (10 minutes)
- **Example**: Complete in 300s → Bonus = (600-300) × 0.2 = 60 points

### Leaderboard Sorting
1. **Total Score** (highest first)
2. **Progress** (furthest round/stage)
3. **Time Taken** (fastest wins)

---

## 📧 Email System

### Round 3 Completion Email
**Subject**: `🎁 ADVANTAGE CODE - Round X Access`

**Content**:
- Congratulations message
- Code for next round in team's sequence
- No physical location visit needed

**Example**:
```
Team Alpha,
Congratulations! You completed Round 3!
Your code for Round 1: CRPT-7712
No need to visit EIE BLOCK - you've earned this advantage!
```

---

## 🔄 Round Sequences

Teams get different round orders to prevent location overlap:

| Team # | Sequence |
|--------|----------|
| Team 1 | 1 → 2 → 3 → 4 |
| Team 2 | 2 → 4 → 1 → 3 |
| Team 3 | 3 → 1 → 4 → 2 |
| Team 4 | 4 → 3 → 2 → 1 |

**Note**: Sequence rotates based on last team created (Last + 1 logic)

---

## 🛠️ Admin Panel Access

### View All Codes
```
GET /api/admin/codes
```

### View Team Progress
```
GET /api/admin/teams
```

### View Submissions
```
GET /api/admin/submissions
```

### Reset Team (if needed)
```
POST /api/admin/teams/:teamId/reset
```

---

## ⚠️ Common Issues & Solutions

### Issue: Email not sent after Round 3
**Solution**: Check backend logs for `[EMAIL SUCCESS]` or `[EMAIL FAILED]`

### Issue: Phase skipping
**Solution**: Fixed with idempotency check + button disable logic

### Issue: Scores not updating
**Solution**: Check database column is `video_time_taken` not `time_taken_seconds`

### Issue: Leaderboard shows 0:00 time
**Solution**: Ensure submissions table has `video_time_taken` column

---

## 📞 Support

For technical issues during the event:
1. Check backend logs (`npm run dev` in backend folder)
2. Check Admin Panel for team status
3. Verify database connection
4. Check email service (EmailJS) configuration

---

**Last Updated**: 2026-01-31  
**Version**: 1.0  
**Event**: TECH TRACE Technovate '26
