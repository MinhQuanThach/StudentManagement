const apiUrl = "http://localhost:8080/courses"; // Backend API base URL

// Select elements
const courseTable = document.getElementById("courseTable");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const courseModal = document.getElementById("courseModal");
const courseForm = document.getElementById("courseForm");
const searchCourseBtn = document.getElementById("searchCourseBtn");
const searchCourseInput = document.getElementById("searchCourseInput");

// Helper function to render a table row
function createCourseRow(course) {
    return `
        <tr>
            <td class="border-t py-2 px-4">${course.idCourse}</td>
            <td class="border-t py-2 px-4">${course.teacher.name}</td>
            <td class="border-t py-2 px-4">${course.credits}</td>
            <td class="border-t py-2 px-4">${course.title}</td>
            <td class="border-t py-2 px-4">
                <button onclick="editCourse('${course.idCourse}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button onclick="deleteCourse('${course.idCourse}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </td>
        </tr>
    `;
}

// Fetch and display courses
async function fetchCourses() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch courses.");
        const courses = await response.json();

        courseTable.innerHTML = courses.map(createCourseRow).join("");
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
}

async function fetchTeachersForSelection() {
    try {
        const response = await fetch("http://localhost:8080/teachers");
        if (!response.ok) {
            throw new Error("Failed to fetch teachers");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return [];
    }
}

// Open modal in create mode
async function openModal(mode = "create", course = {}) {
    courseForm.reset();
    courseForm.dataset.mode = mode;
    document.getElementById("idCourse").readOnly = mode === "edit";

    // List of selection for 'course' label
    const teacherSelect = document.getElementById("teacher");
    teacherSelect.innerHTML = '<option value="" disabled selected>Select a teacher</option>'; // Reset options
    const teachers = await fetchTeachersForSelection();
    teachers.forEach(teacher => {
        const option = document.createElement("option");
        option.value = teacher.idTeacher;
        option.textContent = teacher.name;
        teacherSelect.appendChild(option);
    });

    if (mode === "edit") {
        // Update modal title and button
        document.getElementById("modalTitle").innerText = "Edit Course";
        document.getElementById("modalSubmitBtn").innerText = "Save";
        // Populate form fields
        document.getElementById("idCourse").value = course.idCourse || "";
        document.getElementById("teacher").value = course.teacher?.idTeacher || "";
        document.getElementById("credits").value = course.credits || "";
        document.getElementById("title").value = course.title || "";
    }

    courseModal.classList.remove("hidden");
}

// Close modal
function closeModal() {
    courseModal.classList.add("hidden");
}

// Submit form for creating/updating course
async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(courseForm);
    const data = {
        idCourse: formData.get("idCourse"),
        teacher: { idTeacher: formData.get("teacher") },
        credits: Number(formData.get("credits")),
        title: formData.get("title"),
    };

    const mode = courseForm.dataset.mode;
    const method = mode === "edit" ? "PUT" : "POST";
    const url = method === "PUT" ? `${apiUrl}/${data.idCourse}` : apiUrl;

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert(`Course ${mode === "edit" ? "updated" : "created"} successfully!`);
            closeModal();
            fetchCourses();
        } else {
            throw new Error(`Failed to ${mode === "edit" ? "update" : "create"} course.`);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while saving the course.");
    }
}

// Edit a course
function editCourse(id) {
    const course = Array.from(courseTable.rows).find(
        (row) => row.cells[0].textContent === id
    );
    if (!course) return;
    openModal("edit", {
        idCourse: course.cells[0].textContent,
        teacher: { idTeacher: course.cells[1].dataset.idTeacher },
        credits: course.cells[2].textContent,
        title: course.cells[3].textContent,
    });
}

// Delete a course
async function deleteCourse(id) {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("Course deleted successfully!");
            fetchCourses();
        } else {
            throw new Error("Failed to delete course.");
        }
    } catch (error) {
        console.error("Error deleting course:", error);
        alert("An error occurred while deleting the course.");
    }
}

// Search for a specific course
async function searchCourse() {
    const courseId = searchCourseInput.value.trim();
    if (!courseId) return alert("Please enter an course ID.");

    try {
        const response = await fetch(`${apiUrl}/${courseId}`);
        if (response.ok) {
            const course = await response.json();
            courseTable.innerHTML = createCourseRow(course);
        } else {
            alert(`Course with ID "${courseId}" not found.`);
        }
    } catch (error) {
        console.error("Error searching for course:", error);
        alert("An error occurred while searching for the course.");
    }
}

// Event listeners
openModalBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);
courseForm.addEventListener("submit", handleFormSubmit);
searchCourseBtn.addEventListener("click", searchCourse);

// Initial fetch
fetchCourses();