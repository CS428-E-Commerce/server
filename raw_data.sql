-- Active: 1693037640692@@127.0.0.1@5432@ecommerce
-- Delete data from course_discussion table
DELETE FROM course_discussion;
-- Reset auto-increment sequence for id column in course_discussion table
SELECT setval(pg_get_serial_sequence('course_discussion', 'id'), 1, false);

-- Continue with the same pattern for other tables...

-- Delete data from course_schedule table
DELETE FROM course_schedule;
-- Reset auto-increment sequence for id column in course_schedule table
SELECT setval(pg_get_serial_sequence('course_schedule', 'id'), 1, false);

-- Delete data from course_attendee table
DELETE FROM course_attendee;
-- Reset auto-increment sequence for id column in course_attendee table
SELECT setval(pg_get_serial_sequence('course_attendee', 'id'), 1, false);

-- Delete data from course table
DELETE FROM course;
-- Reset auto-increment sequence for id column in course table
SELECT setval(pg_get_serial_sequence('course', 'id'), 1, false);

-- Delete data from coach_certificate table
DELETE FROM coach_certificate;
-- Reset auto-increment sequence for id column in coach_certificate table
SELECT setval(pg_get_serial_sequence('coach_certificate', 'id'), 1, false);

-- Delete data from coach_skill table
DELETE FROM coach_skill;
-- Reset auto-increment sequence for id column in coach_skill table
SELECT setval(pg_get_serial_sequence('coach_skill', 'id'), 1, false);

-- Delete data from coach table
DELETE FROM coach;
-- Reset auto-increment sequence for id column in coach table
SELECT setval(pg_get_serial_sequence('coach', 'id'), 1, false);

-- Delete data from "user" table
DELETE FROM "user";
-- Reset auto-increment sequence for id column in "user" table
SELECT setval(pg_get_serial_sequence('"user"', 'id'), 1, false);




INSERT INTO "user" ("id", "email", "phone", "password", "description", "address", "avatar", "username", "role")
VALUES
    ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'johndoe@gmail.com', '123-456-7890', 'password1', 'John Doe - Software Engineer', '123 Main St, City 1', 'https://i.pravatar.cc/300?u=f47ac10b-58cc-4372-a567-0e02b2c3d479', 'johndoe', 'COACH'),
    ('1aeb200a-44d1-4f2f-b953-7455b2a27b6d', 'janedoe@gmail.com', '987-654-3210', 'password2', 'Jane Doe - Graphic Designer', '456 Elm St, City 2', 'https://i.pravatar.cc/300?u=1aeb200a-44d1-4f2f-b953-7455b2a27b6d', 'janedoe', 'STUDENT'),
    ('02dd1904-920c-45b0-a572-09512c01ddaa', 'mikesmith@gmail.com', '555-555-5555', 'password3', 'Mike Smith - Marketing Specialist', '789 Oak St, City 3', 'https://i.pravatar.cc/300?u=02dd1904-920c-45b0-a572-09512c01ddaa', 'mikesmith', 'COACH'),
    ('85ff1191-c1db-4d48-a620-23ff54b35610', 'emilyjohnson@gmail.com', '111-222-3333', 'password4', 'Emily Johnson - Photographer', '101 Pine St, City 4', 'https://i.pravatar.cc/300?u=85ff1191-c1db-4d48-a620-23ff54b35610', 'emilyjohnson', 'STUDENT'),
    ('f991b597-b9e4-43fb-9d82-468fc4bb7d8f', 'davidbrown@gmail.com', '444-555-6666', 'password5', 'David Brown - Financial Analyst', '111 Maple St, City 5', 'https://i.pravatar.cc/300?u=f991b597-b9e4-43fb-9d82-468fc4bb7d8f', 'davidbrown', 'COACH'),
    ('ea0317a0-08a3-47e6-a963-1cb8466f6f7a', 'oliviataylor@gmail.com', '777-888-9999', 'password6', 'Olivia Taylor - Writer', '222 Cedar St, City 6', 'https://i.pravatar.cc/300?u=ea0317a0-08a3-47e6-a963-1cb8466f6f7a', 'oliviataylor', 'STUDENT'),
    ('8d7b8e15-cf3e-4c0f-88a4-2fb1b2e1f3a1', 'williamjones@gmail.com', '222-333-4444', 'password7', 'William Jones - Sales Manager', '333 Birch St, City 7', 'https://i.pravatar.cc/300?u=8d7b8e15-cf3e-4c0f-88a4-2fb1b2e1f3a1', 'williamjones', 'COACH'),
    ('c14b8b0d-c4b1-4d5c-a6b7-4c30176b7269', 'sophiasmith@gmail.com', '666-777-8888', 'password8', 'Sophia Smith - HR Specialist', '444 Walnut St, City 8', 'https://i.pravatar.cc/300?u=c14b8b0d-c4b1-4d5c-a6b7-4c30176b7269', 'sophiasmith', 'STUDENT'),
    ('1634e6e4-af6b-472f-8980-ef7e6eb80b67', 'ryancooper@gmail.com', '999-000-1111', 'password9', 'Ryan Cooper - Product Designer', '555 Pine St, City 9', 'https://i.pravatar.cc/300?u=1634e6e4-af6b-472f-8980-ef7e6eb80b67', 'ryancooper', 'COACH'),
    ('f571e504-0b18-45d6-bd0c-05b8c4df53b6', 'laurawilson@gmail.com', '333-444-5555', 'password10', 'Laura Wilson - Project Manager', '666 Oak St, City 10', 'https://i.pravatar.cc/300?u=f571e504-0b18-45d6-bd0c-05b8c4df53b6', 'laurawilson', 'STUDENT');


