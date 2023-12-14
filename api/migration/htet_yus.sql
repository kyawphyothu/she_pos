CREATE TABLE htet_yus (
  id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  gold VARCHAR(255) NULL,
  weight INT NULL,
  price INT NOT NULL,
  date DATETIME NOT NULL,
  description LONGTEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX (owner_id),
  FOREIGN KEY (owner_id) REFERENCES orders(id) on delete cascade
);
