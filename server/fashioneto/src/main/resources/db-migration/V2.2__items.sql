--  "S MAX MARA Enovef reversible coat":
insert into item (`id`, `indexing_date`) values (442719185, '2014-05-17 11:00:00');
-- "Fitted Duffle Coat":
insert into item (`id`, `indexing_date`) values (442698073, '2014-05-17 11:00:00');
-- "J.W. ANDERSON Pleated wool skirt"
insert into item (`id`, `indexing_date`) values (443435217, '2014-05-17 11:00:00');
-- "AQ/AQ Beat Cream Backless Mini Dress"
insert into item (`id`, `indexing_date`) values (443197350, '2014-05-17 11:00:00');
-- "Fur Trim Check Puffer Coat"
insert into item (`id`, `indexing_date`) values (442389816, '2014-05-17 11:00:00');
-- "Mid-length Diamond Quilt Trench Coat"
insert into item (`id`, `indexing_date`) values (443831786, '2014-05-17 11:00:00');
-- "True Decadence Delicate Detail Dress"
insert into item (`id`, `indexing_date`) values (441708353, '2014-05-17 11:00:00');


insert into feed (`id`, `id_user`, `id_like_item`, `date`, `type`) values ( 1, 1,  1, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id`, `id_feed`, `id_user`, `id_item`) values ( 1,  1, 1, 442719185);
insert into feed (`id`, `id_user`, `id_like_item`, `date`, `type`) values ( 2, 1,  2, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id`, `id_feed`, `id_user`, `id_item`) values ( 2,  2, 1, 442698073);
insert into feed (`id`, `id_user`, `id_like_item`, `date`, `type`) values ( 3, 1,  3, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id`, `id_feed`, `id_user`, `id_item`) values ( 3,  3, 1, 443435217);
insert into feed (`id`, `id_user`, `id_like_item`, `date`, `type`) values ( 4, 2,  4, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id`, `id_feed`, `id_user`, `id_item`) values ( 4,  4, 2, 442719185);
insert into feed (`id`, `id_user`, `id_like_item`, `date`, `type`) values ( 5, 2,  5, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id`, `id_feed`, `id_user`, `id_item`) values ( 5,  5, 2, 442698073);
insert into feed (`id`, `id_user`, `id_like_item`, `date`, `type`) values ( 6, 2,  6, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id`, `id_feed`, `id_user`, `id_item`) values ( 6,  6, 2, 443435217);
insert into feed (`id`, `id_user`, `id_like_item`, `date`, `type`) values ( 7, 2,  7, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id`, `id_feed`, `id_user`, `id_item`) values ( 7,  7, 2, 443197350);
insert into feed (`id`, `id_user`, `id_like_item`, `date`, `type`) values ( 8, 2,  8, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id`, `id_feed`, `id_user`, `id_item`) values ( 8,  8, 2, 442389816);
insert into feed (`id`, `id_user`, `id_like_item`, `date`, `type`) values ( 9, 2,  9, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id`, `id_feed`, `id_user`, `id_item`) values ( 9,  9, 2, 443831786);
insert into feed (`id`, `id_user`, `id_like_item`, `date`, `type`) values (10, 3, 10, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id`, `id_feed`, `id_user`, `id_item`) values (10, 10, 3, 441708353);
insert into feed (`id`, `id_user`, `id_like_item`, `date`, `type`) values (11, 3, 11, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id`, `id_feed`, `id_user`, `id_item`) values (11, 11, 3, 443435217);
insert into feed (`id`, `id_user`, `id_like_item`, `date`, `type`) values (12, 3, 12, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id`, `id_feed`, `id_user`, `id_item`) values (12, 12, 3, 443197350);
insert into feed (`id`, `id_user`, `id_like_item`, `date`, `type`) values (13, 3, 13, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id`, `id_feed`, `id_user`, `id_item`) values (13, 13, 3, 442389816);

/*
insert into feed (`id_feed`, `id_user`, `date`, `type`) values (1, 1, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_item`) values (1, 442719185);
insert into feed (`id_feed`, `id_user`, `date`, `type`) values (2, 1, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_item`) values (2, 442698073);
insert into feed (`id_feed`, `id_user`, `date`, `type`) values (3, 1, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_item`) values (3, 443435217);
insert into feed (`id_feed`, `id_user`, `date`, `type`) values (4, 2, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_item`) values (4, 442719185);
insert into feed (`id_feed`, `id_user`, `date`, `type`) values (5, 2, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_item`) values (5, 442698073);
insert into feed (`id_feed`, `id_user`, `date`, `type`) values (6, 2, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_item`) values (6, 443435217);
insert into feed (`id_feed`, `id_user`, `date`, `type`) values (7, 2, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_item`) values (7, 443197350);
insert into feed (`id_feed`, `id_user`, `date`, `type`) values (8, 2, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_item`) values (8, 442389816);
insert into feed (`id_feed`, `id_user`, `date`, `type`) values (9, 2, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_item`) values (9, 443831786);
insert into feed (`id_feed`, `id_user`, `date`, `type`) values (10, 3, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_item`) values (10, 441708353);
insert into feed (`id_feed`, `id_user`, `date`, `type`) values (11, 3, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_item`) values (11, 443435217);
insert into feed (`id_feed`, `id_user`, `date`, `type`) values (12, 3, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_item`) values (12, 443197350);
insert into feed (`id_feed`, `id_user`, `date`, `type`) values (13, 3, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_item`) values (13, 442389816);


