import ImageKit from "@imagekit/nodejs";
import { dotenv } from "../../config/env.config.js";
import fs from "fs";

const client = new ImageKit({
    privateKey: dotenv.IMAGEKIT_PRIVATE_KEY
});


export const uploadToCloud = async (file) => {
    try {
        const res = await client.files.upload({
            file: fs.createReadStream(file.path),
            fileName: file.filename,
            folder: "Kanban-App"
        });
        fs.unlinkSync(file.path);
        return res.url;
    } catch (error) {
        console.log("Error during file uploading on cloud, Error: ", error.message);
        if (file && file.path) {
            fs.unlinkSync(file.path);
        }
    }
};