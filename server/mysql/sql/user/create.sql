CREATE TABLE `users` (
	`num` INT(10) NOT NULL AUTO_INCREMENT,
	`id` VARCHAR(30) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`email` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`phone` VARCHAR(15) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`login_token` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`role` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`gender` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`img` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`num`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;