import React from 'react';
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";

export const DemoModal = (props) => {

  return <div className="max-w-full text-center items-center  " style={{
    width: "411px",
    height: "736px"
  }}>
    <div className="h-full w-full">
    <NotificationsRoundedIcon style={{color: '#fff', fontSize: 30}}/>
    <div className="w-full inline-block px-5 m-4 max-w-full py-2 bg-orange-200 rounded-lg">
      <div className="flex flex-col my-4">
          <div className="w-16 flex justify-center items-baseline flex1 ">
            <NotificationsRoundedIcon style={{color: '#ed8936', fontSize: 30}}/>
          </div>
          <div className="text-left flex1 text-2xl text-gray-900 font-bold uppercase max-w-2xl">
            Wat zijn jouw ultieme favorieten?
          </div>
        <div className="ml-16 text-left flex font-normal text-2xl text-gray-900">
          Kies en deel de 5 nummers en podcasts die een bijzonder plekje in jouw hart hebben.
        </div>
        <button className="px-8 p-2 bg-gray-900 bg-opacity-25 hover:bg-opacity-50 text-white rounded-full">Cancel
        </button>
      </div>
    </div>
    <div className="ml-16 text-left uppercase flex font-normal text-2xl text-gray-900">
      Sluiten
    </div>
    </div>
  </div>;
}
