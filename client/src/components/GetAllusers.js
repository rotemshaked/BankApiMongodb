import "../styles.css";

function GetAllUser({ users, setUsers }) {
  const displayUsers = () => {
    return users.map((user) => {
      return (
        <div className="user" key={user._id}>
          <h5>PassportId: {user.passportId}</h5>
          <h5>Cash: {user.cash}</h5>
          <h5>Credit: {user.credit}</h5>
        </div>
      );
    });
  };
  return <div className="accounts">Bank Accounts:{displayUsers()}</div>;
}

export default GetAllUser;
