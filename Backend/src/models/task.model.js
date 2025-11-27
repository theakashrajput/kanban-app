import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: "String",
            required: true,
            maxLength: [500, 'Username must be 200 characters or less.']
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ["ToDo", "InProgress", "Done"],
            required: true,
            default: "ToDo"
        }
    },
    {
        timestamps: true,
    }
);

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;
