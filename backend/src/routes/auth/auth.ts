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
	res.redirect("/auth/protected");
});
router.get("/protected", (req, res) => {
	if (req.isAuthenticated()) {
		res.send("You are authenticated");
	} else {
		res
			.status(401)
			.send("You are not authenticated, <a href='/auth/google'>Google</a>");
	}
});

export default router;
