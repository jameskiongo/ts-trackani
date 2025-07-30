import express, { type Request, type Response } from "express";
// import jwt from "jsonwebtoken";
import passport from "passport";
import "./passport";
import { generateToken } from "./token";
// import { VerifyToken } from "../../middleware/VerifyTokens";

function generateUserToken(req: Request, res: Response) {
	if (!req.user) return new Error("Error");
	const token = generateToken(req.user?.id);
	return res.send(token);
}

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

router.get(
	"/google/redirect",
	passport.authenticate("google", { session: false }),
	(req, res) => {
		generateUserToken(req, res);
		res.redirect("/auth/protected");
	},
);

// router.get(
// 	"/google/redirect",
// 	passport.authenticate("google", { session: false }),
// 	(req, res) => {
// 		if (!req.user) throw new Error("Error");
// 		const user = req.user;
// 		const token = jwt.sign({ id: user.id }, String(process.env.JWT_SECRET), {
// 			expiresIn: "1h",
// 		});
// 		console.log(token);
// 		res.redirect("/auth/protected");
// 	},
// );
router.get(
	"/protected",
	passport.authenticate(["jwt"], { session: false }),
	(_req, res) => {
		// res.send(req.user?.id);
		res.send("protected");
	},
);

// router.get("/protected", VerifyToken, (req, res) => {
// 	if (req.isAuthenticated()) {
// 		res.send("You are authenticated");
// 	} else {
// 		res
// 			.status(401)
// 			.send("You are not authenticated, <a href='/auth/google'>Google</a>");
// 	}
// });
//
export default router;
