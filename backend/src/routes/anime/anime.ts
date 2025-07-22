import express, { type Request } from "express";
import { getRecentAnime } from "../../controllers/anime/getAnime";
import type { BookmarkAnimeReq } from "../../typings/types";

const router = express.Router();

router.get("/", async (_req, res) => {
	const response = await getRecentAnime();
	console.log(response);
	res.send("fetching anime");
});
router.post(
	"/",
	async (req: Request<unknown, unknown, BookmarkAnimeReq>, res) => {
		if (req.isAuthenticated()) {
			const data = req.body;
			console.log(data);
			res.send("Bookmarking Anime");
		} else {
			res
				.status(401)
				.send("You are not authenticated, <a href='/auth/google'>Google</a>");
		}
	},
);
export default router;
