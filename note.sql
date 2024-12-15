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
    title VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_faculty) REFERENCES student_management.faculty(id_faculty)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE student_management.courses (
    id_course VARCHAR(15) NOT NULL PRIMARY KEY,
    credits INT NOT NULL,
    title VARCHAR(100) NOT NULL
);

create table student_management.section (
id_section varchar(15) primary key,
id_course varchar(15) not null,
semester varchar(25) not null,
year INT not null,
foreign key (id_course) references student_management.courses(id_course)
on delete cascade
on update cascade
);

CREATE TABLE student_management.time (
	id_time INT NOT NULL PRIMARY KEY auto_increment,
    id_section varchar(15) not null,
    day VARCHAR(10) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number VARCHAR(50),
    FOREIGN KEY (id_section) REFERENCES student_management.section(id_section)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE student_management.teacher (
    id_teacher INT NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    birthday DATE
);

CREATE TABLE student_management.teaches (
    id_teacher INT NOT NULL,
    id_section VARCHAR(15) NOT NULL,
    PRIMARY KEY (id_teacher, id_section),
    FOREIGN KEY (id_teacher) REFERENCES student_management.teacher(id_teacher)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (id_section) REFERENCES student_management.section(id_section)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);



CREATE TABLE student_management.student (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    birthday DATE,
    credits INT NOT NULL DEFAULT 0,
    id_class VARCHAR(50),
    id_industry VARCHAR(15),
    FOREIGN KEY (id_industry) REFERENCES student_management.industry(id_industry)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE student_management.takes (
	id INT not null,
    id_section varchar(15) NOT NULL,
    status VARCHAR(15) NOT NULL,
    year INT,
    grade DOUBLE,
    primary key (id, id_section),
    FOREIGN KEY (id) REFERENCES student_management.student(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (id_section) REFERENCES student_management.section(id_section)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
