const { User, listUsers, getByUserName } = require("../models/user");

const joi=require("joi");
module.exports = {
    list: async (req, res) => {

        var users = await listUsers();
        res.send(users);
    },
    findByName: async (req, res) => {
        var _userName = req.params.userName;
        if (_userName) {
            var user = await getByUserName(userName);
            res.send(user);
        }
        else res.status(404).send("user does not exist");
    },
    save: async (req, res) => {

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
                var validationResult = {};
                validationResult = joi.validate({
                    userName: userName,
                    password: password
                }, schema);
                if (validationResult.error) {
                    res.status(400).send("invalid data, please check your data again");


                } else {
                    var _user = await getByUserName(user.userName);
                    if (_user) {
                        res.status(400).send("User with this user name already exists");
                    }
                    try {

                        

                        let newUser = new User({
                            userName: user.userName,
                            roles: user.roles,
                            gender: user.gender,
                            age: user.age,
                            creationDate: user.creationDate,
                            email: user.email,
                            role: user.role,
                            password:user.password
                        });
                        newUser.encryptPassword();
                        

                        await newUser.save();
                        res.send(newUser);

                    } catch (e) {
                        console.log(e);
                        for (field in e.errors) {
                            console.error(e.errors[field].message);
                        }

                        res.status(500).send(e);
                    }

                }

            } catch (e) {
                console.log(e);
                res.status(400).send("invalid user data");
            }

        } else {
            res.status(400).send("invalid/missing user data");
        }


    },
    update:async (req, res) => {

        var userName = req.params.userName;
        if (userName) {
          
            let user = await getByUserName(userName);
            if (user) {
                await User.findByIdAndUpdate(user._id, {
                    age: req.body.age,
                    roles: req.body.roles
                }, {
                    new: true
                }, function (err, result) {
    
                    if (err)
                        res.status(500).send("User document could not be updated");
                    else res.send(result);
    
                })
    
            } else {
                res.status(404).send("User does not exist");
            }
        }
    
    },
    delete:async (req, res) => {

        var userName = req.params.userName;
        if (userName) {
            let user = await getByUserName(userName);
    
            if (user) {
                User.findByIdAndDelete(user._id, function (err, result) {
                    if (err)
                        res.status(500).send("User document could not be updated");
                    else res.send(result);
    
                })
    
            } else {
                res.status(404).send("User does not exist");
            }
        }
    }
}