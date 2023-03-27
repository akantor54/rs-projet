import styles from "../styles/components/PostCard.module.css";
import { AiOutlineMore } from "react-icons/ai";
import dayjs from "dayjs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Input from "./Input";

const PostCard = ({ posts, update }: any) => {
  const { authorName, content, date, like, id } = posts;
  const { data: session } = useSession();
  const [modifie, setModifie] = useState(false);
  const [postContent, setPostContent] = useState(content);

  const postDelete = () => {
    try {
      axios.delete("/api/posts", { data: { id: id } });
      update();
    } catch (err) {
      console.log(err);
    }
  };

  const postUpdate = () => {
    try {
      const data = {
        id: id,
        content: postContent,
      };
      axios.put("/api/posts", data);
      update();
      setModifie(false);
    } catch (err) {
      console.log(err);
    }
  };

  const likePost = async () => {
    try {
      const email = session?.user?.email;

      await axios.post("/api/like", {
        data: {
          id: id,
          email: email,
          authorId: session?.user.id,
        },
      });
      update();
    } catch (err) {
      console.log(err);
    }
    console.log(
      `vous venais de like le post ${id} votre name ${session?.user?.email}`
    );
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.pseudo}>
        {authorName}{" "}
        <span className={styles.date}>
          {dayjs(date).format("DD/MM/YYYY | HH:mm")}
        </span>
      </h2>
      <li className={styles.menu}>
        <AiOutlineMore />
        <ul className={styles.sousmenu}>
          <li>
            <a href="#">Signaler</a>
          </li>
          {authorName === session?.user?.name ? (
            <>
              <li>
                <a href="#" onClick={() => setModifie(!modifie)}>
                  Modifier
                </a>
              </li>
              <li>
                <a href="#" onClick={() => postDelete()}>
                  Supprimé
                </a>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </li>
      <p>
        {!modifie ? (
          content
        ) : (
          <>
            <Input
              value={postContent}
              onChange={(e: any) => setPostContent(e.target.value)}
              type="text"
              label="content"
            />
            <button onClick={() => postUpdate()}>Update</button>
          </>
        )}
      </p>
      <p onClick={() => likePost()} className={styles.likes}>
        {like.length} Like
      </p>
    </div>
  );
};

export default PostCard;
