import express, { Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { Strategy } from "passport-spotify";
import { UsersDAO, PlayListsDAO, PlayerDAO, TracksDAO } from "./dao";
dotenv.config();

export interface Profile {
  provider: string;
  id: string;
  username: string;
  displayName: string;
  profileUrl: string | null;
  photos: [string] | null;
  country: string;
  followers: number | null;
  product: string | null;
  emails?: [{ value: string; type: null }];
  _raw: string;
  _json: any;
}

export type VerifyCallback = (
  error?: Error | null,
  user?: object,
  info?: object
) => void;

export type VerifyFunction = (
  accessToken: string,
  refreshToken: string,
  expires_in: number,
  profile: Profile,
  done: VerifyCallback
) => void;

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REDIRECT_URL_CLIENT_REACT } =
  process.env;

const app = express();
app.use(cors());

let userProfile: any;
let token: any;

passport.use(
  new Strategy(
    {
      clientID: `${CLIENT_ID}`,
      clientSecret: `${CLIENT_SECRET}`,
      callbackURL: `${REDIRECT_URI}`,
      passReqToCallback: true,
    },
    function (
      req: Request,
      accessToken: string,
      refreshToken: string,
      expires_in: number,
      profile: Profile,
      done: VerifyCallback
    ) {
      process.nextTick(async function () {
        userProfile = profile;
        token = accessToken;
        await UsersDAO.addUser(profile);
        return done(null, profile);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj: any, done) {
  done(null, obj);
});

app.use(session({ secret: "whoami", resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/api/v1/auth/spotify",
  passport.authenticate("spotify", {
    scope: [
      "user-read-email",
      "user-read-private",
      "playlist-read-private",
      "user-read-currently-playing",
      "user-read-playback-state",
      "user-read-recently-played"
    ],
  })
);
app.get(
  "/api/v1/auth/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect(`${REDIRECT_URL_CLIENT_REACT}`);
  }
);

app.get("/api/v1/me", ensureAuthenticated, async function (req, res, next) {
  if (req.isAuthenticated()) {
    const user = await UsersDAO.getUser(userProfile.id);
    const data = {
      country: user?.country,
      displayName: user?.displayName,
      email: user?.emails[0]?.value,
      followers: user?.followers,
      id: user.id,
      photo: user?.photos[0]?.value,
      product: user?.product,
      profileUrl: user?.profileUrl,
    };
    res.send(data).status(200);
  } else {
    res.send({
      status: 401,
    });
  }
});

app.get("/api/v1/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/api/v1/health", function (req, res) {
  res.sendStatus(200);
});

/** PlayLists */
app.get("/api/v1/me/playlists", ensureAuthenticated, async function (req, res) {
  const data = await PlayListsDAO.getPlayListsByUser(token, 50, 0);
  res.send({
    status: 200,
    data: data.data,
  });
});

/** Player */
app.get(
  "/api/v1/me/player/currently-playing",
  ensureAuthenticated,
  async function (req, res) {
    const data = await PlayerDAO.getPlayerCurrentlyPlaying(token);
    res.send({
      status: 200,
      data: data.data,
    });
  }
);

app.get(
  "/api/v1/me/player/recently-played",
  ensureAuthenticated,
  async function (req: any, res) {
    const { limit, before, after } = req.query;
    const data = await PlayerDAO.getPlayerRecentlyPlayed(
      token,
      limit,
      before,
      after
    );
    res.send({
      status: 200,
      data: data.data,
    });
  }
);

/** Tracks */
app.get(
  "/api/v1/tracks/:id",
  ensureAuthenticated,
  async function (req: any, res) {
    const { id } = req.params;
    const data = await TracksDAO.getTrackById(token, id);
    res.send({
      status: 200,
      data: data.data,
    });
  }
);

function ensureAuthenticated(req: any, res: any, next: any) {
  console.log("=> isAuthenticated", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401);
  return next();
}

export default app;
