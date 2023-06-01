const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
process.env.TOKEN_SECRET;

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "users",
  Key: {
    user_id: "1",
  },
};

// list all users
async function listItems() {
  try {
    const data = await docClient.scan(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

// fetch a user
async function getItem(itemData) {
  try {
    const params = {
      TableName: "users",
      Key: {
        user_id: itemData["user_id"],
      },
    };
    const data = await docClient.get(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

// Create new user
async function createItem(itemData) {
  console.log(itemData);
  try {
    const addParams = {
      TableName: "users",
      Item: {
        user_id: itemData["user_id"],
        username: itemData["username"],
        password: itemData["password "],
        email: itemData["email"],
      },
    };

    await docClient.put(addParams).promise();
  } catch (err) {
    return err;
  }
}

// create token
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

// lambda export  function
exports.handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    try {
      const data = await listItems();
      return { body: JSON.stringify(data) };
    } catch (err) {
      return { error: err };
    }
  } else {
    try {
      const checkUser = await getItem(event);
      const resp = await checkUser;
      const userStatus = JSON.stringify(resp).length !== 2 ? 1 : 0;
      if (userStatus === 1) {
        return {
          body: "User Already Exists",
        };
      } else {
        await createItem(event);
        return {
          body: "User is created",
        };
      }
    } catch (err) {
      return { error: err };
    }
  }
};
