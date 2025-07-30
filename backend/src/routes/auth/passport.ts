// import jwt from "jsonwebtoken";
import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { ExtractJwt } from "passport-jwt";
import passportjwt from "passport-jwt";
import "dotenv/config";
import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { userTable } from "../../db/schema";
const GoogleStrategy = passportGoogle.Strategy;

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		interface User {
			id: number;
			firstName?: string | null;
			lastName?: string | null;
			email: string;
			profilePic?: string | null;
			googleId: string | null;
		}
	}
}
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			callbackURL: "http://localhost:3000/auth/google/redirect",
		},
		async (_accessToken, _refreshToken, profile, done) => {
			try {
				const user = await db
					.select()
					.from(userTable)
					.where(eq(userTable.googleId, profile.id));
				if (!user || user.length === 0) {
					const email = profile.emails?.[0].value;
					if (!email) return done(new Error("Email is required"));

					const data = {
						firstName: profile.name?.givenName,
						lastName: profile.name?.familyName,
						email,
						profilePic: profile.photos?.[0].value,
						googleId: profile.id,
					};
					const user = await db.insert(userTable).values(data).returning();
					if (user.length === 0) {
						return done(new Error("Failed to create user"));
					}
				}
				return done(null, user[0]);
			} catch (error) {
				return done(new Error("Failed to create user"));
			}
		},
	),
);
passport.use(
	new passportjwt.Strategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: String(process.env.JWT_SECRET),
		},
		async (payload, done) => {
			const user = await db
				.select()
				.from(userTable)
				.where(eq(userTable.googleId, payload.sub));
			if (user) {
				return done(null, user, payload);
			}
			return done(new Error("Error"));
		},
	),
);
