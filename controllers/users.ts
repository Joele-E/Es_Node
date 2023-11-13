import { Request, Response } from "express";
import { type } from "os";
import Joi from "joi";
import pgPromise from "pg-promise";
import "dotenv/config";

import passport from "passport";
import passportJWT from "passport-jwt";

const db = pgPromise()(process.env.DB_KEY || "");

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: process.env.JWT_SECRET || "",
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      const user = db.one(`SELECT * FROM users WHERE id=$1`, payload.id);

      try {
        return user ? done(null, user) : done(new Error("User not found."));
      } catch (error) {
        done(error);
      }
    }
  )
);

const setupDb = async () => {
  await db.none(`
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
        id SERIAL NOT NULL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        token TEXT
        


    );
    `);

  await db.none(
    `INSERT INTO users (username, password) VALUES ('test', 'test')`
  );
};
