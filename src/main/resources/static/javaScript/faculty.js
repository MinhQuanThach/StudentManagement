const apiUrl = "http://localhost:8080/faculties"; // Backend API base URL

// Select elements
const facultyTable = document.getElementById("facultyTable");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const facultyModal = document.getElementById("facultyModal");
const facultyForm = document.getElementById("facultyForm");
const searchFacultyBtn = document.getElementById("searchFacultyBtn");
const searchFacultyInput = document.getElementById("searchFacultyInput");

// Fetch and display all faculties
async function fetchFaculties() {
    try {
        const response = await fetch(apiUrl);
        const faculties = await response.json();

        facultyTable.innerHTML = faculties.map(faculty => `
            <tr>
                <td class="border-t py-2 px-4">${faculty.idFaculty}</td>
                <td class="border-t py-2 px-4">${faculty.title}</td>
                <td class="border-t py-2 px-4">${faculty.numberTeacher}</td>
                <td class="border-t py-2 px-4">${faculty.numberStudent}</td>
                <td class="border-t py-2 px-4">
                    <button onclick="editFaculty('${faculty.idFaculty}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                    <button onclick="deleteFaculty('${faculty.idFaculty}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Error fetching faculties:", error);
    }
}

// Reset modal to create mode when opening for a new faculty
openModalBtn.addEventListener("click", () => {
    // Clear form
    facultyForm.reset();

    // Make the faculty ID field editable
    document.getElementById("idFaculty").removeAttribute("readonly");

    // Update modal title and button text
    document.getElementById("modalTitle").innerText = "Create New Faculty";
    const modalSubmitBtn = document.getElementById("modalSubmitBtn");
    modalSubmitBtn.innerText = "Create";

    // Remove previous event handlers and set up create handler
    modalSubmitBtn.onclick = null; // Remove any previous onclick events
    facultyForm.onsubmit = createFacultyHandler;

    // Show modal
    facultyModal.classList.remove("hidden");
});

// Cancel button to close the modal
closeModalBtn.addEventListener("click", () => {
    facultyModal.classList.add("hidden");
});

// Create handler for adding a new faculty
async function createFacultyHandler(event) {
    event.preventDefault();

    const formData = new FormData(facultyForm);
    const data = {
        idFaculty: formData.get("idFaculty"),
        title: formData.get("title"),
        numberTeacher: Number(formData.get("numberTeacher")),
        numberStudent: Number(formData.get("numberStudent")),
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Faculty created successfully!");
            facultyModal.classList.add("hidden");
            fetchFaculties();
        } else {
            alert("Failed to create faculty.");
        }
    } catch (error) {
        console.error("Error creating faculty:", error);
    }
}

// Function to open modal for editing faculty
async function editFaculty(id) {
    try {
        // Fetch faculty data by ID
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) {
            alert(`Failed to fetch faculty with ID: ${id}`);
            return;
        }
        const faculty = await response.json();

        // Pre-fill the modal form with faculty data
        document.getElementById("idFaculty").value = faculty.idFaculty;
        document.getElementById("title").value = faculty.title;
        document.getElementById("numberTeacher").value = faculty.numberTeacher;
        document.getElementById("numberStudent").value = faculty.numberStudent;

        // Make the faculty ID field readonly
        document.getElementById("idFaculty").setAttribute("readonly", true);

        // Update modal title and button
        document.getElementById("modalTitle").innerText = "Edit Faculty";
        const modalSubmitBtn = document.getElementById("modalSubmitBtn");
        modalSubmitBtn.innerText = "Save";

        // Remove previous event handlers and set up edit handler
        modalSubmitBtn.onclick = async (event) => {
            event.preventDefault(); // Prevent form submission

            const updatedFaculty = {
                idFaculty: document.getElementById("idFaculty").value,
                title: document.getElementById("title").value.trim(),
                numberTeacher: Number(document.getElementById("numberTeacher").value),
                numberStudent: Number(document.getElementById("numberStudent").value),
            };

            try {
                // Send updated data to the backend
                const response = await fetch(`${apiUrl}/${updatedFaculty.idFaculty}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedFaculty),
                });

                if (response.ok) {
                    alert("Faculty updated successfully!");
                    facultyModal.classList.add("hidden"); // Hide modal
                    fetchFaculties(); // Refresh faculty list
                } else {
                    alert("Failed to update faculty. Please try again.");
                }
            } catch (error) {
                console.error("Error updating faculty:", error);
                alert("An error occurred while updating faculty.");
            }
        };

        // Show the modal
        facultyModal.classList.remove("hidden");
    } catch (error) {
        console.error("Error fetching faculty:", error);
        alert("An error occurred while fetching faculty data.");
    }
}

// Delete a faculty
async function deleteFaculty(id) {
    if (!confirm("Are you sure you want to delete this faculty?")) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("Faculty deleted successfully!");
            fetchFaculties();
        } else {
            alert("Failed to delete faculty.");
        }
    } catch (error) {
        console.error("Error deleting faculty:", error);
    }
}

// Fetch a specific faculty by ID
searchFacultyBtn.addEventListener("click", async () => {
    const facultyId = searchFacultyInput.value.trim();
    if (!facultyId) {
        alert("Please enter a faculty ID to search.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${facultyId}`);
        if (response.ok) {
            const faculty = await response.json();
            updateFacultyTable([faculty]);
        } else {
            clearFacultyTable();
            alert(`Faculty with ID "${facultyId}" not found.`);
        }
    } catch (error) {
        console.error("Error fetching faculty:", error);
        alert("An error occurred while searching for the faculty.");
    }
});

// Function to update the table with faculty data
function updateFacultyTable(faculties) {
    clearFacultyTable(); // Clear existing rows

    faculties.forEach(faculty => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="border-t py-2 px-4">${faculty.idFaculty}</td>
            <td class="border-t py-2 px-4">${faculty.title}</td>
            <td class="border-t py-2 px-4">${faculty.numberTeacher}</td>
            <td class="border-t py-2 px-4">${faculty.numberStudent}</td>
            <td class="border-t py-2 px-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-id="${faculty.idFaculty}">Delete</button>
            </td>
        `;

        facultyTable.appendChild(row);
    });
}

// Function to clear the faculty table
function clearFacultyTable() {
    facultyTable.innerHTML = ""; // Clear all rows
}

// Modal logic
openModalBtn.addEventListener("click", () => facultyModal.classList.remove("hidden"));
closeModalBtn.addEventListener("click", () => facultyModal.classList.add("hidden"));

// Initial fetch
fetchFaculties();
