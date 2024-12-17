document.addEventListener("DOMContentLoaded", function () {
    const currentUserId = localStorage.getItem("currentUserId"); // Retrieve the current user's ID

    const semesterDropdown = document.getElementById("semester");
    const yearDropdown = document.getElementById("year");
    const sectionTableBody = document.getElementById("sectionTableBody");
    const registrationTable = document.getElementById("registrationTable");
    const totalCreditsCell = document.getElementById("totalCredits");

    let registeredSections = []; // Store registered sections for conflict checks

    loadSemesterAndYear();

    // Event listener for dropdown changes
    semesterDropdown.addEventListener("change", loadSections);
    yearDropdown.addEventListener("change", loadSections);

    /**
     * Load semesters and years dynamically and ensure no duplicate years.
     */
    async function loadSemesterAndYear() {
        try {
            const response = await fetch("http://localhost:8080/sections");
            if (!response.ok) throw new Error("Failed to fetch sections");

            semesterDropdown.innerHTML = '<option value="" disabled selected>Select semester</option>';
            const semesterOptions = ["Học kỳ I", "Học kỳ II", "Học kỳ phụ"];
            semesterOptions.forEach(option => {
                const opt = document.createElement("option");
                opt.value = option;
                opt.text = option;
                semesterDropdown.appendChild(opt);
            });

            yearDropdown.innerHTML = '<option value="" disabled selected>Select year</option>';
            const yearData = await response.json();
            const uniqueYears = [...new Set(yearData.map(section => section.year))]; // Remove duplicates
            uniqueYears.forEach(year => {
                const opt = document.createElement("option");
                opt.value = year;
                opt.text = year;
                yearDropdown.appendChild(opt);
            });
        } catch (error) {
            console.error("Error fetching sections:", error);
        }
    }

    /**
     * Fetch and display available sections based on selected semester and year.
     */
    function loadSections() {
        const selectedSemester = semesterDropdown.value;
        const selectedYear = yearDropdown.value;

        if (!selectedSemester || !selectedYear) return;

        fetch(`/section_available/${selectedSemester}/${selectedYear}`)
            .then(response => {
                if (!response.ok) throw new Error("Failed to load sections.");
                return response.json();
            })
            .then(sections => renderSections(sections))
            .catch(error => {
                console.error("Error fetching sections:", error);
                sectionTableBody.innerHTML = `<tr><td colspan="9" class="text-center text-red-500">No sections found.</td></tr>`;
            });
    }

    /**
     * Render sections and handle conflict checks.
     */
    function renderSections(sections) {
        sectionTableBody.innerHTML = ""; // Clear previous rows
        if (sections.length === 0) {
            sectionTableBody.innerHTML = `<tr><td colspan="9" class="text-center">No sections available.</td></tr>`;
            return;
        }

        sections.forEach(section => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-4 py-2 border">${section.sectionId}</td>
                <td class="px-4 py-2 border">${section.courseTitle}</td>
                <td class="px-4 py-2 border">${section.credits}</td>
                <td class="px-4 py-2 border">${section.teacherName}</td>
                <td class="px-4 py-2 border">${section.day}</td>
                <td class="px-4 py-2 border">${section.startTime}</td>
                <td class="px-4 py-2 border">${section.endTime}</td>
                <td class="px-4 py-2 border">${section.roomNumber}</td>
                <td class="px-4 py-2 border text-center">
                    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded add-section-btn"
                            data-section='${JSON.stringify(section)}'>
                        Add
                    </button>
                </td>
            `;
            sectionTableBody.appendChild(row);
        });

        // Add event listeners for "Add" buttons
        document.querySelectorAll(".add-section-btn").forEach(button => {
            button.addEventListener("click", handleAddSection);
        });
    }

    /**
     * Add a section to the registration table, checking for time and day conflicts.
     */
    function handleAddSection(event) {
        const button = event.target;
        const section = JSON.parse(button.dataset.section);

        if (checkConflict(section)) {
            alert("Cannot add section due to a time conflict or course duplicate.");
            return;
        }

        // Add to registration table
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="px-4 py-2 border">${section.sectionId}</td>
            <td class="px-4 py-2 border">${section.courseTitle}</td>
            <td class="px-4 py-2 border">${section.credits}</td>
            <td class="px-4 py-2 border">${section.teacherName}</td>
            <td class="px-4 py-2 border">${section.day}</td>
            <td class="px-4 py-2 border">${section.startTime}</td>
            <td class="px-4 py-2 border">${section.endTime}</td>
            <td class="px-4 py-2 border">${section.roomNumber}</td>
            <td class="px-4 py-2 border text-center">
                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded remove-btn">
                    Remove
                </button>
            </td>
        `;
        registrationTable.appendChild(newRow);

        // Update data
        registeredSections.push(section);
        updateTotalCredits();

        button.disabled = true; // Disable "Add" button
        newRow.querySelector(".remove-btn").addEventListener("click", () => handleRemoveSection(section, newRow, button));
    }

    /**
     * Remove a section from the registration table.
     */
    function handleRemoveSection(section, row, addButton) {
        registrationTable.removeChild(row);
        registeredSections = registeredSections.filter(s => s.sectionId !== section.sectionId);
        updateTotalCredits();

        addButton.disabled = false; // Enable "Add" button again
    }

    /**
     * Check for time and day conflicts with registered sections.
     */
    function checkConflict(newSection) {
        return registeredSections.some(registered =>
            registered.courseTitle === newSection.courseTitle ||
            (registered.day === newSection.day &&
            ((newSection.startTime >= registered.startTime && newSection.startTime < registered.endTime) ||
                (newSection.endTime > registered.startTime && newSection.endTime <= registered.endTime) ||
                (newSection.startTime <= registered.startTime && newSection.endTime >= registered.endTime)))
        );
    }

    /**
     * Update total credits in the registration table.
     */
    function updateTotalCredits() {
        const total = registeredSections.reduce((sum, section) => sum + parseInt(section.credits), 0);
        totalCreditsCell.textContent = total;
    }
});
