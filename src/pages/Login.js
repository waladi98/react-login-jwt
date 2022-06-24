import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Link} from "react-router-dom";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //validation form
    const [validation, setValidation] = useState([]);

    const navigate = useNavigate();
    useEffect(()=>{
        var isToken = localStorage.getItem('token');
        if (isToken) {
            navigate('/home');
        }
    });

    const loginHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email',email);
        formData.append('password',password);
        
        await axios.post('http://127.0.0.1:8000/api/login' , formData)
        .then((response) =>{
            console.log(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        }).catch((error) => {
            setValidation(error.response.data);
            console.log(error.response.data);
        }) 
    
    }
    return (
        <div className="container">
            <div className="d-flex align-items-center" style={{height: '100vh'}}>
                <div style={{width: '100%'}}>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">Login</div>
                                <div className="card-body">
                               
                                        {
                                                validation.message && (
                                                    <div className="alert alert-danger" role="alert">
                                                    {validation.message}
                                                    </div>
                                                    
                                                )
                                        }
                                
                                    <form onSubmit={loginHandler}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Alamat Email</label>
                                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="name@example.com" />
                                        </div>
                                            {
                                                validation.email && (
                                                    <small className="text-danger">
                                                        {validation.email[0]}
                                                    </small>
                                                )
                                            }
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Kata Sandi</label>
                                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="*********" />
                                            {
                                                validation.password && (
                                                    <small className="text-danger">
                                                        {validation.password[0]}
                                                    </small>
                                                )
                                            }
                                        </div>
                                       
                                        <button className="btn btn-primary me-2" type="submit">Masuk</button>
                                        <Link to="/register" className="btn btn-primary">Register</Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;