--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Homebrew)
-- Dumped by pg_dump version 14.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: coach; Type: TABLE; Schema: public; Owner: tungdo
--

CREATE TABLE public.coach (
    id integer NOT NULL,
    "userId" character varying NOT NULL,
    "totalRate" numeric,
    "rateTurn" numeric,
    "totalStudent" numeric,
    "totalCourse" numeric,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp without time zone,
    "totalComment" numeric DEFAULT 0,
    "yearExperience" numeric DEFAULT 0,
    "averageCost" numeric DEFAULT 0,
    "stripeId" character varying
);


ALTER TABLE public.coach OWNER TO tungdo;

--
-- Name: coach_certificate; Type: TABLE; Schema: public; Owner: tungdo
--

CREATE TABLE public.coach_certificate (
    id integer NOT NULL,
    "coachId" integer NOT NULL,
    certificate character varying,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp without time zone
);


ALTER TABLE public.coach_certificate OWNER TO tungdo;

--
-- Name: coach_certificate_id_seq; Type: SEQUENCE; Schema: public; Owner: tungdo
--

CREATE SEQUENCE public.coach_certificate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coach_certificate_id_seq OWNER TO tungdo;

--
-- Name: coach_certificate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tungdo
--

ALTER SEQUENCE public.coach_certificate_id_seq OWNED BY public.coach_certificate.id;


--
-- Name: coach_id_seq; Type: SEQUENCE; Schema: public; Owner: tungdo
--

CREATE SEQUENCE public.coach_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coach_id_seq OWNER TO tungdo;

--
-- Name: coach_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tungdo
--

ALTER SEQUENCE public.coach_id_seq OWNED BY public.coach.id;


--
-- Name: coach_skill; Type: TABLE; Schema: public; Owner: tungdo
--

CREATE TABLE public.coach_skill (
    id integer NOT NULL,
    "coachId" integer NOT NULL,
    skill character varying,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp without time zone
);


ALTER TABLE public.coach_skill OWNER TO tungdo;

--
-- Name: coach_skill_id_seq; Type: SEQUENCE; Schema: public; Owner: tungdo
--

CREATE SEQUENCE public.coach_skill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coach_skill_id_seq OWNER TO tungdo;

--
-- Name: coach_skill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tungdo
--

ALTER SEQUENCE public.coach_skill_id_seq OWNED BY public.coach_skill.id;


--
-- Name: course; Type: TABLE; Schema: public; Owner: tungdo
--

CREATE TABLE public.course (
    id integer NOT NULL,
    "coachId" integer NOT NULL,
    title character varying NOT NULL,
    banner text,
    status character varying NOT NULL,
    level character varying NOT NULL,
    "maxSlot" numeric,
    cost numeric NOT NULL,
    description text,
    "zoomLink" character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp without time zone,
    code character varying NOT NULL,
    "attendeeNumber" numeric
);


ALTER TABLE public.course OWNER TO tungdo;

--
-- Name: course_attendee; Type: TABLE; Schema: public; Owner: tungdo
--

CREATE TABLE public.course_attendee (
    id integer NOT NULL,
    "courseId" integer NOT NULL,
    "userId" character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp without time zone
);


ALTER TABLE public.course_attendee OWNER TO tungdo;

--
-- Name: course_attendee_id_seq; Type: SEQUENCE; Schema: public; Owner: tungdo
--

CREATE SEQUENCE public.course_attendee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.course_attendee_id_seq OWNER TO tungdo;

--
-- Name: course_attendee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tungdo
--

ALTER SEQUENCE public.course_attendee_id_seq OWNED BY public.course_attendee.id;


--
-- Name: course_discussion; Type: TABLE; Schema: public; Owner: tungdo
--

CREATE TABLE public.course_discussion (
    id integer NOT NULL,
    "courseId" integer NOT NULL,
    "userId" character varying NOT NULL,
    rate numeric,
    comment character varying,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp without time zone
);


ALTER TABLE public.course_discussion OWNER TO tungdo;

--
-- Name: course_discussion_id_seq; Type: SEQUENCE; Schema: public; Owner: tungdo
--

CREATE SEQUENCE public.course_discussion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.course_discussion_id_seq OWNER TO tungdo;

