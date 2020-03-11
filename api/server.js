const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

function sendNodemailer(res) {
	var transporter = nodemailer.createTransport(
		smtpTransport({
			service: "gmail",
			auth: {
				user: "yangtingclever@gmail.com",
				pass: "dkrsusuvkrdhdksu529"
			}
		})
	);

	var text = "Email body goes here";

	var mailOptions = {
		from: "yangtingclever@gmail.com",
		to: "excalibur526@hotmail.com",
		subject: "Test subject",
		text: text
	};

	transporter.sendMail(mailOptions, function(error, info) {
		console.log(error);
		if (error) {
			console.log("error", error);
			res.send({ status: 0, message: error.message });
		} else {
			console.log("info", info);
			res.send({ status: 1, message: "Email processed succesfully!" });
		}
	});
}

// API calls
router.get("/api/sendmail", (req, res) => {
	sendNodemailer(res);
});

// API calls
router.get("/api/hello", (req, res) => {
	res.send({ express: "Hello From Express" });
});

router.post("/api/world", (req, res) => {
	res.send(
		`I received your POST request. This is what you sent me: ${req.body.post}`
	);
});

app.use("/.netlify/functions/server", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
