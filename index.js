const express = require("express");
const app = express();

const port = 3443;
const hostname = "0.0.0.0";

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/", express.static("public"));

app.listen(port, hostname, () => {
  console.log(`Listening on http://${hostname}:${port}`);
});

const Datastore = require("nedb");

const db = new Datastore("users.db");
db.loadDatabase();

const addUser = (userEmail, password) => {
  db.insert({
    email: userEmail,
    password: password,
    status: "not-logged-in",
    verifyCode: "none",
  });
};

// addUser("alshoufy@dachsberg.at", "myPass1234");
// addUser("yanni.g.apps@gmail.com", "myPass4321");

const nodemailer = require("nodemailer");
const getVerifyCode = () => Math.random().toString().slice(12, -1);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "web.dachs.app@gmail.com",
    pass: "wt}-S4=+cA6a/H#i",
  },
});

let verifyCode;
const sendMail = (userEmail) => {
  verifyCode = getVerifyCode();
  transporter
    .sendMail({
      from: "web.dachs.app@gmail.com",
      to: userEmail,
      subject: "Dachsapp Bestätigungscode",
      html: `
	  <div>
	  <h1>Bestätigungscode</h1>
	  <pre>
	  Ihr Code lautet: ${verifyCode}
	  </pre>
	  <h3>Danke<br>Ihr Dachsteam</h3>
	  </div>`,
    })
    .then((res) => {
      console.log(`Got sended to ${userEmail} succefully`);
    })
    .catch((err) => {
      console.log(`Couldn't send email to ${userEmail}`);
    });
};

const isEmailRegistered = (userEmail, callback) => {
  //? get all users
  db.find({}, (err, allUsers) => {
    for (let user of allUsers) {
      if (user.email.toLowerCase() === userEmail.toLowerCase()) {
        callback(true);
        return;
      }
    }
    callback(false);
  });
};

const isPasswordCorrect = (userData, callback) => {
  db.find({}, (err, allUsers) => {
    for (let user of allUsers) {
      if (user.email.toLowerCase() === userData.email.toLowerCase()) {
        callback(user.password === userData.password ? true : false);
        return;
      }
    }
    callback("The user isn't correct!!!");
  });
};

const isPasswordUseable = (userPassword, callback) => {
  let isUseable = true;
  if (userPassword.length < 6) isUseable = false;
  if (userPassword.length > 32) isUseable = false;
  for (let letter of userPassword) {
    if (
      !"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_-=+{}[]|;:/?.`'".includes(
        letter
      )
    ) {
      isUseable = false;
    }
  }
  callback(isUseable);
};

app.post("/serverside/sendMail", async (req, res) => {
  isEmailRegistered(req.body.email, (isRegistered) => {
    if (isRegistered) {
      isPasswordCorrect(req.body, (isCorrect) => {
        if (isCorrect) {
          db.update(
            { email: req.body.email },
            { $set: { status: "logged-in" } },
            (err) => console.log(err)
          );

          res.json({ message: "login-success" });
          return;
        }
        res.json({ message: "login-nosuccess" });
      });
      return;
    }
    isPasswordUseable(req.body.password, (isUseable) => {
      if (isUseable) {
        //TODO send Mail, verify code (code should be assigned to database with the user), register and login, goto lobby
        return;
      }
      res.json({ message: "register-pass-illegal" });
    });
  });
});

app.post("/serverside/getStatus", (req, res) => {
  db.find({ email: req.body.email }, (err, user) => {
    res.json({ message: user[0].status });
  });
});
