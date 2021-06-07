use master

create database globalMusic

use globalMusic

create table singer (
	id int primary key not null,
	name nvarchar(50),
	avatar char(150),
	dob char(20),
	info ntext,
)

create table album(
	id int primary key not null,
	name nvarchar(50),
	url char(150),
	released_date char(30)
)

create table music_type (
	id int primary key not null,
	name nvarchar(50)
)

create table music(
	id int primary key not null,
	title nvarchar(50),
	url char(150),
	play_times int,
	lyrics ntext,
	album_id int,
	music_type_id int,
	constraint FK_sg_ms foreign key (album_id) references album(id),
	constraint FK_type_ms foreign key (music_type_id) references music_type(id),
)

create table music_singer(
	id int primary key not null,
	singer_id int not null,
	music_id int not null,
	constraint FK_ms_sg_mg foreign key (music_id) references music(id),
	constraint FK_sg_ms_mg foreign key (singer_id) references singer(id)
)


create table album_singer(
	id int primary key not null,
	album_id int not null,
	singer_id int not null,
	constraint FK_sg_al foreign key (album_id) references album(id),
	constraint FK_al_sg foreign key (singer_id) references singer(id)
)

create table users(
	id int primary key not null,
	name nvarchar(50),
	username char(20),
	avatar char(150),
	password char(128),
	is_supper_user int,
)

create table play_list(
	id int primary key not null,
	users_id int, 
	name nvarchar(50),
	constraint FK_pl_ur foreign key (users_id) references users(id),
)

create table play_list_music(
	id int primary key not null,
	play_list_id int,
	music_id int,
	constraint FK_pl_ms foreign key (play_list_id) references play_list(id),
	constraint FK_ms_pl foreign key (music_id) references music(id)
)

create table comment (
	id int primary key not null,
	content ntext,
	created_at char(20)
)

create table comment_music(
	id int primary key not null,
	music_id int,
	comment_id int,
	users_id int, 
	constraint FK_cm_ms foreign key (music_id) references music(id),
	constraint FK_ms_cm foreign key (comment_id) references comment(id),
	constraint FK_cmt_ur foreign key (users_id) references users(id),
)

create table likes(
	id int primary key not null,
	music_id int,
	users_id int,
	constraint FK_ur_ms foreign key (music_id) references music(id),
	constraint FK_ms_ur foreign key (users_id) references users(id),
)