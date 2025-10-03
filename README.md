# Minecraft Rewards Website (Deployment-ready)

## What you got
- Simple Node.js + Express backend that stores users in `users.json` (no DB).
- Frontend `public/` folder with a Minecraft-themed landing page that asks for userid & password.
- Passwords are stored **hashed** using `bcryptjs` (recommended) — NOT plain text.

## Quick start (develop & deploy)
1. Install Node.js (>=18).

2. Install dependencies and start:
```bash
cd minecraft_website
npm install
npm start
```

3. Open http://localhost:3000

## Deployment notes
- This project serves static frontend and backend from the same server for simple deployment (suitable for VPS, Heroku, Render, Railway).
- For production, ensure you set `NODE_ENV=production` and run under a process manager (pm2) or containerize the app.
- Ensure `users.json` is writable by the process. For multiple-instance deployments, migrate to a proper database.

## Security notes (important)
- Passwords are hashed with bcryptjs before saving. Still: storing user data in a file is not recommended for production multi-instance apps.
- Use HTTPS in production.
- Consider adding rate limiting, email verification, session tokens / JWTs if you extend this project.

