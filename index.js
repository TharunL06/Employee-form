  // script.js
let employeeDatabase = [];

function addEmployee() {
    if (validateForm()) {
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const dob = document.getElementById('dob').value;
        const ctc = document.getElementById('ctc').value;

        const employee = { name, age, phoneNumber, dob, ctc };
        employeeDatabase.push(employee);

        displayEmployees();
        clearForm();
    }
}

function editEmployee() {
    const index = prompt("Enter the index of the employee to edit:");
    if (index !== null) {
        if (validateForm()) {
            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const dob = document.getElementById('dob').value;
            const ctc = document.getElementById('ctc').value;

            if (index >= 0 && index < employeeDatabase.length) {
                employeeDatabase[index] = { name, age, phoneNumber, dob, ctc };
                displayEmployees();
                clearForm();
            } else {
                alert("Invalid index");
            }
        }
    }
}

function deleteEmployee() {
    const index = prompt("Enter the index of the employee to delete:");
    if (index !== null) {
        if (index >= 0 && index < employeeDatabase.length) {
            employeeDatabase.splice(index, 1);
            displayEmployees();
        } else {
            alert("Invalid index");
        }
    }
}

function validateForm() {
    resetErrors();

    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const ctc = document.getElementById('ctc').value.trim();

    if (name === '') {
        showError('name', 'Name is required');
        return false;
    }

    if (age === '' || isNaN(age) || parseInt(age) <= 0) {
        showError('age', 'Please enter a valid age');
        return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
        showError('phone', 'Please enter a valid phone number');
        return false;
    }

    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobRegex.test(dob)) {
        showError('dob', 'Please enter a valid date of birth');
        return false;
    }

    if (ctc === '' || isNaN(ctc) || parseInt(ctc) <= 0) {
        showError('ctc', 'Please enter a valid CTC');
        return false;
    }

    return true;
}

function showError(id, message) {
    const errorElement = document.getElementById(`${id}Error`);
    errorElement.innerText = message;
}

function resetErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.innerText = '';
    });
}

function displayEmployees() {
    const tableBody = document.getElementById('employeeTableBody');
    tableBody.innerHTML = '';

    employeeDatabase.forEach((employee, index) => {
        const row = tableBody.insertRow();
        const keys = Object.keys(employee);

        keys.forEach((key, colIndex) => {
            const cell = row.insertCell(colIndex);
            cell.textContent = employee[key];
        });
    });
}

function clearForm() {
    document.getElementById('employeeForm').reset();
}

// Example pre-filled data for testing
employeeDatabase.push({ name: "John Doe", age: 30, phoneNumber: "1234567890", dob: "1990-01-01", ctc: 50000 });

// Display initial data
displayEmployees();
