const User = require("../models/user");
const bcrypt = require("bcrypt");

const home = (req, res) => {
    res.render("home.ejs", {
        user: req.session.user,
    });
};

const showSignUpForm = (req, res) => {
    res.render("auth/sign-up.ejs", {
        user: req.session.user,
    });
};

const signUp = async (req, res) => {
    const CPRInDatabase = await User.findOne({
        cpr: req.body.CPR,
    });

    if (CPRInDatabase) {
        return res.send("An account has already been created ");
    }

    // if (req.body.password !== req.body.confirmPassword) {
    // return res.send("Password and Confirm Password must match");
    // }

    if (req.body.staff === 'on') {
        req.body.staff = true
    } else {
        req.body.staff = false
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword
    // const userData = {
    //     username: req.body.username,
    //     password: hashedPassword,
    // };

    const user = await User.create(req.body);

    req.session.user = {
        username: user.username,
        id: user.id,
    };

    req.session.save(() => {
        res.redirect("/");
    });
};

const showSignInForm = (req, res) => {
    res.render("auth/sign-in.ejs", {
        user: req.session.user,
    });
};




module.exports = {
    home,
    showSignUpForm,
    signUp,
    showSignInForm,
    // signIn,
    // signOut,
    // dashboard,
};
