
const transactionForm = document.getElementById("transactionForm");

const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const noteInput = document.getElementById("note");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");

const transactionList = document.getElementById("transactionList");

let incomeExpenseChart = null;
let categoryChart = null;


let toastTimer;

function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    clearTimeout(toastTimer);

    toast.textContent = message;
    toast.className = "toast show";

    if (type === "error") {
        toast.classList.add("error");
    }

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}




async function getTransactions() {

    try {

        const response = await fetch("/api/transactions");

        if (!response.ok) {
            throw new Error("Failed to fetch transactions");
        }

        const transactions = await response.json();

        displayTransactions(transactions);

        updateSummary(transactions);

        updateCharts(transactions);

    } catch (error) {

        console.error("Fetch Error:", error.message);

        showToast("Unable to load transactions", "error");
    }
}

function displayTransactions(transactions) {

    transactionList.innerHTML = "";

    if (transactions.length === 0) {

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 6;
        cell.textContent = "No transactions found.";
        cell.style.textAlign = "center";
        cell.style.padding = "25px";

        row.appendChild(cell);
        transactionList.appendChild(row);

        return;
    }

    transactions.forEach(transaction => {

        const row = document.createElement("tr");

    
        const titleCell = document.createElement("td");
        titleCell.textContent = transaction.title;

    
        const amountCell = document.createElement("td");

        amountCell.textContent =
            `₹${Number(transaction.amount).toFixed(2)}`;

    
        const typeCell = document.createElement("td");
        typeCell.textContent = transaction.type;

        
        const categoryCell = document.createElement("td");
        categoryCell.textContent = transaction.category;

        
        const dateCell = document.createElement("td");

        dateCell.textContent = new Date(transaction.date)
            .toLocaleDateString("en-IN");

        
        const actionCell = document.createElement("td");

        
        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
            editTransaction(transaction);
        });


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteTransaction(transaction._id);
        });

        actionCell.append(editButton, deleteButton);

        row.append(
            titleCell,
            amountCell,
            typeCell,
            categoryCell,
            dateCell,
            actionCell
        );

        transactionList.appendChild(row);

    });
}




function editTransaction(transaction) {

   
    titleInput.value = transaction.title;

    amountInput.value = transaction.amount;

    typeInput.value = transaction.type;

    categoryInput.value = transaction.category;

    dateInput.value = new Date(transaction.date)
        .toISOString()
        .split("T")[0];

    noteInput.value = transaction.note || "";

  
    transactionForm.querySelector("button[type='submit']")
        .textContent = "Update Transaction";

    transactionForm.dataset.editId = transaction._id;

   
    transactionForm.scrollIntoView({
        behavior: "smooth"
    });

    showToast("Transaction ready to edit!");
}



async function deleteTransaction(id) {

    if (!id) {

        showToast("Transaction ID is missing!", "error");

        return;
    }

    try {

        const response = await fetch(`/api/transactions/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {

            throw new Error(
                result.message || "Unable to delete transaction"
            );
        }

        showToast("Transaction deleted successfully!");

        // Refresh dashboard
        await getTransactions();

    } catch (error) {

        console.error("Delete Error:", error);

        showToast("Delete failed: " + error.message, "error");
    }
}




function updateSummary(transactions) {

    
    const totalIncome = transactions
        .filter(item => item.type === "income")
        .reduce((total, item) => {
            return total + Number(item.amount);
        }, 0);


    const totalExpense = transactions
        .filter(item => item.type === "expense")
        .reduce((total, item) => {
            return total + Number(item.amount);
        }, 0);


    const balance = totalIncome - totalExpense;

   
    incomeElement.textContent = `₹${totalIncome.toFixed(2)}`;

    expenseElement.textContent = `₹${totalExpense.toFixed(2)}`;

    balanceElement.textContent = `₹${balance.toFixed(2)}`;
}



function updateCharts(transactions) {

  
    const totalIncome = transactions
        .filter(item => item.type === "income")
        .reduce((total, item) => {
            return total + Number(item.amount);
        }, 0);

  
    const totalExpense = transactions
        .filter(item => item.type === "expense")
        .reduce((total, item) => {
            return total + Number(item.amount);
        }, 0);


    if (incomeExpenseChart) {
        incomeExpenseChart.destroy();
    }

    if (categoryChart) {
        categoryChart.destroy();
    }



    const incomeExpenseContext =
        document.getElementById("incomeExpenseChart");

    incomeExpenseChart = new Chart(incomeExpenseContext, {

        type: "bar",

        data: {

            labels: ["Income", "Expense"],

            datasets: [{

                label: "Amount (₹)",

                data: [totalIncome, totalExpense],

                backgroundColor: ["#16a34a", "#dc2626"],

                borderRadius: 8,

                barThickness: 65

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: true,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        callback: function(value) {
                            return "₹" + value;
                        }

                    }

                }

            }

        }

    });



    const categoryTotals = {};

    transactions
        .filter(item => item.type === "expense")
        .forEach(item => {

            const category = item.category;

            const amount = Number(item.amount);

            if (categoryTotals[category]) {

                categoryTotals[category] += amount;

            } else {

                categoryTotals[category] = amount;

            }

        });


    const categoryLabels = Object.keys(categoryTotals);

    const categoryValues = Object.values(categoryTotals);



    if (categoryLabels.length === 0) {

        categoryLabels.push("No expenses yet");

        categoryValues.push(1);

    }


    const categoryContext =
        document.getElementById("categoryChart");

    categoryChart = new Chart(categoryContext, {

        type: "doughnut",

        data: {

            labels: categoryLabels,

            datasets: [{

                label: "Expenses",

                data: categoryValues,

                backgroundColor:
                    categoryLabels[0] === "No expenses yet"
                        ? ["#d1d5db"]
                        : [
                            "#3b82f6",
                            "#16a34a",
                            "#f59e0b",
                            "#ef4444",
                            "#8b5cf6",
                            "#06b6d4",
                            "#ec4899",
                            "#84cc16"
                        ],

                borderWidth: 2,

                borderColor: "#ffffff"

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: true,

            plugins: {

                legend: {
                    position: "bottom"
                }

            }

        }

    });

}


transactionForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const transactionData = {

        title: titleInput.value.trim(),

        amount: Number(amountInput.value),

        type: typeInput.value,

        category: categoryInput.value.trim(),

        date: dateInput.value,

        note: noteInput.value.trim()

    };


  
    const editId = transactionForm.dataset.editId;

    try {

      
        let url = "/api/transactions";

        let method = "POST";

        if (editId) {

            url = `/api/transactions/${editId}`;

            method = "PUT";

        }


        const response = await fetch(url, {

            method: method,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(transactionData)

        });


        const result = await response.json();

        if (!response.ok) {

            throw new Error(
                result.message || "Transaction operation failed"
            );

        }


        
        if (editId) {

            showToast("Transaction updated successfully!");

        } else {

            showToast("Transaction added successfully!");

        }

        delete transactionForm.dataset.editId;
        transactionForm.reset();
        transactionForm.querySelector("button[type='submit']")
            .textContent = "Add Transaction";
        await getTransactions();


    } catch (error) {

        console.error("Transaction Error:", error);

        showToast(error.message, "error");

    }

});
getTransactions();
