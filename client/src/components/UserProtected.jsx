import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function UserProtected(props) {
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/user-login");
    }
  });
  let history = useHistory();
  return (
    <div>
      <props.component />
    </div>
  );
}

export default UserProtected;
