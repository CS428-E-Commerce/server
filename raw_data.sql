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



-- DELETE FROM "user";

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

-- DELETE FROM "coach";

INSERT INTO "coach" ("id", "userId", "totalRate", "rateTurn", "totalStudent", "totalCourse", "createdAt", "updatedAt", "deletedAt", "totalComment", "yearExperience", "averageCost", "stripeId")
VALUES
    (1, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 4.8, 20, 30, 15, NOW(), NOW(), NULL, 50, 5, 50.00, 'stripe_johndoe'),
    (2, '02dd1904-920c-45b0-a572-09512c01ddaa', 4.9, 25, 40, 20, NOW(), NOW(), NULL, 60, 8, 60.00, 'stripe_mikesmith'),
    (3, 'f991b597-b9e4-43fb-9d82-468fc4bb7d8f', 4.7, 18, 25, 12, NOW(), NOW(), NULL, 45, 6, 55.00, 'stripe_davidbrown'),
    (4, '8d7b8e15-cf3e-4c0f-88a4-2fb1b2e1f3a1', 4.6, 22, 35, 18, NOW(), NOW(), NULL, 40, 7, 45.00, 'stripe_williamjones'),
    (5, '1634e6e4-af6b-472f-8980-ef7e6eb80b67', 4.7, 19, 28, 14, NOW(), NOW(), NULL, 55, 9, 65.00, 'stripe_ryancooper');

-- DELETE FROM "coach_certificate";

INSERT INTO "coach_certificate" ("coachId", "certificate", "createdAt", "updatedAt", "deletedAt")
VALUES
    (1, 'Software Engineering Certification', NOW(), NOW(), NULL),
    (2, 'Graphic Design Certification', NOW(), NOW(), NULL),
    (3, 'Marketing Specialist Certification', NOW(), NOW(), NULL),
    (4, 'Photography Certification', NOW(), NOW(), NULL),
    (5, 'Financial Analysis Certification', NOW(), NOW(), NULL),
    (1, 'Project Management Certification', NOW(), NOW(), NULL),
    (2, 'UX/UI Design Certification', NOW(), NOW(), NULL),
    (3, 'Sales Management Certification', NOW(), NOW(), NULL),
    (4, 'Digital Marketing Certification', NOW(), NOW(), NULL),
    (5, 'Leadership Certification', NOW(), NOW(), NULL);

-- DELETE FROM "coach_skill";

INSERT INTO "coach_skill" ("coachId", "skill", "createdAt", "updatedAt", "deletedAt")
VALUES
    (1, 'Java Programming', NOW(), NOW(), NULL),
    (1, 'Web Development', NOW(), NOW(), NULL),
    (2, 'Graphic Design', NOW(), NOW(), NULL),
    (2, 'Illustration', NOW(), NOW(), NULL),
    (3, 'Marketing Strategy', NOW(), NOW(), NULL),
    (3, 'Social Media Marketing', NOW(), NOW(), NULL),
    (4, 'Photography', NOW(), NOW(), NULL),
    (4, 'Photo Editing', NOW(), NOW(), NULL),
    (5, 'Financial Analysis', NOW(), NOW(), NULL),
    (5, 'Investment Planning', NOW(), NOW(), NULL),
    (1, 'Project Management', NOW(), NOW(), NULL),
    (1, 'Agile Methodology', NOW(), NOW(), NULL),
    (2, 'UI Design', NOW(), NOW(), NULL),
    (2, 'User Experience (UX) Design', NOW(), NOW(), NULL),
    (3, 'Sales Techniques', NOW(), NOW(), NULL),
    (3, 'Customer Relationship Management (CRM)', NOW(), NOW(), NULL),
    (4, 'Portrait Photography', NOW(), NOW(), NULL),
    (4, 'Event Photography', NOW(), NOW(), NULL),
    (5, 'Risk Management', NOW(), NOW(), NULL),
    (5, 'Budgeting', NOW(), NOW(), NULL);

-- DELETE FROM "course";

