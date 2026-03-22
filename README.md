# Anonymous Chat — Backend

Real-time anonymous chat backend built with Node.js, Express, and Socket.io. Handles random matchmaking, real-time messaging, and message persistence using MySQL.

---

## Tech Stack

- Node.js
- Express
- Socket.io
- MySQL
- Sequelize ORM
- dotenv

---

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── models/
│   └── Message.js         # Message model
├── socket/
│   └── chatHandler.js     # Socket event handlers
├── utils/
│   └── matchMaker.js      # Matchmaking logic
├── server.js              # Entry point
├── package.json
└── .env                   # Environment variables (not committed)
```

---

## Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/anonymous-chat-backend.git
cd anonymous-chat-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306
PORT=3000
```

### 4. Start the server

```bash
node server.js
```

Server will run on `http://localhost:3000`

---

## Socket Events

### Client → Server

| Event     | Description                          |
|-----------|--------------------------------------|
| `start`   | Join the matchmaking queue           |
| `message` | Send a message to current partner    |
| `skip`    | End current chat and find new partner|

### Server → Client

| Event                  | Description                        |
|------------------------|------------------------------------|
| `searching`            | Waiting for a partner              |
| `connected`            | Successfully matched with a partner|
| `message`              | Receive a message from partner     |
| `partner_disconnected` | Partner has left the chat          |

---

## Message Rules

- Maximum message length: **200 characters**
- Rate limit: **1 message per 500ms**

---

## Deployment

This backend is deployed on **Render.com**.

- Live URL: `https://anonymous-chat-backend-2.onrender.com`
- Database: MySQL hosted on **Aiven.io**

> Note: Free tier on Render spins down after inactivity. First request may take up to 50 seconds.

---

## Environment Variables (Production)

Set these in your hosting platform dashboard:

| Variable | Description              |
|----------|--------------------------|
| DB_HOST  | MySQL host               |
| DB_USER  | MySQL username           |
| DB_PASS  | MySQL password           |
| DB_NAME  | MySQL database name      |
| DB_PORT  | MySQL port               |
| PORT     | Server port              |