/*
 * Dummy data:
 */
insert into fashionetoer (`id`, `username`, `email`, `password`) values (2, 'admin', 'admin@doe.com', 'f82959d41f9330bd853d3e11345e08eda948544666bfc17806493df9d4b305f0');
insert into fashionetoer (`id`, `username`, `email`, `password`) values (1, 'user1', 'john1@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91');
insert into fashionetoer (`id`, `username`, `email`, `password`) values (3, 'user2', 'john1@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91');
insert into fashionetoer (`id`, `username`, `email`, `password`) values (4, 'user3', 'john1@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91');
insert into fashionetoer (`id`, `username`, `email`, `password`) values (5, 'user4', 'john1@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91');
insert into fashionetoer (`id`, `username`, `email`, `password`) values (6, 'user5', 'john1@doe.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91');

INSERT INTO User_roles VALUES (1, 1,'user');
INSERT INTO User_roles VALUES (2, 2,'admin');
INSERT INTO User_roles VALUES (3, 2,'user');
INSERT INTO User_roles VALUES (4, 3,'user');
INSERT INTO User_roles VALUES (5, 4,'user');
INSERT INTO User_roles VALUES (6, 5,'user');
INSERT INTO User_roles VALUES (7, 6,'user');

-- user 2 leaving a comment for user 1
insert into comment (`id`, `id_user`, `content`, `dt_comment`, `status`) values (1, 2, 'I like your pictures and your profile, man!', '2014-03-09 12:30:00', 'ACTIVE');
insert into comment_parent values (1, null, 1, 'USER');	
-- user 1 leaving a reply for comment above
insert into comment (`id`, `id_user`, `content`, `dt_comment`, `status`) values (2, 1, 'Thanks!', '2014-03-09 12:30:00', 'ACTIVE');
insert into comment_parent values (2, 1, null, 'COMMENT');

--user 1 liking comment 1
insert into like_comment values (1, 1, 1);