import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";

console.log("start");
dotenv.config();

/**
 * youtube API について
 *
 * APIにはリソース、必須パラメータ、任意パラメータがある。
 *
 * リソースは呼び出しAPIのURLの末尾の部分。
 * https://developers.google.com/youtube/v3/docs?hl=ja#%E3%83%AA%E3%82%BD%E3%83%BC%E3%82%B9%E3%81%AE%E7%A8%AE%E9%A1%9E
 *
 * パラメーターはリファレンス見て、それぞれのリソースのパラメータを入れる。
 * 代替の場合、 part というパラメータが必須で入っている。
 */

// const googleYoutubeApiUrl = 'https://www.googleapis.com/youtube/v3/videos'
const googleYoutubeApiUrl = "https://www.googleapis.com/youtube/v3";
const api_key = process.env.YOUTUBE_API_KEY;
const channelId = `UCmKlo3BXt60nzgk2r_JgvwQ`; // 有隣堂のyoutube
const resource = `search`;
const part = `id,snippet`;
const fields = `items(id,snippet(channelId,title,categoryId),contentDetails(relatedPlaylists/uploads))`;

// 検索
const option = `type=video&eventType=completed&maxResults=30&order=viewCount`;
const url = `${googleYoutubeApiUrl}/${resource}?part=${part}&channelId=${channelId}&${option}&key=${api_key}`;
const writeFileUrl = `get_data/${resource}_api_data.json`;
axios
  .get(url)
  .then((res) => {
    writeFile(JSON.stringify(res.data));
  })
  .catch((e) => {
    console.log(e);
  });

const writeFile = (data) => {
  try {
    fs.writeFileSync(writeFileUrl, data, "utf-8");
  } catch (err) {
    console.log(err);
  }
};
