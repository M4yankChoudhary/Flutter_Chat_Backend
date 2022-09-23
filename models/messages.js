// Schema for message
import Mongoose from "mongoose";

const messagesSchema = new Mongoose.Schema({
  message: {
    type: String,
    require: true,
  },
  roomId: {
    type: String,
    require: true,
  },
  sentByMe: {
    type: String,
    require: true
  }
}
,
{ versionKey: false });

const createMessages = new Mongoose.model("message", messagesSchema);

export default createMessages;