INSERT INTO "course" ("id", "coachId", "title", "banner", "status", "level", "maxSlot", "cost", "description", "zoomLink", "createdAt", "updatedAt", "deletedAt", "code", "attendeeNumber")
VALUES
    (1, 1, 'Java Programming Fundamentals', 'java_banner.jpg', 'ACTIVE', 'beginner', 20, 75.00, 'Learn the basics of Java programming language.', 'https://zoom.us/javademo', NOW(), NOW(), NULL, 'JAVA101', 0),
    (2, 2, 'Introduction to Graphic Design', 'graphic_design_banner.jpg', 'ACTIVE', 'beginner', 15, 50.00, 'Discover the principles of graphic design.', 'https://zoom.us/graphicdesign', NOW(), NOW(), NULL, 'GD101', 0),
    (3, 3, 'Digital Marketing Strategies', 'marketing_banner.jpg', 'ACTIVE', 'intermediate', 25, 90.00, 'Explore effective digital marketing strategies.', 'https://zoom.us/marketingstrategies', NOW(), NOW(), NULL, 'MKTG202', 0),
    (4, 4, 'Portrait Photography Workshop', 'photography_banner.jpg', 'ACTIVE', 'intermediate', 12, 120.00, 'Master the art of portrait photography.', 'https://zoom.us/photographyworkshop', NOW(), NOW(), NULL, 'PHOTO303', 0),
    (5, 5, 'Financial Planning for Beginners', 'financial_banner.jpg', 'ACTIVE', 'beginner', 30, 60.00, 'Learn the basics of personal financial planning.', 'https://zoom.us/financialplanning', NOW(), NOW(), NULL, 'FIN101', 0),
    (6, 1, 'Agile Project Management', 'agile_banner.jpg', 'ACTIVE', 'advanced', 18, 95.00, 'Implement Agile methodologies in project management.', 'https://zoom.us/agilemanagement', NOW(), NOW(), NULL, 'AGILE401', 0),
    (7, 2, 'UI/UX Design Principles', 'uiux_banner.jpg', 'ACTIVE', 'intermediate', 20, 70.00, 'Explore the principles of UI/UX design.', 'https://zoom.us/uiuxdesign', NOW(), NOW(), NULL, 'UIUX202', 0),
    (8, 3, 'Effective Sales Techniques', 'sales_banner.jpg', 'ACTIVE', 'advanced', 25, 110.00, 'Master advanced sales techniques and strategies.', 'https://zoom.us/salestechniques', NOW(), NOW(), NULL, 'SALES501', 0),
    (9, 4, 'Event Photography Masterclass', 'event_photography_banner.jpg', 'ACTIVE', 'advanced', 10, 150.00, 'Become an expert in event photography.', 'https://zoom.us/eventphotography', NOW(), NOW(), NULL, 'EVENTPHOTO502', 0),
    (10, 5, 'Risk Management in Finance', 'risk_management_banner.jpg', 'ACTIVE', 'intermediate', 28, 80.00, 'Learn effective risk management strategies in finance.', 'https://zoom.us/riskmanagement', NOW(), NOW(), NULL, 'RISK202', 0);

-- DELETE FROM "course_attendee";

