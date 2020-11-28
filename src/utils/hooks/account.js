import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const useAccount = (required = false, location = '/login') => {
  const history = useHistory();
  const {account} = useSelector(({blockchain}) => blockchain.account);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (account?.passphrase) {
      setLoggedIn(true);
    } else {
      if (required) {
        history.push(location);
      }
      setLoggedIn(false);
    }
  },[account]);

  return {loggedIn, account};
}
