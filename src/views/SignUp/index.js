import React, {useState} from "react";

import {SignUpUser} from "components/SignUpUser";
import {SignUpOrg} from "components/SignUpOrg";



export const SignUp = (props) => {
  const [state, setState] = useState(<SignUpUser/>);

  return <div className="mt-10">
    {state}
   </div>;


};
