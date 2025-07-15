import express from "express";
import passport from "passport";
import "./passport";

const router = express.Router();

router.get("/g", (_req, res) => {
	res.send('<a href="/auth/google">Google</a>');
});

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["email", "profile"],
	}),
);

router.get("/google/redirect", passport.authenticate("google"), (_req, res) => {
	res.send("This is the callback route");
});

export default router;
