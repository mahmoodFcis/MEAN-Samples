const test = require("supertest");
require("jest");
let server = {};
const config = require("config");
const {
    User
} = require("../../models/user");
const usersEndPointUrl = "/api/users/";
describe("test getting users from the app", function () {
    beforeEach(async function () {
        server = require("../../index");
        User.remove({});
        var user = new User({
            userName: "ahmed",
            password: "123456",
            age: 25,
            email: "ahmed@email.com",
            roles: "admin",
            gender: "Male"
        });
        await user.save();
        //user 2
        var user2 = new User({
            userName: "mahmoud",
            password: "123456",
            age: 20,
            email: "ahmed@email.com",
            roles: "admin",
            gender: "Male"
        });
        await user2.save();

        var user3 = new User({
            userName: "Hassan",
            password: "123456",
            age: 30,
            email: "ahmed@email.com",
            roles: "admin",
            gender: "Male"
        });
        await user3.save();
    });
    it("expect the number of users returned to be 3 users", async function () {
        var res = await test(server).get(usersEndPointUrl);

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
        expect(res.body[0]).toHaveProperty("age", 25);
    });

    afterEach(async function () {
        await User.remove({});
        server.close();
    })
});

describe("testing the save of new users", function () {
 let token={};
    beforeEach(async function () {
        let user=new User({userName: "mahmoud",
        password: "123456",
        age: 20,
        email: "ahmed@email.com",
        roles: "admin",
        gender: "Male"});
        token=user.generateAuthToken();
        server = require("../../index");
    });

    it("expect adding a new user succeeds", async function () {
        var res = await test(server).post(usersEndPointUrl).set("X-Auth-Token",token).send({
            userName: "mahmoud",
            password: "123456",
            age: 20,
            email: "ahmed@email.com",
            roles: "admin",
            gender: "Male"
        });
        expect(res.status).toBe(200);
        expect(res.body).not.toBe(null);
    })
    it("expect posting an empty user object to send an error response", async function () {
        var res = await test(server).post(usersEndPointUrl).set("X-Auth-Token",token).send(null);
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("invalid/missing user data");
    })

    it("expect validation error in the response when sending invalid user name", async function () {
        var res = await test(server).post(usersEndPointUrl).set("X-Auth-Token",token).send({userName:"ms"});
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("invalid data, please check your data again");
    })

    it("testing to post a new user without a token", async function () {
        var res = await test(server).post(usersEndPointUrl).send({userName: "mahmoud",
        password: "123456",
        age: 20,
        email: "ahmed@email.com",
        roles: "admin",
        gender: "Male"});
        expect(res.status).toBe(401);
       
    })
    afterEach(async function () {
        await User.remove({});
        server.close();
    })
})
