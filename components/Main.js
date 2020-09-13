import { useState, useEffect } from "react";

import axios from "axios";
export default function Main() {
  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    const baseUrl = "https://hacker-news.firebaseio.com/v0";
    try {
      const storiesIds = await axios.get(`${baseUrl}/topstories.json?print=pretty`);
      const promises = storiesIds.data.slice(0, 10).map(
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

  console.log(stories);
  return (
    <>
      <h2>List of stories</h2>
      {stories.length === 0 ? (
        <h3>No stories</h3>
      ) : (
        <ul>
          {stories.map((story) => (
            <li key={story.id}>{story.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}
