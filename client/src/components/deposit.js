import axios from "axios";
import "../styles.css";

function Deposit({ setDeposit, deposit, users, setUsers }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8080/users/deposit", deposit)
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
                setDeposit({ ...deposit, passportId: e.target.value })
              }
            />
          </label>
          <label>
            Deposit Cash:
            <input
              type="number"
              onChange={(e) => setDeposit({ ...deposit, sum: e.target.value })}
            />
          </label>
          <input type="submit" value="Deposit" />
        </form>
      </div>
    </div>
  );
}

export default Deposit;
