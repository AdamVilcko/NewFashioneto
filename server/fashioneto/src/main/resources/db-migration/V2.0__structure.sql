/*
 * Foreign keys and any constraints haven't been included yet
 * 
 *	fashionetoer = user (user is a reserved word to be avoided on table names)
 *
 */

create table fashionetoer (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`username` varchar(100),
	`email` varchar(100) not null,
	`password` varchar(200),
	`display_name` varchar(100),
	`id_profile_image` int(11) unsigned null,
	`city` varchar(100),
	`country` varchar(100),
	`status` varchar(20)  not null,
	UNIQUE KEY `email` (`email`)
);

create table invitation (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`id_user` int(11) unsigned not null,
	`id_invited_user` int(11) unsigned not null,
	`date` DATETIME not null,
	UNIQUE KEY `id_invitations` (`id_user`, id_invited_user)
);

create table album (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`id_user` int(11) unsigned not null,
	`name` varchar(100) not null
);

create table image (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`id_user` int(11) unsigned not null,
	`id_album` int(11) unsigned not null,
	`filename` varchar(200) not null,
	`file_extension` varchar(4) not null,
	`date` DATETIME not null,
	`description` varchar(100) null
);

create table follow_user (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`id_user` int(11) unsigned not null,
	`id_followed_user` int(11) unsigned not null,
	`date` DATETIME not null
);

create table item (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`indexing_date` DATETIME not null
);

create table comment (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`id_user` int(11) unsigned not null,
	`dt_comment` DATETIME not null,
	`status` varchar(20) not null,
	`content` varchar(200) not null
);

create table comment_parent (
	`id_comment` int(11) unsigned not null primary key,
	`id_parent_comment` int(11) unsigned,
	`id_parent_user` int(11) unsigned,
	`id_parent_image` int(11) unsigned,
	`id_parent_item` int(11) unsigned,
	`parent_type` varchar(50) not null
);

create table like_comment (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`id_user` int(11) unsigned not null,
	`id_comment` int(11) unsigned not null
);

create table like_image (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`id_user` int(11) unsigned not null,
	`id_image` int(11) unsigned not null
);

CREATE TABLE User_roles
(
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
   `User_id` int(11) unsigned not null,
   `Roles` varchar(50)
);

-- FEED TABLES:
create table feed (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`id_user` int(11) unsigned not null,
	`id_like_item` int(11) unsigned not null,
	`date` DATETIME not null,
	`type` varchar(20) not null
);

create table like_item (
	`id` int(11) unsigned AUTO_INCREMENT not null primary key,
	`id_feed` int(11) unsigned not null,
	`id_user` int(11) unsigned not null,
	`id_item` int(11) unsigned not null
);