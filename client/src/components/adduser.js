import React, { useState } from "react";
import axios from "axios";

function AddUser({ users, setUsers }) {
  const [newUser, setNewUsers] = useState({
    passportId: "",
    cash: 0,
    credit: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let checkIfExist = users.filter(
      (user) => user.passportId === newUser.passportId
    );
    // console.log(!checkIfExist[0]);
    if (!checkIfExist[0]) {
      axios
        .post("http://localhost:8080/users", newUser)
        .then((res) => {
          const id = res.data._id;
          newUser["_id"] = id;
          setUsers([...users, newUser]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSubmit}>
        <label>
          PassportId:
          <input
            type="text"
            onChange={(e) =>
              setNewUsers({ ...newUser, passportId: e.target.value })
            }
          />
        </label>
        <label>
          cash:
          <input
            type="number"
            onChange={(e) => setNewUsers({ ...newUser, cash: e.target.value })}
          />
        </label>
        <label>
          Credit:
          <input
            type="number"
            onChange={(e) =>
              setNewUsers({ ...newUser, credit: e.target.value })
            }
          />
        </label>
        <input type="submit" value="Add Account" />
      </form>
    </div>
  );
}
export default AddUser;
