import React from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();
    let history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ color: "#02AAB0", fontFamily: 'Work Sans'}}> <b> WebNOTE </b></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{fontFamily: 'Work Sans'}}>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : " "} `} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : " "} `} to="/about">About</Link>
                            </li>

                        </ul>
                        {!localStorage.getItem('token') ?<form className="d-flex">
                            
                            <Link className="btn btn-grad mx-2" to="/login" role="button"> Login </Link>
                            <Link className="btn btn-grad mx-2" to="/signup" role="button"> SignUp </Link>
                            
                             
                        </form>  
                        : <form>
                            {/* //user datails  */} 
                            <button onClick={handleLogout} className="btn btn-grad mx-2"> Logout </button>
                            </form>
                            }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
