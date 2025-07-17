import axios, { type AxiosResponse } from "axios";
import type { AnimeReturn } from "../typings/types";

interface Pagination {
	last_visible_page: number;
	has_next_page: boolean;
	current_page: number;
	items: {
		count?: number;
		total?: number;
		per_page?: number;
	};
}
type AnimeResponse = {
	pagination: Pagination;
	data: AnimeReturn[];
};

export async function fetchRecentAnime(endpoint: string) {
	try {
		const response: AxiosResponse<AnimeResponse> = await axios.get(endpoint);
		const animeData = response.data.data;
		const bookmarked = false;
		return animeData.map((data) => ({
			title: data.title,
			synopsis: data.synopsis || "",
			animeScore: data.animeScore || "",
			episodes: data.episodes,
			animePoster: data.animePoster || "",
			mal_id: data.mal_id,
			type: data.type || "",
			bookmarked: bookmarked,
		}));
	} catch (error) {
		throw new Error(`Error fetching anime ${error}`);
	}
}
