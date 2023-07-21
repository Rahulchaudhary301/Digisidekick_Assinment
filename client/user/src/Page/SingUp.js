import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';




function SingUp() {

   

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const navigate = useNavigate()

    
  const HandleApi = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/signup', {
      Nice_name: name,
      email: email,
      password: password

    })

      .then((result) => {
        // console.log(result.data.data)
        alert(result.data.msg)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)

        alert(err.response.data.msg)
      })

  }



    return (
        <div>

            <div className='sinn'>

                <form id='sindaa'>
                <h4 style={{textAlign:"center",fontWeight:"bolder"}}>SignUp</h4>
                <hr></hr>
                    <div class="mb-2">
                        <label for="exampleInputEmail1" class="form-label">Nice Name</label>
                        <input onChange={(e)=>setName(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div class="mb-2">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input onChange={(e)=>setEmail(e.target.value)}  type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div class="mb-2">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input onChange={(e)=>setPassword(e.target.value)}  type="password" class="form-control" id="exampleInputPassword1" />
                    </div>

                    <button onClick={HandleApi} type="submit" class="btn btn-primary">Submit</button>
                    <Link to='/'><p className='aco'>already have account</p></Link>
                </form>



            </div>



        </div>
    )
}

export default SingUp
