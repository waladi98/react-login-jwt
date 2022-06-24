import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Welcome() {
    const navigate = useNavigate();
    useEffect(()=>{
        var isToken = localStorage.getItem('token');
        if (isToken) {
            navigate('/home');
        }
    });
    return (
        <div className="container">
            <div className="d-flex align-items-center" style={{height: '100vh'}}>
                <div style={{width: '100%'}}>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">Welcome</div>
                                <div className="card-body">
                                    <h5>waladi.com</h5>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, temporibus.</p>
                                    <Link to="login" className="btn btn-primary me-2">Login</Link>
                                    <Link to="register" className="btn btn-primary">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;