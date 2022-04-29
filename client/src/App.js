import axios from "axios";
import { useState } from "react";
function App() {
  const [userList, setUserList] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");

  const getUsers = () => {
    setUserList([]);
    axios.get("http://localhost:8080/api/alluser").then((res) => {
      setUserList(res.data);
    });
  };

  const addUser = () => {
    axios
      .post("http://localhost:8080/api/creatuser", {
        user_name: name,
        user_status: status,
        user_email: email,
      })
      .then(() => {
        setUserList([
          ...userList,
          {
            user_name: name,
            user_status: status,
            user_email: email,
          },
        ]);
      });
  };

  const deleteUser = (user_id) => {
    axios
      .delete(`http://localhost:8080/api/deleteuser/${user_id}`)
      .then((res) => {
        setUserList(
          userList.filters((val) => {
            return val.user_id !== user_id;
          })
        );
      });
    getUsers();
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
              placeholder="ชื่อ-สกุล"
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="สถานะ"
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="อีเมล"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>
          </div>
          <button className="btn btn-success" onClick={() => addUser()}>
            Add User
          </button>
        </form>
      </div>
      <hr></hr>
      <div>
        <button className="btn btn-primary" onClick={() => getUsers()}>
          Show User
        </button>
        <br></br>
        <br></br>
        {userList.map((val, key) => {
          return (
            <div className="user card">
              <div className="card-body text-left">
                <p className="card-text"> ID : {val.user_id}</p>
                <p className="card-text"> Name : {val.user_name}</p>
                <p className="card-text"> Status : {val.user_status}</p>
                <p className="card-text"> Email : {val.user_email}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteUser(val.user_id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
