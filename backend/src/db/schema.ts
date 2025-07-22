import * as t from "drizzle-orm/pg-core";

export const statusEnum = t.pgEnum("status", [
	"watching",
	"completed",
	"on hold",
	"maybe watching",
]);
export const animeTable = t.pgTable("animeTable", {
	id: t.serial("id").primaryKey(),
	title: t.varchar("title", { length: 256 }).notNull(),
	synopsis: t.text("synopsis"),
	animeScore: t.varchar("anime_score", { length: 100 }),
	type: t.varchar("type", { length: 20 }),
	episodes: t.integer("episodes"),
	animePoster: t.varchar("animePoster", { length: 200 }),
	isBookmarked: t.boolean().default(false),
	mal_id: t.integer("mal_id").notNull().unique(),
	userId: t
		.integer("userId")
		.notNull()
		.references(() => userTable.id, { onDelete: "cascade" }),
	watch_status: statusEnum("status").notNull().default("watching"),
	createdAt: t.timestamp("createdAt").notNull().defaultNow(),
	updatedAt: t
		.timestamp("updatedAt")
		.notNull()
		.$onUpdate(() => new Date()),
});
export const userTable = t.pgTable("userTable", {
	id: t.serial("id").primaryKey(),
	firstName: t.varchar("firstName", { length: 256 }),
	lastName: t.varchar("lastName", { length: 256 }),
	email: t.varchar("email").unique().notNull(),
	profilePic: t.varchar("profilePic", { length: 200 }),
	googleId: t.varchar("googleId", { length: 200 }),
});
