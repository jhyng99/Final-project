import React, { useEffect, useState } from "react";

import { apiGetGenreTrack } from "../api/api";
import { SearchGenreTrackType, Track } from "../types/types";
import { Link } from "react-router-dom";
import axios from "axios";

function SearchGenreTrack() {
  const [data, setData] = useState<SearchGenreTrackType>({
    tracks: {
      items: [],
    },
  });

  useEffect(() => {
    apiGetGenreTrack("k-pop BTS").then((res) => {
      console.log(res);
      setData(res);
    });
  }, []);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="">
      <ul>
        {data.tracks.items.map((item: Track, index: number) => (
          <li className="inline-block " key={item.id}>
            {
              <div className="h-100 flex flex-col">
                <Link to={`/albumDetail/${item.id}`}>
                  <img
                    className="m-10 mb-5 w-70 h-70 shadow-xl shadow-gray-600 rounded-xl"
                    src={item.album.images[1].url}
                    alt=""
                  />
                </Link>
                <p className="mx-10 w-70 text-lg font-bold line-clamp-1">{`${item.name}`}</p>
                <p className="mx-10 w-70 text-sm font-bold text-gray-400">{`${item.artists[0].name}`}</p>
              </div>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchGenreTrack;
