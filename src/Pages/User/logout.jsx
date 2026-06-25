import { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();

    window.location.href = "/login";
  }, []);

  return <h2>Logging out...</h2>;
}

export default Logout;