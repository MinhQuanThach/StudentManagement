# STUDENT MANAGEMENT - Website Quản lý Sinh viên & Cố vấn học tập

### Mục lục 

[1. Giới thiệu](https://github.com/MinhQuanThach/Student-Management#giới-thiệu)  
[2. Tính năng](https://github.com/MinhQuanThach/Student-Management#tính-năng)  
[3. Công nghệ](https://github.com/MinhQuanThach/Student-Management#công-nghệ)  
[4. Cơ sở dữ liệu](https://github.com/MinhQuanThach/Student-Management#cơ-sở-dữ-liêu)
[5. Cách cài đặt](https://github.com/MinhQuanThach/Student-Management#cài-đặt)  
[6. Nhóm phát triển](https://github.com/MinhQuanThach/Student-Management#nhóm-phát-triển) 

## Giới thiệu

Web App làm nhiệm vụ quản lý các sinh viên thuộc phạm vi quản lý của cố vấn học tập.

![image](https://github.com/user-attachments/assets/ec10f18a-446f-4f61-8f0e-73913175981b)


## Tính năng
### Tổng quan
- **Giao diện** trực quan, có đầy đủ các chức năng thông dụng
- **Backend và hệ thống quản lý phiên đăng nhập** 
### Tài khoản
- **Tài khoản là public**, vì là website quản lý sinh viên nên hệ thông tài khoản sẽ được cấp trước
cho quản lý để đăng nhập.
- **Profile cá nhân**, đổi mật khẩu và khôi phục mật khẩu bằng email (tính năng này đang hoàn thiện)
### Mô tả chung về tính năng
- **Trang Student**
  - CVHT có thể quản lý tất cả sinh viên
  - CVHT có thể thêm, sửa, xoá inh viên
  - Tìm kiếm sinh viên theo id, name, industry, idCourse
  - Thêm sinh viên kết hợp với thêm các khoá học của sinh viên
  - Hỗ trợ xem lịch của từng sinh viên
- **Trang Teacher**
  - Đầy đủ các chức năng cơ bản như thêm, sửa và xoá teacher
  - Hỗ trợ xem thời gian biểu của teacher
  - Có bộ lọc tìm kiếm teacher
- **Trang Faculties**, là trang cung cấp thông tin của khoa
  - Đầy đủ các chức năng cơ bản như thêm, sửa và xoá faculty
  - Có bộ lọc tìm kiếm faculty
- **Trang industry**, là trang cung cấp thông tin của ngành
  - Đầy đủ các chức năng cơ bản như thêm, sửa và xoá faculty
  - Có bộ lọc tìm kiếm faculty
- **Trang Courses**, là trang lưu trư thông tin khoa hoc
  - Đầy đủ các chức năng cơ bản như thêm, sửa và xoá course
  - Có bộ lọc tìm kiếm course
  - Thêm, sửa, xoá course thuận tiện hơn với gợi ý từ cơ sở dữ liệu
- **Trang Takes**, là trang quản lý tác vụ sinh viên
  - Đầy đủ các chức năng cơ bản như thêm, sửa và xoá takes
  - Có bộ lọc tìm kiếm take
  - Thêm, sửa, xoá takes thuận tiện hơn với gợi ý từ cơ sở dữ liệu
- **Trang Time**, là trang quản thời gian khoá học
  - Đầy đủ các chức năng cơ bản như thêm, sửa và xoá time
  - Có bộ lọc tìm kiếm time
  - Thêm, sửa, xoá takes thuận tiện hơn với gợi ý từ cơ sở dữ liệu
### Nhóm tính năng xem thời khoá biểu
- **Thời khoá biểu sinh viên, giảng viên**
  - Gồm toàn bộ thông tin các buổi học, dạy của sinh viên, giảng viên
  ![image](https://github.com/user-attachments/assets/bbb964a5-b401-4058-99e3-8d8ff4c0e6be)


## Công nghệ

**Kiến trúc:** Client - Server Web Application, Rest API Approach

**Front-end:** React.js, Recoil, Ant Design, Rechart (visualize dữ liệu)

**Back-end:** Node.js, MongoDB (database)

**Giao thức sử dụng:** HTTP Request + Axios, WebSocket

**Ngôn ngữ**: JavaScript, HTML, CSS

## cơ sở dữ liệu

- Bao gồm 7 bảng
table               | Mục đích                    
------------------- | ----------------------------- 
student             | Lưu trữ danh sách sinh viên   
industry            | Một trường thông tin liên quan đến inh viên       
faculty             | Một trường thông tin liên quan đến inh viên            
teacher             | Lưu trữ danh sách giảng viên            
take                | Thao tác liên quan đến sinh viên(học phần, điểm số)
time                | Thời gian, địa điểm cho một course
course              | Lưu trữ thông tin các khoá học

![image](https://github.com/user-attachments/assets/0a284c74-e28f-4063-abad-d8decc2d8980)


## Cài đặt

### 1. Cài đặt môi trường

**Môi trường runcode:** Intellij
- clone code về và mở bằng Intellij
**Môi trường liên kết cơ sở dự liệu:** MySQL WorkBench hoặc Xampp
- chạy file .sql trong MySQL WorkBench để tải về cơ sở dữ liệu mẫu
table               | Mục đích                      | Nơi nhập
------------------- | ----------------------------- | ---------------------------------
student             | Lưu trữ danh sách sinh viên   | Quản lý CSDL/Danh sách CVHT
users_student.csv   | Danh sách tài khoản SV        | Quản lý CSDL/Danh sách sinh viên
semesters.csv       | Danh sách kỳ học              | Quản lý CSDL/Danh sách kì học
subjects.csv        | Danh sách môn học             | Quản lý CSDL/Danh sách môn học
*_score.csv         | Điểm các môn do PĐT cung cấp  | Quản lý CSDL/Cập nhật bảng điểm
*_classmember.csv   | List email SV add từng lớp    | Thông tin liên hệ/Thêm sinh viên

### 2. Kiểm thử

- Chạy file StudentManagementApplicatiton và truy cập cổng đường link http://localhost:8080
- Đăng nhập bằng tài khoản và mật khẩu mặc định là:
- **tài khoản:** admin
- **mật khẩu:** admin


## Nhóm phát triển

