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
        CPR: req.body.CPR,
    });

    // unique CPR 
    if (CPRInDatabase) {
        return res.send("An account has already been created before");
    }
    
    if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
    }

    if (isNaN(req.body.CPR)) {
    return res.send("CPR should be only numbers");
}

// is staff boolean
    if (req.body.staff === 'on') {
        req.body.staff = true
    } else {
        req.body.staff = false
    }

    // const isStaff = req.body.staff === true
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword
    // const userData = {
    //     username: req.body.username,
    //     password: hashedPassword,
    // };

    // Save user to DB
    const user = await User.create(req.body);

    // Save consistent session
    req.session.user = {
        username: user.username,
        CPR: user.CPR,
        _id: user._id,
        staff: user.staff,

    };

    req.session.save(() => {
        res.redirect("/") 
    });
};

const showSignInForm = (req, res) => {
    res.render("auth/sign-in.ejs", {
        user: req.session.user,
    });
};

const signIn = async (req, res) => {
    const CPRInDatabase = await User.findOne({
        CPR: req.body.CPR,
    });

    if (!CPRInDatabase) {
        return res.send("User does not exist");
    }

    const validPassword = await bcrypt.compareSync(
        req.body.password,
        CPRInDatabase.password
    );

    if (!validPassword) {
        return res.send("Login failed");
    }

    // Store consistent session
    req.session.user = {
        username: CPRInDatabase.username,
        CPR: CPRInDatabase.CPR,
        _id: CPRInDatabase._id,
         staff: CPRInDatabase.staff,
    };

    req.session.save(() => {
        res.redirect("/");
    });
};

const signOut = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};





module.exports = {
    home,
    showSignUpForm,
    signUp,
    showSignInForm,
    signIn,
    signOut,
    // dashboard,
};
