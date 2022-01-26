import axios from "axios";
import { useState } from "react";
import "../styles.css";

function UpdateCredit({ credit, setCredit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8080/users/updatecredit", credit)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addUser">
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            PassportId:
            <input
              type="text"
              onChange={(e) =>
                setCredit({ ...credit, passportId: e.target.value })
              }
            />
          </label>
          <label>
            Update Credit:
            <input
              type="number"
              onChange={(e) => setCredit({ ...credit, sum: e.target.value })}
            />
          </label>
          <input type="submit" value="Update Credit" />
        </form>
      </div>
    </div>
  );
}

export default UpdateCredit;
