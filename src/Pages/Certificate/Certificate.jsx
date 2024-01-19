import profile from "../../assets/profile.jpg";
import "./Certificate.css";
const Certificate = () => {
  return (
    <div className="certificate-container">
      <div className="navbar">
        <h2>Certificate</h2>
        <div className="user">
          <h4>User</h4>
          <img src={profile} className="img" alt="profile" />
        </div>
      </div>
      <h2 className="certificate">Your Certificate is not yet Generated.</h2>
    </div>
  );
};

export default Certificate;
