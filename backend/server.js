require("dotenv").config();
const app = require("./app");
const connectToMongo = require("./src/db/db");
const cors = require("cors");

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));

connectToMongo();

app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

