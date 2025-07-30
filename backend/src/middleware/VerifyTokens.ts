import type { NextFunction, Request, Response } from "express";
import passport from "passport";

export const VerifyToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	passport.authenticate("jwt", { session: false }, async () => {
		const token = "dadfsf";
		if (!token) {
			console.log("error");
			res.status(401).json({ msg: "token expired" });
		} else {
			next();
		}
	})(req, res, next);
};
