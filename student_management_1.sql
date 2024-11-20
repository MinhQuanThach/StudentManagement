-- Drop and recreate the schema
DROP SCHEMA IF EXISTS `student_management`;
CREATE SCHEMA `student_management`;

-- Create tables
CREATE TABLE student_management.faculty (
    id_faculty VARCHAR(15) NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    number_teacher INT,
    number_student INT
);

CREATE TABLE student_management.industry (
    id_industry VARCHAR(15) NOT NULL PRIMARY KEY,
    id_faculty VARCHAR(15) NOT NULL,
    year_number DOUBLE NOT NULL,
    title VARCHAR(50),
    FOREIGN KEY (id_faculty) REFERENCES student_management.faculty(id_faculty)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE student_management.teacher (
    id_teacher INT NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    birthday DATE
);

CREATE TABLE student_management.courses (
    id_course VARCHAR(15) NOT NULL PRIMARY KEY,
    id_teacher INT NOT NULL,
    credits INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_teacher) REFERENCES student_management.teacher(id_teacher)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE student_management.student (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    birthday DATE,
    credits INT NOT NULL DEFAULT 0,
    id_class VARCHAR(50) NOT NULL,
    id_industry VARCHAR(15),
    FOREIGN KEY (id_industry) REFERENCES student_management.industry(id_industry)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE student_management.time (
    id_course VARCHAR(15) NOT NULL PRIMARY KEY,
    day DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number VARCHAR(50)
    
);

CREATE TABLE student_management.takes (
	id_takes INT PRIMARY KEY,
    id INT NOT NULL,
    id_course VARCHAR(15) NOT NULL,
    status VARCHAR(15),
    year INT,
    grade DOUBLE,
    FOREIGN KEY (id) REFERENCES student_management.student(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (id_course) REFERENCES student_management.courses(id_course)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);