insert into feed (`id_feed`, `date`, `type`) values (1, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_user`, `id_item`) values (1, 1, 442719185);
insert into feed (`id_feed`, `date`, `type`) values (2, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_user`, `id_item`) values (2, 1, 442698073);
insert into feed (`id_feed`, `date`, `type`) values (3, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_user`, `id_item`) values (3, 1, 443435217);
insert into feed (`id_feed`, `date`, `type`) values (4, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_user`, `id_item`) values (4, 2, 442719185);
insert into feed (`id_feed`, `date`, `type`) values (5, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_user`, `id_item`) values (5, 2, 442698073);
insert into feed (`id_feed`, `date`, `type`) values (6, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_user`, `id_item`) values (6, 2, 443435217);
insert into feed (`id_feed`, `date`, `type`) values (7, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_user`, `id_item`) values (7, 2, 443197350);
insert into feed (`id_feed`, `date`, `type`) values (8, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_user`, `id_item`) values (8, 2, 442389816);
insert into feed (`id_feed`, `date`, `type`) values (9, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`, `id_user`, `id_item`) values (9, 2, 443831786);
insert into feed (`id_feed`, `date`, `type`) values (10, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`,`id_user`,  `id_item`) values (10, 3, 441708353);
insert into feed (`id_feed`, `date`, `type`) values (11, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`,`id_user`,  `id_item`) values (11, 3, 443435217);
insert into feed (`id_feed`, `date`, `type`) values (12, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`,`id_user`,  `id_item`) values (12, 3, 443197350);
insert into feed (`id_feed`, `date`, `type`) values (13, '2014-09-10 20:29:00', 'LIKE_ITEM'); insert into like_item (`id_feed`,`id_user`,  `id_item`) values (13, 3, 442389816);
 * 
insert into like_item (`id_feed`, `id_item`, `id_user`, `date`, `type`) values (1, 442719185, 1, '2014-09-10 20:29:00', 'LIKE_ITEM');
insert into like_item (`id_feed`, `id_item`, `id_user`, `date`, `type`) values (2, 442698073, 1, '2014-09-10 20:29:00', 'LIKE_ITEM');
insert into like_item (`id_feed`, `id_item`, `id_user`, `date`, `type`) values (3, 443435217, 1, '2014-09-10 20:29:00', 'LIKE_ITEM');
insert into like_item (`id_feed`, `id_item`, `id_user`, `date`, `type`) values (4, 442719185, 2, '2014-09-10 20:29:00', 'LIKE_ITEM');
insert into like_item (`id_feed`, `id_item`, `id_user`, `date`, `type`) values (5, 442698073, 2, '2014-09-10 20:29:00', 'LIKE_ITEM');
insert into like_item (`id_feed`, `id_item`, `id_user`, `date`, `type`) values (6, 443435217, 2, '2014-09-10 20:29:00', 'LIKE_ITEM');
insert into like_item (`id_feed`, `id_item`, `id_user`, `date`, `type`) values (7, 443197350, 2, '2014-09-10 20:29:00', 'LIKE_ITEM');
insert into like_item (`id_feed`, `id_item`, `id_user`, `date`, `type`) values (8, 442389816, 2, '2014-09-10 20:29:00', 'LIKE_ITEM');
insert into like_item (`id_feed`, `id_item`, `id_user`, `date`, `type`) values (9, 443831786, 2, '2014-09-10 20:29:00', 'LIKE_ITEM');
insert into like_item (`id_feed`, `id_item`, `id_user`, `date`, `type`) values (10, 441708353, 3, '2014-09-10 20:29:00', 'LIKE_ITEM');
insert into like_item (`id_feed`, `id_item`, `id_user`, `date`, `type`) values (11, 443435217, 3, '2014-09-10 20:29:00', 'LIKE_ITEM');
insert into like_item (`id_feed`, `id_item`, `id_user`, `date`, `type`) values (12, 443197350, 3, '2014-09-10 20:29:00', 'LIKE_ITEM');
insert into like_item (`id_feed`, `id_item`, `id_user`, `date`, `type`) values (13, 442389816, 3, '2014-09-10 20:29:00', 'LIKE_ITEM');
*/


--  user 2 commenting on user1's profile picture
insert into comment (`id`, `id_user`, `content`, `dt_comment`, `status`) values (4, 2, 'You gotta admit, this is kinda ugly!!', '2014-08-07 11:10:00', 'ACTIVE');
insert into comment_parent values (4, null, null, null, 442719185, 'ITEM');