INSERT INTO "coach" ("id", "userId", "totalRate", "rateTurn", "totalStudent", "totalCourse", "createdAt", "updatedAt", "deletedAt", "totalComment", "yearExperience", "averageCost", "stripeId")
VALUES
    (1, '02dd1904-920c-45b0-a572-09512c01ddaa', 4.8, 20, 30, 15, NOW(), NOW(), NULL, 50, 5, 50.00, 'stripe_teacher1'),
    (2, 'f991b597-b9e4-43fb-9d82-468fc4bb7d8f', 4.9, 25, 40, 20, NOW(), NOW(), NULL, 60, 8, 60.00, 'stripe_teacher2'),
    (3, '8d7b8e15-cf3e-4c0f-88a4-2fb1b2e1f3a1', 4.7, 18, 25, 12, NOW(), NOW(), NULL, 45, 6, 55.00, 'stripe_teacher3'),
    (4, '1634e6e4-af6b-472f-8980-ef7e6eb80b67', 4.6, 22, 35, 18, NOW(), NOW(), NULL, 40, 7, 45.00, 'stripe_teacher4'),
    (5, 'c14b8b0d-c4b1-4d5c-a6b7-4c30176b7269', 4.7, 19, 28, 14, NOW(), NOW(), NULL, 55, 9, 65.00, 'stripe_teacher5');

INSERT INTO "coach_certificate" ("coachId", "certificate", "createdAt", "updatedAt", "deletedAt")
VALUES
    (1, 'Vietnamese Language Proficiency Certificate', NOW(), NOW(), NULL),
    (2, 'Certified Vietnamese Language Instructor', NOW(), NOW(), NULL),
    (3, 'Advanced Vietnamese Language Certification', NOW(), NOW(), NULL),
    (4, 'Vietnamese Language Teaching Expert', NOW(), NOW(), NULL),
    (5, 'Master of Vietnamese Linguistics', NOW(), NOW(), NULL);

INSERT INTO "coach_skill" ("coachId", "skill", "createdAt", "updatedAt", "deletedAt")
VALUES
    (1, 'Vietnamese Pronunciation', NOW(), NOW(), NULL),
    (1, 'Conversational Vietnamese', NOW(), NOW(), NULL),
    (2, 'Vietnamese Grammar', NOW(), NOW(), NULL),
    (2, 'Vietnamese Writing', NOW(), NOW(), NULL),
    (3, 'Vietnamese Language Teaching', NOW(), NOW(), NULL),
    (3, 'Vietnamese Culture and History', NOW(), NOW(), NULL),
    (4, 'Vietnamese Language Fluency', NOW(), NOW(), NULL),
    (4, 'Vietnamese Dialects', NOW(), NOW(), NULL),
    (5, 'Vietnamese Language Proficiency', NOW(), NOW(), NULL),
    (5, 'Vietnamese Language Literature', NOW(), NOW(), NULL);

INSERT INTO "course" ("id", "coachId", "title", "banner", "status", "level", "maxSlot", "cost", "description", "zoomLink", "createdAt", "updatedAt", "deletedAt", "code", "attendeeNumber")
VALUES
    (1, 1, 'Basic Vietnamese Language Course', 'https://nhyirapremiumuniversity.com/wp-content/uploads/2018/11/course.png', 'active', 'beginner', 20, 75.00, 'Learn the fundamentals of the Vietnamese language.', 'https://zoom.us/vietnamese101', NOW(), NOW(), NULL, 'VIET101', 0),
    (2, 2, 'Intermediate Vietnamese Language Course', 'https://www.study2apply.com/wp-content/uploads/2015/10/Courses.jpg', 'active', 'intermediate', 15, 50.00, 'Improve your Vietnamese language skills.', 'https://zoom.us/vietnamese202', NOW(), NOW(), NULL, 'VIET202', 0),
    (3, 3, 'Advanced Vietnamese Language Course', 'https://www.study2apply.com/wp-content/uploads/2015/10/Courses.jpg', 'active', 'advance', 25, 90.00, 'Master the Vietnamese language with advanced lessons.', 'https://zoom.us/vietnamese303', NOW(), NOW(), NULL, 'VIET303', 0),
    (4, 4, 'Vietnamese Conversation Practice', 'https://www.drjimtaylor.com/4.0/wp-content/uploads/2019/12/Online-courses.jpg0', 'active', 'intermediate', 12, 120.00, 'Enhance your conversational skills in Vietnamese.', 'https://zoom.us/vietnameseconversation', NOW(), NOW(), NULL, 'VIETCONVO', 0),
    (5, 5, 'Vietnamese Writing Workshop', 'https://www.study2apply.com/wp-content/uploads/2015/10/Courses.jpg', 'active', 'advance', 30, 60.00, 'Learn to write in Vietnamese with style.', 'https://zoom.us/vietnamesewriting', NOW(), NOW(), NULL, 'VIETWRITING', 0);

