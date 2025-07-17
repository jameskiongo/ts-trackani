import axios from "axios";
import type { InferSelectModel } from "drizzle-orm";
import type { animeTable } from "../db/schema";

type ALLANIME = InferSelectModel<typeof animeTable>;
type Anime = {
	data: ALLANIME[];
};

export async function fetchRecentAnime(endpoint: string): Promise<ALLANIME[]> {
	try {
		console.log(endpoint);
		const response = axios.get<Anime>("https://api.jikan.moe/v4/");
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
}
