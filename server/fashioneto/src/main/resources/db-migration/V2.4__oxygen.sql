/*
  
 insert into fashionetoer (`id`, `username`, `email`, `password`, `display_name`, `city`, `country`, `id_profile_image`, `status`) 
	values (8, 'OxygenAccelerator', 'simon@oxygen.com', '949f4ae5896a01d231c6f5af079dff23bab120cec83b787f527bc02b03f8fc91', 'Oxygen Accelerator', 'London', 'UK', 8, 'ACTIVE');

INSERT INTO User_roles VALUES (9, 8,'user');
	
insert into image (`id`, `id_user`, `id_album`, `filename`, `file_extension`, `date`, `description`) 
	values (8, 8, 5, 'oxygen', 'jpg', '2014-08-17 23:54:00', 'Oxygen');
	
insert into album (`id`, `id_user`, `name`)
	values (13, 8, 'Profile Pictures');

*/