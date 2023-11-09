import express from "express";
import mysql from "mysql";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
const app = express();


dotenv.config()

app.use(cors());
app.use(express.json());
app.use(morgan('common'));
const booksDb = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
  database: "test",
});

const usersDB = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
  database: "test",
});

const ordersDB = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  booksDb.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  booksDb.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  booksDb.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  booksDb.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/users/register", (req, res) => {
  const q = "INSERT INTO users(`firstName`, `lastName`, `email`, `password`, `confirmPassword`) VALUES (?)";

  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
    req.body.confirmPassword,
  ];

  usersDB.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/users/login", (req, res) => {
  const q = "SELECT * FROM users where `email`=? and `password` =?";
  usersDB.query(q, [req.body.email, req.body.password],(err, data) => {
    if (err) return res.json(err);
    return res.json(data)
  });
});

app.post("/orders/checkout", (req, res) => {
  const q = "INSERT INTO orders(`orderId`, `orderDate`, `email`, `books`, `bookIds`, `orderPrice`) VALUES (?)";

  const values = [
    req.body.orderId,
    new Date(req.body.orderDate),
    req.body.email,
    req.body.books,
    req.body.bookIds,
    req.body.orderPrice
  ];
  ordersDB.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json({orderId: req?.body?.orderId});
  });
});


app.post("/orders/list", (req, res) => {
  const q = "SELECT * FROM orders where `email` = ? ";
  ordersDB.query(q, [req.body.emailId],(err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});



app.listen(80, () => {
  console.log("Connected to backend.");
});
