/*
 * Dummy data:
 */
insert into fashionetoer (`id`, `username`, `email`, `password`, `display_name`, `city`, `country`) values (6, 'admin', 'admin@doe.com', 'f82959d41f9330bd853d3e11345e08eda948544666bfc17806493df9d4b305f0', 'Administrator', 'London', 'UK');
insert into fashionetoer (`id`, `username`, `email`, `password`, `display_name`, `city`, `country`, `id_profile_image`) values (1, 'user1', 'john1@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91', 'Felipe Tonon', 'Florianopolis', 'BR', 1);
insert into fashionetoer (`id`, `username`, `email`, `password`, `display_name`, `city`, `country`, `id_profile_image`) values (2, 'user2', 'john1@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91', 'Caspar Sambrook-Smith', 'London', 'UK', 2);
insert into fashionetoer (`id`, `username`, `email`, `password`, `display_name`, `city`, `country`, `id_profile_image`) values (3, 'user3', 'john1@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91', 'Ondra Winter', 'London', 'UK', 3);
insert into fashionetoer (`id`, `username`, `email`, `password`, `display_name`, `city`, `country`, `id_profile_image`) values (4, 'user4', 'john1@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91', 'Adam Amram', 'London', 'UK', 4);
insert into fashionetoer (`id`, `username`, `email`, `password`, `display_name`, `city`, `country`, `id_profile_image`) values (5, 'user5', 'john1@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91', 'John Doe 6', 'London', 'UK', 5);

INSERT INTO User_roles VALUES (1, 1,'user');
INSERT INTO User_roles VALUES (2, 2,'admin');
INSERT INTO User_roles VALUES (3, 2,'user');
INSERT INTO User_roles VALUES (4, 3,'user');
INSERT INTO User_roles VALUES (5, 4,'user');
INSERT INTO User_roles VALUES (6, 5,'user');
INSERT INTO User_roles VALUES (7, 6,'user');

-- user 2 leaving a comment for user 1
insert into comment (`id`, `id_user`, `content`, `dt_comment`, `status`) values (1, 2, 'I like your pictures and your profile, man!', '2014-03-09 12:30:00', 'ACTIVE');
insert into comment_parent values (1, null, 1, null, 'USER');	
-- user 1 leaving a reply for comment above
insert into comment (`id`, `id_user`, `content`, `dt_comment`, `status`) values (2, 1, 'Thanks!', '2014-03-09 12:30:00', 'ACTIVE');
insert into comment_parent values (2, 1, null, null, 'COMMENT');

--user 1 liking comment 1
insert into like_comment values (1, 1, 1);

insert into image (`id`, `id_user`, `filename`, `file_extension`, `date`, `description`) 
	values (1, 1, 'felipe', 'jpg', '2014-04-17 14:06:00', 'First month in London');
insert into image (`id`, `id_user`, `filename`, `file_extension`, `date`, `description`) 
	values (2, 2, 'casp', 'jpg', '2014-04-17 14:06:00', 'Another one of Casp''s strange pics');
insert into image (`id`, `id_user`, `filename`, `file_extension`, `date`, `description`) 
	values (3, 3, 'ondrej', 'jpg', '2014-04-17 14:06:00', 'Ondra posing');
insert into image (`id`, `id_user`, `filename`, `file_extension`, `date`, `description`) 
	values (4, 4, 'adam', 'jpg', '2014-04-17 14:06:00', 'Some avatar');
insert into image (`id`, `id_user`, `filename`, `file_extension`, `date`, `description`) 
	values (5, 5, 'user_zero-profile_picture', 'jpg', '2014-04-17 14:06:00', 'My cool picture from last winter!');

