import express from "express";
import configViewEngine from "./configs/viewEngine.js";
import initWebroute from "./route/web.js";
// import initAPIRoute from "./route/api"
import session from 'express-session';
import flash from 'connect-flash';
import dotenv from 'dotenv';
dotenv.config()


const app = express();
const port = process.env.PORT || 8080;

// read req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
app.use(flash());


// setup view engine
configViewEngine(app);

// init webroute
initWebroute(app)

// init api route
// initAPIRoute(app)

app.listen(port,()=>console.log("ok"))