import axios from "axios";
import "../styles.css";

function Withdraw({ setSumToWithdraw, sumToWithdraw, users, setUsers }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8080/users/withdraw", sumToWithdraw)
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
                setSumToWithdraw({
                  ...sumToWithdraw,
                  passportId: e.target.value,
                })
              }
            />
          </label>
          <label>
            Sum To Withdraw :
            <input
              type="number"
              onChange={(e) =>
                setSumToWithdraw({ ...sumToWithdraw, sum: e.target.value })
              }
            />
          </label>
          <input type="submit" value="Withdraw" />
        </form>
      </div>
    </div>
  );
}

export default Withdraw;
