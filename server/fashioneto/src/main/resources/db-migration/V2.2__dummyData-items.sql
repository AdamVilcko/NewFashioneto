--"S MAX MARA Enovef reversible coat":
insert into item (`id`, `indexing_date`) values (442719185, '2014-05-17 11:00:00');
--"Fitted Duffle Coat":
insert into item (`id`, `indexing_date`) values (442698073, '2014-05-17 11:00:00');
--"J.W. ANDERSON Pleated wool skirt"
insert into item (`id`, `indexing_date`) values (443435217, '2014-05-17 11:00:00');
--"AQ/AQ Beat Cream Backless Mini Dress"
insert into item (`id`, `indexing_date`) values (443197350, '2014-05-17 11:00:00');
--"Fur Trim Check Puffer Coat"
insert into item (`id`, `indexing_date`) values (442389816, '2014-05-17 11:00:00');
--"Mid-length Diamond Quilt Trench Coat"
insert into item (`id`, `indexing_date`) values (443831786, '2014-05-17 11:00:00');
--"True Decadence Delicate Detail Dress"
insert into item (`id`, `indexing_date`) values (441708353, '2014-05-17 11:00:00');

insert into like_item (`id_user`, `id_item`) values (1, 442719185);
insert into like_item (`id_user`, `id_item`) values (1, 442698073);
insert into like_item (`id_user`, `id_item`) values (1, 443435217);
insert into like_item (`id_user`, `id_item`) values (2, 442719185);
insert into like_item (`id_user`, `id_item`) values (2, 442698073);
insert into like_item (`id_user`, `id_item`) values (2, 443435217);
insert into like_item (`id_user`, `id_item`) values (2, 443197350);
insert into like_item (`id_user`, `id_item`) values (2, 442389816);
insert into like_item (`id_user`, `id_item`) values (2, 443831786);
insert into like_item (`id_user`, `id_item`) values (2, 441708353);
insert into like_item (`id_user`, `id_item`) values (3, 443435217);
insert into like_item (`id_user`, `id_item`) values (3, 443197350);
insert into like_item (`id_user`, `id_item`) values (3, 442389816);

-- user 2 commenting on user1's profile picture
insert into comment (`id`, `id_user`, `content`, `dt_comment`, `status`) values (4, 2, 'You gotta admit, this is kinda ugly!!', '2014-08-07 11:10:00', 'ACTIVE');
insert into comment_parent values (4, null, null, null, 442719185, 'ITEM');
