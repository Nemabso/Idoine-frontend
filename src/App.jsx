import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Error404 from "./Components/Error404";
import Home from "./Components/pages/Home";
import Navbar from "./Components/Navigation";
import { AuthContext } from "./context/Auth";
import EleveLog from "./Components/EleveLog";
import NosFormation from "./Components/pages/NosFormation";
import NousContacter from "./Components/pages/NousContacter";
import "./App.css"
// import QuiSommesNous from "./Components/pages/QuiSommesNous";
import Financer from "./Components/pages/Financer";
import NotreMission from "./Components/pages/NotreMission";
import Satisfaction from "./Components/pages/Satisfaction";
import Partenaires from "./Components/pages/Partenaires";
import GestionCookies from "./Components/pages/GestionCookies";
import MentionsLegales from "./Components/pages/MentionsLegales";
import Footer from "./Components/Footer";
import ResponseModal from "./Components/ResponseModal";
import Maintenance from "./Components/pages/Maintenance";
import config from "./config";
import Review from "./Components/pages/Review/Review";

export default function App() {
  const [isAuthenticated, setIsAuthenticated, role] = useContext(AuthContext);
  const [responseMessages, setResponseMessages] = useState([]);
  // console.log(setIsAuthenticated);

  const [userID, setUserID] = useState("");
  // console.log("userID", userID);

  useEffect(
    () => {
      if (responseMessages.length !== 0) setTimeout(() => setResponseMessages([]), 4000);
    },
    [responseMessages],
  );

  return (
    <div className='app'>
      <Navbar userID={userID} setUserID={setUserID} />
      {responseMessages.length !== 0 && <ResponseModal messages={responseMessages}/>}
      <main className='app-main'>
        <Routes>
          {/* Maintenance */}
          {config.unavailableRoutes.map((route) => <Route exact path={route} element={<Maintenance />} />)}

          {/* Pages */}
          <Route exact path="/" element={<Home userID={userID} setUserID={setUserID} />} />
          <Route exact path="/avis" element={<Review throwMsg={setResponseMessages} />} />
          {/* <Route exact path="/avis" element={<ReviewForm throwMessages={setResponseMessages}/>} /> */}
          <Route exact path="/satisfaction" element={<Satisfaction />} />
          <Route exact path="/partenaires" element={<Partenaires />} />

          <Route path="/contact" element={<NousContacter userID={userID} setUserID={setUserID} />} />
          {/* <Route path="/quisommesnous" element={<QuiSommesNous />} /> */}
          <Route exact path="/connexion/eleve" element={<EleveLog />} />
          <Route exact path="/nos-formations" element={<NosFormation />} />
          <Route exact path="/financer" element={<Financer />} />
          <Route exact path="/notre-mission" element={<NotreMission />} />
          <Route exact path="/gestion-cookies" element={<GestionCookies />} />
          <Route exact path="/mention-legales" element={<MentionsLegales />} />
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

