import { getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { moviesRef } from "./firebase/firebase";
import { Link } from "react-router-dom";

export default function Cards() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((prv) => [...prv, { ...doc.data(), id: doc.id }]);
      });

      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="flex flex-wrap justify-between p-3 mt-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-screen">
          <ThreeDots height={40} color="white" />
        </div>
      ) : (
        data.map((e, i) => {
          return (
            <Link key={i} to={`/detail/${e.id}`}>
              <div className="card shadow-lg p-2 hover:-translate-y-3 cursor-pointer  font-medium  mt-6 transition-all duration-500 rounded-md">
                <img
                  className="h-60 md:h-72 w-40 md:w-60 "
                  src={e.image}
                  alt=""
                />
                <h1 className=" overflow-hidden  w-40 mt-2">
                  <span className="text-red-500">Name: </span> {e.title}
                </h1>
                <h1 className="flex items-center">
                  <span className="text-red-500 mr-1">Rating: </span>
                  <ReactStars
                    size={20}
                    half={true}
                    value={e.rating / e.rated}
                    edit={false}
                  />
                </h1>
                <h1>
                  <span className="text-red-500">Year: </span> {e.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
