import { useState, useEffect } from "react";

import axios from "axios";
export default function Main() {
  const [storiesIds, setStoriesIds] = useState([]);
  const [stories, setStories] = useState([]);

  const fetchStoriesIds = async () => {
    const url = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    try {
      const storiesIds = await axios.get(url);
      setStoriesIds(storiesIds.data);
    } catch (error) {
      console.log("problem loading stories id");
    }
  };

  const fetchStories = () => {
    const storiesArr = [];
    storiesIds.slice(0, 5).forEach((id) => {
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then((answer) => {
          storiesArr.push(answer);
        })
        .catch((error) => {
          console.log("problem getting story with id ", id);
        });
    });
    setStories(storiesArr);
  };

  useEffect(() => {
    fetchStoriesIds();
    fetchStoriesIds();
  }, []);

  useEffect(() => {
    fetchStories();
  }, [storiesIds]);

  console.log(stories);
  return <h2>List of stories</h2>;
}
