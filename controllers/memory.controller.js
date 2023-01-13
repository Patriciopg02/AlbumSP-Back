import Memory from '../models/Memory.js';

export const getMemory = async (req, res) => {
    try {
        const Memorys = await Memory.find();
        return res.send(Memorys);
    }
    catch (err) {
        return res.status(400).send(err);
    }
}

export const postMemory = async (req, res) => {
    try {
        const { image, date, description } = req.body;
        const memory = new Memory({ image, date, description });
        await memory.save();
        return res.status(200).json(memory);
    }
    catch (err) {
        console.log(err);
    }
}

export const putMemory = async (req, res) => {
    try {
        const { idMemory, date, description } = req.body;

        const currentMemory = await memorySchema.findOne({ _id: idMemory });

        currentMemory.date = date;
        currentMemory.description = description;

        const memoryUpdated = await memorySchema.findByIdAndUpdate(
            {
                _id: idMemory,
            },
            currentMemory,
            {
                new: true,
            }
        );

        return res.status(200).json({
            data: memoryUpdated,
        });

    } catch (error) {
        return res.status(500).json({
            msg: `An error ocurred 😡`,
            error,
        });
    }
};