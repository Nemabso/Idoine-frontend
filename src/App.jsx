import React, { useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "./Components/Error404";
import Home from "./Components/pages/Home";
import Admin from "./Components/pages/comptes/Admin";
import ProfA from "./Components/pages/comptes/ProfA";
import Navbar from "./Components/Navigation";
import Login from "./Components/Login";
import { AuthContext } from "./context/Auth";
import EleveLog from "./Components/EleveLog";
import NosFormation from "./Components/pages/NosFormation";
import NousContacter from "./Components/pages/NousContacter";
import SalleA from "./Components/pages/comptes/SalleA";
import SalleB from "./Components/pages/comptes/SalleB";
import "./App.css"
import AvisForm from "./Components/pages/AvisForm";
// import QuiSommesNous from "./Components/pages/QuiSommesNous";
import Financer from "./Components/pages/Financer";
import NotreMission from "./Components/pages/NotreMission";
import Satisfaction from "./Components/pages/Satisfaction";
import Partenaires from "./Components/pages/Partenaires";
import GestionCookies from "./Components/pages/GestionCookies";
import MentionsLegales from "./Components/pages/MentionsLegales";
import Footer from "./Components/Footer";
export default function App() {
  const [isAuthenticated, setIsAuthenticated, role] = useContext(AuthContext);
  // console.log(setIsAuthenticated);

  const [userID, setUserID] = useState("");
  // console.log("userID", userID);

  return (
    <div className='app'>
      <Navbar userID={userID} setUserID={setUserID} />
      <main className='app-main'>
        <Routes>
          <Route exact path="/" element={<Home userID={userID} setUserID={setUserID} />} />
          <Route exact path="/avis" element={<AvisForm />} />
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

