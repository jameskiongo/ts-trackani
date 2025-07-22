import express from "express";
import session from "express-session";
import animeRouter from "./routes/anime/anime";
import authRouter from "./routes/auth/auth";
import "dotenv/config";
import "./routes/auth/passport";
import passport from "passport";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
	console.log("someone pinged here");
	res.send("pong");
});
app.use(
	session({
		secret: String(process.env.COOKIE_KEY),
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false },
	}),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/anime", animeRouter);
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
