const apiUrl = "http://localhost:8080/industries"; // Backend API base URL

// Select elements
const industryTable = document.getElementById("industryTable");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const industryModal = document.getElementById("industryModal");
const industryForm = document.getElementById("industryForm");
const searchIndustryBtn = document.getElementById("searchIndustryBtn");
const searchIndustryInput = document.getElementById("searchIndustryInput");

// Helper function to render a table row
function createIndustryRow(industry) {
    return `
        <tr>
            <td class="border-t py-2 px-4">${industry.idIndustry}</td>
            <td class="border-t py-2 px-4">${industry.faculty.idFaculty}</td>
            <td class="border-t py-2 px-4">${industry.yearNumber}</td>
            <td class="border-t py-2 px-4">${industry.title || ""}</td>
            <td class="border-t py-2 px-4">
                <button onclick="editIndustry('${industry.idIndustry}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button onclick="deleteIndustry('${industry.idIndustry}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </td>
        </tr>
    `;
}

// Fetch and display industries
async function fetchIndustries() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch industries.");
        const industries = await response.json();

        industryTable.innerHTML = industries.map(createIndustryRow).join("");
    } catch (error) {
        console.error("Error fetching industries:", error);
    }
}

async function fetchFacultiesForSelection() {
    try {
        const response = await fetch("http://localhost:8080/faculties");
        if (!response.ok) {
            throw new Error("Failed to fetch faculties");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching faculties:", error);
        return [];
    }
}

// Open modal in create mode
async function openModal(mode = "create", industry = {}) {
    industryForm.reset();
    industryForm.dataset.mode = mode;
    document.getElementById("idIndustry").readOnly = mode === "edit";

    // Fetch and populate faculty options
    const facultySelect = document.getElementById("faculty");
    facultySelect.innerHTML = '<option value="" disabled selected>Select a faculty</option>'; // Reset options
    const faculties = await fetchFacultiesForSelection();
    faculties.forEach(faculty => {
        const option = document.createElement("option");
        option.value = faculty.idFaculty;
        option.textContent = faculty.title + " (" + faculty.idFaculty + ")";
        facultySelect.appendChild(option);
    });

    if (mode === "edit") {
        // Update modal title and button
        document.getElementById("modalTitle").innerText = "Edit Industry";
        document.getElementById("modalSubmitBtn").innerText = "Save";
        // Populate form fields
        document.getElementById("idIndustry").value = industry.idIndustry || "";
        document.getElementById("faculty").value = industry.faculty?.idFaculty || "";
        document.getElementById("yearNumber").value = industry.yearNumber || "";
        document.getElementById("title").value = industry.title || "";
    }

    industryModal.classList.remove("hidden");
}

// Close modal
function closeModal() {
    industryModal.classList.add("hidden");
}

// Submit form for creating/updating industry
async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(industryForm);
    const data = {
        idIndustry: formData.get("idIndustry"),
        faculty: { idFaculty: formData.get("faculty") },
        yearNumber: Number(formData.get("yearNumber")),
        title: formData.get("title"),
    };

    const mode = industryForm.dataset.mode;
    const method = mode === "edit" ? "PUT" : "POST";
    const url = method === "PUT" ? `${apiUrl}/${data.idIndustry}` : apiUrl;

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert(`Industry ${mode === "edit" ? "updated" : "created"} successfully!`);
            closeModal();
            fetchIndustries();
        } else {
            throw new Error(`Failed to ${mode === "edit" ? "update" : "create"} industry.`);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while saving the industry.");
    }
}

// Edit an industry
function editIndustry(id) {
    const industry = Array.from(industryTable.rows).find(
        (row) => row.cells[0].textContent === id
    );
    if (!industry) return;
    openModal("edit", {
        idIndustry: industry.cells[0].textContent,
        faculty: { idFaculty: industry.cells[1].textContent },
        yearNumber: industry.cells[2].textContent,
        title: industry.cells[3].textContent,
    });
}

// Delete an industry
async function deleteIndustry(id) {
    if (!confirm("Are you sure you want to delete this industry?")) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (response.ok) {
            alert("Industry deleted successfully!");
            fetchIndustries();
        } else {
            throw new Error("Failed to delete industry.");
        }
    } catch (error) {
        console.error("Error deleting industry:", error);
        alert("An error occurred while deleting the industry.");
    }
}

// Search for a specific industry
async function searchIndustry() {
    const industryId = searchIndustryInput.value.trim();
    if (!industryId) return alert("Please enter an industry ID.");

    try {
        const response = await fetch(`${apiUrl}/${industryId}`);
        if (response.ok) {
            const industry = await response.json();
            industryTable.innerHTML = createIndustryRow(industry);
        } else {
            alert(`Industry with ID "${industryId}" not found.`);
        }
    } catch (error) {
        console.error("Error searching for industry:", error);
        alert("An error occurred while searching for the industry.");
    }
}

// Event listeners
openModalBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);
industryForm.addEventListener("submit", handleFormSubmit);
searchIndustryBtn.addEventListener("click", searchIndustry);

// Initial fetch
fetchIndustries();