# 💰 Expense Tracker

A full-stack Expense Tracker application built to help users manage their personal finances by tracking income and expenses, monitoring transactions, and visualizing financial data.

## 🚀 Features

- **Add Transactions:** Record income and expenses.
- **Manage Transactions:** View, edit, and delete transactions.
- **Dashboard:** View total income, total expenses, and balance.
- **Data Visualization:** Analyze income and expenses using charts.
- **Category Analysis:** View expense distribution through a doughnut chart.
- **Notifications:** Receive toast notifications for actions.
- **Currency Support:** Displays amounts in Indian Rupees (₹).
- **Database Storage:** Store transaction records in MongoDB.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | Backend framework and API |
| MongoDB | Database |
| Chart.js | Data visualization |

## 📁 Project Structure

```text
Expense-Tracker/
│
├── config/
│   └── db.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── models/
│   └── Transaction.js
│
├── routes/
│   └── transactionRoutes.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

*Adjust filenames above to match your actual project structure.*

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/lokeshnegi838/Expense-Tracker.git
```

### 2. Navigate to the project directory

```bash
cd Expense-Tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add your MongoDB connection string and port.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Use the exact MongoDB environment variable name expected by your database configuration.

### 5. Start the application

```bash
node server.js
```

Open your browser and visit:

```text
http://localhost:3000
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/transactions` | Fetch all transactions |
| POST | `/api/transactions` | Add a transaction |
| PUT | `/api/transactions/:id` | Update a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |

## 📊 Dashboard

The dashboard provides:
- Total Income
- Total Expenses
- Available Balance
- Income vs Expense Chart
- Expense Category Chart

## 🔒 Security

- Environment variables are used for configuration.
- MongoDB connection details should never be committed to GitHub.
- `.env` and `node_modules/` should be included in `.gitignore`.

## 👨‍💻 Author

**Lokesh Negi**

GitHub: [@lokeshnegi838](https://github.com/lokeshnegi838)

## ⭐ Support

If you find this project useful, consider giving it a star on GitHub!
