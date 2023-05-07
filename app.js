//importing modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();


//importing routes
const authRoutes = require("./routes/auth");

//initialising app
const app = express();

//initialising database connection
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    });

//middlewares
const coreOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept, VERSION",
    exposedHeaders: "Content-Type, Authorization, X-Requested-With, Accept, VERSION",
}
app.use(cors(coreOptions));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
// app.use(expressValidator())

// // redirecting on root
// app.get("/", (req, res) => {
//   res.send(`<script>window.location.href='https://${process.env.CLIENT_URL}'</script>`);
// });

//registering routes
app.use("/api/auth", authRoutes);

// app.use("/uploads", express.static("uploads"));
// app.use("/public", express.static("./views"))

//listen to server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
