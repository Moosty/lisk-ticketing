import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {fade, makeStyles} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    button1: {
        backgroundColor: "yellow",
    },
    month: {
        fontWeight: "bold",
        color: "#f50057",
    },

}));


export const TicketType = ({type, price}) => {
    const [count, setCount] = useState(0);
    const classes = useStyles();

    const handleMinus = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    return (
        <div>
            <div className="flex flex-row p-2 justify-between content-center items-center mx-4">
                <div className="flex flex-row ">

                    <div className="flex flex-col text-sm float-left leading-4 my-2">

                        <span className="font-bold">{type}</span>
                        <span className="text-xs">{price}</span>
                    </div>
                </div>
                <div className="flex flex-row content-center items-center">
                    <span className="text-4xl font-bold" onClick={handleMinus}>-</span>
                    <div className="  border-2 rounded h-10 w-10 center"><span value={count}
                                                                               className="p-1">{count}</span></div>
                    <span className="text-4xl font-bold" onClick={() => setCount(count + 1)}>+</span>


                </div>
            </div>
            <Divider/>
        </div>
    );
};
