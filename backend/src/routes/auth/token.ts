import jwt from "jsonwebtoken";
import "dotenv/config";

export function generateToken(userId: number) {
	const token = jwt.sign({ userId: userId }, String(process.env.JWT_SECRET), {
		expiresIn: "1hr",
	});
	return token;
}
