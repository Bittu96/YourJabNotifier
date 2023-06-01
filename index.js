const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const {
  signInWithEmailPassword,
  signUpWithEmailPassword,
  sendEmailVerification,
  sendPasswordReset,
} = require("./authUser");

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

var firebaseConfig = {
  apiKey: "AIzaSyBqGHwMnwMgciajEz9eyVRzxHssi82MiaQ",
  authDomain: "covidjabnotifier-ffd0e.firebaseapp.com",
  projectId: "covidjabnotifier-ffd0e",
  storageBucket: "covidjabnotifier-ffd0e.appspot.com",
  messagingSenderId: "442905457932",
  appId: "1:442905457932:web:7d92b53ebc491131d00529",
  measurementId: "G-BJLVTW41GM",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;
app.use(cors());

const dbPath = path.join(__dirname, "users.db");
let db = null;

const startApp = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(port, () => {
      console.log(`Server Running at http://localhost:${port}/`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

startApp();

app.get("/", (request, response) => {
  console.log("<=========> Home Api");

  message = {
    status: "200",
    body: "Home body",
  };

  response.json(message);
});

// app.get("/db/", async (request, response) => {
//   console.log("<=========> DB Page");
//   try {
//     const query = `CREATE TABLE users (
//                     user_id INTEGER PRIMARY KEY AUTOINCREMENT,
//                     username VARCHAR(50) NOT NULL,
//                     password VARCHAR(50) NOT NULL,
//                     email VARCHAR(50) NOT NULL
//       );`;
//     const users = await db.all(query);

//     const message = {
//       status: "200",
//       body: `table created : ${users}`,
//     };

//     response.send(message);
//   } catch (error) {

//     const message = {
//       status: "400",
//       body: `error : ${error}`,
//     };

//     response.send(message);
//   }
// });



app.get("/users", async (request, response) => {
  console.log("<=========> Get All Users Api");
  try {
    const query = `SELECT * FROM users`;
    const users = await db.all(query);

    const message = {
      status: "200",
      body: users,
    };

    response.send(message);
  } catch (error) {
    const message = {
      status: "400",
      body: `Invalid : ${error}`,
    };

    response.send(message);
  }
});

app.get("/users/:userId/", async (request, response) => {
  console.log("<=========> Get User Api");
  try {
    const { userId } = request.params;
    const query = `select * from users where user_id=${userId}`;
    const user = await db.get(query);

    const message = {
      status: "200",
      body: user,
    };

    response.send(message);
  } catch (error) {
    const message = {
      status: "400",
      body: error,
    };

    response.send(message);
  }
});

app.post("/users", async (request, response) => {
  console.log("<=========> Post User Api");
  try {
    const { userId } = request.params;
    const { username, password, email } = request.body;
    // console.log(userData);
    // const { username, password, email } = userData;

    const query = `INSERT INTO users (username, password, email) VALUES('${username}', '${password}', '${email}')`;
    const users = await db.run(query);

    const message = {
      status: "200",
      body: users,
    };

    response.send(message);
  } catch (error) {
    const message = {
      status: "400",
      body: error,
    };

    response.send(message);
  }
});