INSERT INTO "course_attendee" ("courseId", "userId", "createdAt", "updatedAt", "deletedAt")
VALUES
    (1, '1aeb200a-44d1-4f2f-b953-7455b2a27b6d', NOW(), NOW(), NULL),
    (1, '02dd1904-920c-45b0-a572-09512c01ddaa', NOW(), NOW(), NULL),
    (2, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', NOW(), NOW(), NULL),
    (3, '85ff1191-c1db-4d48-a620-23ff54b35610', NOW(), NOW(), NULL),
    (4, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', NOW(), NOW(), NULL),
    (4, '02dd1904-920c-45b0-a572-09512c01ddaa', NOW(), NOW(), NULL),
    (5, '1aeb200a-44d1-4f2f-b953-7455b2a27b6d', NOW(), NOW(), NULL),
    (5, '85ff1191-c1db-4d48-a620-23ff54b35610', NOW(), NOW(), NULL);

INSERT INTO "course_discussion" ("courseId", "userId", "rate", "comment", "createdAt", "updatedAt", "deletedAt")
VALUES
    (1, '1aeb200a-44d1-4f2f-b953-7455b2a27b6d', 4.5, 'Great course, learned a lot!', NOW(), NOW(), NULL),
    (1, '02dd1904-920c-45b0-a572-09512c01ddaa', 3.8, 'Nội dung có thể cụ thể hơn.', NOW(), NOW(), NULL),
    (2, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 5.0, 'Khóa học tuyệt vời! Rất đáng giới thiệu.', NOW(), NOW(), NULL),
    (3, '85ff1191-c1db-4d48-a620-23ff54b35610', 4.2, 'Giúp tôi cải thiện kỹ năng của mình.', NOW(), NOW(), NULL),
    (4, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 4.7, 'Giảng viên có kiến thức và hấp dẫn.', NOW(), NOW(), NULL),
    (4, '02dd1904-920c-45b0-a572-09512c01ddaa', 3.5, 'Mong đợi nhiều bài tập thực tế hơn.', NOW(), NOW(), NULL),
    (5, '1aeb200a-44d1-4f2f-b953-7455b2a27b6d', 4.0, 'Giải thích rõ ràng, kiến thức hữu ích.', NOW(), NOW(), NULL),
    (5, '85ff1191-c1db-4d48-a620-23ff54b35610', 4.8, 'Thích thú với các buổi học tương tác.', NOW(), NOW(), NULL);


INSERT INTO "course_schedule" ("courseId", "coachId", "startTime", "endTime", "createdAt", "updatedAt", "deletedAt")
VALUES
    (1, 1, '2023-08-20 09:00:00', '2023-08-20 11:00:00', NOW(), NOW(), NULL),
    (1, 1, '2023-08-22 09:00:00', '2023-08-22 11:00:00', NOW(), NOW(), NULL),
    (2, 2, '2023-08-25 10:00:00', '2023-08-25 12:00:00', NOW(), NOW(), NULL),
    (2, 2, '2023-08-27 10:00:00', '2023-08-27 12:00:00', NOW(), NOW(), NULL),
    (3, 3, '2023-08-21 13:00:00', '2023-08-21 15:00:00', NOW(), NOW(), NULL),
    (3, 3, '2023-08-23 13:00:00', '2023-08-23 15:00:00', NOW(), NOW(), NULL),
    (4, 4, '2023-08-24 14:00:00', '2023-08-24 16:00:00', NOW(), NOW(), NULL),
    (4, 4, '2023-08-26 14:00:00', '2023-08-26 16:00:00', NOW(), NOW(), NULL),
    (5, 5, '2023-08-28 16:00:00', '2023-08-28 18:00:00', NOW(), NOW(), NULL),
    (5, 5, '2023-08-30 16:00:00', '2023-08-30 18:00:00', NOW(), NOW(), NULL);