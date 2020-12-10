import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../index";
import * as Actions from "store/actions";

export const useChain = () => {
  const dispatch = useDispatch();
  const {account} = useSelector(({blockchain}) => blockchain.account);
  const [nodeInfo, setNodeInfo] = useState(null);

  useEffect(() => {
    loadNodeInfo();
    loadTickets();
    loadEvents();
    loadOrganizers();
    loadMarket();
  }, []);

  const loadNodeInfo = async () => {
    const node = await API.fetchNodeInfo();
    setNodeInfo(node);
  }

  const loadTickets = async () => {
    const ticketsData = await API.fetchAllTickets();
    dispatch(Actions.loadPortfolioTicket(ticketsData));
  }

  const loadEvents = async () => {
    const eventsData = await API.fetchAllEvents();
    dispatch(Actions.loadEvents(eventsData));
  }

  const loadOrganizers = async () => {
    const organizations = await API.fetchAllOrganizers();
    dispatch(Actions.loadOrganizers(organizations));
  }

  const loadMarket = async () => {
    const market = await API.fetchAllMarketTickets();
    dispatch(Actions.loadMarket(market));
  }

  const loadAccount = async () => {
    if (account?.address) {
      const accountInfo = await API.fetchAccountInfo(account?.address.toString('hex'));
      dispatch(Actions.setAccount({...accountInfo, passphrase: account.passphrase}));
    }
  }

  const updateChain = async () => {
    loadOrganizers();
    loadAccount();
    loadTickets();
    loadEvents();
    loadMarket();
  }

  return {nodeInfo, updateChain, loadEvents, loadTickets, loadOrganizers, loadAccount, loadNodeInfo, loadMarket};
}
