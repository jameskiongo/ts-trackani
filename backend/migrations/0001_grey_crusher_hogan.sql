CREATE TYPE "public"."status" AS ENUM('watching', 'completed', 'on hold', 'maybe watching');--> statement-breakpoint
ALTER TABLE "animeTable" ADD COLUMN "mal_id" integer;--> statement-breakpoint
ALTER TABLE "animeTable" ADD COLUMN "userId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "animeTable" ADD COLUMN "status" "status" DEFAULT 'watching' NOT NULL;--> statement-breakpoint
ALTER TABLE "animeTable" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "animeTable" ADD COLUMN "updatedAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "animeTable" ADD CONSTRAINT "animeTable_userId_userTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userTable"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "animeTable" ADD CONSTRAINT "animeTable_mal_id_unique" UNIQUE("mal_id");