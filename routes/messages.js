import express from "express";
const router = express.Router();
import Messages from '../models/messages.js';

router.get("/:id", async (req, res) => {
    const roomId = req.params.id
    const messages = await Messages.find({roomId : roomId})
  
    res.status(200).send(messages)
});
  

export default router;