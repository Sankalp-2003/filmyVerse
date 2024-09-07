import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { moviesRef } from "./firebase/firebase";
import { FallingLines } from "react-loader-spinner";
import Review from "./Review";

export default function Detail() {
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    discription: "",
    rating: 0,
    rated: 0,
  });

  useEffect(() => {
    setLoader(true);
    async function getData() {
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoader(false);
    }
    getData();
  }, []);
  return (
    <>
      {loader ? (
        <div className="h-screen flex items-center justify-center">
          <FallingLines height={25} color="white" />
        </div>
      ) : (
        <div className="p-4 flex flex-col md:flex-row items-center md:items-start justify-center w-full">
          <img className="h-96 mt-4 md:sticky md:top-24 " src={data.image} />
          <div className="md:ml-4 ml-0 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-400">
              {data.title} <span className="text-xl">({data.year})</span>
            </h1>
            <ReactStars
              size={20}
              half={true}
              value={data.rating / data.rated}
            />
            <p className="mt-2">{data.discription}</p>
            <Review id={id} prevRating={data.rating} userRated={data.rated} />
          </div>
        </div>
      )}
    </>
  );
}
