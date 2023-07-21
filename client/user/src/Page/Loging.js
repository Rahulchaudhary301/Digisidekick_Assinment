import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';






function Loging() {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const token = localStorage.getItem("tc")
    const navigate = useNavigate()





    const HandleLogin = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/login', {
            email: email,
            password: password

        })

            .then((result) => {
                console.log(result.data.data)
                localStorage.setItem("tc", result.data.data)
                localStorage.setItem("usId", result.data.usId)
                localStorage.setItem("na", result.data.na)
                alert(result.data.msg)
                navigate('/home')
            })
            .catch((err) => {
               

                alert(err.response.data.msg)
            })

    }










    return (
        <div>

           
                        <div className='sin'>

                            <form id='sinda'>
                                <h4 style={{ textAlign: "center", fontWeight: "bolder" }}>Login</h4>
                                <hr></hr>

                                <div class="mb-2">
                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div class="mb-2">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" />
                                </div>

                                <button onClick={HandleLogin} type="submit" class="btn btn-primary">Submit</button>
                                <Link to='/sinup'><p className='aco'>create new account</p></Link>
                            </form>



                        </div>

        </div>
    )
}

export default Loging
