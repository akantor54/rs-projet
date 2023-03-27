import Header from "@/components/header";
import PostCard from "@/components/post-card";
import Info from "@/components/profil/info";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "../../styles/Profil.module.css";

export const getServerSideProps = async (context: NextPageContext) => {
  const userIsAuthenticated = await getSession(context); // TODO: check if user is authenticated
  if (!userIsAuthenticated) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Profil = () => {
  const route = useRouter();
  const { id } = route.query;
  const [pages, setPages] = useState("post");
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    axios.get("/api/posts").then((res) => setPosts(res.data.posts));
  }, []);

  return (
    <>
      <Head>
        <title>JSP | Profil</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.headerProfil}>
            <Image
              src="/images/pp.png"
              className={styles.img}
              width={125}
              height={125}
              sizes={"600px"}
              alt="Photo de profil"
            />
            <div className={styles.ajout}>
              <h2>{session?.user?.name}</h2>
              <button className={styles.ami}>Ajouter en amie</button>
            </div>
            <hr className={styles.separator} />
            <nav className={styles.menu}>
              <li>
                <p className={styles.lien} onClick={() => setPages("post")}>
                  Mes post
                </p>
              </li>
              <li>
                <p className={styles.lien} onClick={() => setPages("info")}>
                  Mes info
                </p>
              </li>
              <li>
                <p className={styles.lien}>Mes Photo</p>
              </li>
            </nav>
          </div>
          <div className={styles.container}>
            {pages === "post" &&
              posts &&
              posts.map((item) => <PostCard key={item?.id} posts={item} />)}

            {pages === "info" && <Info />}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profil;
