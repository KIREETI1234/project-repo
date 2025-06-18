const form = document.getElementById('employee-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const deptInput = document.getElementById('department');
const salaryInput = document.getElementById('salary');
const employeeIdInput = document.getElementById('employeeId');
const tableBody = document.querySelector('#employee-table tbody');

// 🟠 Use localhost or docker service name depending on how you run it
const apiUrl = 'http://localhost:8081/api/employees';

async function loadEmployees() {
  try {
    const res = await fetch(apiUrl);
    const employees = await res.json();
    tableBody.innerHTML = '';
    employees.forEach(emp => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.department}</td>
        <td>${emp.salary}</td>
        <td>
          <button onclick='editEmployee(${JSON.stringify(emp)})'>Edit</button>
          <button onclick='deleteEmployee(${emp.id})'>Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    alert('Failed to load employees: ' + error);
  }
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const emp = {
    name: nameInput.value,
    email: emailInput.value,
    department: deptInput.value,
    salary: parseFloat(salaryInput.value)
  };

  const id = employeeIdInput.value;
  try {
    if (id) {
      await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emp)
      });
    } else {
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emp)
      });
    }

    form.reset();
    employeeIdInput.value = '';
    loadEmployees();
  } catch (error) {
    alert('Failed to save employee: ' + error);
  }
};

function editEmployee(emp) {
  employeeIdInput.value = emp.id;
  nameInput.value = emp.name;
  emailInput.value = emp.email;
  deptInput.value = emp.department;
  salaryInput.value = emp.salary;
}

async function deleteEmployee(id) {
  try {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    loadEmployees();
  } catch (error) {
    alert('Failed to delete employee: ' + error);
  }
}

loadEmployees();
