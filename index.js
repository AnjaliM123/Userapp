const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidate = require("password-validate");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "userprofile.db");
let db = null;
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at https://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

const logger = (request, response, next) => {
  console.log(request.body);
  next();
};

const authenticationToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("invalid jwt token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_KEY", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("invalid jwt token");
      } else {
        request.name = payload.name;
        next();
      }
    });
  }
};

/*app.post("/user/", async (request, response) => {
  const userDetails = request.body;
  console.log(userDetails);
  const {
    id,
    name,
    email,
    password,
    gender,
    age,
    company,
    designation,
    about,
  } = userDetails;
  const addUserQuery = `
    INSERT INTO user(id,name,email,password,gender,age,company,designation,about)
    VALUES (
        ${id},'${name}','${email}','${password}','${gender}','${age}','${company}','${designation}','${about}');`;
  const dbResponse = await db.run(addUserQuery);
  const userId = dbResponse.lastID;
  response.send({ userId: userId });
});*/

//app get api

app.get("/profile/", authenticationToken, async (request, response) => {
  const getUserQuery = `
        SELECT * FROM user;`;
  const userArray = await db.all(getUserQuery);
  response.send(userArray);
});

//app put

app.put("/user/:userId/", authenticationToken, async (request, response) => {
  const { userId } = request.params;
  const userDetails = request.body;
  const {
    id,
    name,
    email,
    password,
    age,
    gender,
    company,
    designation,
    about,
  } = userDetails;
  const updateUserQuery = `
        UPDATE user 
        SET 
        id=${id},
        name='${name}',
        email='${email}',
        password='${password}',
        age=${age},
        gender='${gender}',
        company='${company}',
        designation='${designation}',
        about='${about}'
        WHERE id=${userId};`;
  const dbResponse = await db.run(updateUserQuery);
  console.log(dbResponse.age);
  response.send("user updated successfully");
});

//app get api

app.get("/user/:userId", authenticationToken, async (request, response) => {
  const { userId } = request.params;
  const getUserQuery = `
        SELECT * FROM user WHERE id=${userId};`;
  console.log(getUserQuery);
  const userArray = await db.get(getUserQuery);
  response.send(userArray);
});

//app delete api

app.delete("/user/:userId", authenticationToken, async (request, response) => {
  const { userId } = request.params;
  console.log(userId);
  const deleteUserQuery = `
    DELETE FROM user WHERE id=${userId};`;
  await db.get(deleteUserQuery);
  response.send("user deleted");
});

//app post api

app.post("/user/", async (request, response) => {
  const {
    id,
    name,
    email,
    password,
    age,
    gender,
    company,
    designation,
    about,
  } = request.body;
  let upperCase1 = 0;
  let lowerCase1 = 0;
  let numberCount = 0;
  for (let count of password) {
    if (count === count.toUpperCase()) {
      upperCase1 = upperCase1 + 1;
    }
  }
  console.log(upperCase1);
  console.log(lowerCase1);
  const hashedPassword = await bcrypt.hash(password, 10);
  const selectUserQuery = `
        SELECT * FROM user WHERE name='${name}';`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    if (password.length >= 8) {
      const createUserQuery = `
                INSERT INTO user(id,name,email,password,age,gender,company,designation,about)
                VALUES (
                    ${id},'${name}','${email}','${hashedPassword}','${age}','${gender}','${company}','${designation}','${about}');`;
      await db.run(createUserQuery);
      response.send("user created successfully");
    } else {
      response.send("Please enter a valid password");
    }
  } else {
    response.status(400);
    response.send("user already exists");
  }
});

//app post api

app.post("/login/", async (request, response) => {
  const { name, email, password } = request.body;
  const selectUserQuery = `SELECT * FROM user WHERE name='${name}';`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid user");
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched === true) {
      const payload = { name: name };
      const jwtToken = jwt.sign(payload, "MY_SECRET_KEY");
      response.send({ jwtToken });
    } else {
      response.status(400);
      response.send("invalid password");
    }
  }
});
module.export = app;
