//assignment to refactor code to its models

const express = require("express");
const router = express.Router();
const joi = require("joi");
const UserModel = require("../models/user");
const myMiddleWare = require("../middleware/myMiddlware");
var users = [];


router.get("/", async (req, res) => {

    //lt
    //gt
    //eg
    //in
    //nin
    //neg
    //gte
    //lte

    // sample condition and filtering {age:{$eq:40,$lt:70}}).or([{userName:""},{password:"123456"}]
    var users = await UserModel.User.find().limit(5).sort({
        userName: 1,
        password: 1
    }) //to select specific columns .select({userName:1});

    res.send(users);
})

router.get("/:userName", async (req, res) => {
    var _userName = req.params.userName;
    if (_userName) {
        var user = await UserModel.getByUserName(userName);
        res.send(user);
    } else res.status(404).send("user does not exist");
});

router.post("/", myMiddleWare, async (req, res) => {

    var schema = {
        "userName": joi.string().min(4).max(20).required(),
        "password": joi.string().required()
    };
    var user = req.body;

    if (user) {
        try {
            let {
                userName,
                password
            } = user;
            var validationResult = joi.validate({
                userName: userName,
                password: password
            }, schema);
            if (validationResult.error) {
                res.status(400).send("invalid data, please check your data again");


            } else {
                var _user = await User.findOne({
                    userName: user.userName
                });
                if (_user) {
                    res.status(400).send("User with this user name already exists");
                }

                let newUser = new User({
                    userName: user.userName,
                    password: user.password,
                    roles: user.roles,
                    gender: user.gender
                });
                let result = await newUser.save();
                res.send(result);
            }

        } catch (e) {
            console.log(e);
            res.status(400).send("invalid user data");
        }

    } else {
        res.status(400).send("invalid/missing user data");
    }


});

router.put("/:userName", async (req, res) => {

    var userName = req.params.userName;
    if (userName) {
        let user = await UserModel.getByUserName(userName);

        if (user) {
            await UserModel.User.findByIdAndUpdate(user._id, {
                age: req.body.age,
                roles: req.body.roles
            }, function (err, result) {

                if (err)
                    res.status(500).send("User document could not be updated");
                else res.send(result);

            })

        } else {
            res.status(404).send("User does not exist");
        }
    }

})
router.delete("/:userName",async (req, res) => {

    var userName = req.params.userName;
    if (userName) {
        let user = await UserModel.getByUserName(userName);

        if (user) {
            UserModel.User.findByIdAndDelete(user._id, function (err, result) {
                if (err)
                    res.status(500).send("User document could not be updated");
                else res.send(result);

            })

        } else {
            res.status(404).send("User does not exist");
        }
    }
})
module.exports = router;
