import axios from "axios";
import { useState } from "react";
function App() {
  const [userList, setUserList] = useState([]);

  const getUsers = () => {
    axios.get("http://localhost:8080/api/alluser").then((response) => {
      setUserList(response.data);
    });
  };

  return (
    <div className="App container">
      <h1>User Infromation</h1>
      <div className="infromation">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Input Name"
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Input Status"
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Input Email"
            ></input>
          </div>
          <button className="btn btn-success">Add User</button>
        </form>
      </div>
      <hr></hr>
      <div>
        <button className="btn btn-primary" onClick={getUsers}>
          Show User
        </button>
        {userList.map((val, key) => {
          return (
            <div className="user card">
              <div className="card-bady text-left">
                <p className="card-text">Name :{val.user_id}</p>
                <p className="card-text">Name :{val.user_name}</p>
                <p className="card-text">Status :{val.user_status}</p>
                <p className="card-text">Email :{val.user_email}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
