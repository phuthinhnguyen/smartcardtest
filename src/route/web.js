import express from "express";
// import homeController from "../controller/homeController.js";
import {getHomepage,isAuthenticated,admin,forgotPassword,logout,signIn,userInfo,cardId,processSignUp,processLogin,handleUploadFile,processForgotPassword,addcardidtodatabase} from "../controller/homeController.js";
import multer from "multer";
import path from "path";
import appRoot from "app-root-path";
let route = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/image/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({storage: storage, fileFilter:imageFilter});

const initWebroute = (app) =>{
    route.get("/admin",isAuthenticated,admin)
    route.get("/forgotpassword",forgotPassword);
    route.get("/logout",logout);
    route.get("/", getHomepage);
    route.get("/signin", signIn);
    route.get("/:cardid/userinfo",isAuthenticated,userInfo);
    route.get("/:cardid", cardId);
    route.post("/:cardid/processsignup", processSignUp);
    route.post("/processLogin",processLogin);
    route.post("/:cardid/userinfo",upload.single("profile_pic"),handleUploadFile)
    route.post("/processForgotPassword",processForgotPassword)
    route.post("/addcardidtodatabase",addcardidtodatabase)
   
    return app.use("/",route)
}
export default initWebroute;