--
-- Name: course_discussion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tungdo
--

ALTER SEQUENCE public.course_discussion_id_seq OWNED BY public.course_discussion.id;


--
-- Name: course_id_seq; Type: SEQUENCE; Schema: public; Owner: tungdo
--

CREATE SEQUENCE public.course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.course_id_seq OWNER TO tungdo;

--
-- Name: course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tungdo
--

ALTER SEQUENCE public.course_id_seq OWNED BY public.course.id;


--
-- Name: course_schedule; Type: TABLE; Schema: public; Owner: tungdo
--

CREATE TABLE public.course_schedule (
    id integer NOT NULL,
    "courseId" integer NOT NULL,
    "coachId" integer NOT NULL,
    "startTime" timestamp without time zone NOT NULL,
    "endTime" timestamp without time zone NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp without time zone
);


ALTER TABLE public.course_schedule OWNER TO tungdo;

--
-- Name: course_schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: tungdo
--

CREATE SEQUENCE public.course_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.course_schedule_id_seq OWNER TO tungdo;

--
-- Name: course_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tungdo
--

ALTER SEQUENCE public.course_schedule_id_seq OWNED BY public.course_schedule.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: tungdo
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO tungdo;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: tungdo
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO tungdo;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tungdo
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: tungdo
--

CREATE TABLE public."user" (
    id character varying NOT NULL,
    email character varying,
    phone character varying,
    password character varying,
    description character varying,
    address character varying,
    avatar character varying,
    username character varying,
    role character varying,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp without time zone
);


ALTER TABLE public."user" OWNER TO tungdo;

--
-- Name: coach id; Type: DEFAULT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.coach ALTER COLUMN id SET DEFAULT nextval('public.coach_id_seq'::regclass);


--
-- Name: coach_certificate id; Type: DEFAULT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.coach_certificate ALTER COLUMN id SET DEFAULT nextval('public.coach_certificate_id_seq'::regclass);


--
-- Name: coach_skill id; Type: DEFAULT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.coach_skill ALTER COLUMN id SET DEFAULT nextval('public.coach_skill_id_seq'::regclass);


--
-- Name: course id; Type: DEFAULT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.course ALTER COLUMN id SET DEFAULT nextval('public.course_id_seq'::regclass);


--
-- Name: course_attendee id; Type: DEFAULT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.course_attendee ALTER COLUMN id SET DEFAULT nextval('public.course_attendee_id_seq'::regclass);


--
-- Name: course_discussion id; Type: DEFAULT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.course_discussion ALTER COLUMN id SET DEFAULT nextval('public.course_discussion_id_seq'::regclass);


