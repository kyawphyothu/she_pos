CREATE TABLE orders (
	id int NOT NULL AUTO_INCREMENT,
	code VARCHAR(255) NOT NULL,
	name varchar(255) NOT NULL,
	phone VARCHAR(255) NOT NULL,
	village_id INT NOT NULL,
	gold VARCHAR(255) NOT NULL,
	weight INT NOT NULL,
	acceptor_id INT NOT NULL,
	date DATETIME NOT NULL,
	redeem BOOLEAN NOT NULL DEFAULT FALSE,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	INDEX (code),
	INDEX (village_id),
	INDEX (acceptor_id),
	FOREIGN KEY (village_id) REFERENCES villages (id),
	FOREIGN KEY (acceptor_id) REFERENCES acceptors (id)
);