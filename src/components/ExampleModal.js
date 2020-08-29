import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";

import withReducer from "store/withReducer";
import reducer from "store/reducers";
import * as Actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";

export const ModalExample = withReducer('ExampleKey', reducer)((props) => {
  const dispatch = useDispatch();
  const { open, type } = useSelector(({modals}) => modals);


  return (
    <div className="">
      <span className="">
        Open modals withReducers
      </span>
      <br />
      <Button onClick={() => dispatch(Actions.openModal('TypeA'))} >Open type A Modal</Button>
      <Button onClick={() => dispatch(Actions.openModal('TypeB'))} >Open type B Modal</Button>
    </div>
  );
});
