import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, content } = req.body;

    if (!email || !content) {
      return res.status(400).json({ error: "données manquante" });
    }

    const user = await prismadb.user.findUnique({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ error: "User non trouver" });
    }

    const newPost = await prismadb.post.create({
      data: {
        authorName: user.name,
        authorId: user.id,
        content: content,
        like: [],
      },
    });
    res.status(200).json({ message: "Le post a bien été crée" });
  } else if (req.method === "GET") {
    const postList = await prismadb.post.findMany();

    res.status(200).json({ message: "envoi des post", posts: postList });
  } else if (req.method === "PUT") {
    const { id, content } = req.body;

    if (!id || !content) {
      return res.status(400).json({ message: "données manquante" });
    }

    const post = await prismadb.post.findUnique({ where: { id: id } });
    if (!post) {
      return res.status(400).json({ message: "Le post n'existe pas" });
    }

    const postUpdate = await prismadb.post.update({
      where: { id: id },
      data: { content: content },
    });

    res.status(200).json({ message: "le post a été modifier avec success" });
  } else if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json("id manquant");
    }

    const post = await prismadb.post.delete({ where: { id: id } });

    res.status(200).json("post suprimer");
  } else {
    res.status(405).end();
  }
}
