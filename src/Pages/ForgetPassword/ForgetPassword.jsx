import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./ForgetPassword.css"


function ForgetPassword(props) {
    let { email, token } = useParams();
    const url = "http://localhost:5000/api/admin/updatePassword";
    const [conforimpassword, setconforimpassword] = useState();
    const data = {
        password: conforimpassword,
        token: token,
        email: email
    }
    const submit = () => {
        axios.post(url, data).then((res) => {
            console.log(res)

        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <article className='layout'>
            <h3 className="description">
                Reset Your Password
            </h3>
            <label className='title'>Password:</label>

            <input type="email" name="email" placeholder="Enter your Password" />

            <label className='title'>Conforim Password:</label>

            <input type="email" name="email" placeholder="Enter Conforim Password" onChange={(e) => setconforimpassword(e.target.value)} />

            <button className="submit-btn" onClick={submit}>Reset Password</button>
        </article>
    )
}

export default ForgetPassword;
