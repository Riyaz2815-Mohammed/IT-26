export const COLLEGE_DATA = {
    students: [
        { id: 101, name: 'Rahul', dept: 'CS', year: 3, gpa: 8.5, attendance: 92 },
        { id: 102, name: 'Priya', dept: 'ECE', year: 2, gpa: 9.1, attendance: 95 },
        { id: 103, name: 'Amit', dept: 'CS', year: 3, gpa: 7.8, attendance: 85 },
        { id: 104, name: 'Sneha', dept: 'MECH', year: 4, gpa: 8.2, attendance: 88 },
        { id: 105, name: 'Vikram', dept: 'CS', year: 2, gpa: 6.9, attendance: 75 },
        { id: 106, name: 'Anjali', dept: 'ECE', year: 3, gpa: 9.5, attendance: 98 }
    ],
    departments: [
        { code: 'CS', name: 'Computer Science', head: 'Dr. Sharma' },
        { code: 'ECE', name: 'Electronics', head: 'Dr. Verma' },
        { code: 'MECH', name: 'Mechanical', head: 'Dr. Rao' }
    ],
    assignments: [
        { id: 1, student_id: 101, subject: 'DB_MS', score: 88 },
        { id: 2, student_id: 102, subject: 'Circuits', score: 92 },
        { id: 3, student_id: 101, subject: 'OS', score: 75 },
        { id: 4, student_id: 104, subject: 'Thermo', score: 81 },
        { id: 5, student_id: 103, subject: 'DB_MS', score: 65 }
    ]
};

// Kept for backward compatibility if imported directly, but COLLEGE_DATA is main export
export const STUDENTS_TABLE = COLLEGE_DATA.students;

export const ROUND2_QUESTIONS = [
    {
        id: 1,
        title: "Question 1 – Logical Error (C)",
        code: `#include <stdio.h>

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
}`,
        error: `Output Produced: 10 20`,
        expected: `20 10`,
        task: `Fix the swap function and its call so that the variables are correctly swapped.`,
        validation: {
            required: ['*a', '*b', '&x', '&y'],
            forbidden: []
        }
    },
    {
        id: 2,
        title: "Question 2 – Logical Error (Java)",
        code: `class Test {

    public static void main(String[] args){

        String s = "programming";

        s.replace('g','x');

        System.out.println(s);
    }
}`,
        error: `Output Produced: programming`,
        expected: `proxxramminx`,
        task: `Understand String immutability and correct the code to output the replaced string.`,
        validation: {
            required: ['s = s.replace', 's=s.replace'],
            forbidden: []
        }
    },
    {
        id: 3,
        title: "Question 3 – Logical Error (Java)",
        code: `public class Palindrome {

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
}`,
        error: `Logic evaluates to "Not Palindrome"`,
        expected: `Palindrome`,
        task: `Correct the logical error in the reversal logic.`,
        validation: {
            required: ['rev * 10 + digit', 'rev*10+digit', 'rev*10 + digit'],
            forbidden: []
        }
    },
    {
        id: 4,
        title: "Question 4 – Runtime + Logical Error (Python)",
        code: `nums = [10,20,30,40]

for i in range(len(nums)):
    nums.remove(nums[i])

print(nums)`,
        error: `Output Produced: [20, 40]`,
        expected: `[]`,
        task: `Identify why the list elements are not fully removed and correct the logic.`,
        validation: {
            required: ['nums.clear()', 'nums = []', 'nums[:] = []', 'nums.pop()'], // Accepting various fixes
            forbidden: []
        }
    },
    {
        id: 5,
        title: "Question 5 – Logical Error (C)",
        code: `#include<stdio.h>

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
}`,
        error: `Runtime error: accessing invalid memory location`,
        expected: `Unique elements: 5`,
        task: `Fix the boundary and logic issue in the loop.`,
        validation: {
            required: ['i < n-1', 'i<n-1', 'i < n - 1', 'i< n-1'],
            forbidden: []
        }
    },
    {
        id: 6,
        title: "Question 6 – Syntax Error (Python)",
        code: `def factorial(n)

    fact = 1
    for i in range(1,n+1)
        fact = fact.multiply(i)

    print("Factorial =", fact)

factorial(5)`,
        error: `SyntaxError: expected ':'
IndentationError: expected an indented block
AttributeError: 'int' object has no attribute 'multiply'`,
        expected: `Factorial = 120`,
        task: `Correct the syntax, indentation, and incorrect built-in usage.`,
        validation: {
            required: ['def factorial(n):', 'range(1,n+1):', 'fact *= i', 'fact = fact * i'],
            forbidden: ['multiply']
        }
    }
];

export const ROUND2_PLACE = "BANK";
export const ROUND2_CODE = "TRACE-5521";

// Helper to normalize query for loose validation
export const normalizeQuery = (q) => {
    return q.toLowerCase()
        .replace(/\s+/g, ' ') // Collapse spaces
        .replace(/["';]/g, '')
        .replace(/\s*\(\s*/g, '(') // Remove spaces around (
        .replace(/\s*\)\s*/g, ')') // Remove spaces around )
        .trim();
};
