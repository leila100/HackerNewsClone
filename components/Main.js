import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Card, Button, CardTitle, CardText } from "reactstrap";

import { StoriesContainer, Stories, Story } from "../styles/stories.style";

export default function Main() {
  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    const baseUrl = "https://hacker-news.firebaseio.com/v0";
    try {
      const storiesIds = await axios.get(`${baseUrl}/topstories.json?print=pretty`);
      const promises = storiesIds.data.slice(0, 50).map(
        (id) =>
          new Promise((resolve, reject) => {
            axios
              .get(`${baseUrl}/item/${id}.json?print=pretty`)
              .then((response) => resolve(response.data))
              .catch((error) => reject(error));
          })
      );
      Promise.all(promises)
        .then((storiesArr) => setStories(storiesArr))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("problem loading stories");
    }
  };

  useEffect(() => {
    fetchStories();
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
    <StoriesContainer>
      {stories.length === 0 ? (
        <h3>No stories</h3>
      ) : (
        <Stories>
          {stories.map((story) => (
            <Card body>
              <CardTitle tag='h3'>
                <Link href='/comments/[storyId]' as={`/comments/${story.id}`} key={story.id}>
                  {story.title}
                </Link>
              </CardTitle>
              <CardText>
                {`${months[new Date(parseInt(story.time) * 1000).getMonth()]} ${new Date(
                  parseInt(story.time) * 1000
                ).getDate()},  ${new Date(parseInt(story.time) * 1000).getFullYear()}`}{" "}
                - {story.by}
              </CardText>
              <Button>
                <a href={story.url}>Link to story</a>
              </Button>
            </Card>
          ))}
        </Stories>
      )}
    </StoriesContainer>
  );
}
