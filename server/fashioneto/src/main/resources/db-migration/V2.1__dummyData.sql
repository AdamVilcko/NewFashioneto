/*
 * Dummy data:
 */
insert into fashionetoer (`id`, `username`, `email`, `password`, `display_name`, `city`, `country`, `id_profile_image`, `status`) values (1, 'user1', 'john1@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91', 'Felipe Tonon', 'Florianopolis', 'BR', 1, 'ACTIVE');
insert into fashionetoer (`id`, `username`, `email`, `password`, `display_name`, `city`, `country`, `id_profile_image`, `status`) values (2, 'user2', 'john2@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91', 'Caspar Sambrook-Smith', 'London', 'UK', 2, 'ACTIVE');
insert into fashionetoer (`id`, `username`, `email`, `password`, `display_name`, `city`, `country`, `id_profile_image`, `status`) values (3, 'user3', 'john3@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91', 'Ondra Winter', 'London', 'UK', 3, 'ACTIVE');
insert into fashionetoer (`id`, `username`, `email`, `password`, `display_name`, `city`, `country`, `id_profile_image`, `status`) values (4, 'user4', 'john4@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91', 'Adam Amram', 'London', 'UK', 4, 'ACTIVE');
insert into fashionetoer (`id`, `username`, `email`, `password`, `display_name`, `city`, `country`, `id_profile_image`, `status`) values (5, 'user5', 'john5@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91', 'John Doe 6', 'London', 'UK', 5, 'ACTIVE');
insert into fashionetoer (`id`, `username`, `email`, `password`, `display_name`, `city`, `country`, `status`) values (6, 'admin', 'admin@doe.com', 'f82959d41f9330bd853d3e11345e08eda948544666bfc17806493df9d4b305f0', 'Administrator', 'London', 'UK', 'ACTIVE');

insert into fashionetoer (`id`, `email`, `status`) values (7, 'invited@doe.com', 'INVITED');

insert into invitation (`id`, `id_user`, `id_invited_user`, `date`) values (1, 1, 7, '2014-07-26 17:27:00');

INSERT INTO User_roles VALUES (1, 1,'user');
INSERT INTO User_roles VALUES (2, 2,'admin');
INSERT INTO User_roles VALUES (3, 2,'user');
INSERT INTO User_roles VALUES (4, 3,'user');
INSERT INTO User_roles VALUES (5, 4,'user');
INSERT INTO User_roles VALUES (6, 5,'user');
INSERT INTO User_roles VALUES (7, 6,'user');

-- user 2 leaving a comment for user 1
insert into comment (`id`, `id_user`, `content`, `dt_comment`, `status`) values (1, 2, 'I like your pictures and your profile, man!', '2014-03-09 12:30:00', 'ACTIVE');
insert into comment_parent values (1, null, 1, null, null, 'USER');	
-- user 1 leaving a reply for comment above
insert into comment (`id`, `id_user`, `content`, `dt_comment`, `status`) values (2, 1, 'Thanks!', '2014-03-09 12:30:00', 'ACTIVE');
insert into comment_parent values (2, 1, null, null, null, 'COMMENT');


--user 1 liking comment 1
insert into like_comment values (1, 1, 1);

insert into follow_user (`id_user`, `id_followed_user`, `date`) values (2, 1, '2014-04-22 21:00:00');
insert into follow_user (`id_user`, `id_followed_user`, `date`) values (3, 1, '2014-04-22 21:00:00');
insert into follow_user (`id_user`, `id_followed_user`, `date`) values (4, 1, '2014-04-22 21:00:00');
insert into follow_user (`id_user`, `id_followed_user`, `date`) values (5, 1, '2014-04-22 21:00:00');
insert into follow_user (`id_user`, `id_followed_user`, `date`) values (6, 1, '2014-04-22 21:00:00');
insert into follow_user (`id_user`, `id_followed_user`, `date`) values (1, 2, '2014-04-22 21:00:00');
insert into follow_user (`id_user`, `id_followed_user`, `date`) values (3, 2, '2014-04-22 21:00:00');