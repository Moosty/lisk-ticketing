import React, {useEffect, useState} from "react";
import {SignUpUser} from "components/SignUpUser";
import {SignUpOrg} from "components/SignUpOrg";
import {FormField} from "components/FormField";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import * as Actions from "../../store/actions";


const fields = [
  {label: "username", path: "asset.username", type: "text", limit: 50},
  {label: "firstName", path: "asset.firstName", type: "text", limit: 50},
];

export const SignUp = withReducer ("signUp", reducer)((props) => {
  const account = useSelector(({blockchain}) => blockchain.account);
  const dispatch = useDispatch();
  const [form, setFrom] = useState(account.createAccount);

  useEffect(() => {
    setFrom(account.createAccount);
  }, account)

  const updateField = (path, value) => dispatch(Actions.updateCreateEvent(path, value));


  return <div className="mt-10">
    { props.type === 'user' && <SignUpUser/>}
    { props.type === 'organiser' && <SignUpOrg/> }

    <form
      className="flex flex-row w-9/10 flex-wrap m-2 "
      noValidate
      autoComplete="off"
    >

    {/*START - FORM EVENTINFO */}
    {fields.map(field => <FormField {...field} onChange={updateField} value={_.get(form, field.path)}/>)}
    {/*START - FORM TICKET INFO  */}
    </form>
   </div>;


});
