module.exports = function (routeHandler) {
    return async (req, res, next) => {
        try {
            await routeHandler(req,res);next();
        } catch(e) {
            console.log("an error occurred, with the following details " + e + " at date " + new Date());

            res.status(500).send("an error handled globally ocurred" +e);
        }
    }
}