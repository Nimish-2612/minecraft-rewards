// server.js - simple Express server storing users in users.json (plain text passwords for demo)
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ensure users file exists
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]', 'utf8');
}

function readUsers() {
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// register endpoint
app.post('/api/register', (req, res) => {
  const { userid, password } = req.body;
  if (!userid || !password) return res.status(400).json({ error: 'userid and password required' });

  const users = readUsers();
  if (users.find(u => u.userid === userid)) {
    return res.status(409).json({ error: 'userid already exists' });
  }

  users.push({ userid, password, createdAt: new Date().toISOString() });
  writeUsers(users);
  return res.json({ ok: true, message: 'registered' });
});

// login endpoint
app.post('/api/login', (req, res) => {
  const { userid, password } = req.body;
  if (!userid || !password) return res.status(400).json({ error: 'userid and password required' });

  const users = readUsers();
  const user = users.find(u => u.userid === userid && u.password === password);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });

  return res.json({ ok: true, message: 'login successful' });
});

// simple health
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// fallback to index.html for SPA-like experience
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
