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

const addUser = (name, password) => {
  db.insert({ _id: name, password: password });
};

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
      if (user._id.toLowerCase() === userEmail.toLowerCase()) {
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
      if (user._id.toLowerCase() === userData.email.toLowerCase()) {
        callback(user.password === userData.password ? true : false);
        return;
      }
    }
    callback("The user isn't correct!!!");
  });
};

app.post("/serverside/sendMail", async (req, res) => {
  isEmailRegistered(req.body.email, (isRegistered) => {
    if (isRegistered) {
      isPasswordCorrect(req.body, (isCorrect) => {
        if (isCorrect) {
          //TODO, login, goto lobby
          res.json({ message: "login-success" });
          return;
        }
        res.json({ message: "login-nosuccess" });
      });
      return;
    }
    //TODO send Mail, verify code (code should be assigned to database with the user), register and login, goto lobby
  });
});
