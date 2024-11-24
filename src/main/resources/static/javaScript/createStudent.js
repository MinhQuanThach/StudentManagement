async function loadIndustries() {
    try {
        const response = await fetch('http://localhost:8080/industries', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch industries: ${response.status}`);
        }

        const industries = await response.json();

        console.log('Industries fetched from API:', industries);
        const industrySelect = document.getElementById('industry');

        while (industrySelect.options.length > 1) {
            industrySelect.remove(1);
        }

        // Thêm các option từ API
        industries.forEach((industry) => {
            const option = document.createElement('option');
            option.value = industry.idIndustry;
            option.textContent = industry.idIndustry;
            industrySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading industries:', error);
        alert('Failed to load industries. Please try again later.');
    }
}

// Gọi hàm khi trang tải xong
document.addEventListener('DOMContentLoaded', loadIndustries);



async function createStudent() {
    // Lấy thông tin từ các ô nhập liệu
    const adminId = document.getElementById('Administrator_ID').value;
    const fullName = document.getElementById('name').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value; // Lấy giá trị của radio button được chọn
    const dob = document.getElementById('dob').value;
    const credits = document.getElementById('mobile').value;
    const idClass = document.getElementById('idClass').value;
    const industry = document.getElementById('industry').value;

    // Lấy danh sách các khóa học
    const courseItems = document.querySelectorAll('.course-item');
    const courses = Array.from(courseItems).map(course => {
        return {
            idCourse: course.querySelector('input[name="idCourse"]').value,
            title: course.querySelector('input[name="title"]').value,
            idTeacher: course.querySelector('input[name="idTeacher"]').value,
            idClassroom: course.querySelector('input[name="idClassroom[]"]').value,
            startTime: course.querySelector('input[name="startTime[]"]').value,
            endTime: course.querySelector('input[name="endTime[]"]').value,
            date: course.querySelector('input[name="date[]"]').value,
        };
    });

    if (!adminId || !fullName || !dob || !mobile || !idClass || !industry) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    const student = {
        adminId,
        fullName,
        dob,
        credits,
        idClass,
        industry,
    };

    // Hiển thị thông tin sinh viên (hoặc gửi lên server)
    console.log('Student Added:', student);

    try {
        const response = await fetch('http://localhost:8080/students', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: 23021746,
                name: "John Doe",
                birthday: "2000-01-01",
                credits: 25,
                idClass: "QH2023",
                idIndustry: "IT-4"
            })
        })

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.message && errorData.message.includes('industry')) {
                alert("Lỗi: Không có ngành học (industry)!");
            } else {
                alert("Đã xảy ra lỗi khi thêm sinh viên: " + (errorData.message || "Không rõ lỗi."));
            }
            return;
        }

        const responseData = await response.json();
        console.log('Student Added:', responseData);
        alert("Thêm sinh viên thành công!");

    } catch (error) {
        console.error("Error add students:", error);
        alert("Please try again later.");
    }

}






// Lắng nghe sự kiện "Thêm khóa học"
document.getElementById('add-course-item').addEventListener('click', function() {
    const container = document.getElementById('course-list-container');
    const newCourseItem = container.querySelector('.course-item').cloneNode(true);

    // Chỉ thêm nếu số lượng nhóm nhập liệu ít hơn 10 (hoặc một số lượng tối đa nào đó nếu cần)
    if (container.querySelectorAll('.course-item').length < 10) {
        container.appendChild(newCourseItem);
    } else {
        alert('Maximum of 10 courses can be added');
    }

    // Lắng nghe sự kiện "Xóa nhóm nhập liệu"
    newCourseItem.querySelector('.remove-course-item').addEventListener('click', function() {
        newCourseItem.remove();
    });
});

// Lắng nghe sự kiện "Xóa nhóm nhập liệu"
document.querySelectorAll('.remove-course-item').forEach(button => {
    button.addEventListener('click', function() {
        button.closest('.course-item').remove();
    });
});