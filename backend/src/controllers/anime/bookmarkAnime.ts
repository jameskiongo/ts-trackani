<<<<<<< Updated upstream
export const bookmarkAnime = async () => {
	return 0;
=======
import type { BookmarkAnimeReq } from "../../typings/types";

export const bookmarkAnime = async (data: BookmarkAnimeReq, user: number) => {
	console.log(data, user);
>>>>>>> Stashed changes
};
