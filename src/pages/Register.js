import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Link} from "react-router-dom";
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    //validation form
    const [validation, setValidation] = useState([]);

    const navigate = useNavigate();
    useEffect(()=>{
        var isToken = localStorage.getItem('token');
        if (isToken) {
            navigate('/home');
        }
    });
    const registerHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('password_confirmation',passwordConfirmation);
        
        await axios.post('http://127.0.0.1:8000/api/register' , formData).then(() =>{
            console.log(formData)
            navigate('/login');
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
                                <div className="card-header">Register</div>
                                <div className="card-body">
                                <form onSubmit={registerHandler}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Nama Lengkap</label>
                                            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama lengkap" />
                                            {
                                                validation.name && (
                                                    <small className="text-danger">
                                                        {validation.name[0]}
                                                    </small>
                                                )
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Alamat Email</label>
                                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="name@example.com" />
                                            {
                                                validation.email && (
                                                    <small className="text-danger">
                                                        {validation.email[0]}
                                                    </small>
                                                )
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Kata Sandi</label>
                                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="*********" />
                                            {
                                                validation.password && (
                                                    <small className="text-danger">
                                                        {validation.password[0]}
                                                    </small>
                                                )
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password_confirmation" className="form-label">Konfirmasi Kata Sandi</label>
                                            <input type="password" className="form-control" id="password_confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}  placeholder="*********" />
                                        </div>
                                        <button className="btn btn-primary me-2" type="submit">Daftar</button>
                                        <Link to="/login" className="btn btn-primary">Login</Link>
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

export default Register;