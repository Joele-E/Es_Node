import { Request, Response } from "express";
import { type } from "os";
import Joi from "joi";
import pgPromise from "pg-promise";
import "dotenv/config";

import passport from "passport";
import passportJWT from "passport-jwt";
import jwt from "jsonwebtoken";

const db = pgPromise()(process.env.DB_KEY || "");

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

const logIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await db.one(`SELECT * FROM users WHERE username=$1`, username);

  if (user && user.password === password) {
    const payload = {
      id: user.id,
      username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "");

    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token]);
    res.status(200).json({ id: user.id, username, token });
  } else {
    res.status(400).json({ message: "Username or password incorrect." });
  }
};
const signUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await db.oneOrNone(
    `SELECT * FROM users WHERE username=$1`,
    username
  );
  if (user) {
    res.status(409).json({ message: "Username already in use." });
  } else {
    const { id } = await db.one(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`,
      [username, password]
    );

    res.status(201).json({ id, msg: "Signup successful. Now you can log in." });
  }
};
const logOut = async (req: Request, res: Response) => {
  const user: any = req.user;
  await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user?.id, null]);
  res.status(200).json({ message: "User logged out successfully." });
};

export { logIn, signUp };
