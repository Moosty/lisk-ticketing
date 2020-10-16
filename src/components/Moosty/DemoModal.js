import React from 'react';
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";

export const DemoModal = (props) => {

  return <div className="text-center items-center bg-white  " >
    <NotificationsRoundedIcon style={{color: '#fff', fontSize: 30}}/>
    <div className="p-4">
      <div className="flex flex-col my-4">
          <div className=" flex justify-center items-baseline flex1 ">
            <NotificationsRoundedIcon style={{color: '#ed8936', fontSize: 30}}/>
          </div>
          <div className="text-center flex1 text-2xl text-gray-900 font-bold uppercase max-w-2xl">
            {props.title}
          </div>
        <div className="text-left flex font-normal text-sm text-gray-900">
          {props.content}
        </div>
        <button className="mt-4 px-8 p-2 bg-gray-900 bg-opacity-25 hover:bg-opacity-50 text-white rounded-full">Cancel
        </button>
      </div>
    </div>

  </div>;
}
