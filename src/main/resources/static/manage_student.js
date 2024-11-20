// Kiểm tra trạng thái đăng nhập một lần khi trang được tải
// document.addEventListener("DOMContentLoaded", function() {
//     checkLoginStatus(); // Kiểm tra trạng thái đăng nhập khi trang tải
// });
//
// // Kiểm tra trạng thái đăng nhập (token)
// function checkLoginStatus() {
//     const token = localStorage.getItem("authToken"); // Lấy token từ localStorage
//     if (!token) {
//         window.location.href = 'index.html'; // Chuyển hướng đến trang đăng nhập nếu không có token
//     }
// }

// Gửi yêu cầu tìm kiếm tới backend
async function searchStudents() {
    // Lấy giá trị từ ô input
    const query = document.getElementById("email").value.trim();

    if (!query) {
        alert("Please enter a search term."); // Thông báo nếu người dùng chưa nhập từ khóa
        return;
    }

    try {
        // Gửi yêu cầu GET tới API
        const response = await fetch(`/api/students/search?query=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error("Failed to fetch students");
        }

        // Nhận dữ liệu từ backend
        const students = await response.json();

        // Kiểm tra nếu không có dữ liệu trả về
        if (!Array.isArray(students) || students.length === 0) {
            alert("No students found matching the search criteria.");
            return;
        }

        // Xóa các hàng hiện tại trong bảng
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        // Thêm dữ liệu mới vào bảng
        students.forEach(student => {
            const row = `
                <tr>
                    <td class="border-t py-2 px-4">${student.id}</td>
                    <td class="border-t py-2 px-4">${student.name}</td>
                    <td class="border-t py-2 px-4">${student.birthday || "N/A"}</td>
                    <td class="border-t py-2 px-4">${student.credits || 0}</td>
                    <td class="border-t py-2 px-4">${student.idClass || "N/A"}</td>
                    <td class="border-t py-2 px-4">${student.idIndustry || "N/A"}</td>
                    <td class="border-t py-2 px-4">
                        <button 
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                            onclick="editStudent(${student.id})">
                            Edit
                        </button>
                        <button 
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onclick="deleteStudent(${student.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
            tbody.insertAdjacentHTML("beforeend", row);
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to fetch students. Please try again later.");
    }
}

function editStudent(studentId) {
    alert(`Edit student with ID: ${studentId}`);
}




async function deleteStudent(studentId) {
    const confirmDelete = confirm(`Are you sure you want to delete student with ID: ${studentId}?`);
    if (confirmDelete) {
        try {
            // Gửi yêu cầu DELETE tới API
            const response = await fetch(`/api/students/${studentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert(`Student with ID: ${studentId} has been deleted.`);

                const row = document.querySelector(`#student-row-${studentId}`);
                if (row) {
                    row.remove();
                }
            } else {
                alert('Failed to delete the student. Please try again later.');
            }
        } catch (error) {
            console.error('Error during student deletion:', error);
            alert('An error occurred while deleting the student. Please try again.');
        }
    }
}


document.querySelector("button.bg-slate-300").addEventListener("click", searchStudents);

document.querySelectorAll("button.bg-red-500").forEach(button => {
    button.addEventListener("click", function() {
        const studentId = this.getAttribute("data-id");
        deleteStudent(studentId);
    });
});


document.getElementById("email").addEventListener("keypress", event => {
    if (event.key === "Enter") {
        searchStudents();
    }
});

