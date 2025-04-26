const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const user = require('../models/user');
const { where } = require('sequelize');

const SECRET_KEY = 'your-secret-key';

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ username, email, password: hash });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};


exports.ChangePassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(401).json({ message: "Email not found" });

        const hash = await bcrypt.hash(newPassword, 10);

        await User.update(
            { password: hash },
            { where: { email } }
        );

        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
}

exports.ChangePasswordV2 = async (req, res) => {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ where: { email } });

    try {
        if (!user) return res.status(401).json({ message: "Email not found!" });

        const hash = await bcrypt.hash(newPassword, 10);
        await User.update(
            { password: hash },
            { where: { email } }
        )
          // ✅ Gửi phản hồi thành công
          res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
}