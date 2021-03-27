import React from "react"
import "../components/Table.css"

//table component 
const Table = (props) => {
    // console.log("props: ", props);
    const users = props.data;
    const deleteUser = props.deleteUser;
    const updateUser = props.updateUser;
    // console.log('users: ', users);
    return (
      <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">age</th>
          <th style={{textAlign:"center"}}colSpan="2">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item) => {
          return (
            <tr>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>
                <button style={{backgroundColor:"#5b6d5b",color:"white",border:"none",textAlign:"center",textDecoration:"none",fontSize:"16px",padding: "5px 10px",display:"flex",justifyContent:"center"}} onClick={() => updateUser(item)}>Edit</button>
                </td>
              <td>
                <button style={{backgroundColor:"#e40017",color:"white",border:"none",textAlign:"center",textDecoration:"none",fontSize:"16px",padding: "5px 10px"}} onClick={() => deleteUser(item._id)}>Delete</button>
                </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
        
                

export default Table