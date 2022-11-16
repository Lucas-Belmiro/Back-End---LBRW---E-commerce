require('dotenv').config();
const userRoute = require('./routes/userRouter')
const dadosRoute = require('./routes/dadosRouter')
const port = process.env.PORT;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.use('/', userRoute);
app.use('/dados', dadosRoute);


mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection;

db.on("error", () => {
    console.log("Houve um erro")
});
db.once("open", () => {
    console.log("Banco carregado!")
});

app.listen(port, () => {
    console.log("Server running on port", port);
})