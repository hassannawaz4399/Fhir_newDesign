import React, { useState } from 'react'
import axios from "axios"
import "./Login.css"
import { useNavigate } from 'react-router-dom';
const Modal = ({ handleClose }) => {

    const url = "http://localhost:5000/api/admin/resetpassword"
    const [email, setemail] = useState("")

    const submit = () => {
        axios.post(url, email).then((res) => (
            console.log(res)
        )).catch((err) => {
            console.log(err)
        })
    }



    return (

        <div className="modal display-block">
            <article className="modal-main">

                <h3 className='Heading'>Forget Password</h3>
                <hr className="mb-3"></hr>


                <article className="modelbody">
                    <article className="forminput">
                        <h3>Enter Email:</h3>
                        <input type="email" onChange={(e) => setemail(e.target.value)}></input>


                    </article>

                    <article className="forminputbtn mb-2">
                        <label className="buttonClass2" onClick={handleClose}>Cancel</label>
                        <label className="buttonClass2" onClick={() => submit()}>Submit</label>
                    </article>


                </article>
            </article>
        </div>

    );
};


function Login(props) {
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState({});


    const hanldeClick = (data) => {
        setSelectedData(data);
        setShow(true);
    };
    const hideModal = () => {
        setShow(false);
    };
    let navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });


    const userLogin = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
    };

    const url = `https://api.fhirgo.com:3000/api/admin/login`;

    const onSubmitLoginCredentials = (e) => {
        e.preventDefault();

        axios
            .post(url, login)
            .then((res) => {
                console.log(res)
                navigate("/home");


            })
            .catch((error) => {
                alert(error);
                // setError(res.message);
            });
    };

    return (
        <article className='continer'>
            <article className='form'>

                <h1>Login</h1>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control"
                        name="email"
                        value={login.email}
                        onChange={(e) => userLogin(e)}
                        placeholder="Email"
                        required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"

                        name="password"
                        value={login.password}
                        onChange={(e) => userLogin(e)}
                        placeholder="Password"
                        required />
                </div>



                <button onClick={onSubmitLoginCredentials} type="submit" className="buttonClass"
                >Log in</button>

                <p className="forgot-password text-right" onClick={() => hanldeClick()}>
                    Forgot <a href="#">password?</a>
                </p>
            </article>
            {show && <Modal data={selectedData} handleClose={hideModal} />}
        </article>
    )
}

export default Login;
