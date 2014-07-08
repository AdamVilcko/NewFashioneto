insert into album (`id`, `id_user`, `name`)
	values (1, 1, 'Profile Pictures');
insert into album (`id`, `id_user`, `name`)
	values (2, 2, 'Profile Pictures');
insert into album (`id`, `id_user`, `name`)
	values (3, 3, 'Profile Pictures');
insert into album (`id`, `id_user`, `name`)
	values (4, 4, 'Profile Pictures');
insert into album (`id`, `id_user`, `name`)
	values (5, 5, 'Profile Pictures');
insert into album (`id`, `id_user`, `name`)
	values (12, 6, 'Uploads');	

insert into album (`id`, `id_user`, `name`)
	values (6, 1, 'Uploads');
insert into album (`id`, `id_user`, `name`)
	values (7, 2, 'Uploads');
insert into album (`id`, `id_user`, `name`)
	values (8, 3, 'Uploads');
insert into album (`id`, `id_user`, `name`)
	values (9, 4, 'Uploads');
insert into album (`id`, `id_user`, `name`)
	values (10, 5, 'Uploads');	
insert into album (`id`, `id_user`, `name`)
	values (11, 6, 'Uploads');	

insert into image (`id`, `id_user`, `id_album`, `filename`, `file_extension`, `date`, `description`) 
	values (1, 1, 1, 'felipe', 'jpg', '2014-04-17 14:06:00', 'My first month in London');
insert into image (`id`, `id_user`, `id_album`, `filename`, `file_extension`, `date`, `description`) 
	values (2, 2, 2, 'casp', 'jpg', '2014-04-17 14:06:00', 'Another one of Casp''s strange pics');
insert into image (`id`, `id_user`, `id_album`, `filename`, `file_extension`, `date`, `description`) 
	values (3, 3, 3, 'ondrej', 'jpg', '2014-04-17 14:06:00', 'Ondra posing');
insert into image (`id`, `id_user`, `id_album`, `filename`, `file_extension`, `date`, `description`) 
	values (4, 4, 4, 'adam', 'jpg', '2014-04-17 14:06:00', 'Some avatar');
insert into image (`id`, `id_user`, `id_album`, `filename`, `file_extension`, `date`, `description`) 
	values (5, 5, 5, 'user_zero-profile_picture', 'jpg', '2014-04-17 14:06:00', 'My cool picture from last winter!');

	
-- user 2 commenting on user1's profile picture
insert into comment (`id`, `id_user`, `content`, `dt_comment`, `status`) values (3, 2, 'You look mingin'' in this pic bruv!', '2014-07-07 12:27:00', 'ACTIVE');
insert into comment_parent values (3, null, null, 1, null, 'IMAGE');	