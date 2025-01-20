const todo = require("../models/todoModel");

const todoAdd = async (req, res) => {
    try {
        const _todo = await todo.findOne({ name: req.body.name });

        if (_todo) return res.status(400).json({ success: false, message: "already exists" });

        const todoAdd = new todo(req.body);

        await todoAdd.save()
            .then(() => {
                return res.status(201).json(todoAdd);
            })
            .catch((error) => {
                return res.status(400).json({
                    success: false,
                    message: error,
                });
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error" + error
        });
    }
};

const todoGetAll = async (req, res) => {
    const { page } = req.query;
    const limit = 3;
    const skip = Number(page - 1) * limit;

    try {
        const todoGetAll = await todo.find({}).limit(limit).skip(skip);

        return res.status(200).json({
            success: true,
            data: todoGetAll
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error" + error
        })
    }
};

const todoUpdate = async (req, res) => {
    const { id } = req.params;

    try {
        const todoUpdate = await todo.findByIdAndUpdate(id, req.body);

        if (todoUpdate) {
            return res.status(200).json({ success: true, message: "success" });
        }
        else return res.status(400).json({ success: false, message: "error" });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error" + error
        })
    }
};

const todoDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const todoDelete = await todo.findByIdAndDelete(id);

        if (todoDelete) {
            return res.status(200).json({ success: true, message: "success" });
        } else {
            return res.status(400).json({ success: false, message: "error" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "error" + error });
    }

};

const todoGet = async (req, res) => {
    const { id } = req.params;

    const todoGet = await todo.findById(id);

    if (todoGet) {
        return res.status(200).json(todoGet);
    } else {
        return res.status(405).json({ success: false, message: "error" });
    }
};

module.exports = { todoAdd, todoGetAll, todoUpdate, todoDelete, todoGet };