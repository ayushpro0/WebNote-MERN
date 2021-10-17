import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';


const Signup = (props) => {


    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            history.push("/");
            props.showAlert("Account Created Successfully", "success")
        }
        else {
            props.showAlert("Invalid Details", "danger")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }



    return (
        <div className="row justify-content-center">
            <form className="mb-3 my-5 " onSubmit={handleSubmit} style={{ width: "60%" }}>

                <h2 className="mb-5 row justify-content-center bluecolor" > Sign Up </h2>

                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label fontsize">Name</label>
                    <div className="col-sm-10">
                        <input type="name" className="form-control forminput" id="nane" name="name" onChange={onChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label fontsize">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control forminput" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label fontsize">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control forminput" id="password" name="password" onChange={onChange} minLength={5} required />
                    </div>
                </div>
                <div className="row mb-3 mx-1 justify-content-center">
                    <button type="submit" className="d-flex btn-grad justify-content-center  my-3 py-1" style={{ width: "30%" }}><b> Sign Up </b></button>
                </div>

                <div className="row mb-3 mx-2 justify-content-center">
                    <p className="mb-2 mt-4 row justify-content-center whitefont"> Have an account already?</p>
                    <Link className="d-flex btn-grad justify-content-center  my-1 py-1" to="/login" style={{width: "10%", textDecoration: "none"}}><b> Login </b></Link>
                </div>
            </form>
        </div>
    )
}

export default Signup
