import memorySchema from '../models/Memory.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_KEY_SECRET,
});


export const getMemory = async (req, res) => {
    try {
        const Memorys = await memorySchema.find();
        return res.send(Memorys);
    }
    catch (err) {
        return res.status(400).send(err);
    }
}

export const postMemory = async (req, res) => {
    try {
        const { image, date, description } = req.body;
        const memory = new memorySchema({ image, date, description });
        await memory.save();
        return res.status(200).json(memory);
    }
    catch (err) {
        console.log(err);
    }
}

export const uploadImage = async (req, res) => {
    try {
        const {code} = req.body;
        const uploadedResponse = await cloudinary.uploader.upload(
            code, {
                upload_preset: 'albumfotos'
            }
        );
        res.send(uploadedResponse.url);
    } catch (error) {
        console.log(error);
    }
};

export const putMemory = async (req, res) => {
    const { idMemory } = req.params;
    const { description, date } = req.body;
    try {

        const currentMemory = await memorySchema.findOne({ _id: idMemory });

        currentMemory.date = date;
        currentMemory.description = description;

        const memoryUpdated = await memorySchema.findByIdAndUpdate(
            {
                _id: idMemory,
            },
            currentMemory,
            {
                new: true
            }
        );

        return res.status(200).json({
            data: memoryUpdated,
        });

    } catch (err) {
        console.log(err);
    }
}

export const deleteMemory = async (req, res) => {
    const { idMemory } = req.params;
    try {
        await memorySchema.deleteOne({ _id: idMemory });
        return res.status(200).send('Recuerdo Eliminado');
    }
    catch (err) {
        console.log(err);
    }
}