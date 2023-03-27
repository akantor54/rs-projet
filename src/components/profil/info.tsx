import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "../../styles/components/Info.module.css";

const Info = () => {
  const { data: session }: any = useSession();
  const [user, setUser]: any = useState();
  const [stats, setStats]: any = useState();

  useEffect(() => {
    axios.get(`/api/profile/${session?.user?.id}`).then((res) => {
      setUser(res.data.user);
      setStats(res.data.stat);
    });
  }, []);

  return (
    <div className={styles.info}>
      <div className={styles.perso}>
        <h2 className={styles.title}>Info perso</h2>

        <p>pseudo : {user?.name}</p>
        <p>age : {user?.age}ans</p>
        <p>date de naissance : {dayjs(user?.date).format("DD/MM/YYYY")}</p>
        <p>email : {user?.email}</p>
        <p>mot de passe : ********</p>
        <p>Role : {user?.role} </p>
      </div>
      <div className={styles.stats}>
        <h2 className={styles.title}>Stat</h2>
        <p>nombre de post : {stats?.postNb}</p>
        <p>nombre de post liker : {stats?.postLike}</p>
        <p>nombre de like reçu : {stats?.likeRecu}</p>
        <p>nombre d&rsquo;amis : 2</p>
      </div>
    </div>
  );
};

export default Info;
