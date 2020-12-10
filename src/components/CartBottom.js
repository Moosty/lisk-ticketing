import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';
import { useBasket } from "../utils/hooks/basket";
import { transactions } from "@liskhq/lisk-client";

export const CartBottom = () => {
  const history = useHistory();
  const {total} = useBasket();

  return (
    <div className="bottom-0 fixed z-50 bg-gray-900 text-white " style={{maxWidth: '450px', width: '100%'}}>
      <div className="flex flex-row p-2 justify-between content-center items-center mx-4">
        <div className="flex flex-col text-sm float-left leading-4 my-2">
          <span className="text-lg mb-2">Total Amount:</span>
          <span className="font-bold">€ {total ? Number(transactions.convertBeddowsToLSK(total.toString())).toFixed(2) : '0.00'}</span>
        </div>
        <Button
          onClick={() => history.push(`/checkout`)}
          variant="contained"
          size="small"
          color="secondary">Go to Checkout</Button>
      </div>
    </div>
  );
};
