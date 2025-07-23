import express, { type Request } from "express";
<<<<<<< Updated upstream
=======
import { bookmarkAnime } from "../../controllers/anime/bookmarkAnime";
>>>>>>> Stashed changes
import { getRecentAnime } from "../../controllers/anime/getAnime";
import type { BookmarkAnimeReq } from "../../typings/types";

const router = express.Router();

router.get("/", async (_req, res) => {
	const response = await getRecentAnime();
<<<<<<< Updated upstream
	console.log(response);
=======
	console.log(response[0].title);
>>>>>>> Stashed changes
	res.send("fetching anime");
});
router.post(
	"/",
	async (req: Request<unknown, unknown, BookmarkAnimeReq>, res) => {
		if (req.isAuthenticated()) {
			const data = req.body;
<<<<<<< Updated upstream
			console.log(data);
=======
			const user_id = Number(req.user);
			const anime = bookmarkAnime(data, user_id);
			console.log(anime);
>>>>>>> Stashed changes
			res.send("Bookmarking Anime");
		} else {
			res
				.status(401)
				.send("You are not authenticated, <a href='/auth/google'>Google</a>");
		}
	},
);
export default router;
