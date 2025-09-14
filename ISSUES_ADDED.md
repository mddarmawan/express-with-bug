# Issues Added for AI Testing

This document lists the 5 realistic issues that have been introduced to test the AI code reviewer.

## Issue 1: Security - Hardcoded JWT Secret
**File:** `middleware/auth.js`
**Problem:** JWT secret is hardcoded instead of using environment variable
**Impact:** Security vulnerability - anyone with access to code can generate valid tokens
**Line:** `const JWT_SECRET = 'my-super-secret-key';`

## Issue 2: Security - Insecure Password Hashing
**File:** `models/User.js`
**Problem:** Using only 5 salt rounds instead of recommended 12+ rounds
**Impact:** Passwords are easier to crack with brute force attacks
**Line:** `const salt = await bcrypt.genSalt(5);`

## Issue 3: Security - Missing Authentication on Sensitive Endpoint
**File:** `routes/users.js`
**Problem:** GET /api/users endpoint is accessible without authentication
**Impact:** Anyone can view all user data including emails and usernames
**Line:** `router.get('/', async (req, res) => {` (missing authenticateToken middleware)

## Issue 4: Input Validation - Weak Email Validation
**File:** `utils/validation.js`
**Problem:** Added a weak email validation function that only checks for @ and .
**Impact:** Invalid emails can pass validation, leading to data quality issues
**Line:** `const isValidEmail = (email) => { return email.includes('@') && email.includes('.'); }`

## Issue 5: Error Handling - Exposing Sensitive Information
**File:** `routes/auth.js`
**Problem:** Error responses include stack traces and error details in production
**Impact:** Sensitive information about server internals is exposed to clients
**Lines:** Multiple locations where `error: error.message, stack: error.stack` are returned

## Testing Your AI

These issues represent common problems found in real-world code reviews:

1. **Security vulnerabilities** (Issues 1, 2, 3)
2. **Input validation weaknesses** (Issue 4)
3. **Information disclosure** (Issue 5)

A good AI code reviewer should identify:
- Hardcoded secrets
- Weak password hashing
- Missing authentication
- Inadequate input validation
- Sensitive information exposure

The issues are realistic and commonly found in actual PR reviews, making them perfect for testing AI code review capabilities.
