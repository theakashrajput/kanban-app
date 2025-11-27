import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dotenv } from "../../config/env.config.js";

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        email: {
            type: "String",
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
        },
        avatar: {
            type: String, // Cloudinary Link
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// MongoDb middleware
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        // Throwing an error stops the save process automatically
        throw new Error(error);
    }
});

// MongoDb custom methods
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ _id: this._id }, dotenv.ACCESS_TOKEN_SECRET, {
        expiresIn: dotenv.ACCESS_TOKEN_EXPIRY,
    });
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, dotenv.REFRESH_TOKEN_SECRET, {
        expiresIn: dotenv.REFRESH_TOKEN_EXPIRY,
    });
};

userSchema.methods.toSafeObj = function () {
    const userObject = this.toObject();

    delete userObject.password;
    delete userObject.refreshToken;
    delete userObject.__v;

    return userObject;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