--
-- Name: course_schedule id; Type: DEFAULT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.course_schedule ALTER COLUMN id SET DEFAULT nextval('public.course_schedule_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: coach; Type: TABLE DATA; Schema: public; Owner: tungdo
--

COPY public.coach (id, "userId", "totalRate", "rateTurn", "totalStudent", "totalCourse", "createdAt", "updatedAt", "deletedAt", "totalComment", "yearExperience", "averageCost", "stripeId") FROM stdin;
1	7dc5d904-b58e-4c49-ad6e-3a9e035c5ea9	2.8	\N	12013	1	2023-07-19 16:03:32.842386	2023-07-19 16:03:32.842386	\N	0	0	0	\N
\.


--
-- Data for Name: coach_certificate; Type: TABLE DATA; Schema: public; Owner: tungdo
--

COPY public.coach_certificate (id, "coachId", certificate, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	1	NLTV	2023-07-22 09:56:16.207437	2023-07-22 09:56:16.207437	\N
2	1	IELTS	2023-07-22 09:56:16.217606	2023-07-22 09:56:16.217606	\N
\.


--
-- Data for Name: coach_skill; Type: TABLE DATA; Schema: public; Owner: tungdo
--

COPY public.coach_skill (id, "coachId", skill, "createdAt", "updatedAt", "deletedAt") FROM stdin;
5	1	Grammar	2023-07-22 09:56:16.211023	2023-07-22 09:56:16.211023	\N
6	1	Lexical	2023-07-22 09:56:16.211839	2023-07-22 09:56:16.211839	\N
\.


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: tungdo
--

COPY public.course (id, "coachId", title, banner, status, level, "maxSlot", cost, description, "zoomLink", "createdAt", "updatedAt", "deletedAt", code, "attendeeNumber") FROM stdin;
\.


--
-- Data for Name: course_attendee; Type: TABLE DATA; Schema: public; Owner: tungdo
--

COPY public.course_attendee (id, "courseId", "userId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: course_discussion; Type: TABLE DATA; Schema: public; Owner: tungdo
--

COPY public.course_discussion (id, "courseId", "userId", rate, comment, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: course_schedule; Type: TABLE DATA; Schema: public; Owner: tungdo
--

COPY public.course_schedule (id, "courseId", "coachId", "startTime", "endTime", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: tungdo
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
2	1688401721212	InitDatabase1688401721212
3	1689750360339	AddCodeColumnToCourse1689750360339
4	1690903870334	AddTotalReviewAndYearExperienceToCoach1690903870334
5	1690943513363	AddStripeIdToCoach1690943513363
6	1690964591049	AddAttendeeNumberToCourse1690964591049
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: tungdo
--

COPY public."user" (id, email, phone, password, description, address, avatar, username, role, "createdAt", "updatedAt", "deletedAt") FROM stdin;
7dc5d904-b58e-4c49-ad6e-3a9e035c5ea9	support@vietlist.com	2493211239	$2b$10$gFd6Aw/LnvIcxN2Rd.KpteS7ftBCIUAShFk4kd8feSHETsRtcB/J2	Enthusiasm with VietLish	\N	\N	Jack David	COACH	2023-07-19 16:03:32.864468	2023-07-19 16:03:32.864468	\N
\.


--
-- Name: coach_certificate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tungdo
--

SELECT pg_catalog.setval('public.coach_certificate_id_seq', 2, true);


--
-- Name: coach_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tungdo
--

SELECT pg_catalog.setval('public.coach_id_seq', 1, true);


--
-- Name: coach_skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tungdo
--

SELECT pg_catalog.setval('public.coach_skill_id_seq', 6, true);


--
-- Name: course_attendee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tungdo
--

SELECT pg_catalog.setval('public.course_attendee_id_seq', 1, false);


--
-- Name: course_discussion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tungdo
--

SELECT pg_catalog.setval('public.course_discussion_id_seq', 1, false);


--
-- Name: course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tungdo
--

SELECT pg_catalog.setval('public.course_id_seq', 1, false);


--
-- Name: course_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tungdo
--

SELECT pg_catalog.setval('public.course_schedule_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tungdo
--

SELECT pg_catalog.setval('public.migrations_id_seq', 6, true);


--
-- Name: course_attendee PK_00f5a34d9f436ad4ee051b5950e; Type: CONSTRAINT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.course_attendee
    ADD CONSTRAINT "PK_00f5a34d9f436ad4ee051b5950e" PRIMARY KEY (id);


--
-- Name: coach_certificate PK_44eaa6a70a99530d72200098dfa; Type: CONSTRAINT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.coach_certificate
    ADD CONSTRAINT "PK_44eaa6a70a99530d72200098dfa" PRIMARY KEY (id);


--
-- Name: course_schedule PK_70befb2f757fc4fbe6aab977f82; Type: CONSTRAINT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.course_schedule
    ADD CONSTRAINT "PK_70befb2f757fc4fbe6aab977f82" PRIMARY KEY (id);


--
-- Name: course_discussion PK_84505932df22a87643dc36208ea; Type: CONSTRAINT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.course_discussion
    ADD CONSTRAINT "PK_84505932df22a87643dc36208ea" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: coach_skill PK_bd0e9b3ee9d89415ee3b36614a8; Type: CONSTRAINT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.coach_skill
    ADD CONSTRAINT "PK_bd0e9b3ee9d89415ee3b36614a8" PRIMARY KEY (id);


--
-- Name: course PK_bf95180dd756fd204fb01ce4916; Type: CONSTRAINT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY (id);


--
-- Name: coach PK_c2ca0875fe0755b197d0147713d; Type: CONSTRAINT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public.coach
    ADD CONSTRAINT "PK_c2ca0875fe0755b197d0147713d" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: tungdo
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

