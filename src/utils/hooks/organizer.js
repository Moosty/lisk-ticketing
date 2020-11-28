import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const useOrganizer = (required = false, location = '/overview') => {
  const history = useHistory();
  const {account} = useSelector(({blockchain}) => blockchain.account);
  const {organizers} = useSelector(({blockchain}) => blockchain.organizer);
  const [isOrganizer, setIsOrganizer] = useState(null);
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    if (account?.organizer?.organization) {
      setOrganization(organizers.find(o => o.id === account.organizer.organization)?.organization)
      setIsOrganizer(true);
    } else {
      if (required) {
        history.push(location);
      }
      setIsOrganizer(false);
    }
  },[account]);

  return {isOrganizer, organization, account};
}
