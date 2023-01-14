import memorySchema from '../models/Memory.js';

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

export const putMemory = async (req, res) => {
    const { idMemory } = req.params;
    const { description,date } = req.body;
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

export const deleteMemory = async (req,res) => {
    const { idMemory } = req.params;
    try {
        await memorySchema.deleteOne({ _id: idMemory});
        return res.status(200).send('Recuerdo Eliminado');
    }
    catch(err) {
        console.log(err);
    }
}