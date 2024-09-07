import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Appstate } from "../App";

export default function Header() {
  const useAppstate = useContext(Appstate);

  return (
    <div className=" sticky top-0 z-10 header text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500">
      <Link to={"/"}>
        <span>
          Filmy<span className="text-white">Verse</span>
        </span>
      </Link>
      <Link to={"/addmovie"}>
        <h1 className="text-lg text-white cursor-pointer flex items-center">
          <Button>
            <AddIcon className="mr-1" color="error" />{" "}
            <span className="text-white">Add New</span>
          </Button>
        </h1>
      </Link>
    </div>
  );
}
