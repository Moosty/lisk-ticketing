import React, {useEffect} from "react";
import {Header} from "components/Header";
import {CartBottom, EventHeader, TicketListItem, TicketType} from "components/index";
import {TicketList} from "components/TicketList";
import {AccountHeader} from "components/AccountHeader";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {OrganiserHeader} from "components/OrganiserHeader";
import {useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";

export const Organiser = withReducer("organiser", reducer)((props) => {
    const history = useHistory();
    const { address } = useParams();

    const organiserAccounts = useSelector(({blockchain}) => blockchain.organiser.organiserAccounts);
    const thisOrganiser = organiserAccounts.find(account => account.address === address );

    useEffect(() => {
        console.log("organiser accounts ", organiserAccounts);
        console.log("dit account (in organiseraccount)", thisOrganiser);
    }, [organiserAccounts]);




    return <div className="mt-10">
        <OrganiserHeader
            name={thisOrganiser.asset.organisation}
            balance={thisOrganiser.balance}
            token={thisOrganiser.token}
            button1 ="Create new event" />

            <div>
                <ul>
                    <li>
                        Account details (rechtsboven)
                    </li>
                    <li>
                        overview of your events (details page)
                    </li>
                </ul>
                </div>
        <TicketList/>

        <div className="bottom-0 fixed z-50 bg-black text-white w-full ">
            <div className="flex flex-row p-2 justify-between content-center items-center mx-4">
                <div className="flex flex-row ">

                    <div className="flex flex-col text-sm float-left leading-4 my-2">
                        <span className="text-lg mb-2">Organiser</span>
                        <span className="font-bold">...</span>

                    </div>
                </div>

                <div className="flex flex-row content-center items-center">
                    <Button
                        onClick={() => history.push(`/create-event`)}
                        variant="contained"
                        size="small"
                        color="secondary"
                        className="">Create Event</Button>


                </div>
            </div>
            <Divider />
        </div>
    </div>;
});
