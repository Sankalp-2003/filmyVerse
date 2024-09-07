import AddMovie from "./components/AddMovie";
import Cards from "./components/Cards";
import Detail from "./components/Detail";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <>
      <Appstate.Provider value={{ login, userName, setLogin, setUserName }}>
        <div className="App relative">
          <Header />
          <Routes>
            <Route path="/" element={<Cards />}></Route>
            <Route path="/addmovie" element={<AddMovie />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
          </Routes>
        </div>
      </Appstate.Provider>
    </>
  );
}

export default App;
export { Appstate };
