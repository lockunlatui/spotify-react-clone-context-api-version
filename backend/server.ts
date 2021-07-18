import express from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import {
  albumRoute,
  playerRoute,
  browseRoute,
  playlistsRoute,
  tracksRoute,
  usersRoute,
} from "./api/route";

const app = express();

app.use(
  session({
    secret: "whoami",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 5 * 60 * 1000,
    },
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

/** User */
app.use(usersRoute);

/** PlayLists */
app.use(playlistsRoute);

/** Player */
app.use(playerRoute);

/** Tracks */
app.use(tracksRoute);

/** Album */
app.use(albumRoute);

/** Browser */
app.use(browseRoute);

export default app;
