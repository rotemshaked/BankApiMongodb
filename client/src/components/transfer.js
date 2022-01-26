import axios from "axios";
import "../styles.css";

function Transfer({
  setSumToWithdraw,
  sumToWithdraw,
  users,
  setUsers,
  deposit,
  setDeposit,
  transfer,
  setTransfer,
}) {
  const handleSubmit = (event) => {
    const transfer = {
      sum: deposit.sum,
      passportId: sumToWithdraw.passportId,
      userIdToTrasfer: deposit.passportId,
    };
    event.preventDefault();
    axios
      .put("http://localhost:8080/users/transferMoneyAsync", transfer)
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
            PassportId sender:
            <input
              type="text"
              onChange={(e) => {
                setSumToWithdraw({
                  ...sumToWithdraw,
                  passportId: e.target.value,
                });
              }}
            />
          </label>
          <label>
            Sum To Transfer :
            <input
              type="number"
              onChange={(e) => {
                setSumToWithdraw({ ...sumToWithdraw, sum: e.target.value });
                setDeposit({ ...deposit, sum: e.target.value });
              }}
            />
          </label>
          <label>
            PassportId receiver:
            <input
              type="text"
              onChange={(e) => {
                setDeposit({
                  ...deposit,
                  passportId: e.target.value,
                });
              }}
            />
          </label>
          <input type="submit" value="Transfer" />
        </form>
      </div>
    </div>
  );
}

export default Transfer;
