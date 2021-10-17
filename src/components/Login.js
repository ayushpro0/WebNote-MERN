import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

const Login = (props) => {

    const [username, setName] = useState("");
    const [useremail, setEmail] = useState("");

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        setName(json.username);
        setEmail(json.useremail);

        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            history.push("/");
            props.showAlert("Logged In Successfully", "success")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className="row justify-content-center">
            <form className="mb-3 my-5 " style={{ width: "60%" }} onSubmit={handleSubmit}>

                <h2 className="mb-5 row justify-content-center bluecolor" > Login to use WebNOTE </h2>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label fontsize">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control forminput"
                            id="email" name="email"
                            aria-describedby="emailHelp"
                            onChange={onChange}
                            value={credentials.email} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label fontsize">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control forminput"
                            id="password" name="password"
                            onChange={onChange}
                            value={credentials.password}
                        />
                    </div>
                </div>

                {/* //login button  */}
                <div className="row mb-3 mx-2 justify-content-center">
                    <button type="submit" className="d-flex btn-grad justify-content-center  my-3 py-1" style={{ width: "30%" }}><b> Login </b></button>
                </div>

                <div className="row mb-3 mx-2 justify-content-center">
                    <p className="mb-2 mt-4 row justify-content-center whitefont"> Dont have an account? </p>
                    <Link className="d-flex btn-grad justify-content-center  my-1 py-1" to="/signup" style={{ width: "12%", textDecoration: "none" }}><b> SignUp </b></Link>
                </div>


            </form>
        </div>
    )
}

export default Login
