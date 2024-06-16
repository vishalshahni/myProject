document.addEventListener('DOMContentLoaded',() => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    expenses.forEach(expense => addExpenseToDOM(expense));

    expenseForm.addEventListener('submit',(event) => {
        event.preventDefault();

        const descriptionInput = document.getElementById('description');
        const amountInput = document.getElementById('amount');
       const categoryInput = document.getElementById('select');

        const description = descriptionInput.value;
        const amount = amountInput.value;
        const category = categoryInput.value;

        if(description === '' || amount === ''){
            alert('Please fill all the details')
            return;
        }
        const expense = { description, amount, category };
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        addExpenseToDOM(expense);

        descriptionInput.value = '';
        amountInput.value = '';
        categoryInput.value = '';
    });

    function addExpenseToDOM(expense) {
        const expenseItem = document.createElement('li');
        
        const expenseText = document.createElement('span');
        expenseText.className = 'expense-text';
        expenseText.textContent = `${expense.description} (${expense.category}): $${expense.amount}`;
        
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'expense-buttons';

        const modifyButton = document.createElement('button');
        modifyButton.className = 'modify-button';
        modifyButton.textContent = 'Modify';
        modifyButton.addEventListener('click', () => modifyExpense(expense, expenseItem, expenseText));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteExpense(expense, expenseItem));

        buttonsDiv.appendChild(modifyButton);
        buttonsDiv.appendChild(deleteButton);

        expenseItem.appendChild(expenseText);
        expenseItem.appendChild(buttonsDiv);

        expenseList.appendChild(expenseItem);
    }

    function deleteExpense(expense, expenseItem) {
        expenseList.removeChild(expenseItem);
        expenses = expenses.filter(e => e !== expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function modifyExpense(expense, expenseItem, expenseText) {
        const newDescription = prompt('Enter new description', expense.description);
        const newAmount = prompt('Enter new amount', expense.amount);
        const newCategory = prompt('Enter new category', expense.category);

        if (newDescription !== null && newAmount !== null && newCategory !== null &&
            newDescription !== '' && newAmount !== '' && newCategory !== '') {
            expense.description = newDescription;
            expense.amount = newAmount;
            expense.category = newCategory;
            expenseText.textContent = `${newDescription} (${newCategory}): $${newAmount}`;
            localStorage.setItem('expenses', JSON.stringify(expenses));
        }
    }
});