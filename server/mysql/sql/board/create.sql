CREATE TABLE `?` (
	`w_id` INT NOT NULL AUTO_INCREMENT,
	`w_num` INT NOT NULL DEFAULT '0',
	`w_parent` INT NOT NULL DEFAULT '0',
	`subject` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`content` VARCHAR(9999) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`w_comment` INT NOT NULL DEFAULT '0',
	`w_time` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`user_id` VARCHAR(30) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`hit` INT NOT NULL DEFAULT '0',
	`board_type` VARCHAR(30) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`w_id`) USING BTREE		
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;
