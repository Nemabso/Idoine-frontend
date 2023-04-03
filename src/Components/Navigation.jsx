import { Navbar, Nav } from "react-bootstrap";
import "./Navigation.css";
import { Link, useNavigate } from "react-router-dom";
export default function Navigation({ setUserID }) {

    const navigate = useNavigate();

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" className="customNav container" >
                <Navbar.Brand >
                    <img src="./images/sitelogo.svg" width={100} height={70} loading="eager" title="Accueil Idoine Formation" onClick={() => navigate("/")} alt="sitelogonavbar" className="nav-logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"><b>Menu</b></ Navbar.Toggle>

                <Navbar.Collapse id="basic-navbar-nav" className="nav-items-texts">
                    <Nav >
                        {
                            <>
                                <li className="itemCover">
                                    <Link to="/" className="nav-item">ACCUEIL</Link>
                                </li>
                                <li className="itemCover">
                                    <p className="nav-item">ACCOMPAGNEMENT</p>
                                    <div className="dropdown rounded">
                                        <Link to="/notre-mission"><span className="p-2">Notre mission</span></Link>
                                        <Link to="/financer"><span className="p-2">Financer votre formation</span></Link>
                                        <Link to="/partenaires"><span className="p-2">Partenaires</span></Link>
                                    </div>
                                </li>

                                <li className="itemCover">
                                    <Link to="/nos-formations" className="nav-item">NOS FORMATIONS</Link>
                                </li>
                                <li className="itemCover">
                                    <p className="nav-item">AVIS</p>
                                    <div className="dropdown rounded">
                                        <Link to="/satisfaction"><span className="p-2">Satisfaction</span></Link>
                                        <Link to="/avis"><span className="p-2">Laisser un avis</span></Link>
                                    </div>
                                </li>

                                {/* <li className="itemCover">
                                        <Link to="/quisommesnous" className="nav-item">QUI SOMMES NOUS</Link>
                                    </li> */}
                                <li className="itemCover">
                                    <Link to="/contact" className="nav-item">NOUS CONTACTER</Link>
                                </li>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};
