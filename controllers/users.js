const User = require('../models/User');

module.exports = {
    getProfileDetails: async function (req, res) {
        try {
            let result = await User.findOne({ _id: req.user._id }).select('-__v -password');
            if (!result) {
                res.status(404).json({ message: "not found" });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}