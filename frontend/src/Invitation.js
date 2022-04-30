import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Invitation.css";

const Invitation = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {user.id ? (
        <div className="userRegisteredInv">
          Discover new movies and TV shows from other people's collection!
        </div>
      ) : (
        <Link to="/register" style={{ textDecoration: "none", color: "white" }} className="invitation-div">
          <div>
            Join Dream Screen and create your collection too!
          </div>
        </Link>
      )}
    </>
  );
};

export default Invitation;
