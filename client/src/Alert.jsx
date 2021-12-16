import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";

const AlertBar = ({ variant, message }) => {
  const [show, setShow] = useState(true);

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false);
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  // If show is false the component will return null and stop here
  if (!show) {
    return null;
  }

  // If show is true this will be returned
  return <Alert severity={variant}>{message}</Alert>;
};


export default AlertBar;
