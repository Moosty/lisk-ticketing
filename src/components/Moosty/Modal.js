import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import {useDispatch, useSelector} from "react-redux";
import * as Actions from "store/actions";
import reducer from "store/reducers";
import withReducer from "store/withReducer";
import {DemoModal} from "./DemoModal";
import {TicketOptionsModal} from "./TicketOptionsModal";

const useStyles = makeStyles((theme) => ({
  modal: {
    minWidth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const MoostyModal = withReducer("MoostyModal", reducer)((props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {open, type} = useSelector(({modals}) => modals);


  const getModal = () => {
    switch (type) {
      case 'TypeA':
        return <div>Modal A</div>;
      case 'TypeB':
        return <div>Modal B</div>;
      case 'eventInfoModal':
        return <DemoModal
          title="Event"
          content="Write down the details of the event: name, artist, location" />;
      case 'ticketInfoModal':
        return <DemoModal
          title="Ticket information "
          content="Design your tickets: different types, different pricing, the amount, the date those tickets become available. After the creation of the event you cannot change the tickets."/>;
      case 'resellInfoModal':
        return <DemoModal
          title="Resell Information"
          content="After a user buys a ticket they might not be able to come to the event. They can resell their ticket for a specified price. As organiser you will have the option to design this second-hand marketplace:
           Resell: yes/no --> if no, then people can only resell their tickets to the organiser
           if yes, they can sell the ticket for a user-specified price

           resell percentage: For how much can I sell my ticket? As organizer you can define how much a user can ask for their ticket (eg. maximum of 120% of the original price). This is programmed into the system. You can even say: only 50% of the price.

           Organiser percentage: If a person resells their ticket, the organiser also can get a percentage. The percentage of the resell-price that will go to the organiser.
           " />;

      case 'optionsModal':
        return <TicketOptionsModal
          title="SELL my tickets"
          content="I want to sell my tickets"
          type="optionsModal"
        />;
      case 'scanTicketModal':
        return <TicketOptionsModal
          title="SELL my tickets"
          content="I want to sell my tickets"
          type="scanModal"
        />;
      case 'sellTicketModal':
        return <TicketOptionsModal
          title="SELL my tickets"
          content="I want to sell my tickets"
          type="sellModal"
        />;
      case 'transferTicketModal':
        return <TicketOptionsModal
          title="SELL my tickets"
          content="I want to sell my tickets"
          type="transferModal"
        />;
      case 'cancelInfoModal':
        return <DemoModal
          title="Do not buy"
          content="Remove from my basket."
        />;
      case 'buyTicketsModal':
        return <DemoModal
          title="Buy"
          content="look around and buy a ticket"
        />;
        default:
        return <div>Modal Component not found</div>;
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => dispatch(Actions.closeModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="w-full mx-2 sm:w-9/12 xl:w-2/4 ">
            {getModal()}
          </div>
        </Fade>
      </Modal>
    </div>);
});
