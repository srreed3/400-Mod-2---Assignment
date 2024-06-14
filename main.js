document.addEventListener('DOMContentLoaded', function() {


    //empty array to store expense entries
    let expenseEntries = [];

    //empty array to store data for chart                                                                          !!!not working yet!!!
    let chartData = {
        Rent: 0,
        Utilities: 0,
        Groceries: 0,
        Gas: 0,
        Phone: 0,
        Loans: 0,
        Insurance: 0,
        Entertainment: 0,
        Other: 0
    }


    //function to add new expense entry 
    function addExpense(dateExpense, typeExpense, numAmount, description) {
        expenseEntries.push({ dateExpense, typeExpense, numAmount, description });

        document.getElementById('formContainer').reset();
    };


    //add event listener for form submission
    document.getElementById('formContainer').addEventListener('submit', function(event) {
        event.preventDefault();

        //retrieve values
        let dateExpense = document.getElementById('dateExpense').value;
        let typeExpense = document.getElementById('typeExpense').value
        let numAmount = document.getElementById('numAmount').value;
        let description = document.getElementById('description').value;

        //calls addExpense to add new expense to page; calls displayResults to update list of expenses
        addExpense(dateExpense, typeExpense, numAmount, description);
        displayResults();

        //remove hidden id to show tables
        document.querySelector('.viewExpenses').classList.remove('hidden');    
    });


    function displayResults() {

        //sort by date
        expenseEntries.sort((a, b) => new Date(a.dateExpense) - new Date(b.dateExpense));

        let html = '';

        if (expenseEntries.length === 0) {        
            html += '<p>No expenses listed yet</p>';
        } else {
            html += '<div class="viewExpenses">'
            html += '<div id="output" class="scrollable">'
            html += '<h2>View Expenses</h2>'
            html += '<table id="expenseTable">';
            html += '<thead><tr><th>DATE</th><th>TYPE</th><th>AMOUNT ($)</th><th>DESCRIPTION</th><th>DELETE</th></tr></thead>';
            html += '<tbody>';
            expenseEntries.forEach((expense, index) => {
                html += `<tr><td>${expense.dateExpense}</td><td>${expense.typeExpense}</td><td>${expense.numAmount}</td><td>${expense.description}</td><td><button onclick="deleteExpense(${index})">X</button></td></tr>`;
            });
            html += '<div class="clearButton">'
            html += '<button onclick="clearAllExpenses()">CLEAR ALL EXPENSES</button>'
            html += '</div></div></div></tbody></table>';
        }

        document.getElementById('output').innerHTML = html;
    }

    //function to remove expense and update the table
    window.deleteExpense = function(index) {
        expenseEntries.splice(index, 1);
        displayResults();
    }


    //function to clear all expenses w/ button 
    window.clearAllExpenses = function() {
        document.getElementById('formContainer').reset();
        expenseEntries = [];
        document.getElementById('output').innerHTML = '';
    }

    //function to clear all expenses w/ button 
    window.clearAllExpenses = function() {
        document.getElementById('formContainer').reset();
        expenseEntries = [];
        document.getElementById('output').innerHTML = '';
    }


     //intercept page refresh to prevent data loss
     window.addEventListener('beforeunload', function(event) {
        event.preventDefault();
        return 'Are you sure you want to leave? Your unsaved changes may be lost.'; // Display prompt message
    });







    //pie chart                                                                                                   !!!not working yet!!!
    //ensure Chart.js is loaded before executing the code
    if (typeof Chart !== 'undefined') {
        //register the datalabels plugin to all charts
        Chart.register(ChartDataLabels);

        //pie chart 
        let ctx = document.getElementById('myChart').getContext('2d');


        let labels = ['Rent', 'Utilities', 'Groceries', 'Gas', 'Phone', 'Loans', 'Insurance', 'Entertainment', 'Other'];
        let colorHex = ['#cc260c', '#f5870a', '#d1d12e', '#227541', '#26abab', '#1328e8', '#892ce6', '#f233e2', '#899191'];

        let myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: [10, 20, 30, 18, 31, 2, 40, 10, 3],
                    backgroundColor: colorHex
                }],
                labels: labels
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    datalabels: {
                        color: '#f0f9fc',
                        anchor: 'end',
                        offset: -10,
                        borderWidth: 2,
                        borderColor: '#f0f9fc',
                        borderRadius: 25,
                        backgroundColor: (context) => {
                            return context.dataset.backgroundColor;
                        },
                        font: {
                            weight: 'bold',
                            size: 15
                        },
                        formatter: (value) => {
                            return '$' + value;
                        }
                    }
                }
            }
        });
    } else {
        console.error('Chart.js is not loaded.');
    }
});
