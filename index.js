const express = require("express");
const app = express();
const https = require("https");

const path = require("path");
const fs = require("fs");

const port = 3443;
const hostname = "0.0.0.0";

app.use("/", express.static("dist/leaflet-testing-in-angular"));

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "certificate", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "certificate", "cert.pem")),
  },
  app
);

sslServer.listen(port, hostname, () => {
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

app.get("/sendMail", () => {
  let code = getVerifyCode();
  transporter
    .sendMail({
      from: "web.dachs.app@gmail.com",
      to: "alshoufy@dachsberg.at",
      subject: "Dachsapp Bestätigungscode",
      html: `
    <div>
    <h1>Bestätigungscode</h1>
    <pre>
    Ihr Code lautet: ${code}
    </pre>
    <h3>Danke<br>Ihr Dachsteam</h3>
    </div>`,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
