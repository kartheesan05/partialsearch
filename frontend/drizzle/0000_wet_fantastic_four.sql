-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(100),
	"second_name" varchar(100),
	"email" varchar(255),
	CONSTRAINT "users_email_key" UNIQUE("email")
);

*/