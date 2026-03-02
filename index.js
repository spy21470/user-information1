import express from "express";
import bodyParser from "body-parser";  
import mongo from "./config.js";
import { ObjectId } from "mongodb";

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* =========================
   1. READ
========================= */
app.get("/", async (req, res) => {
    let result = await mongo.collection('users').find({}).toArray();
    res.render('list', { data: result });
});

/* =========================
   2. INSERT (Form)
========================= */
app.get("/insert", (req, res) => {
    res.render("insert");
});

/* =========================
   3. INSERT (Save)
========================= */
app.post("/insert", async (req, res) => {

    const data = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        address: req.body.address,
        gender: req.body.gender
    };

    await mongo.collection('users').insertOne(data);
    res.redirect("/");
});

/* =========================
   4. DELETE
========================= */
app.get("/delete/:_id", async (req, res) => {
    let query = { _id: new ObjectId(req.params._id) };
    await mongo.collection('users').deleteOne(query);
    res.redirect('/');
});

/* =========================
   5. UPDATE (Show Form)
========================= */
app.get("/update/:_id", async (req, res) => {

    let id = new ObjectId(req.params._id);
    const result = await mongo.collection('users').findOne({ _id: id });

    res.render("update", {
        _id: result._id,
        fname: result.fname,
        lname: result.lname,
        email: result.email,
        address: result.address,
        gender: result.gender
    });
});

/* =========================
   6. UPDATE (Save)
========================= */
app.post("/update", async (req, res) => {

    const id = new ObjectId(req.body._id);

    const query = { _id: id };

    const newData = {
        $set: {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender
        }
    };

    await mongo.collection('users').updateOne(query, newData);

    res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});
