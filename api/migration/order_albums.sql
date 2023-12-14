create table order_albums(
	id int auto_increment not null,
	album_id int not null,
	order_id int not null,
	primary key (id),
	index (album_id),
	index (order_id),
	foreign key (album_id) references albums(id) on delete cascade,
	foreign key (order_id) references orders(id) on delete cascade
);