create table acceptors(
	id int not null auto_increment,
	name varchar(255) not null,
	short_name varchar(255) not null,
	primary key (id)
)

insert into acceptors (id, name, short_name) VALUES
	(1, 'အိမ်', 'အိမ်'),
	(2, 'အေးအေးခိုင်', 'အေး'),
	(3, 'စန်းစန်းထွေး', 'စန်း'),
	(4, 'ဥမ္မာဝင်း', 'ဥမ္မာ')
;