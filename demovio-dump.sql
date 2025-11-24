--
-- PostgreSQL database dump
--

\restrict gidFBrTbSevQ3V4oXIouUXKDTPVUFqY19t0UL5hh2YaztvmQ7qOFf0uibGkWYkk

-- Dumped from database version 18.0 (Postgres.app)
-- Dumped by pg_dump version 18.1 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: devio
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	57cab11fff5fd9609dccca3162a742054ab4a0c5e9bb01fc3e33037d1b2b4f25	1760694763289
2	ae5947e798c94644b5a3d0ff1b47ff55c261fbe8ac6ea873851c7402d7d386c6	1760788579156
3	650c6589df9ba31492ae3c0aa4dfa4734cac7b355c66a3c39af1cf178d715cdb	1760790952387
4	e9953b5fb92ef174ede2cb6a5756fd478f635516646c854a7bb9d47df43cd3e9	1760792469967
5	c9dd57b53f42e623718419772927d4250504e9f15a41799a05added9d76fac19	1760793167740
6	6d65755750580dc16d8761041f88cbfb380d4d05f960848c623e691ba5927b16	1760796246984
7	9941e41ebb8b22351939e3b8f5e435199a8ccbafc8e04f01c62574724e683770	1760882425765
8	d3afee4a961abce577b1d22e00dcd153b9d7127eb69c66c34e5dfffa759e4df7	1761325887679
9	1ab712820223ceff9d41dd4da14c17128bfa287a83ea368d15d5eacbccc405ef	1761737162920
10	f4378d7a35a6f036fe34e980bea209776cf5305cd987ee4a8600fbc3a9263fdd	1763111807206
11	e15d99a7f505ee20a6cffd13ea565d4b8e0149f73805f62865be5c0d41b45745	1763115956871
12	8a4f8ecbf44d9ba1fd6eea7eaaf23efd766b32e66bb26a7a480cd5ecba5b7dc0	1763126861894
13	be0da5b7c072f6d4aaa0ca4999ffbd0428003eb1f9a660ef81ffc64da07c620d	1763205739558
14	7edbfe7b75665b9eb0a381bdbfd34661b45172d51ada3d095ab022298758c6f8	1763305468474
15	f82f09792a2bd71a8e923dfa28c9b262f0f0c0ec66e320c4fcecdd19a43d42d0	1763658962062
\.


--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: devio
--

