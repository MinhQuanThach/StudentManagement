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

        const industrySelect = document.getElementById('industry');

        while (industrySelect.options.length > 1) {
            industrySelect.remove(1);
        }

        // Thêm các option từ API
        industries.forEach((industry) => {
            const option = document.createElement('option');
            option.value = industry.idIndustry;
            option.textContent = industry.title + "(" + industry.idIndustry + ")";
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

    const courses = Array.from(document.querySelectorAll('.course-item')).map(course => {
        return {
            idCourse: course.querySelector('input[name="idCourse"]').value,
            title: course.querySelector('input[name="title"]').value,
            credits: course.querySelector('input[name="credits"]').value,
            idTeacher: course.querySelector('input[name="idTeacher"]').value,
            // idClassroom: course.querySelector('input[name="idClassroom[]"]').value,
            // startTime: course.querySelector('input[name="startTime[]"]').value,
            // endTime: course.querySelector('input[name="endTime[]"]').value,
            // date: course.querySelector('input[name="date[]"]').value,
        };
    });

    // lấy danh sách time
    const times = Array.from(document.querySelectorAll('.course-item')).map(course => {
        return {
            course: course.querySelector('input[name="idCourse"]').value,
            roomNumber: course.querySelector('input[name="idClassroom[]"]').value,
            startTime: course.querySelector('input[name="startTime[]"]').value,
            endTime: course.querySelector('input[name="endTime[]"]').value,
            day: course.querySelector('input[name="date[]"]').value,
        };
    });

    // danh sách việc
    const takes = Array.from(document.querySelectorAll('.course-item')).map(course => {
        return {
            course: course.querySelector('input[name="idCourse"]').value,
            student: adminId,
            status: "Học lần đầu",
            year: 2023,
            grade: 0.0,
        };
    });

    // if (!adminId || !fullName || !dob || !mobile || !idClass || !industry) {
    //     alert('Vui lòng điền đầy đủ thông tin!');
    //     return;
    // }

    const student = {
        adminId,
        fullName,
        dob,
        credits,
        idClass,
        industry,
    };


    let checkInput = "";
    try {
        const response = await fetch('http://localhost:8080/students', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "id": adminId,
                    "name": fullName,
                    "birthday": dob,
                    "credits": credits,
                    "idClass": idClass,
                    "industry": {
                        "idIndustry": industry
                    }
                }
            )
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


        // xử lý course
        if (courses.length === 0) {
            return; // Dừng hàm nếu không có khóa học nào
        }



        let newIdTake = await getMaxIdTake(); // lay id
        for (const course of courses) {
            try {
                const responseOfCourse = await fetch('http://localhost:8080/courses', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "idTime" : 1,
                        "idCourse": course.idCourse,
                        "teacher": {
                            "idTeacher" : course.idTeacher
                        },
                        "credits": course.credits,
                        "title": course.title
                    }),
                });

                if (!responseOfCourse.ok) {
                    console.error(`Failed to add course:`, await responseOfCourse.text());
                    continue;
                }

                console.log(`Course added successfully:`, await responseOfCourse.json());
            } catch (error) {
                console.error(`Error adding course:`, error);
            }

            try {
                const responseOfTake = await fetch('http://localhost:8080/takes', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "idTakes": newIdTake,
                        "student": {
                            "id": adminId
                        },
                        "course": {
                            "idCourse": course.idCourse
                        },
                        "status": "Hoc lần đầu",
                        "year": 0,
                        "grade": 0
                    }),
                });

                if (!responseOfTake.ok) {
                    console.error(`Failed to add take:`, await responseOfTake.text());
                    continue;
                }

                console.log(`take added successfully:`, await responseOfTake.json());
            } catch (error) {
                console.error(`Error adding take:`, error);
            }

            newIdTake = newIdTake + 1;
        }

        // them time

        let newIdTime = await getMaxIdTime(); // lay id
        for (const time of times) {
            try {
                const responseOfTime = await fetch('http://localhost:8080/times', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "idTime" : newIdTime,
                        "course": {
                            "idCourse": time.course
                        },
                        "day": time.day,
                        "startTime": time.startTime,
                        "endTime": time.endTime,
                        "roomNumber": time.roomNumber
                    }),
                });

                if (!responseOfTime.ok) {
                    console.error(`Failed to add course:`, await responseOfTime.text());
                    continue;
                }

                console.log(`Course added successfully:`, await responseOfTime.json());
            } catch (error) {
                console.error(`Error adding time:`, error);
            }

            newIdTime = newIdTime + 1;
        }



        // const responseData = await response.json();
        alert("Thêm sinh viên thành công!");

    } catch (error) {
        console.error("Error:", error);
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

async function getMaxIdTime() {
    try {
        // Gửi yêu cầu GET để lấy tất cả các Time
        const response = await fetch('http://localhost:8080/times');
        if (!response.ok) {
            throw new Error('Failed to fetch times');
        }

        // Lấy dữ liệu các Time
        const times = await response.json();

        // Tính giá trị max của idTime
        let maxIdTime = 0;
        if (times.length > 0) {
            maxIdTime = Math.max(...times.map(time => time.idTime)); // Lấy idTime lớn nhất
        }

        // Trả về idTime mới (maxIdTime + 1 nếu có, 1 nếu không có)
        return maxIdTime > 0 ? maxIdTime + 1 : 1;
    } catch (error) {
        console.error('Error fetching max idTime:', error);
        return 1; // Trả về 1 nếu có lỗi hoặc không có dữ liệu
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

async function getMaxIdTake() {
    try {
        // Gửi yêu cầu GET để lấy tất cả các Time
        const response = await fetch('http://localhost:8080/takes');
        if (!response.ok) {
            throw new Error('Failed to fetch takes');
        }

        // Lấy dữ liệu các Time
        const takes = await response.json();

        // Tính giá trị max của idTime
        let maxIdTake = 0;
        if (takes.length > 0) {
            maxIdTake = Math.max(...takes.map(take => take.idTake));
        }

        // Trả về idTime mới (maxIdTime + 1 nếu có, 1 nếu không có)
        return maxIdTake > 0 ? maxIdTake + 1 : 1;
    } catch (error) {
        console.error('Error fetching max idTake:', error);
        return 1; // Trả về 1 nếu có lỗi hoặc không có dữ liệu
    }
}