import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "./firebase/firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";

const Review = ({ id, prevRating, userRated }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [revLoading, setRevLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);

  const sendReview = async () => {
    setLoading(true);
    try {
      await addDoc(reviewsRef, {
        movieid: id,
        name: "sankalp",
        rating: rating,
        thought: form,
        timestamp: new Date().getTime(),
      });
      const ref = doc(db, "movies", id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userRated + 1,
      });
      swal({
        title: "Review Added",
        icon: "success",
        buttons: false,
        timer: 1000,
      });
    } catch (err) {
      swal({
        title: err.message,
        icon: "error",
        buttons: false,
        timer: 1000,
      });
    }
    setLoading(false);
    setForm("");
    setRating(0);
  };

  useEffect(() => {
    async function getData() {
      setRevLoading(true);
      let quer = query(reviewsRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });

      setRevLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="mt-4 border-t-2 border-gray-700 w-full ">
      <ReactStars
        size={35}
        half={true}
        edit={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        type="text"
        className="w-full p-2 outline-none header mb-1"
        placeholder="Share Your thoughts..."
        value={form}
        onChange={(e) => setForm(e.target.value)}
      />
      <button
        onClick={sendReview}
        className="bg-green-600 hover:bg-green-500 w-full p-2 flex justify-center"
      >
        {loading ? <TailSpin height={20} color="white" /> : "Share"}
      </button>
      {revLoading ? (
        <div className="mt-6 flex justify-center ">
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((e, i) => {
            return (
              <div
                className=" p-2 w-full mt-2 border-b border-gray-600"
                key={i}
              >
                <div className="flex justify-between ">
                  <p className="text-blue-500">{e.name}</p>
                  <p className="ml-2 text-gray-400">
                    {new Date(e.timestamp).toLocaleString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                    })}
                  </p>
                </div>
                <ReactStars
                  size={15}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Review;
