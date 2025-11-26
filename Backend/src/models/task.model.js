import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    }, description: {
        type: "String",
        required: true
    }
});

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;