// DNS workaround for MongoDB Atlas.👇
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
// for mongos and .env👇
require("dotenv").config();

//bring express and morgan into our server
const express = require("express");
const app = express();
const morgan = require("morgan");

// bring session
const session = require("express-session");
// more for mongose
const { MongoStore } = require("connect-mongo");
const mongoose = require("mongoose");

// to use (PUT & DELETE)
const methodOverride = require("method-override");

const path = require("path");
// for upload image if needed
const upload = require("./config/multer");

//to import the controller
const authCtrl = require("./controllers/auth.js");
const infoCtrl = require("./controllers/infoz.js");



const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");


mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";


//Middleware============================================================
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
    })
);

app.use(passUserToView);


//Route==authCtrl=========================================
app.get("/", authCtrl.home);
app.get("/auth/sign-up", authCtrl.showSignUpForm);
app.post("/auth/sign-up", authCtrl.signUp);
app.get("/auth/sign-in", authCtrl.showSignInForm);
app.post("/auth/sign-in", authCtrl.signIn);
app.delete("/auth/sign-out", authCtrl.signOut);

// app.get("/dashboard", isSignedIn, authCtrl.dashboard);

//Route==infoCtrl=========================================
app.get('/info/newInfo', infoCtrl.showNewForm)
app.post('/info', infoCtrl.create)
app.get('/info/index', infoCtrl.index)
app.get('/info/:infoId' , infoCtrl.showInfo)
app.delete('/info/:infoId' , infoCtrl.deleteInfo)

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
