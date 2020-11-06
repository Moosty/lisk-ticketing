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
import {ConfirmTxModal} from "./ConfirmTxModal";
import {CancelEventModal} from "./CancelEventModal";

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

export const MoostyModal = withReducer("MoostyModal", reducer)(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {open, type, props} = useSelector(({modals}) => modals);

  const getModal = () => {
    switch (type) {
      case 'TypeA':
        return <div>Modal A</div>;
      case 'TypeB':
        return <div>Modal B</div>;
      case 'swapTicketInfo':
        return <DemoModal
          title="Swaptickets"
          subtitle="2nd hand event ticket"
          content="Buy a ticket from someone who cannot go to the event" />;
      case 'eventInfoModal':
        return <DemoModal
          title="Event Information"
          subtitle="Fill in some information"
          content="title event, location, event date, start time, duration" />;
      case 'ticketInfoModal':
        return <DemoModal
          title="Ticket information "
          subtitle="Design your tickets"
          content="Ticket types, pricing, amount, ticket release date. "
          endQuote="After the creation of the event you cannot change the tickets."
        />;
      case 'resellInfoModal':
        return <DemoModal
          title="Resell Information"
          subtitle="Design 2nd hand market"
          content="Resell YES/NO, the maximum resell percentage? and how much of the resell price goes to the organizer
           " />;
      case 'confirmTxModal':
        return <ConfirmTxModal
          title="Confirm action"
          content="Provide your passphrase to confirm this action"
          type="confirmAction"
          {...props}
        />;

      case 'cancelEventModal':
        return <CancelEventModal
          title="Cancel Event"
          content="Do you really want to cancel?"
          {...props}
        />;

      case 'optionsModal':
        return <TicketOptionsModal
          title="SELL my tickets"
          content="I want to sell my tickets"
          type="optionsModal"
          {...props}
        />;
      case 'scanTicketModal':
        return <TicketOptionsModal
          title="SELL my tickets"
          content="I want to sell my tickets"
          type="scanModal"
          {...props}
        />;
      case 'sellTicketModal':
        return <TicketOptionsModal
          title="SELL my tickets"
          content="I want to sell my tickets"
          type="sellModal"
          {...props}
        />;
      case 'transferTicketModal':
        return <TicketOptionsModal
          title="SELL my tickets"
          content="I want to sell my tickets"
          type="transferModal"
          {...props}
        />;
      case 'cancelInfoModal':
        return <DemoModal
          title="Do not buy"
          content="Remove from my basket."
          {...props}
        />;
      case 'buyTicketsModal':
        return <DemoModal
          title="Buy"
          content="look around and buy a ticket"
          {...props}
        />;
      case 'confirmTxEventModal':
        return <ConfirmTxModal
          title="Confirm action"
          content="Provide your passphrase to confirm this action"
          type="confirmEvent"
          {...props}
        />;
      case 'confirmTxCancelEventModal':
        return <ConfirmTxModal
          title="Confirm action"
          content="Provide your passphrase to confirm this action"
          type="confirmCancelEvent"
          {...props}
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
