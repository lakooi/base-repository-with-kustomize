-- SPDX-FileCopyrightText: 2022 The Aalto Grades Developers
--
-- SPDX-License-Identifier: MIT

INSERT INTO public.course_instance (course_id, sisu_course_instance_id, grading_type, starting_period, ending_period, teaching_method, responsible_teacher, min_credits, max_credits, start_date, end_date, created_at, updated_at) VALUES
(1, 'aalto-CUR-165388-3874205', 'NUMERICAL', 'I', 'II', 'LECTURE', 1, 5, 5, '2022-09-05', '2022-12-09', NOW(), NOW()),
(2, 'aalto-CUR-165768-3874205', 'PASSFAIL', 'III', 'IV', 'LECTURE', 2, 5, 5, '2023-01-05', '2023-04-23', NOW(), NOW()),
(3, 'aalto-CUR-263388-3874205', 'NUMERICAL', 'I', 'II', 'LECTURE', 3, 5, 5, '2022-09-03', '2022-12-11', NOW(), NOW()),
(3, null, 'NUMERICAL', 'I', 'II', 'LECTURE', 3, 5, 5, '2021-09-03', '2021-12-11', NOW(), NOW()),
(4, 'aalto-CUR-865388-3874205', 'NUMERICAL', 'I', 'II', 'LECTURE', 3, 5, 5, '2021-09-03', '2021-12-11', NOW(), NOW()),
(4, 'aalto-CUR-965388-3874205', 'NUMERICAL', 'I', 'II', 'LECTURE', 3, 5, 5, '2020-09-03', '2020-12-11', NOW(), NOW()),
(4, 'aalto-CUR-465338-3874205', 'PASSFAIL', 'II', 'II', 'EXAM', 4, 5, 5, '2022-12-03', '2022-12-03', NOW(), NOW()),
(5, null, 'NUMERICAL', 'III', 'V', 'LECTURE', 7, 5, 5, '2023-02-06', '2023-05-19', NOW(), NOW()),
(6, 'aalto-CUR-165768-3854405', 'PASSFAIL', 'II', 'II', 'LECTURE', 6, 5, 5, '2023-02-12', '2023-02-12', NOW(), NOW()),
(1, 'aalto-CUR-165458-3879305', 'PASSFAIL', 'I', 'II', 'LECTURE', 8, 5, 5, '2022-09-05', '2022-12-09', NOW(), NOW()),
(2, null, 'NUMERICAL', 'III', 'IV', 'LECTURE', 2, 5, 5, '2023-01-05', '2023-04-23', NOW(), NOW()),
(1, 'aalto-CUR-169778-3874205', 'PASSFAIL', 'I', 'II', 'LECTURE', 9, 5, 5, '2022-09-03', '2022-12-11', NOW(), NOW()),
(4, 'aalto-CUR-165389-3474205', 'NUMERICAL', 'II', 'II', 'EXAM', 10, 5, 5, '2022-12-03', '2022-12-03', NOW(), NOW()),
(5, null, 'NUMERICAL', 'III', 'V', 'LECTURE', 8, 5, 5, '2023-02-06', '2023-05-19', NOW(), NOW()),
(6, 'aalto-CUR-165389-3874205', 'NUMERICAL', 'III', 'III', 'EXAM', 6, 5, 5, '2023-02-20', '2023-02-20', NOW(), NOW()),
(4, 'aalto-CUR-134385-3874205', 'PASSFAIL', 'II', 'II', 'EXAM', 4, 5, 5, '2022-12-03', '2022-12-03', NOW(), NOW()),
(1, 'aalto-CUR-165078-3864205', 'NUMERICAL', 'III', 'V', 'LECTURE', 7, 5, 5, '2023-02-06', '2023-05-19', NOW(), NOW()),
(6, 'aalto-CUR-165488-3869805', 'PASSFAIL', 'II', 'II', 'EXAM', 6, 5, 5, '2023-02-28', '2023-02-28', NOW(), NOW()),
(1, null, 'PASSFAIL', 'I', 'II', 'LECTURE', 8, 5, 5, '2022-05-05', '2022-12-09', NOW(), NOW()),
(5, 'aalto-CUR-169788-3875405', 'NUMERICAL', 'III', 'IV', 'LECTURE', 2, 5, 5, '2023-01-05', '2023-04-23', NOW(), NOW()),
(1, null, 'PASSFAIL', 'V', 'V', 'EXAM', 9, 5, 5, '2023-06-03', '2023-06-03', NOW(), NOW());