//importing modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();


//importing routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const saleRoutes = require("./routes/sale");
const storeRoutes = require("./routes/store");
const userRoutes = require("./routes/user");

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
// app.use(expressValidator())

// // redirecting on root
app.get("/", (req, res) => {
    //   res.send(`<script>window.location.href='https://${process.env.CLIENT_URL}'</script>`);
    res.send(`hello`);
});

//registering routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/sale", saleRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/user", userRoutes);

app.use("/uploads", express.static("uploads"));

//listen to server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
