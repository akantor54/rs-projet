// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, id, authorId } = req.body.data;

    if (!email || !id || !authorId) {
      return res.status(400).json({ message: " données manquante" });
    }

    const user = await prismadb.user.findUnique({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ message: "user n'existe pas" });
    }

    const post = await prismadb.post.findUnique({ where: { id: id } });
    const like: any = await prismadb.stat.findUnique({
      where: { authorId: authorId },
    });

    if (post?.like.includes(user.id)) {
      const newPostLike = post.like.filter((u) => u !== user?.id);
      const posts: any = await prismadb.post.update({
        where: { id: id },
        data: { like: newPostLike },
      });

      const nbLike = like?.postLike - 1;

      const stat = await prismadb.stat.update({
        where: { authorId: authorId },
        data: {
          postLike: nbLike,
        },
      });

      return res
        .status(200)
        .json({ message: "vous avez enlever votre like de ce post" });
    }

    let likes: string[] | any = post?.like;
    likes?.push(user.id);

    const posts = await prismadb.post.update({
      where: { id: id },
      data: { like: likes },
    });

    const nbLike: Number | any = like?.postLike + 1;

    console.log(like);

    const stat = await prismadb.stat.update({
      where: { authorId: authorId },
      data: {
        postLike: nbLike,
      },
    });

    res.status(200).json({ message: "vous venais de like le post", posts });
  }
}
