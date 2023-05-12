import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../../../lib/mongoose";
import { hash } from "bcryptjs";
import Users from "../../../../model/user";
import { useCart } from "@/components/CartContext";

async function checkExisting(email) {
  const db = await connectToDatabase();
  console.log("entered check");
  const user = await db.collection("users").findOne({ email: email });
  console.log(user);
  await disconnectFromDatabase();
  return user;
}

async function insertUser(email, password) {
  const db = await connectToDatabase();
  const result = await db.collection("users").insertOne({
    email,
    password: await hash(password, 12),
    role: "user",
  });
  const user = result.insertedId;

  console.log(user);

  // Create a cart for the new user
  const cartResult = await db.collection("carts").insertOne({
    user_id: user,
    items: [],
  });

  console.log(cartResult);

  await disconnectFromDatabase();
  return user;
}

export async function handle(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    
    console.log(email);
    console.log(password);

    //Validate Email
    if (!email || !email.includes("@") || !password) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }

    //Check for existing email
    const check = await checkExisting(email);

    console.log(check);

    //Send error response if duplicate user is found
    if (check) {
      console.log("user exists");
      res.status(422).json({ message: "User already exists" });
      return;
    }

    const newUser = await insertUser(email, password);

    //Send success response
    res.status(201).json({ message: "User created", user: newUser });
    console.log("user created");
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default handle;
