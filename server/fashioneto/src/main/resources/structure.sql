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


create table comment (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`id_fashionetoer` int(11) unsigned not null,
	`content` varchar(200) not null
);

create table comment_parent (
	`id_comment` int(11) unsigned not null primary key,
	`id_parent` int(11) unsigned not null,
	`parent_type` varchar(50) not null
);

create table like_item (
	`id_fashionetoer` int(11) unsigned not null,
	`id_item` int(11) unsigned not null
);

create table like_comment (
	`id_fashionetoer` int(11) unsigned not null,
	`id_commentary` int(11) unsigned not null
);

/*
 * Dummy data:
 */
insert into fashionetoer (`id`, `username`, `email`, `password`) values (1, 'John Doe1', 'john1@doe.com', '1pass123');
insert into fashionetoer (`id`, `username`, `email`, `password`) values (2, 'John Doe2', 'john2@doe.com', '2pass123');


-- user 2 leaving a comment for user 1
insert into comment (`id`, `id_fashionetoer`, `content`) values (1, 2, 'I like your pictures and your profile, man!');
insert into comment_parent values (1, 1, 'USER');	
-- user 1 leaving a reply for comment above
insert into comment (`id`, `id_fashionetoer`, `content`) values (2, 1, 'Thanks!');
insert into comment_parent values (2, 1, 'COMMENT');		