INSERT INTO "course_attendee" ("courseId", "userId", "createdAt", "updatedAt", "deletedAt")
VALUES
    (1, '1aeb200a-44d1-4f2f-b953-7455b2a27b6d', NOW(), NOW(), NULL),
    (1, '02dd1904-920c-45b0-a572-09512c01ddaa', NOW(), NOW(), NULL),
    (2, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', NOW(), NOW(), NULL),
    (3, '85ff1191-c1db-4d48-a620-23ff54b35610', NOW(), NOW(), NULL),
    (4, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', NOW(), NOW(), NULL),
    (4, '02dd1904-920c-45b0-a572-09512c01ddaa', NOW(), NOW(), NULL),
    (5, '1aeb200a-44d1-4f2f-b953-7455b2a27b6d', NOW(), NOW(), NULL),
    (5, '85ff1191-c1db-4d48-a620-23ff54b35610', NOW(), NOW(), NULL),
    (6, '02dd1904-920c-45b0-a572-09512c01ddaa', NOW(), NOW(), NULL),
    (7, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', NOW(), NOW(), NULL),
    (8, '85ff1191-c1db-4d48-a620-23ff54b35610', NOW(), NOW(), NULL),
    (9, '1aeb200a-44d1-4f2f-b953-7455b2a27b6d', NOW(), NOW(), NULL),
    (10, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', NOW(), NOW(), NULL),
    (10, '1aeb200a-44d1-4f2f-b953-7455b2a27b6d', NOW(), NOW(), NULL);

-- DELETE FROM course_discussion;

INSERT INTO "course_discussion" ("courseId", "userId", "rate", "comment", "createdAt", "updatedAt", "deletedAt")
VALUES
    (1, '1aeb200a-44d1-4f2f-b953-7455b2a27b6d', 4.5, 'Great course, learned a lot!', NOW(), NOW(), NULL),
    (1, '02dd1904-920c-45b0-a572-09512c01ddaa', 3.8, 'The content could be more detailed.', NOW(), NOW(), NULL),
    (2, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 5.0, 'Amazing class! Highly recommended.', NOW(), NOW(), NULL),
    (3, '85ff1191-c1db-4d48-a620-23ff54b35610', 4.2, 'Helped me improve my skills.', NOW(), NOW(), NULL),
    (4, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 4.7, 'Instructor is knowledgeable and engaging.', NOW(), NOW(), NULL),
    (4, '02dd1904-920c-45b0-a572-09512c01ddaa', 3.5, 'Expected more hands-on exercises.', NOW(), NOW(), NULL),
    (5, '1aeb200a-44d1-4f2f-b953-7455b2a27b6d', 4.0, 'Clear explanations, useful insights.', NOW(), NOW(), NULL),
    (5, '85ff1191-c1db-4d48-a620-23ff54b35610', 4.8, 'Enjoyed the interactive sessions.', NOW(), NOW(), NULL),
    (6, '02dd1904-920c-45b0-a572-09512c01ddaa', 3.2, 'Expected more in-depth topics.', NOW(), NOW(), NULL),
    (7, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 4.6, 'Helped me gain valuable marketing insights.', NOW(), NOW(), NULL),
    (8, '85ff1191-c1db-4d48-a620-23ff54b35610', 4.4, 'Effective strategies discussed.', NOW(), NOW(), NULL),
    (9, '1aeb200a-44d1-4f2f-b953-7455b2a27b6d', 4.3, 'Well-structured course content.', NOW(), NOW(), NULL),
    (10, 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 4.9, 'Engaging and practical sessions.', NOW(), NOW(), NULL),
    (10, '1aeb200a-44d1-4f2f-b953-7455b2a27b6d', 4.7, 'Highly satisfied with the course.', NOW(), NOW(), NULL);

-- DELETE FROM "course_schedule";

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
    (5, 5, '2023-08-30 16:00:00', '2023-08-30 18:00:00', NOW(), NOW(), NULL),
    (6, 1, '2023-08-21 09:00:00', '2023-08-21 11:00:00', NOW(), NOW(), NULL),
    (6, 1, '2023-08-23 09:00:00', '2023-08-23 11:00:00', NOW(), NOW(), NULL),
    (7, 2, '2023-08-22 10:00:00', '2023-08-22 12:00:00', NOW(), NOW(), NULL),
    (7, 2, '2023-08-24 10:00:00', '2023-08-24 12:00:00', NOW(), NOW(), NULL),
    (8, 3, '2023-08-25 13:00:00', '2023-08-25 15:00:00', NOW(), NOW(), NULL),
    (8, 3, '2023-08-27 13:00:00', '2023-08-27 15:00:00', NOW(), NOW(), NULL),
    (9, 4, '2023-08-28 14:00:00', '2023-08-28 16:00:00', NOW(), NOW(), NULL),
    (9, 4, '2023-08-30 14:00:00', '2023-08-30 16:00:00', NOW(), NOW(), NULL),
    (10, 5, '2023-08-21 16:00:00', '2023-08-21 18:00:00', NOW(), NOW(), NULL),
    (10, 5, '2023-08-23 16:00:00', '2023-08-23 18:00:00', NOW(), NOW(), NULL);

