const apiUrl = "http://localhost:8080/times"; // Backend API base URL

// Select elements
const timeTable = document.getElementById("timeTable");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const timeModal = document.getElementById("timeModal");
const timeForm = document.getElementById("timeForm");
const searchTimeBtn = document.getElementById("searchTimeBtn");
const searchTimeInput = document.getElementById("searchTimeInput");

// Helper function to render a table row
function createTimeRow(time) {
    return `
        <tr>
            <td class="border-t py-2 px-4">${time.idTime}</td>
            <td class="border-t py-2 px-4">${time.course.idCourse}</td>
            <td class="border-t py-2 px-4">${time.day}</td>
            <td class="border-t py-2 px-4">${time.startTime}</td>
            <td class="border-t py-2 px-4">${time.endTime}</td>
            <td class="border-t py-2 px-4">${time.roomNumber || ""}</td>
            <td class="border-t py-2 px-4">
                <button onclick="editTime('${time.idTime}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button onclick="deleteTime('${time.idTime}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </td>
        </tr>
    `;
}

// Fetch and display times
async function fetchTimes() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch times.");
        const times = await response.json();

        timeTable.innerHTML = times.map(createTimeRow).join("");
    } catch (error) {
        console.error("Error fetching times:", error);
    }
}

// Open modal in create mode
function openModal(mode = "create", time = {}) {
    timeForm.reset();
    timeForm.dataset.mode = mode;
    document.getElementById("idTime").readOnly = mode === "edit";

    if (mode === "edit") {
        // Update modal title and button
        document.getElementById("modalTitle").innerText = "Edit Time";
        document.getElementById("modalSubmitBtn").innerText = "Save";
        // Populate form fields
        document.getElementById("idTime").value = time.idTime || "";
        document.getElementById("course").value = time.course?.idCourse || "";
        document.getElementById("day").value = time.day || "";
        document.getElementById("startTime").value = time.startTime || "";
        document.getElementById("endTime").value = time.endTime || "";
        document.getElementById("roomNumber").value = time.roomNumber || "";
    }

    timeModal.classList.remove("hidden");
}

// Close modal
function closeModal() {
    timeModal.classList.add("hidden");
}

// Submit form for creating/updating time
async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(timeForm);
    const data = {
        idTime: formData.get("idTime"),
        course: { idCourse: formData.get("course") },
        day: formData.get("day"),
        startTime: formData.get("startTime"),
        endTime: formData.get("endTime"),
        roomNumber: formData.get("roomNumber"),
    };

    const mode = timeForm.dataset.mode;
    const method = mode === "edit" ? "PUT" : "POST";
    const url = method === "PUT" ? `${apiUrl}/${data.idTime}` : apiUrl;

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert(`Time ${mode === "edit" ? "updated" : "created"} successfully!`);
            closeModal();
            fetchTimes();
        } else {
            throw new Error(`Failed to ${mode === "edit" ? "update" : "create"} time.`);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while saving the time.");
    }
}

// Edit a time
function editTime(id) {
    const time = Array.from(timeTable.rows).find(
        (row) => row.cells[0].textContent === id
    );
    if (!time) return;
    openModal("edit", {
        idTime: time.cells[0].textContent,
        course: { idCourse: time.cells[1].textContent },
        day: time.cells[2].textContent,
        startTime: time.cells[3].textContent,
        endTime: time.cells[4].textContent,
        roomNumber: time.cells[5].textContent,
    });
}

// Delete a time
async function deleteTime(id) {
    if (!confirm("Are you sure you want to delete this time?")) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("Time deleted successfully!");
            fetchTimes();
        } else {
            throw new Error("Failed to delete time.");
        }
    } catch (error) {
        console.error("Error deleting time:", error);
        alert("An error occurred while deleting the time.");
    }
}

// Search for a specific time
async function searchTime() {
    const timeId = searchTimeInput.value.trim();
    if (!timeId) return alert("Please enter an time ID.");

    try {
        const response = await fetch(`${apiUrl}/${timeId}`);
        if (response.ok) {
            const time = await response.json();
            timeTable.innerHTML = createTimeRow(time);
        } else {
            alert(`Time with ID "${timeId}" not found.`);
        }
    } catch (error) {
        console.error("Error searching for time:", error);
        alert("An error occurred while searching for the time.");
    }
}

// Event listeners
openModalBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);
timeForm.addEventListener("submit", handleFormSubmit);
searchTimeBtn.addEventListener("click", searchTime);

// Initial fetch
fetchTimes();

function handleTimeEnter(event) {
    if (event.key === "Enter") {
        searchTime();
    }
}