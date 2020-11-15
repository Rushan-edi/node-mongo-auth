const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, logginValidation } = require('../validation/validation');

module.exports = {
    register: async function (req, res) {
        //Validate register req body
        const { error } = registerValidation(req.body);
        if (error) return res.status(422).json({ message: error.details[0].message });
        //Check if email exsit
        const emailExsit = await User.findOne({ email: req.body.email });
        if (emailExsit) return res.status(422).json({ message: 'Email already exsits' });
        //generate hashpassword (salt+ password)
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });

        try {
            const result = await user.save();
            return res.status(200).json({ user: result._id });
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    login: async function (req, res) {

        try {
            //Validate login req body
            const { error } = logginValidation(req.body);
            if (error) return res.status(422).json({ message: error.details[0].message });
            //Check if user is exsit
            const user = await User.findOne({ email: req.body.email });
            if (!user) return res.status(422).json({ message: 'Email is not found' });

            //Compare user password
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) return res.status(422).json({ message: 'Invalid Password' });

            const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET);

            return res.header('auth-token', token).json({ token: token });
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}