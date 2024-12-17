document.addEventListener("DOMContentLoaded", function() {
    // Đặt studentId cần lấy dữ liệu
    const studentId = 23020001; // Thay đổi studentId theo nhu cầu của bạn
    const apiUrl = `http://localhost:8080/takes/grades/${studentId}`;

    // Hàm để gọi API và hiển thị kết quả
    function fetchGrades() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const gradesContent = document.getElementById("gradesContent");
                gradesContent.innerHTML = ""; // Xóa dữ liệu cũ

                if (data.length === 0) {
                    gradesContent.innerHTML = "<p class='text-center text-lg text-gray-600'>No grades available.</p>";
                    return;
                }

                // Nhóm dữ liệu theo năm và học kỳ
                const groupedData = groupByYearAndSemester(data);

                // Duyệt qua từng năm và học kỳ để tạo bảng
                for (const year in groupedData) {
                    const yearSection = document.createElement("div");
                    yearSection.classList.add("space-y-4");

                    // Tạo tiêu đề năm học
                    const yearHeader = document.createElement("h2");
                    yearHeader.classList.add("text-xl", "font-semibold", "mb-2");
                    yearHeader.textContent = `Year: ${year}`;
                    yearSection.appendChild(yearHeader);

                    // Duyệt qua các học kỳ trong năm
                    groupedData[year].forEach(semester => {
                        const semesterHeader = document.createElement("h3");
                        semesterHeader.classList.add("text-lg", "font-semibold", "mb-2");
                        semesterHeader.textContent = `${semester.semester}`;
                        yearSection.appendChild(semesterHeader);

                        // Tạo bảng cho học kỳ đó
                        const table = document.createElement("table");
                        table.classList.add("w-full", "table-auto", "border-collapse", "shadow-md", "rounded-lg");

                        // Tạo phần tiêu đề bảng
                        const tableHeader = document.createElement("thead");
                        const headerRow = document.createElement("tr");
                        headerRow.innerHTML = `
                            <th class="px-4 py-2 border">Course ID</th>
                            <th class="px-4 py-2 border">Title</th>
                            <th class="px-4 py-2 border">Credits</th>
                            <th class="px-4 py-2 border">Grade</th>
                        `;
                        tableHeader.appendChild(headerRow);
                        table.appendChild(tableHeader);

                        // Tạo phần nội dung bảng
                        const tableBody = document.createElement("tbody");
                        semester.courses.forEach(course => {
                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td class="px-4 py-2 border">${course.idCourse}</td>
                                <td class="px-4 py-2 border">${course.title}</td>
                                <td class="px-4 py-2 border">${course.credits}</td>
                                <td class="px-4 py-2 border">${course.grade}</td>
                            `;
                            tableBody.appendChild(row);
                        });
                        table.appendChild(tableBody);
                        yearSection.appendChild(table);
                    });

                    gradesContent.appendChild(yearSection);
                }
            })
            .catch(error => {
                console.error("Error fetching grades:", error);
                const gradesContent = document.getElementById("gradesContent");
                gradesContent.innerHTML = "<p class='text-center text-lg text-red-600'>Failed to load grades. Please try again later.</p>";
            });
    }

    // Hàm để nhóm dữ liệu theo năm và học kỳ
    function groupByYearAndSemester(data) {
        return data.reduce((acc, grade) => {
            const { year, section_semester, idCourse, title, credits, grade: gradeValue } = grade;

            // Tạo cấu trúc dữ liệu cho từng năm và học kỳ
            if (!acc[year]) {
                acc[year] = [];
            }

            const semesterIndex = acc[year].findIndex(semester => semester.semester === section_semester);
            if (semesterIndex === -1) {
                // Thêm học kỳ mới nếu chưa có
                acc[year].push({
                    semester: section_semester,
                    courses: [
                        { idCourse, title, credits, grade: gradeValue }
                    ]
                });
            } else {
                // Thêm khóa học vào học kỳ đã có
                acc[year][semesterIndex].courses.push({ idCourse, title, credits, grade: gradeValue });
            }

            return acc;
        }, {});
    }

    // Gọi hàm fetchGrades khi trang được tải
    fetchGrades();
});
