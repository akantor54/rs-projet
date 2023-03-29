import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id }: any = req.query;

    if (!id) {
      return res.status(400).json({ message: "données manquante" });
    }

    const user: any = await prismadb.user.findUnique({ where: { id: id } });

    if (!user) {
      return res.status(400).json({ message: "l'utilisateur n'existe pas" });
    }
    const stats: any = await prismadb.stat.findUnique({
      where: { authorId: id },
    });
    if (!stats) {
      return res.status(400).json({ message: "aucune stat dispo" });
    }

    res
      .status(200)
      .json({ message: "données du l'user", user: user, stat: stats });
  } else if (req.method === "POST") {
  } else {
    res.status(405).end();
  }
}
