/*
 * Foreign keys and any constraints haven't been included yet
 * 
 */

create table fashionetoer (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`username` varchar(100) not null,
	`email` varchar(100) not null,
	`password` varchar(200) not null
	
);

create table image (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`filename` varchar(200) not null, 
	`description` varchar(100) not null,
	`type` varchar(50) not null
);

create table item (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`type` varchar(50) not null
);

create table badge (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`id_image` int(11) unsigned not null,
	`type` varchar(50) not null
);

create table item_image (
	`id_item` int(11) unsigned not null,
	`id_image` int(11) unsigned not null
);

create table fashionetoer_image (
	`id_fashionetoer` int(11) unsigned not null,
	`id_image` int(11) unsigned not null
);


create table commentary (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`id_fashionetoer` int(11) unsigned not null,
	`id_image` int(11) unsigned not null
);

create table commentary_fashionetoer (
	`id_commentary` int(11) unsigned not null,
	`id_fashionetoer` int(11) unsigned not null
);

create table commentary_item (
	`id_commentary` int(11) unsigned not null,
	`id_item` int(11) unsigned not null
);

create table like_item (
	`id_fashionetoer` int(11) unsigned not null,
	`id_item` int(11) unsigned not null
);

create table like_commentary (
	`id_fashionetoer` int(11) unsigned not null,
	`id_commentary` int(11) unsigned not null
);

/*
 * Dummy data:
 */
insert into fashionetoer (`username`, `email`, `password`) values ('John Doe', 'john@doe.com', 'pass123');