import express from "express";
const router = express.Router();
import Room from '../models/room.js';


router.post("/:id", async (req, res) => {
    var name = req.params.id
    const room = await Room.create({
      name
      });
    res.send({
        'message': "Hello"
    })
});

router.get("/", async (req, res) => {
    const rooms = await Room.find()
    res.status(200).send(rooms)
});
  

export default router;