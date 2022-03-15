import { Request, Response } from "express";
import WilderModel from "../models/wilders.models";
const objectId = require("mongoose").Types.ObjectId;



const WilderController = {
  // GET ALL USERS
  getWilders: async (req: Request, res: Response): Promise<void> => {
    const wilders = await WilderModel.find();
    res.status(200).json(wilders);
  },

  // GET BY ID
  getWildersById: async (req: Request, res: Response): Promise<void> => {
    const wilder = await WilderModel.findById(req.params.id)
    res.status(200).json(wilder);
  },

  // POST USERS
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      await WilderModel.init();
      const newWilder = new WilderModel(req.body);
      const result = await newWilder.save();
      res.json(result);
    } catch (err: any) {
      if (err.code === 11000) {
        res.status(400).json({ message: "Name already taken" });
      }
      throw err;
    }
  },

  createWilder: async (req: Request, res: Response): Promise<void> => {
    const result = new WilderModel(req.body);
    try {
      res.json({ success: true, result: result });
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },

  // UPDATE WILDER BY ID
  updateWilder: async (req: Request, res: Response) => {
    if (!objectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
    try {
      await WilderModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
            city: req.body.city,
            skills: req.body.skills,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
        .then((data) => res.send(data))
        .catch((err: any) => res.status(500).send({ message: err }));
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },

  // DELETE USERS
  deleteWilder: async (req: Request, res: Response) => {
    if (!objectId.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
      await WilderModel.remove({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
};

export default WilderController;
