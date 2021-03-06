const { authJwt } = require("../middleware");
const controller = require("../controllers/mobile.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/telephonie/mobile/:limit", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.Scrape);

    app.post("/telephonie/mobile/:limit/:keyword", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.ScrapeFilter);

    app.delete("/telephonie/mobile", [authJwt.verifyToken, authJwt.isAdmin], controller.RemoveAll);

    app.delete("/telephonie/mobile/:title", [authJwt.verifyToken, authJwt.isAdmin], controller.RemoveByTitle);

    app.get("/telephonie/mobile", authJwt.verifyToken, controller.DisplayAll);

    app.get("/telephonie/mobile/:title", authJwt.verifyToken, controller.DisplayByTitle);

};