CREATE TABLE "animeTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"synopsis" text,
	"anime_score" varchar(100),
	"type" varchar(20),
	"episodes" integer,
	"animePoster" varchar(200),
	"isBookmarked" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "userTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(256),
	"lastName" varchar(256),
	"email" varchar NOT NULL,
	"profilePic" varchar(200),
	"googleId" varchar(200),
	CONSTRAINT "userTable_email_unique" UNIQUE("email")
);
