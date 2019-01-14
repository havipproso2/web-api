import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

const router = express.Router();

router.post("/", (req, res) => {
    const { email, password, passwordConfirm } = req.body;
    User.findOne({ email }).then(user => {
        if(!user) {
            if(password !== passwordConfirm) {
                return res.json({ success: false, message: 'Password does not match' });
            }
            const passwordHash = bcrypt.hashSync(password, 10);
            User.create({
                "email": email,
                "passwordHash": passwordHash
            });
            return res.json({ success: true, user: { token: jwt.sign({ email }, process.env.JWT_CECRET) } });
        }
        return res.json({ success: false, message: 'Email already exists!' });
    });

});

export default router;