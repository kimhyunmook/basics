CREATE TABLE `board` (
	`w_id` INT(10) NOT NULL AUTO_INCREMENT,
	`w_num` INT(10) NOT NULL DEFAULT '0',
	`w_parent` INT(10) NOT NULL DEFAULT '0',
	`subject` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`content` VARCHAR(500) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`w_comment` INT(10) NOT NULL DEFAULT '0',
	`w_time` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`user_id` VARCHAR(30) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`board_type` VARCHAR(30) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`w_id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=16
;