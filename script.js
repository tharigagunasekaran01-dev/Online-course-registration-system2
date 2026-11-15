const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
const studentList = document.getElementById("studentList");

// Get saved students from Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Display registered students
function displayStudents() {
    studentList.innerHTML = "";

    if (students.length === 0) {
        studentList.innerHTML = "<p>No students registered yet.</p>";
        return;
    }

    students.forEach(function(student, index) {
        const card = document.createElement("div");
        card.className = "student-card";

        card.innerHTML = `
            <h3>${student.name}</h3>
            <p>Email: ${student.email}</p>
            <p>Phone: ${student.phone}</p>
            <p>Department: ${student.department}</p>
            <p>Course: ${student.course}</p>
            <p>Mode: ${student.mode}</p>
            <button type="button" onclick="deleteStudent(${index})">
                Delete
            </button>
        `;

        studentList.appendChild(card);
    });
}

// Submit registration form
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        department: document.getElementById("department").value.trim(),
        course: document.getElementById("course").value,
        mode: document.getElementById("mode").value
    };

    if (Object.values(student).some(value => !value)) {
        message.style.color = "red";
        message.textContent = "Please fill all the fields.";
        return;
    }

    if (!/^[0-9]{10}$/.test(student.phone)) {
        message.style.color = "red";
        message.textContent = "Enter a valid 10 digit phone number.";
        return;
    }

    students.push(student);

    // Save details in Local Storage
    localStorage.setItem("students", JSON.stringify(students));

    message.style.color = "green";
    message.textContent = "Registration Successful!";

    form.reset();

    displayStudents();
});

// Delete student details
function deleteStudent(index) {
    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}

// Display saved students when page opens
displayStudents();