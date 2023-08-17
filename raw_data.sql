-- Active: 1691740502523@@127.0.0.1@5432@ecommerce
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



INSERT INTO "user" (id, email, phone, password, description, address, avatar, username, role)
VALUES
    ('user_id_1', 'user1@example.com', '+123456789', 'password1', 'User 1 description', '123 Main St', 'https://wallpapertag.com/wallpaper/full/5/f/4/494653-1440x900-hd-wallpaper-2560x1440-for-ipad.jpg', 'user_1', 'user'),
    ('user_id_2', 'user2@example.com', '+987654321', 'password2', 'User 2 description', '456 Elm St', 'https://wallpapercave.com/wp/7IxTmx7.jpg', 'user_2', 'user'),
    ('user_id_3', 'user3@example.com', '+111222333', 'password3', 'User 3 description', '789 Oak St', 'https://wallpapercave.com/wp/mGlEbHK.jpg', 'user_3', 'user');


INSERT INTO coach ("userId", "totalRate", "rateTurn", "totalStudent", "totalCourse", "stripeId")
VALUES
    ('user_id_1', 5, 3, 30, 5, 'transaction_id_1'),
    ('user_id_2', 5, 1, 50, 8, 'transaction_id_2');


INSERT INTO coach_skill ("coachId", skill)
VALUES (1, 'Skill A'),
       (1, 'Skill B'),
       (2, 'Skill C');


INSERT INTO coach_certificate ("coachId", certificate)
VALUES (1, 'Certificate X'),
       (1, 'Certificate Y'),
       (2, 'Certificate Z');



INSERT INTO course ("coachId", "code", title, banner, "status", "level", "maxSlot", "cost", "description", "zoomLink", "attendeeNumber")
VALUES
    (1, 'C1', 'Course 1', 'https://wallpaperaccess.com/full/2757765.png', 'Active', 'Beginner', 20, 100, 'Description for Course 1', 'zoom_link_1', 2),
    (2, 'C2', 'Course 2', 'https://cdn.wallpapersafari.com/11/19/403Ncn.jpg', 'Active', 'Intermediate', 15, 150, 'Description for Course 2', 'zoom_link_2', 1),
    (1, 'C3', 'Course 3', 'https://cdn.wallpapersafari.com/41/61/I9DFQV.jpg', 'Active', 'Advanced', 10, 200, 'Description for Course 3', 'zoom_link_3', 1);



INSERT INTO course_attendee ("courseId", "userId")
VALUES
    (1, 'user_id_1'),
    (1, 'user_id_2'),
    (2, 'user_id_3'),
    (3, 'user_id_1');

INSERT INTO course_schedule ("courseId", "coachId", "startTime", "endTime")
VALUES
    (1, 1, '2023-07-18 10:00:00', '2023-07-18 12:00:00'),
    (2, 2, '2023-07-19 14:00:00', '2023-07-19 16:00:00'),
    (1, 1, '2023-07-20 09:00:00', '2023-07-20 11:00:00');



INSERT INTO course_discussion ("courseId", "userId", rate, comment)
VALUES
    (1, 'user_id_1', 5, 'Great course!'),
    (2, 'user_id_2', 5, 'Excellent content'),
    (1, 'user_id_3', 5, 'Could be improved'),
    (3, 'user_id_1', 5, 'Enjoyed the course');
