
const User = require("../models/User")

const getUser =async (req,res) => {
    try {
        const Users = await User.find();
       return  res.status(200).json(Users);
    } catch (err) {
       return  res.status(500).json({ message: err.message });
    }
}

const updateUser = async (req,res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) throw new Error("User not found");
        return  res.json(updatedUser);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const deleteUser = async (req,res) => {
    try {
        const deletedUser = await User.findById(req.params.id);
        if (!deletedUser) throw new Error("User not found");
        return  res.json(deletedUser);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getUser,
    updateUser,
    deleteUser
};


