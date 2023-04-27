import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  loggedInUser: String;
}
const Greetings = ({ loggedInUser }: Props) => {
  const [authenticated, setauthenticated] = useState("");
  useEffect(() => {
    const authenticatedUser = localStorage.getItem("authenticated");
    if (authenticatedUser == "true") {
      setauthenticated(authenticatedUser);
    }
  }, []);

  if (authenticated != "true") {
    <Navigate replace to="/login"></Navigate>;
  }

  return <h4>Welcome {loggedInUser}</h4>;
};
export default Greetings;
