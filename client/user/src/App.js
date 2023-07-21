
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';





function App() {


  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const [Name, SetName] = useState('')
  const [Age, SetAge] = useState('')
  const [Mobile, SetMobile] = useState('')
  const [Email, SetEmail] = useState('')
  const [Password, SetPassword] = useState('')

 

  const [condition, setCondition] = useState(0)
  const [AllData, setAllData] = useState([])

  const [SingleData, setSingleData] = useState([])

  const[search,setSearch]=useState('')
  const[filterData,setFilterData]=useState(AllData)



  const navigate = useNavigate()


  //pegination

  const ITEMS_PER_PAGE = 8;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(AllData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = AllData.slice(startIndex, endIndex);










  const HandleApi = async (e) => {
    const id=localStorage.getItem("usId")
     e.preventDefault();
    await axios.post('http://localhost:5000/create', {
      name: name,
      age: age,
      mobile: mobile,
      email: email,
      password: password,
      userId:id

    })

      .then((result) => {
        // console.log(result.data.data)
        alert(result.data.msg)
        navigate('/home')
        handleAllData()
      })
      .catch((err) => {
        alert(err.response.data.msg)
      })

  }


  const handleAllData = async () => {

    await axios.get('http://localhost:5000/allUser')

      .then((result) => {
        console.log(result.data.data)
        setAllData(result.data.data)

      })
      .catch((err) => {
        console.log(err)

        //alert(err.response.data.msg)
      })

  }




  const handleDelete = async (email,id) => {

     const us=localStorage.getItem("usId")
   
    await axios.put('http://localhost:5000/delete', {
      usId:us,
      id:id,
      email: email,
      isDeleted: true
    })

      .then((result) => {
        // console.log(result.data.data)
        // setAllData(result.data.data)
        alert(result.data.msg)
        handleAllData()

      })
      .catch((err) => {
        //console.log(err)

        alert(err.response.data.msg)
      })

  }



  useEffect(() => {
    SetName(SingleData.name)
    SetAge(SingleData.age)
    SetMobile(SingleData.mobile)
    SetEmail(SingleData.email)
    SetPassword(SingleData.password)
    handleAllData()
  }, [])

useEffect(()=>{
  handleAllData()
},[search])




  const handleUpdate = async (email, id) => {

    localStorage.setItem("id", id)
    console.log(localStorage.getItem("id"))

    await axios.post('http://localhost:5000/getSinleData', {
      email: email
    })

      .then((result) => {

        setSingleData(result.data.data)

        console.log(SingleData.email)
        console.log(result.data.data)
       // navigate('/home')
      })
      .catch((err) => {
        console.log(err)

        //alert(err.response.data.msg)
      })

    setCondition(1)


  }


  const HandleUpdateData = async () => {

    const us=localStorage.getItem("usId")

    await axios.put('http://localhost:5000/updateData', {
      header: {
        id: localStorage.getItem("id"),
        usId:us
      },
      data: {
        name: Name,
        age: Age,
        mobile: Mobile,
        email: Email,
        password: Password

      }
    })

      .then((result) => {
        // console.log(result.data.data)
        alert(result.data.msg)


      })
      .catch((err) => {
       // console.log(err)

        alert(err.response.data.msg)
      })
    setCondition(0)
    //navigate('/')


  }



  const handleSearch=()=>{

    const filter= AllData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.mobile.includes(search) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );
   setAllData(filter)
   
   }



   const handleMyData=async()=>{

    let usId=localStorage.getItem("usId")

    await axios.post('http://localhost:5000/myData',{
       id:usId
    })

    .then((result) => {
      console.log(result.data.data)
      setAllData(result.data.data)

    })
    .catch((err) => {
      console.log(err)

      //alert(err.response.data.msg)
    })
       

   }













const nam=localStorage.getItem("na")




  return (
    <>
     <div className='mm'>
         <Link to='/'><h4 className='hed' style={{ textAlign: 'center' }}>Login</h4></Link>
         <h1 className='hed' style={{ textAlign: 'center' }}>Welcome to UserData</h1>
         <h4 className='hed' style={{ textAlign: 'center',fontStyle:"italic" }}>{nam.toLocaleUpperCase()}</h4>
     </div>
     <hr />
      <div style={{ maxWidth: "100%" }} className='row '>


        {
          condition == 0 ? <>

            <div className='col-3'>
              <h3 id='reg' style={{ textAlign: 'center' }}>Registration</h3>
              <hr></hr>
              <form>

                <div className='container'>

                  <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>

                  <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label">Age</label>
                    <input onChange={(e) => setAge(e.target.value)} type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>

                  <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label">Mobile</label>
                    <input onChange={(e) => setMobile(e.target.value)} type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>

                  <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>

                  {/* <div class="mb-2">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" />
                  </div> */}

                  <button onClick={HandleApi} type="submit" class="btn btn-primary m-2">Submit</button>
                </div>
              </form>
            </div>

          </>
            :

            <div className='col-3 t'>
              <h3 id='reg' style={{ textAlign: 'center' }}>Update</h3>
              <hr></hr>
              <form>
                <div className='container'>

                  <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input onChange={(e) => SetName(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={SingleData.name} />
                  </div>

                  <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label">Age</label>
                    <input onChange={(e) => SetAge(e.target.value)} type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={SingleData.age} />
                  </div>

                  <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label">Mobile</label>
                    <input onChange={(e) => SetMobile(e.target.value)} type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={SingleData.mobile} />
                  </div>

                  <div class="mb-2">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input onChange={(e) => SetEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={SingleData.email} />
                  </div>

                  {/* <div class="mb-2">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input onChange={(e) => SetPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" placeholder={SingleData.password} />
                  </div> */}

                  <button onClick={HandleUpdateData} type="submit" class="btn btn-danger">Update</button>
                </div>
              </form>
            </div>
        }






        <div className='col-9'>
          <h3 id='da' style={{ textAlign: 'center' }}> UserData</h3>
          <hr />
          <div className='c'>
                   <button onClick={handleAllData} className='btn btn-success m-2 '>All User</button>
                   <button onClick={handleMyData} className='btn btn-warning m-2'>My User</button>
                   <input id='sea'  type='search' onChange={(e)=>setSearch(e.target.value)}></input>
                   <button onClick={handleSearch}  className='btn btn-danger m-2'>Search</button>

                  
          </div>
          <div >

            <div>
              <ul style={{ display: 'flex', flexWrap: "wrap" }}>
                {currentItems.map((a) => (
                  <div id='cc' class="card mb-3  m-1" style={{ maxWidth: "300px"}}>
                  <div class="row g-0">
                    <div class="card-body">
                      <h3 class="card-title"> {a.name.toUpperCase()}</h3>
                      <h4 id='em' class="card-text">{a.email}</h4>
                      <h5 id='mob' class="card-text" > {a.mobile}</h5>
                      <h6 id='ag' class="card-text" > Age : {a.age}  </h6>
                      <button onClick={()=>handleUpdate(a.email,a._id)} className='but'>Update</button>
                      <button onClick={()=>handleDelete(a.email,a._id)} className='but'>Delete</button>

                    </div>

                  </div>
                </div>

                  


                ))}
              </ul>
              <div>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    style={{
                      fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>


            {/* {
            AllData.map((a) => {
              return (

                <div id='cc' class="card mb-3  m-1" style={{ maxWidth: "300px"}}>
                  <div class="row g-0">
                    <div class="card-body">
                      <h3 class="card-title"> {a.name}</h3>
                      <h4 class="card-text">{a.email}</h4>
                      <h5 class="card-text" style={{ color: "red" }}> {a.mobile}</h5>
                      <h6 class="card-text" style={{ color: "blue" }}> Age : {a.age}  </h6>
                      <button onClick={()=>handleUpdate(a.email,a._id)} className='but'>Update</button>
                      <button onClick={()=>handleDelete(a.email)} className='but'>Delete</button>

                    </div>

                  </div>
                </div>

              )
            })
          } */}



          </div>


        </div>
      </div>
    </>
  )
}

export default App;
