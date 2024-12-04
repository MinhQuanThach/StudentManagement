const apiUrl = "http://localhost:8080/takes"; // Backend API base URL

// Select elements
const takeTable = document.getElementById("takeTable");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const takeModal = document.getElementById("takeModal");
const takeForm = document.getElementById("takeForm");
const searchTakeBtn = document.getElementById("searchTakeBtn");
const searchTakeInput = document.getElementById("searchTakeInput");

// Helper function to render a table row
function createTakeRow(take) {
    return `
        <tr>
            <td class="take-id-column">${take.idTake}</td>
            <td class="border-t py-2 px-4">${take.student.id}</td>
            <td class="border-t py-2 px-4">${take.course.idCourse}</td>
            <td class="border-t py-2 px-4">${take.status}</td>
            <td class="border-t py-2 px-4">${take.year || ""}</td>
            <td class="border-t py-2 px-4">${take.grade || ""}</td>
            <td class="border-t py-2 px-4">
                <button onclick="editTake('${take.idTake}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button onclick="deleteTake('${take.idTake}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </td>
        </tr>
    `;
}

// Fetch and display takes
async function fetchTakes() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch takes.");
        const takes = await response.json();

        takeTable.innerHTML = takes.map(createTakeRow).join("");
    } catch (error) {
        console.error("Error fetching takes:", error);
    }
}

async function fetchCoursesForSelection() {
    try {
        const response = await fetch("http://localhost:8080/courses");
        if (!response.ok) {
            throw new Error("Failed to fetch courses");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
    }
}

// Open modal in create mode
async function openModal(mode = "create", take = {}) {
    takeForm.reset();
    takeForm.dataset.mode = mode;

    // List of selection for 'course' label
    const courseSelect = document.getElementById("course");
    courseSelect.innerHTML = '<option value="" disabled selected>Select a course</option>'; // Reset options
    const courses = await fetchCoursesForSelection();
    courses.forEach(course => {
        const option = document.createElement("option");
        option.value = course.idCourse;
        option.textContent = course.idCourse + " (" + course.title + ")";
        courseSelect.appendChild(option);
    });

    // List of selection for 'status' label
    const statusSelect = document.getElementById("status");
    statusSelect.innerHTML = '<option value="" disabled selected>Select status</option>'; // Reset options
    const statusOptions = [
        { value: "Học lần đầu", text: "Học lần đầu" },
        { value: "Học cải thiện", text: "Học cải thiện" },
        { value: "Học lại", text: "Học lại" },
        { value: "Hoàn thành", text: "Hoàn thành" }
    ];
    statusOptions.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.text = option.text;
        statusSelect.appendChild(opt);
    });

    if (mode === "edit") {
        // Store idTake in form dataset
        takeForm.dataset.idTake = take.idTake;
        // Update modal title and button
        document.getElementById("modalTitle").innerText = "Edit Take";
        document.getElementById("modalSubmitBtn").innerText = "Save";
        // Populate form fields
        document.getElementById("student").value = take.student?.id || "";
        document.getElementById("course").value = take.course?.idCourse || "";
        document.getElementById("status").value = take.status || "";
        document.getElementById("year").value = take.year || "";
        document.getElementById("grade").value = take.grade || "";
    }

    takeModal.classList.remove("hidden");
}

// Close modal
function closeModal() {
    takeModal.classList.add("hidden");
}

// Submit form for creating/updating take
async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(takeForm);
    const mode = takeForm.dataset.mode;
    const data = {
        student: { id: formData.get("student") },
        course: { idCourse: formData.get("course") },
        status: formData.get("status"),
        year: Number(formData.get("year")),
        grade: Number(formData.get("grade")),
    };

    if (mode === "edit") {
        // Include idTake only in edit mode
        data.idTake = Number(takeForm.dataset.idTake);
    }

    const method = mode === "edit" ? "PUT" : "POST";
    const url = method === "PUT" ? `${apiUrl}/${data.idTake}` : apiUrl;

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert(`Take ${mode === "edit" ? "updated" : "created"} successfully!`);
            closeModal();
            fetchTakes();
        } else {
            throw new Error(`Failed to ${mode === "edit" ? "update" : "create"} take.`);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while saving the take.");
    }
}

// Edit a take
function editTake(id) {
    const take = Array.from(takeTable.rows).find(
        (row) => row.cells[0].textContent === id
    );
    if (!take) return;
    openModal("edit", {
        idTake: take.cells[0].textContent,
        student: { id: take.cells[1].textContent },
        course: { idCourse: take.cells[2].textContent },
        status: take.cells[3].textContent,
        year: take.cells[4].textContent,
        grade: take.cells[5].textContent,
    });
}

// Delete a take
async function deleteTake(takeId) {
    const confirmDelete = confirm(`Are you sure you want to delete take with ID: ${takeId}?`);
    if (!confirmDelete) return;

    try {
        const response = await fetch(`/api/takes/${takeId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert(`Take with ID: ${takeId} has been deleted.`);

            const row = document.querySelector(`#student-row-${takeId}`);
            if (row) {
                row.remove();
            }
        } else if (response.status === 404) {
            alert('Take not found. Please check the ID and try again.');
        } else {
            alert(`Failed to delete the take. Server responded with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error during take deletion:', error);
        alert('An error occurred while deleting the take. Please try again.');
    }
}


// Search for a specific take
async function searchTake() {
    const query = searchTakeInput.value.trim();
    const selectTake = document.getElementById("filterTake").value;

    if (!query) return alert("Please enter a search value.");

    try {
        const response = await fetch(`http://localhost:8080/takes/search?filter=${selectTake}&query=${encodeURIComponent(query)}`);

        if (response.ok) {
            const takes = await response.json();
            const takeTable = document.getElementById("takeTable");
            takeTable.innerHTML = "";
            if (takes.length === 0) {
                takeTable.innerHTML = `<tr><td colspan="5" class="text-center py-4">No takes found.</td></tr>`;
                return;
            }
            takes.forEach(take => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="py-2 px-4">${take.student.id}</td>
                    <td class="py-2 px-4">${take.course.idCourse}</td>
                    <td class="py-2 px-4">${take.status}</td>
                    <td class="py-2 px-4">${take.year}</td>
                    <td class="py-2 px-4">${take.grade}</td>
                    <td class="py-2 px-4">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded" onclick="editTake('${take.idTake}')">Edit</button>
                        <button class="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded" onclick="deleteTake('${take.idTake}')">Delete</button>
                    </td>
                `;
                takeTable.appendChild(row);
            });
        } else {
            alert(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error searching for take:", error);
    }
}

// Event listeners
openModalBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);
takeForm.addEventListener("submit", handleFormSubmit);
searchTakeBtn.addEventListener("click", searchTake);

searchTakeInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchTake();
    }
});

// Initial fetch
fetchTakes();