COPY public.players (id, uuid, name, password, skin, citizenship, pronouns, contact, "issueDate", "isActivated", description, "isBanned", favorites, "lastOnline", "subscriptionFrequency", administrator, "getTelegramNotifications", "notificationsInvites", "notificationsServerUpdates", "notificationsPlayersActivity", "appliedSkin", "currentlyOnline", "lastDownloadedBuild", "haveLicense", "isDeactivated") FROM stdin;
92	399fa245141a3d8f95e66da285cf4eba	Dimanius100	$2y$10$1VvJou9nGkgj6AcMs.t3IeXiQRdy.rx/DGDvNhUmIfOGDYqo1Iz5q	/skins/Dimanius100.png	{"code": "GE", "date": 1735516800000, "address": "-", "protocol": "№05:3779"}	он/его	Dimanius100	2024-12-30 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
105	d3bb911e24783140af82aca6bf12935e	mihas	$2y$10$9BdbKeCx.N/uzVfRJXH1a.NSmjoUDY/4sr.k/bxJvS1vhH9yfwbvm		{"code": "OH", "date": 1758067200000, "address": "-", "protocol": "№03:7073"}	они/их	mihas228	2025-09-17 00:00:00+02	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
86	630ae9a958c839f2928579c4719d49e3	lionleo838	$2y$10$53mmVLDgQ9.yzjjn0nC1N.uCDASMVERk7wiSz5H3c05w9hfe.ViNu	/skins/lionleo838.png	{"code": "OH", "date": 1732752000000, "address": "-", "protocol": "№04:1062"}	Лев-леон Александрович	Lionleo228	2024-11-28 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
87	d5edf6c9faab3351896938ed4e8cc534	batalayar	$2y$10$xkpJh7N3ck0IUnfpgEUSdOzrPYXfJxlvo/C95HLCoR.uQEqiKGnFy		{"code": "SH", "date": 1732838400000, "address": "4/5 Бамбуковый Вершитель", "protocol": "№03:8899"}	он/его	batalayar	2024-11-29 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
88	a15e3425ba613eec84a3dfd70332cb90	VityaSchel	$2y$10$A4DYGmJJulXzynvt7WN/b.BeXVmuEn7Qfhf83rX6waBut5ZMxroTW		{"code": "NY", "date": 1732838400000, "address": "-", "protocol": "№00:8444"}	🍆/🍑	vityaschel	2024-11-29 00:00:00+01	t	\N	f	[]	2025-10-18 18:32:03.891+02	43200	t	f	f	f	f	f	f	\N	f	f
90	07a5f9c4928a3a54a8bfafa4447b4cf9	SoftableRass	$2y$10$wAMXLZ3JImKAT5esWMtfXu0cBnSqONFQhT.DiiOTPRtU/QoyOCBD2	/skins/SoftableRass.png	{"code": "SH", "date": 1733529600000, "address": "14 Бамбуковый Вершитель", "protocol": "№03:8306"}	он/его	SoftableRass	2024-12-07 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
81	0c55a0217ae63a978d1fcd318c872253	devio10	$2y$10$APRnfZgW4t3C1xiD2azTz.yRYQ/T1uagUxxaowxYD.QfotPpZh6UK	/skins/devio10.png	{"code": "SH", "date": 1730332800000, "address": "11 Бамбуковый Вершитель", "protocol": "№03:4451"}	он/его	devio101	2024-10-29 23:20:46+01	t	Создатель Demovio, а также основатель Шанхая и Калифорнии. Located in Barcelona, Spain 🇪🇸	f	["VityaSchel"]	2025-10-18 14:23:25.756+02	43200	t	f	f	t	t	t	f	{"minimap": true, "version": "2.6.1", "optimized": true}	f	f
85	d5fe08eeb04a3f3794313787c707c4e5	PeQueno	$2y$10$2Y0pNgRwT.WBWypApZAu3exJwE3mGGZP59MfXBzYtPc3Bmlj0VerO	/skins/PeQueno.png	{"code": "SH", "date": 1732838400000, "address": "10 Бамбуковый Вершитель", "protocol": "№03:1974"}	он/его	ioioioioiioii	2024-11-28 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
89	f5f74477c0f539608c0567a9850da36f	Noname_Artist	$2y$10$opvp54deNPmhrAh/nDEb6uH5Sm8s3ObbDGebHmSYw8O9yXhC8sz6O	/skins/Noname_Artist.png	{"code": "SH", "date": 1733184000000, "address": "-", "protocol": "№03:3131"}	он/его	artistnoname	2024-12-03 00:00:00+01	t	\N	f	[]	2024-08-10 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
91	12b74a06986a33e5851fcaa9fd7a9470	alinkaprogamer	$2y$10$5x5n7ZqGj.L.EtqbpSbS8.2arM30BlaZsxnP8NP2hTc.WXaXWz39e	/skins/alinkaprogamer.png	{"code": "SH", "date": 1735430400000, "address": "15 Бамбуковый Вершитель", "protocol": "№03:5409"}	она/её	beparasocial	2024-12-29 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
93	776bc61f48cd360d8acaa52ed0225f67	Dr_Coujer	$2y$10$Faldt/eaICF4lcMb8eLQg.bmMVWf2Ss1Jo88u8M6lkrvqorEtyFLC		{"code": "GE", "date": 1735776000000, "address": "-", "protocol": "№05:9462"}	он/его	Dead_Cells_Boy	2025-01-02 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
99	e6cbb01a01b430a7ba2092fc0b638f61	wkey2000	$2y$10$ogY6zgkVVJ2Qq8oFtuHczuUGBwzGnVbwl.zZxUaQLfjK30grjG8cq	/skins/wkey2000.png	{"code": "SH", "date": 1740614400000, "address": "-", "protocol": "№03:2698"}	он/его	goose_52_52	2025-02-27 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
101	47b2efeb4c523edcb0fd8dcbcbf1ce80	DAiSYWhiSPER	$2y$10$w4TMMoAh1fo0wnDz90zpG.uCjHvlUUudk5neaTUVdkmytCpwd7i4W		{"code": "CA", "date": 1744934400000, "address": "-", "protocol": "№01:2140"}	она/её	daisywhspr	2025-04-18 00:00:00+02	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
103	947d3b4a0321346c9870ef30c7fe691f	besty	$2y$10$L6vckL08.8RGFmZqpJ3Bi.m9vN7Uz6mPM.MsH9clGDRyv6iD6p5fW	/skins/besty.png	{"code": "GE", "date": 1755129600000, "address": "-", "protocol": "№05:7100"}	она/её	bez_golubey	2025-08-14 00:00:00+02	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
123	6fd4d0d664db33f6b67fd985dc09b75b	AFL04	$2y$10$Duu8RfJGTiWNznhpauFnVObNgE.jatUr.B3e6aHGvb86IsdF8hHD6	/skins/AFL04.png	{"code": "CA", "date": 1761004800000, "address": "-", "protocol": "№04:5744"}	он/его	Filipp1604	2025-11-23 16:38:17.015+01	t	\N	f	[]	\N	43200	f	f	f	f	f	f	f	\N	f	f
84	7f4fd27eaf643b1a8022b6e9373c122c	anastasiz2009	$2y$10$mxj8yzsxpDgxJ3n1PQnEfOmgRaarQLRi/kdr1Pd5YDSf/cZ23n/BK	/skins/anastasiz2009.png	{"code": "CA", "date": 1732838400000, "address": "Pink House 2", "protocol": "№01:3184"}	она/её	nastyatershukova	2024-11-28 00:00:00+01	t	я дура ебаная	f	[]	2025-10-18 18:32:03.891+02	43200	t	f	f	f	f	f	f	\N	f	f
83	2147c0a9f8e9346ab20c78d5bf25a5a4	cosy4xy	$2y$10$/XlTpl2WBGaHMh80oJCxbOVI1kebQPHenDx8WJ3mO.r/3HTBjq1fG		{"code": "OH", "date": 1732838400000, "address": "Ущелье", "protocol": "№04:3952"}	он/его	cosy4xy	2024-11-28 00:00:00+01	t	\N	f	[]	2025-10-19 21:01:01.246+02	43200	f	f	f	f	f	f	f	\N	f	f
98	beaf646556543788a61c3536b9bf0972	pri4ina_triaski	$2y$10$AHP4TCsdWCC9A2WFQwfQHuOwISfCoVwiT4Cct2uTC04fBCYI3Kfai	/skins/pri4ina_triaski.png	{"code": "SH", "date": 1740614400000, "address": "-", "protocol": "№03:1205"}	он/его	RobertZXczxc	2025-02-27 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
100	da7e68d1b1243c42aeaeea2ae9fada1c	ZGGOLDDZ	$2y$10$wqP17m4Uzody6VXDtIwh0OVVsPeDn2rnp9280m3CrfwJndgAqlTje	/skins/ZGGOLDDZ.png	{"code": "OH", "date": 1741564800000, "address": "Ущелье", "protocol": "№04:5425"}	он/его	GGOLDD8	2025-03-03 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
102	71b4ebf44e423f4c99d72b38e1ffcf99	sosiska_pv	$2y$10$8NaSXOLxSG52tDXu7l1x1.8ej4Frfdi7IpCo1gSdEg0.3Duppvj6i		{"code": "CA", "date": 1745539200000, "address": "-", "protocol": "№01:3344"}	он/его	sosiska2020	2025-04-25 00:00:00+02	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
104	91236a3a858038c0ab3bc455f4e54b1c	hloth	$2y$10$AgvfM/4.YTUQwc3/YOCLEeKZvyXivLN.s.SpsjewzYI6V33DvXegy	/skins/hloth.png	{"code": "GE", "date": 1756598400000, "address": "-", "protocol": "№05:9941"}		TikTokioBot	2025-08-31 00:00:00+02	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
106	e7e5ea5c157c378aab42b5d542dafe53	YourOwnSun	$2y$10$mLZhxHMDf3T/W9V/35br3eA2ogpi3aWkkomTr/yg9ewsSdeQuCx4i		{"code": "CA", "date": 1758153600000, "address": "-", "protocol": "№04:1316"}	он/его	ShpyakinAndrey	2025-09-18 00:00:00+02	t	\N	f	[]	2025-10-01 12:00:00+02	43200	f	f	f	f	f	f	f	\N	f	f
94	c710cff17bc633d3b12913a9c06b7431	Geni9026	$2y$10$ItTD6JNvD2w.4ZdIqgrT1eii20VlUSEU0zDoq113qy9mx.XAS6Bwe		{"code": "GE", "date": 1736640000000, "address": "-", "protocol": "№05:4176"}	он/его	genri532	2025-01-12 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
95	323f0a03961e3190bf6c35f746c25abf	marishaPRO	$2y$10$c2xMsTUwoel4llt3BklXDOjrzp5vrlXAP.dflHTd4g2MD.cHQUjZ6	/skins/marishaPRO.png	{"code": "CA", "date": 1740441600000, "address": "г. Похоти, 69", "protocol": "№01:8985"}	она/её	zina_bumazhkina	2025-02-24 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
96	5187797d7a443dc294cc3cd0c8301163	damir1240	$2y$10$nMN9.PcrZfWpo9m9CJkWhuv8ulnVJiCINri1j.qdET0z6izQs3SF2	/skins/damir1240.png	{"code": "SH", "date": 1740441600000, "address": "-", "protocol": "№03:3824"}	он/его	Da_mir1240	2025-02-25 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
97	cce92a7f771337788b8c3ab29e5a74a4	YuKi812	$2y$10$8fPmJrsi2gkjqFTvdaKOU.imilPYVglNrKgVapStT3ym6zq2Dbtxu	GOD_KAIPI47	{"code": "CA", "date": 1740528000000, "address": "г. Похоти, 69", "protocol": "№01:3467"}	они/их	Phrnvs	2025-02-26 00:00:00+01	t	\N	f	[]	2025-09-01 10:00:00.596837+02	43200	f	f	f	f	f	f	f	\N	f	f
\.


