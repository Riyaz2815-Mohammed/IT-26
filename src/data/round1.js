export const normalizeSQL = (query) => {
    if (!query) return '';
    return query
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/;\s*$/, '') // Remove trailing semicolon
        .split('')
        .filter(char => /[a-z0-9\s<>=_*(),.]/.test(char)) // Allow only safe chars
        .join('');
};

export const SQL_CHALLENGES = [
    {
        id: 1,
        scrambled: [
            "l,r=0,len(nums)-1",
            "return []",
            "nums.sort()",
            "while l<r:",
            "if sum==target: return [l,r]",
            "sum=nums[l]+nums[r]",
            "else: r-=1",
            "def twosum(nums,target):",
            "elif sum<target: l+=1"
        ],
        answer: "def twosum(nums,target):\nnums.sort()\nl,r=0,len(nums)-1\nwhile l<r:\nsum=nums[l]+nums[r]\nif sum==target: return [l,r]\nelif sum<target: l+=1\nelse: r-=1\nreturn []",
        hint: "Start with def"
    },
    {
        id: 2,
        scrambled: [
            "'error'", "logs", "SELECT",
            "ORDER BY", "=", "status",
            "created_at", "WHERE", "*",
            "FROM", "DESC"
        ],
        answer: "SELECT * FROM logs WHERE status = 'error' ORDER BY created_at DESC",
        hint: "Filter before sorting"
    },
    {
        id: 3,
        scrambled: [
            "HAVING", "COUNT(*)", "employees",
            "SELECT", "department", ">",
            "FROM", "department,", "5",
            "GROUP BY", "COUNT(*)"
        ],
        answer: "SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5",
        hint: "HAVING comes after GROUP BY"
    },
    {
        id: 4,
        scrambled: [
            "JOIN", "orders.amount", "users.name,", "orders.user_id",
            "SELECT", "=", "users",
            "FROM", "users.id", "ON", "orders"
        ],
        answer: "SELECT users.name, orders.amount FROM users JOIN orders ON users.id = orders.user_id",
        hint: "Standard JOIN syntax"
    }
];

export const ROUND1_PLACE = "EIE BLOCK";
export const ROUND1_CODE = "TRACE-7712"; // This would change per team in a real DB
