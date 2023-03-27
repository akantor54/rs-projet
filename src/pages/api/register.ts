import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prismadb from "../../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
  }

  const { name, email, password, age, date } = req.body;

  console.log(req.body);

  if (!name || !email || !password || !age || !date) {
    return res.status(400).json({ error: "Data missing" });
  }

  const userExiste = await prismadb.user.findUnique({
    where: { email: email },
  });

  if (userExiste) {
    return res.status(400).json({ error: "The user already exists" });
  }

  const hash = await bcrypt.hash(password, 12);

  const user = await prismadb.user.create({
    data: {
      name: name,
      email: email,
      age: parseInt(age),
      date: new Date(date),
      password: hash,
    },
  });

  const stats = await prismadb.stat.create({ data: { authorId: user.id } });
  res.status(200).json({ succes: "User has been successfully created" });
}
