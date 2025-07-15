import * as t from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const animeTable = pgTable("animeTable", {
	id: t.serial("id").primaryKey(),
	title: t.varchar("title", { length: 256 }).notNull(),
	synopsis: t.text("synopsis"),
	animeScore: t.varchar("anime_score", { length: 100 }),
	type: t.varchar("type", { length: 20 }),
	episodes: t.integer("episodes"),
	animePoster: t.varchar("animePoster", { length: 200 }),
	isBookmarked: t.boolean().default(false),
});
export const userTable = pgTable("userTable", {
	id: t.serial("id").primaryKey(),
	firstName: t.varchar("firstName", { length: 256 }),
	lastName: t.varchar("lastName", { length: 256 }),
	email: t.varchar("email").unique().notNull(),
	profilePic: t.varchar("profilePic", { length: 200 }),
	googleId: t.varchar("googleId", { length: 200 }),
});
