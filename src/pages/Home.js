import axios from "axios";
import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
function Home() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    

    const token = localStorage.getItem('token');
    const fetchData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.get('http://127.0.0.1:8000/api/user')
        .then((response) => {
            setUser(response.data);
        })
    }

    useEffect(()=>{
        var isToken = localStorage.getItem('token');
        if (!isToken) {
            navigate('/login');
        }
        fetchData();
    });

    const logoutHandle = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.post('http://127.0.0.1:8000/api/logout')
        .then(() => {
            localStorage.removeItem('token');
            navigate('/login');
        })
    }
    return (
        <div className="container">
            <div className="d-flex align-items-center" style={{height: '100vh'}}>
                <div style={{width: '100%'}}>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">Home</div>
                                <div className="card-body">
                                    <h5>Hello, {user.name}</h5>
                                    <button className="btn btn-danger" onClick={logoutHandle}> Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;