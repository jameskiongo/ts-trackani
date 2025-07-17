import express from "express";
import { getRecentAnime } from "../../controllers/anime/getAnime";

const router = express.Router();

router.get("/", async (_req, res) => {
	const response = await getRecentAnime();
	console.log(response);
	res.send("fetching anime");
});
export default router;
