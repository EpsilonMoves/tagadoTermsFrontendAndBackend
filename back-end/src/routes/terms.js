import express from "express";
import { Term } from "../models/term.js";

const router = express.Router();

router.get("/terms/:type", async (req, res) => {
  const { type } = req.params;
  const term = new Term();
  const result = await term.findTypeAndGroup(type);
  res.send(result);
});

router.post("/terms", async (req, res) => {
  const { ...obj } = req.body;

  const term = new Term();
  await term.addTermToDb(obj);

  res.status(200).send("Added to the database");
});

export { router as termsRouter };
