-- Active: 1690955496882@@127.0.0.1@5432@ecommerce
INSERT INTO "user" (id, email, phone, password, description, address, avatar, username, role)
VALUES
    ('user_id_1', 'user1@example.com', '+123456789', 'password1', 'User 1 description', '123 Main St', 'avatar1.png', 'user_1', 'user'),
    ('user_id_2', 'user2@example.com', '+987654321', 'password2', 'User 2 description', '456 Elm St', 'avatar2.png', 'user_2', 'user'),
    ('user_id_3', 'user3@example.com', '+111222333', 'password3', 'User 3 description', '789 Oak St', 'avatar3.png', 'user_3', 'user');


INSERT INTO coach ("userId", "totalRate", "rateTurn", "totalStudent", "totalCourse", "transactionId")
VALUES
    ('user_id_1', 4.5, 10, 30, 5, 'transaction_id_1'),
    ('user_id_2', 4.8, 15, 50, 8, 'transaction_id_2');


INSERT INTO coach_skill ("coachId", skill)
VALUES (1, 'Skill A'),
       (1, 'Skill B'),
       (2, 'Skill C');


INSERT INTO coach_certificate ("coachId", certificate)
VALUES (1, 'Certificate X'),
       (1, 'Certificate Y'),
       (2, 'Certificate Z');



INSERT INTO course ("coachId", "code", title, banner, "status", "level", "maxSlot", "cost", "description", "zoomLink")
VALUES
    (1, 'C1', 'Course 1', 'banner_url_1', 'Active', 'Beginner', 20, 100, 'Description for Course 1', 'zoom_link_1'),
    (2, 'C2', 'Course 2', 'banner_url_2', 'Active', 'Intermediate', 15, 150, 'Description for Course 2', 'zoom_link_2'),
    (1, 'C3', 'Course 3', NULL, 'Active', 'Advanced', 10, 200, 'Description for Course 3', 'zoom_link_3');



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
    (1, 'user_id_1', 4, 'Great course!'),
    (2, 'user_id_2', 5, 'Excellent content'),
    (1, 'user_id_3', 3, 'Could be improved'),
    (3, 'user_id_1', 4, 'Enjoyed the course');

