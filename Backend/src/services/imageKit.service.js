import ImageKit from "@imagekit/nodejs";
import { dotenv } from "../../config/env.config.js";
import fs from "fs";

const client = new ImageKit({
    privateKey: dotenv.IMAGEKIT_PRIVATE_KEY,
});

export const uploadToCloud = async (file) => {
    try {
        const res = await client.files.upload({
            file: fs.createReadStream(file.path),
            fileName: file.filename,
            folder: "Kanban-App",
        });
        fs.unlinkSync(file.path);
        return res.url;
    } catch (error) {
        console.log(
            "Error during file uploading on cloud, Error: ",
            error.message
        );
        if (file && file.path) {
            fs.unlinkSync(file.path);
        }
    }
};

export const deleteFromCloud = async (fileName) => {
    try {
        const files = await client.assets.list({
            searchQuery: `name="${fileName.toString()}"`,
        });
        if (files.length > 0) {
            const fileId = files[0].fileId;
            client.files.delete(fileId);
        } else {
            console.log("File not found");
        }
    } catch (error) {
        console.log(
            `Error during file delete from cloud {File Name:${fileName}, Error: ${error.message}}`
        );
    }
};
