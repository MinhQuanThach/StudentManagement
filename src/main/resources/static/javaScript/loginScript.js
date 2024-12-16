// Lấy phần tử HTML chứa input password
const password = document.getElementById("password");

// Lấy phần tử toggle (biểu tượng hiển thị/ẩn password)
const toggle = document.getElementById("toggle");

// Hàm hiển thị hoặc ẩn mật khẩu
function showPassword() {
    // Nếu input đang ở chế độ 'password', chuyển sang 'text'
    if (password.type === 'password') {
        password.setAttribute('type', 'text'); // Hiển thị mật khẩu
        toggle.classList.add("hide"); // Thêm class 'hide' để thay đổi giao diện
    } else {
        // Ngược lại, chuyển về chế độ 'password'
        password.setAttribute('type', 'password'); // Ẩn mật khẩu
        toggle.classList.remove("hide"); // Bỏ class 'hide'
    }
}

// Hàm xử lý logic đăng nhập
async function handleLogin(event) {
    event.preventDefault(); // Ngăn chặn hành động reload trang mặc định khi bấm nút login

    // Lấy giá trị của username và password từ các ô input
    let username = ""; // Sử dụng let thay vì const vì giá trị sẽ thay đổi
    username = document.getElementById("username").value; // Cập nhật giá trị từ input
    let password = "";
    password = document.getElementById("password").value;

    let role = "";
    const roleSelection = document.querySelector('input[name="role"]:checked');
    if (roleSelection) {
        role = roleSelection.value;
    }

    if (username && password) {
        if (role == "manager") {
            try {
                // Gửi yêu cầu POST tới API login
                const response = await fetch('/api/login', {
                    method: 'POST', // Phương thức POST
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // Kiểu dữ liệu gửi đi
                    },
                    body: new URLSearchParams({ username, password }), // Dữ liệu gửi đi
                });

                if (response.ok) {
                    const result = await response.text(); // Chuyển phản hồi thành JSON

                    if (result !== "Invalid username or password") {
                        window.location.href = '/students.html';
                    } else {
                        alert('Failed login attempt with Username:', username, 'and Password:', password);
                    }
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred. Please try again.');
            }
        } else {

        }



    } else {
        alert("Please enter both username and password.");
    }
}
