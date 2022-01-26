import React, { useEffect, useState } from "react";
import { Switch, Link, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddUser from "./components/adduser";
import Deposit from "./components/deposit";
import GetAllUsers from "./components/GetAllusers";
import GetOneUser from "./components/getOneuser";
import Transfer from "./components/transfer";
import UpdateCredit from "./components/updateCredit";
import Withdraw from "./components/withdraw";
import "./styles.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [deposit, setDeposit] = useState({
    sum: 0,
    passportId: "",
  });
  const [credit, setCredit] = useState({
    passportId: "",
    sum: 0,
  });
  const [sumToWithdraw, setSumToWithdraw] = useState({
    passportId: "",
    sum: 0,
  });
  const [transfer, setTransfer] = useState({
    passportIdSender: "",
    sum: 0,
    passportIdReceiver: "",
  });

  const getUsers = () =>
    axios
      .get("http://localhost:8080/users")
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.log(error);
      });

  useEffect(() => {
    const usersFromDatabase = async () => {
      await getUsers();
    };
    usersFromDatabase();
  }, []);

  if (!users) return "Loading users";
  return (
    <div className="container">
      {users && (
        <GetAllUsers className="accounts" users={users} setUsers={setUsers} />
      )}
      <GetOneUser users={users} />
      <AddUser users={users} setUsers={setUsers} />
      <Deposit
        deposit={deposit}
        setDeposit={setDeposit}
        users={users}
        setUsers={setUsers}
      />
      <UpdateCredit
        credit={credit}
        setCredit={setCredit}
        users={users}
        setUsers={setUsers}
      ></UpdateCredit>
      <Withdraw
        sumToWithdraw={sumToWithdraw}
        setSumToWithdraw={setSumToWithdraw}
        users={users}
        setUsers={setUsers}
      />
      <Transfer
        sumToWithdraw={sumToWithdraw}
        setSumToWithdraw={setSumToWithdraw}
        users={users}
        setUsers={setUsers}
        deposit={deposit}
        setDeposit={setDeposit}
        transfer={transfer}
        setTransfer={setTransfer}
      />
    </div>
  );
}

export default App;
