import { fetchRecentAnime } from "../../services/fetchRecentAnime";

export const getRecentAnime = async () => {
	try {
		const url = "https://api.jikan.moe/v4/seasons/now?page=1&limit=5";
		const response = await fetchRecentAnime(url);
		return response;
	} catch (error: unknown) {
		throw new Error(
			error instanceof Error
				? error.message
				: "An error occurred while editing the directory",
		);
	}
};
