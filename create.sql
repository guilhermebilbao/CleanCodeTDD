drop table cccat9.product;
drop table cccat9.coupon;
drop schema cccat9;

create schema cccat9;
create table cccat9.product (
	id_product integer primary key,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight numeric
);

insert into cccat9.product (id_product, description, price, width, height, length, weight) values (1, 'A', 1000, 100, 30, 10, 3);
insert into cccat9.product (id_product, description, price, width, height, length, weight) values (2, 'B', 5000, 50, 50, 50, 22);
insert into cccat9.product (id_product, description, price, width, height, length, weight) values (3, 'C', 30, 10, 10, 10, 0.9 );

create table cccat9.coupon (
	code text primary key,
	percentage numeric,
	expire_date timestamp
);

insert into cccat9.coupon (code, percentage, expire_date) values ('VALE20', 20, '2023-04-03T12:00:00');
insert into cccat9.coupon (code, percentage, expire_date) values ('VALE20_EXPIRED', 20, '2023-01-03T12:00:00');
