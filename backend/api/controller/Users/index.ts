import { Strategy } from "passport-spotify";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";

import dotenv from "dotenv";

import { UsersDAO } from "../../../dao";
import { getToken } from "../../../dao/interceptor";

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

export default class UsersCtrl {
  static apiAuthSpotify = passport.authenticate("spotify", {
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
  });

  static apiAuthSpotifyCallback = passport.authenticate("spotify", {
    failureRedirect: "/",
    successRedirect: "/",
  });

  static async apiLogout(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    req.session.destroy(function (err) {
      req.logout();
      res.redirect('/');
    });
  }

  static async apiGetMe(req: Request, res: Response, next: NextFunction) {
    getToken(token);
    try {
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
  }

  static async apiGetHealth(req: Request, res: Response, next: NextFunction) {
    res.sendStatus(200);
  }
}
