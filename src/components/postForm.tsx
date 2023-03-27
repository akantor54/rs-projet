import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import styles from "../styles/components/PostForm.module.css";

const PostForm = ({ update }: any) => {
  const [content, setContent] = useState("");
  const { data: session }: any = useSession();

  const envoi = useCallback(async () => {
    try {
      const data = {
        content: content,
        email: session?.user?.email,
      };
      await axios.post("/api/posts", data);
      setContent("");
      update();
    } catch (err) {
      console.log(err);
    }
  }, [content, session, update]);

  return (
    <div className={styles.form}>
      <label className={styles.title} htmlFor="contenu">
        Entrez votre publication
      </label>
      <textarea
        value={content}
        className={styles.area}
        rows={8}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={() => envoi()} className={styles.btnPublic}>
        Pulie
      </button>
    </div>
  );
};

export default PostForm;
