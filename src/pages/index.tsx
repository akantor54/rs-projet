import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ProtectedPageRoute from "@/middlewares/protected-page-route";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Header from "@/components/header";
import PostForm from "@/components/postForm";
import PostCard from "@/components/post-card";
import { useEffect, useState } from "react";
import axios from "axios";
import PostType from "@/types/PostType";

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

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      setPosts(res.data.posts);
    });
  }, [update]);

  return (
    <>
      <Head>
        <title>JSP | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <PostForm update={() => setUpdate((i) => (i ? false : true))} />

          <div className={styles.listPost}>
            {!posts && <h1>Loading...</h1>}
            {posts &&
              posts.map((item: PostType) => (
                <PostCard
                  update={() => setUpdate((i) => (i ? false : true))}
                  key={item.id}
                  posts={item}
                />
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
