import User from '../models/user.js';

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = password === existingUser.password;
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Credentials.' });

        res.status(200).json({ result: existingUser });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const register = async (req, res) => {

    const { email, name, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exist' });

        const result = await User.create({ email, name, password });

        res.status(201).json({ result });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Something went wrong.' });
    }
}