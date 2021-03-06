import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { Card, Button, CardTitle, CardText } from "reactstrap";

import Footer from "@components/Footer";
import { CommentsList, Comment } from "../../styles/comments.style";

export default function Comments() {
  const router = useRouter();
  const { storyId } = router.query;

  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState("");

  const fetchComments = async () => {
    const baseUrl = "https://hacker-news.firebaseio.com/v0";
    try {
      const story = await axios.get(`${baseUrl}/item/${storyId}.json?print=pretty`);
      setTitle(story.data.title);
      const promises = story.data.kids.slice(0, 10).map(
        (kid) =>
          new Promise((resolve, reject) => {
            axios
              .get(`${baseUrl}/item/${kid}.json?print=pretty`)
              .then((response) => resolve(response.data))
              .catch((error) => reject(error));
          })
      );
      Promise.all(promises)
        .then((commentsArr) => setComments(commentsArr))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("problem loading comments");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className='container'>
      <Head>
        <title>The Hacker News - Comments</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <CommentsList>
          <Link href='/' as='/'>
            <a>{`<--- Back to Main`}</a>
          </Link>
          <h2>{title}</h2>
          {comments.map((comment) => (
            <Card body key={comment.id}>
              <CardText>
                <div dangerouslySetInnerHTML={{ __html: comment.text }} />
                <h3>
                  {`${months[new Date(parseInt(comment.time) * 1000).getMonth()]} ${new Date(
                    parseInt(comment.time) * 1000
                  ).getDate()},  ${new Date(parseInt(comment.time) * 1000).getFullYear()}`}
                  - {comment.by}
                </h3>
              </CardText>
            </Card>
          ))}
        </CommentsList>
      </main>

      <Footer />

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          width: 100%;
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-family: Menlo, Monaco, Lucida Console, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
            Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
