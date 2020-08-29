import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "store/actions";
import reducer from "store/reducers";
import withReducer from "store/withReducer";
import { DemoModal } from "./DemoModal";

const useStyles = makeStyles((theme) => ({
  modal: {
    minWidth: "50rem",
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
  const { open, type } = useSelector(({ modals }) => modals);

  const getModal = () => {
    switch (type) {
      case 'TypeA':
        return <div>Modal A</div>;
      case 'TypeB':
        return <div>Modal B</div>;
      case 'DemoModal':
        return <DemoModal/>;
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
          <div className="w-full sm:w-9/12 xl:w-2/4 ">
            {getModal()}
          </div>
        </Fade>
      </Modal>
    </div>);
});
