import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function ProtectedRoutes(props) {
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/login");
    }
  });
  let history = useHistory();
  return (
    <div>
      <props.component />
    </div>
  );
}

export default ProtectedRoutes;
