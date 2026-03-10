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
        title: "Question 1 – Runtime Error (Java)",
        code: `public class SumArray {

    public static void main(String args[]) {

        int arr[] = {5,10,15,20};
        int sum = 0;

        for(int i = 0; i <= arr.length; i++) {
            sum += arr[i];
        }

        System.out.println("Sum = " + sum);
    }
}`,
        error: `Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 4 out of bounds for length 4`,
        expected: `Sum = 50`,
        task: `Identify the cause of the runtime error and correct the loop.`,
        validation: {
            required: ['i < arr.length', 'i<arr.length'],
            forbidden: ['<=']
        }
    },
    {
        id: 2,
        title: "Question 2 – Runtime Error (C)",
        code: `#include<stdio.h>

int main() {

    int arr[] = {1,2,3,4,5};
    int n = sizeof(arr)/sizeof(arr[0]);

    for(int i = 0; i <= n; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}`,
        error: `Segmentation fault (core dumped)`,
        expected: `1 2 3 4 5`,
        task: `Fix the runtime issue causing the program to crash.`,
        validation: {
            required: ['i < n', 'i<n'],
            forbidden: ['<=']
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
            required: ['nums.clear()', 'nums = []', 'nums[:] = []','nums.pop()'], // Accepting various fixes
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

export const ROUND2_PLACE = "OPEN AUDI";
export const ROUND2_CODE = "CRPT-5521";

// Helper to normalize query for loose validation
export const normalizeQuery = (q) => {
    return q.toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/["';]/g, '')
        .replace(/\s*\(\s*/g, '(') // Remove spaces around (
        .replace(/\s*\)\s*/g, ')') // Remove spaces around )
        .trim();
};
