import { useState } from "react";
import "../styles.css";

function GetOneUser({ users }) {
  const [accountId, setAccountId] = useState("");

  const displayUser = () => {
    const user = users.filter((user) => user.passportId === accountId);
    console.log(user);
    return (
      <div className="findAccount" key={user._id}>
        <h5>PassportId: {user[0].passportId}</h5>
        <h5>Cash: {user[0].cash}</h5>
        <h5>Credit: {user[0].credit}</h5>
      </div>
    );
  };

  return (
    <div>
      <input
        placeholder="find account"
        onChange={(e) => {
          setAccountId(e.target.value);
          console.log(e.target.value);
        }}
      ></input>
      {accountId && <div>Requested Bank Account:{displayUser()}</div>}
    </div>
  );
}

export default GetOneUser;
