import youtubeJsonData from "../assets/json/search_api_data.json";
import type { Item } from "../types/Item";

const jsonData = youtubeJsonData;

const youtubeData: Item[] = [];

jsonData.items.forEach((e) => {
  const item = {
    id: e.id.videoId,
    date: e.snippet.publishedAt,
    title: e.snippet.title,
    thumb: e.snippet.thumbnails.high.url,
    description: e.snippet.description,
  };
  youtubeData.push(item);
});

export const items = youtubeData;
