CREATE TABLE `users` (
    `num` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id` varchar(30) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(100) NOT NULL,
    `name` varchar(20) NOT NULL,
    `phone` varchar(15) NOT NULL,
    `login_token` varchar(255),
    `role` int NOT NULL DEFAULT 0
); 