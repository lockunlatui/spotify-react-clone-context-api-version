import express, { Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { Strategy } from "passport-spotify";
import {
  UsersDAO,
  PlayListsDAO,
  PlayerDAO,
  TracksDAO,
  AlbumDAO,
  BrowserDAO,
} from "./dao";
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let userProfile: any;
let token: any;

passport.use(
  new Strategy(
    {
      clientID: `${CLIENT_ID}`,
      clientSecret: `${CLIENT_SECRET}`,
      callbackURL: `${REDIRECT_URL_CLIENT_REACT}${REDIRECT_URI}`,
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

app.use(
  session({
    secret: "whoami",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 10 * 24 * 365 * 60 * 1000,
    },
  })
);

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
      "user-read-recently-played",
      "user-modify-playback-state",
      "streaming",
      "user-library-read",
      "user-read-playback-position",
      "user-top-read",
      "playlist-modify-public",
      "ugc-image-upload",
      "user-follow-modify",
      "user-library-modify",
      "playlist-read-collaborative",
      "playlist-modify-private",
      "user-follow-read",
      "app-remote-control",
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

app.get("/api/v1/me", ensureAuthenticated, async function (req, res) {
  try {
    console.log("===========================TOKEN===========================");
    console.log(token);
    console.log(userProfile)
    console.log("===========================TOKEN===========================");
    const data = {
      country: userProfile?.country,
      displayName: userProfile?.displayName,
      email: userProfile?.emails[0]?.value,
      followers: userProfile?.followers,
      id: userProfile.id,
      photo: userProfile?.photos[0]?.value,
      product: userProfile?.product,
      profileUrl: userProfile?.profileUrl,
      token: token,
    };
    res.send(data).status(200);
  } catch (err) {
    res.status(401).send();
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
app.get("/api/v1/me/player", ensureAuthenticated, async function (req, res) {
  try {
    const data = await PlayerDAO.getPlayer(token);
    res.send({
      status: 200,
      data: data.data,
    });
  } catch (err) {
    res.send({
      data: err,
    });
  }
});

app.get(
  "/api/v1/me/player/currently-playing",
  ensureAuthenticated,
  async function (req, res) {
    try {
      const data = await PlayerDAO.getPlayerCurrentlyPlaying(token);
      res.send({
        status: 200,
        data: data.data,
      });
    } catch (err) {
      res.send({
        data: err,
      });
    }
  }
);

app.get(
  "/api/v1/me/player/recently-played",
  ensureAuthenticated,
  async function (req: any, res) {
    try {
      const { limit } = req.query;
      const data = await PlayerDAO.getPlayerRecentlyPlayed(token, limit);
      res.send({
        status: 200,
        data: data.data,
      });
    } catch (err) {
      res.send({
        data: err,
      });
    }
  }
);

app.put(
  "/api/v1/me/player/play/:deviceId",
  ensureAuthenticated,
  async function (req: any, res) {
    const { deviceId } = req.params;
    const { spotifyUri, position } = req.body;
    const data = await PlayerDAO.putStartAndResume(
      token,
      deviceId,
      spotifyUri,
      position
    );
    if (data.status === 204) {
      res.send({
        status: 204,
      });
    } else {
      res.send({
        status: data.status,
      });
    }
  }
);

app.put(
  "/api/v1/me/player/pause/:deviceId",
  ensureAuthenticated,
  async function (req: any, res) {
    try {
      const { deviceId } = req.params;
      const data = await PlayerDAO.putPause(token, deviceId);
      res.send({
        status: 200,
        data: data,
      });
    } catch (err) {
      res.send({
        data: err,
      });
    }
  }
);

/** Tracks */
app.get(
  "/api/v1/tracks/:id",
  ensureAuthenticated,
  async function (req: any, res) {
    try {
      const { id } = req.params;
      const data = await TracksDAO.getTrackById(token, id);
      res.send({
        status: 200,
        data: data.data,
      });
    } catch (err) {
      res.send({
        data: err,
      });
    }
  }
);

/** Album */
app.get(
  "/api/v1/albums/:id/tracks",
  ensureAuthenticated,
  async function (req: any, res) {
    try {
      const { id } = req.params;
      const data = await AlbumDAO.getAnAlbumsTracks(token, id);
      res.send({
        status: 200,
        data: data.data,
      });
    } catch (err) {
      res.send({
        data: err,
      });
    }
  }
);

/** Browser */
app.get(
  "/api/v1/browse/new-releases/:country/:limit",
  ensureAuthenticated,
  async function (req: any, res) {
    try {
      const { country, limit } = req.params;
      const data = await BrowserDAO.getAListOfNewReleases(
        token,
        country,
        limit
      );
      res.send({
        status: 200,
        data: data.data,
      });
    } catch (err) {
      res.send({
        data: err,
      });
    }
  }
);

function ensureAuthenticated(req: any, res: any, next: any) {
  console.log("=> isAuthenticated", req.isAuthenticated());
  try {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
    return next();
  } catch (err) {
    res.status(401);
    return next();
  }
}

export default app;
