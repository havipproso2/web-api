import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post("/", (req, res) => {
    const { email, password } = req.body;
    console.log("credentials", req.body);
    User.findOne({ email }).then(user => {
        if(user && user.isValidPassword(password)){
            res.json({ success: true, user: user.toAuthJSON() });
        } else {
            res.json({ success: false, global: "Invalid credentials" });
        }
    });
});

export default router;