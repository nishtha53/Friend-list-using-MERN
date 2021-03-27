import React, { useState , useEffect} from "react"
import "../components/Form.css"
import Table from "./Table";
import axios from "axios";


//form component 
const Form = ()=>{
    const [user,setUsers] = useState([]);
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        age:Number,
    });
    const [userId, setUserId] = useState("");
    useEffect(() => {
        getUser();
      }, []);
    

//setting form data
const changeFormData=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData({...formData,[name]:value});
};
 //create user
 const createUser= async()=>{
    console.log('formData:',formData);
    try {
        const res = await  axios.post("http://localhost:8000/addFriend",formData); 
        console.log('res:',res.data);
        getUser();
    } catch (error) {
       console.log('error:',error); 
    }
 };
 //fetch users
 const getUser = async()=>{
    try {
        const res = await  axios.get("http://localhost:8000/getfriendfromdb"); 
        setUsers(res.data);
        console.log('res:',res.data);
    } catch (error) {
       console.log('error:',error); 
    }
 };

 //delete user
 const deleteUser = async (_id) => {
     console.log('_id: ', _id);
    try {
      const response = await axios.delete(
        `http://localhost:8000/deleteById/${_id}`
      );
      console.log("response: ", response);
      getUser();
    } catch (error) {
      console.log("error: ", error.response);
    }
  };
  //update
  const updateUser = (item) => {
    setFormData({
      ...formData,
      ["name"]: item.name,
      ["email"]: item.email,
      ["age"]: item.age,
    });
    setUserId(item._id);
    // console.log("formData: ", formData);
  };

  //update api
  const updateData = async () => {
    console.log(formData);
    console.log(userId);
    try {
      const response = await axios.put(
        `http://localhost:8000/update/${userId}`,
        formData
      );
      getUser();
    } catch (error) {
      console.log("error: ", error.response);
    }
  };

    return(
        <div>
            <div className="form_main">
            <div className="form">
             <input type="text" name="name" value={formData.name} onChange={changeFormData} placeholder="Enter Friend Name"></input>
            </div><br />
            <div className="form">
                <input type="text" name="email" value={formData.email} onChange={changeFormData} placeholder="Enter Friend Email"></input>
            </div><br />
            <div className="form">
                <input type="number" name="age" value={formData.age} onChange={changeFormData} placeholder="Enter Friend Age"></input>
            </div>
            </div>
        
        <div className="button">
        <button style={{backgroundColor:"#ee99a0",color:"#350b40",border:"none",textAlign:"center",textDecoration:"none",fontSize:"16px",padding: "10px 15px"}}onClick={createUser}>Add</button>
        <button style={{backgroundColor:"#ad6c80",color:"#350b40",border:"none",textAlign:"center",textDecoration:"none",fontSize:"16px",padding: "10px 15px"}} className="button_update" onClick={updateData}>Update</button>
        </div>
        <div><br />
        <Table data={user} deleteUser={deleteUser} updateUser={updateUser}/>
        </div>
    </div>
    )
}

export default Form