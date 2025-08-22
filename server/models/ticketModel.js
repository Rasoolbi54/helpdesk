const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },

    category:{
      type:String,
      enum:["billing" ,  "shipping" , "refund" ,"other"],
      required:true
    },
    status:{
      type:String,
        enum: ["open", "triaged", "waiting_human", "resolved", "closed"],
      default: "open"
    },
     createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      default: null,
    },
  },{timestamps: true}
);

module.exports = mongoose.model("Ticket", ticketSchema);
