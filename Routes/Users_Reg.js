const express = require('express');
const router = express.Router();
const userReg = require('../models/User_Reg');

router.get('/', async(req,res) =>{
    try{
        const user = await userReg.find();
        res.json(user);
    }catch(err){
        res.send(`Error ${err}`);
    }
})

router.post('/', async (req, res) => {
    try {
        const { user_mail, user_name, user_pass, user_repass } = req.body;

        // Check if user already exists with the provided email
        const existingUser = await userReg.findOne({ user_mail });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const newUser = new userReg({
            user_mail,
            user_name,
            user_pass,
            user_repass
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        res.json(savedUser);
    } catch (err) {
        res.status(500).send(`Error ${err}`);
    }
});


module.exports = router;