--
-- Data for Name: citizenship_applications; Type: TABLE DATA; Schema: public; Owner: devio
--

COPY public.citizenship_applications (id, "playerName", accepted, "acceptanceDate", "desiredCitizenship", "creationDate", note, "previousCitizenship") FROM stdin;
14	devio10	t	2025-10-31 12:17:25.077+01	\N	\N	\N	{"code": "CA", "date": "2025-10-30T15:13:10.040Z", "address": "-", "protocol": "№03:9246"}
\.


--
-- Data for Name: notify_subscriptions; Type: TABLE DATA; Schema: public; Owner: devio
--

COPY public.notify_subscriptions ("receiverName", "targetName", "lastSent") FROM stdin;
devio10	ZGGOLDDZ	\N
devio10	DAiSYWhiSPER	\N
devio10	anastasiz2009	\N
devio10	besty	\N
devio10	cosy4xy	\N
devio10	Noname_Artist	\N
devio10	VityaSchel	\N
\.


--
-- Data for Name: push_subscriptions; Type: TABLE DATA; Schema: public; Owner: devio
--

COPY public.push_subscriptions (endpoint, p256dh, auth, "expiresAt", "receiverName") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: devio
--

COPY public.sessions (id, name) FROM stdin;
pD9GMLNq3I3cBuvwMVNwH	devio10
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: devio
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 15, true);


--
-- Name: citizenship_applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devio
--

SELECT pg_catalog.setval('public.citizenship_applications_id_seq', 14, true);


--
-- Name: players_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devio
--

SELECT pg_catalog.setval('public.players_id_seq', 123, true);


--
-- PostgreSQL database dump complete
--

\unrestrict gidFBrTbSevQ3V4oXIouUXKDTPVUFqY19t0UL5hh2YaztvmQ7qOFf0uibGkWYkk

