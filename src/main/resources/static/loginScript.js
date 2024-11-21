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

    // Kiểm tra xem cả username và password đã được nhập chưa
    if (username && password) {
        try {
            // Gửi yêu cầu POST tới API login
            const response = await fetch('/api/login', {
                method: 'POST', // Phương thức POST
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Kiểu dữ liệu gửi đi
                },
                body: new URLSearchParams({ username, password }), // Dữ liệu gửi đi
            });

            // Kiểm tra phản hồi từ server
            if (response.ok) {
                // Nếu phản hồi thành công (HTTP status code 200), đọc nội dung trả về
                const result = await response.text(); // Chuyển phản hồi thành JSON

                // Kiểm tra nếu kết quả trả về có thông tin xác thực (ví dụ token)
                if (result !== "Invalid username or password") {
                    //Chuyển trang khi login thành công
                    //localStorage.setItem("authToken", token);
                    window.location.href = '/students.html';
                } else {
                    // Nếu không có token hoặc kết quả không hợp lệ
                    alert('Failed login attempt with Username:', username, 'and Password:', password);
                }
            } else {
                // Nếu phản hồi không thành công (HTTP status code khác 200)
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            // Xử lý lỗi nếu quá trình gửi hoặc nhận dữ liệu gặp vấn đề
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    } else {
        // Thông báo nếu chưa nhập đủ username và password
        alert("Please enter both username and password.");
    }
}
