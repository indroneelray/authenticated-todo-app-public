import React, { useEffect } from "react";

export default function Wrapper(props) {
  React.useEffect(() => {
    let loggedin = localStorage.getItem("loggedin");
    if (loggedin === "false") {
        alert('You are not logged in ')
    }

    console.log(loggedin);
  }, []);

  return <div className="children-content">{props.children}</div>;
}
