/**
 * Created by caiomcg on 22/04/2017.
 */
module.exports = {
    requireAuthentication: function (req, res, next) {
        console.log("Private rout hit");
        next();
    },
    logger: function (req, res, next) {
        console.log("Request[" + new Date().toUTCString() + "]: " + req.method +  " " + req.originalUrl);
        next();
    }
};