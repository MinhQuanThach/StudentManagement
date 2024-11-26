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
            <td class="border-t py-2 px-4">${take.idTake}</td>
            <td class="border-t py-2 px-4">${take.student.id}</td>
            <td class="border-t py-2 px-4">${take.course.idCourse}</td>
            <td class="border-t py-2 px-4">${take.status || ""}</td>
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

// Open modal in create mode
function openModal(mode = "create", take = {}) {
    takeForm.reset();
    takeForm.dataset.mode = mode;
    document.getElementById("idTake").readOnly = mode === "edit";

    if (mode === "edit") {
        // Update modal title and button
        document.getElementById("modalTitle").innerText = "Edit Take";
        document.getElementById("modalSubmitBtn").innerText = "Save";
        // Populate form fields
        document.getElementById("idTake").value = take.idTake || "";
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
    const data = {
        idTake: formData.get("idTake"),
        student: { id: formData.get("student") },
        course: { id: formData.get("course") },
        status: formData.get("status"),
        year: Number(formData.get("year")),
        grade: Number(formData.get("grade")),
    };

    const mode = takeForm.dataset.mode;
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
async function deleteTake(id) {
    if (!confirm("Are you sure you want to delete this take?")) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("Take deleted successfully!");
            fetchTakes();
        } else {
            throw new Error("Failed to delete take.");
        }
    } catch (error) {
        console.error("Error deleting take:", error);
        alert("An error occurred while deleting the take.");
    }
}

// Search for a specific take
async function searchTake() {
    const takeId = searchTakeInput.value.trim();
    if (!takeId) return alert("Please enter an take ID.");

    try {
        const response = await fetch(`${apiUrl}/${takeId}`);
        if (response.ok) {
            const take = await response.json();
            takeTable.innerHTML = createTakeRow(take);
        } else {
            alert(`Take with ID "${takeId}" not found.`);
        }
    } catch (error) {
        console.error("Error searching for take:", error);
        alert("An error occurred while searching for the take.");
    }
}

// Event listeners
openModalBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);
takeForm.addEventListener("submit", handleFormSubmit);
searchTakeBtn.addEventListener("click", searchTake);

// Initial fetch
fetchTakes();