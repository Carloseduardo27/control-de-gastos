let budget = 0;
let expenses = [];

const setBudget = () => {
    const budgetInput = document.getElementById('budget');
    budget = parseInt(budgetInput.value) || 0;
    updateBudgetDisplay();
    budgetInput.value = '';
};

const resetBudget = () => {
    budget = 0;
    expenses = [];
    updateBudgetDisplay();
    renderExpenses();
};

const addExpense = () => {
    const name = document.getElementById('expenseName').value;
    const category = document.getElementById('expenseCategory').value;
    const amount = parseInt(document.getElementById('expenseAmount').value) || 0;

    if (!name || amount <= 0) {
        alert('Por favor completa todos los campos correctamente');
        return;
    }

    expenses.push({ name, category, amount });
    alert('Gasto agregado correctamente!');
    renderExpenses();
    updateBudgetDisplay();
    toggleScrollButton();

    // Limpiar campos
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
};

const renderExpenses = () => {
    const tbody = document.getElementById('expensesList');
    tbody.innerHTML = expenses
        .map(
            (expense, index) => `
                <tr>
                    <td>${expense.name}</td>
                    <td>${expense.category}</td>
                    <td>Bs ${expense.amount}</td>
                    <td class="actions">
                        <button onclick="deleteExpense(${index})" style="background-color: #dc3545;">Eliminar</button>
                    </td>
                </tr>
            `
        )
        .join('');
};

const deleteExpense = (index) => {
    if (confirm('¿Estás seguro de eliminar este gasto?')) {
        expenses.splice(index, 1);
        renderExpenses();
        updateBudgetDisplay();
        toggleScrollButton();
    }
};

const updateBudgetDisplay = () => {
    document.getElementById('totalBudget').textContent = budget;
    const totalExpenses = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );
    document.getElementById('remainingBudget').textContent =
        budget - totalExpenses;
};

const toggleScrollButton = () => {
    const scrollButton = document.querySelector('.scroll-top');
    scrollButton.style.display = expenses.length > 5 ? 'block' : 'none';
};

const toggleBotonScroll = () => {
    document.querySelector('.scroll-top').style.display =
        gastos.length > 5 ? 'block' : 'none';
};

// Inicializar
updateBudgetDisplay();
