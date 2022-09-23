// Schema for rooms
import Mongoose from "mongoose";

const roomsSchema = new Mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  usersList: {
    type: [String],
    require: false
  },
}
,
{ versionKey: false });

const createRoom = new Mongoose.model("rooms", roomsSchema);

export default createRoom;
