import React from "react";
import logoSite from "../../assets/logoSite.jpeg";

export default function Maintenance() {
    return (
        <div className="text-center mt-5">
            <h1>Cette page est en maitenance pour le moment...</h1>
            <p>Veuillez réessayer ultérieurement</p>
            <br />
            <a href="/"><b>Retourner à l'accueil</b></a>
            <div>
                <img src={logoSite} width={200} height={200} title="IDOINE FORMATION" alt="logo site IDOINE" />
            </div>
        </div>
    );
}
