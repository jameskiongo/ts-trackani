import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const animeTable = pgTable("animeTable", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	synopsis: text("synopsis"),
	animeScore: text("anime_score"),
	type: text("type"),
	episodes: integer("episodes"),
	animePoster: text("animePoster"),
	isBookmarked: boolean(),
});
