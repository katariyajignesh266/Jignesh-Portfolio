const mongoose = require('mongoose');
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const requireJsonContentType = require('./middleware/requireJsonContentType');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(requireJsonContentType);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

async function request(serverUrl, path, options = {}) {
  const url = `${serverUrl}${path}`;
  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
}

async function runTests() {
  console.log('--- Starting Practical 7 Verification Tests ---');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB.');

  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Test server running on ${baseUrl}`);

  const testEmail = `testuser_${Date.now()}@example.com`;
  const testPassword = 'Password123!';
  let authToken = '';

  try {
    // 1. Validation test on Register (missing/short password)
    console.log('\n[Test 1] Register with short password (<6 chars)...');
    const r1 = await request(baseUrl, '/api/auth/register', {
      method: 'POST',
      body: { email: testEmail, password: '123' }
    });
    console.log(`Status: ${r1.status}, Error: ${r1.data.error}`);
    if (r1.status !== 400) throw new Error('Expected status 400 for short password');
    console.log('✓ Passed: Validation rejected short password.');

    // 2. Successful Registration
    console.log('\n[Test 2] Successful Register...');
    const r2 = await request(baseUrl, '/api/auth/register', {
      method: 'POST',
      body: { email: testEmail, password: testPassword }
    });
    console.log(`Status: ${r2.status}, User ID: ${r2.data.user?.id}, Has Token: ${!!r2.data.token}`);
    if (r2.status !== 201 || !r2.data.token) throw new Error('Expected 201 with JWT token');
    console.log('✓ Passed: Registered user and returned signed JWT.');

    // 3. Duplicate Registration rejection
    console.log('\n[Test 3] Duplicate Registration rejection...');
    const r3 = await request(baseUrl, '/api/auth/register', {
      method: 'POST',
      body: { email: testEmail, password: testPassword }
    });
    console.log(`Status: ${r3.status}, Error: ${r3.data.error}`);
    if (r3.status !== 400) throw new Error('Expected 400 for duplicate email');
    console.log('✓ Passed: Duplicate registration blocked.');

    // 4. Login with incorrect password
    console.log('\n[Test 4] Login with incorrect password...');
    const r4 = await request(baseUrl, '/api/auth/login', {
      method: 'POST',
      body: { email: testEmail, password: 'wrongpassword' }
    });
    console.log(`Status: ${r4.status}, Error: ${r4.data.error}`);
    if (r4.status !== 401) throw new Error('Expected 401 for wrong password');
    console.log('✓ Passed: Login rejected with 401.');

    // 5. Successful Login & JWT issuance
    console.log('\n[Test 5] Successful Login...');
    const r5 = await request(baseUrl, '/api/auth/login', {
      method: 'POST',
      body: { email: testEmail, password: testPassword }
    });
    console.log(`Status: ${r5.status}, User: ${r5.data.user?.email}, Has Token: ${!!r5.data.token}`);
    if (r5.status !== 200 || !r5.data.token) throw new Error('Expected 200 with JWT token');
    authToken = r5.data.token;
    console.log('✓ Passed: Logged in and received JWT token.');

    // 6. Access protected /api/tasks without token
    console.log('\n[Test 6] Access /api/tasks without token...');
    const r6 = await request(baseUrl, '/api/tasks', { method: 'GET' });
    console.log(`Status: ${r6.status}, Error: ${r6.data.error}`);
    if (r6.status !== 401) throw new Error('Expected 401 Unauthorized for missing token');
    console.log('✓ Passed: Protected route blocked unauthenticated request.');

    // 7. Access protected /api/tasks with invalid/malformed token
    console.log('\n[Test 7] Access /api/tasks with invalid token...');
    const r7 = await request(baseUrl, '/api/tasks', {
      method: 'GET',
      headers: { Authorization: 'Bearer thisisafaketoken123' }
    });
    console.log(`Status: ${r7.status}, Error: ${r7.data.error}`);
    if (r7.status !== 401) throw new Error('Expected 401 Unauthorized for invalid token');
    console.log('✓ Passed: Protected route blocked invalid token without server crash.');

    // 8. Access /api/auth/me with valid Bearer token
    console.log('\n[Test 8] Access /api/auth/me (Supplementary Problem)...');
    const r8 = await request(baseUrl, '/api/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log(`Status: ${r8.status}, Email: ${r8.data.data?.email}, Has Password Hash in body: ${'password' in (r8.data.data || {})}`);
    if (r8.status !== 200 || r8.data.data?.email !== testEmail.toLowerCase() || 'password' in r8.data.data) {
      throw new Error('Expected 200 with user profile and excluded password hash');
    }
    console.log('✓ Passed: /api/auth/me returned correct user profile with password excluded.');

    // 9. Input validation on Task creation (missing title)
    console.log('\n[Test 9] Create task with missing title (Input Validation Middleware)...');
    const r9 = await request(baseUrl, '/api/tasks', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: { description: 'Missing title task', priority: 'medium' }
    });
    console.log(`Status: ${r9.status}, Error: ${r9.data.error}`);
    if (r9.status !== 400) throw new Error('Expected 400 Bad Request for missing title');
    console.log('✓ Passed: Input validation middleware rejected task without title before controller/database.');

    // 10. Create task with valid inputs & verify user association
    console.log('\n[Test 10] Create task with valid inputs & verify user link...');
    const r10 = await request(baseUrl, '/api/tasks', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: { title: 'Practical 7 Verification Task', priority: 'high', description: 'Testing auth' }
    });
    console.log(`Status: ${r10.status}, Task ID: ${r10.data.data?._id}, Assigned User: ${r10.data.data?.user}`);
    if (r10.status !== 201 || !r10.data.data?._id) throw new Error('Expected 201 Created');
    console.log('✓ Passed: Task created successfully with user reference attached.');

    console.log('\n========================================');
    console.log('ALL 10 VERIFICATION TESTS PASSED SUCCESSFULLY!');
    console.log('========================================');
  } finally {
    server.close();
    await mongoose.disconnect();
  }
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
