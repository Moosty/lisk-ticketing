import React, {useState} from "react";
import {SignUpUser} from "components/SignUpUser";
import {SignUpOrg} from "components/SignUpOrg";

export const SignUp = (props) => {

  return <div className="mt-10">
    { props.type === 'user' && <SignUpUser/>}
    { props.type === 'organiser' && <SignUpOrg/> }

   </div>;


};
