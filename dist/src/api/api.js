import express from "express";
import authController from "@controllers/authController";
import middleWare from "src/middleware/middleware";
import userController from "@controllers/userController";
const api = express.Router();
//test
api.get("/ping", (req, res) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip;
    res.cookie("test", "test");
    res.status(200).json({
        message: "your ip address : " + forwardedIp
    });
});
//middleware
api.use("/auth", middleWare.checkInforAccessToken);
api.use("/admin", middleWare.checkIsAdmin);
//common
api.post("/register", (req, res) => { authController.register(req, res); });
api.post("/login", (req, res) => { authController.login(req, res); });
//auth api
api.post("/auth/getAllWords", userController.getAllWords);
api.post("/auth/getWordById", userController.getWordById);
api.post("/auth/getRandomWord", userController.getRandomWord);
api.post("/auth/addWordToFavorite", userController.addWordToFavorite);
api.post("/auth/getFavorite", userController.getFavorite);
api.post("/auth/addWordMyWord", userController.addWordMyWord);
api.post("/auth/getMyWord", userController.getMyWord);
api.post("/auth/addNewBag", userController.addNewBag);
api.post("/auth/getAllBags", userController.getAllBags);
//admin api
export default api;
