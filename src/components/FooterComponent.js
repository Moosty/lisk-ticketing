import React from 'react';

export const FooterComponent = ({children}) => {
  return <div
    className="bottom-0 fixed z-50 bg-black w-full flex flex-row p-2 justify-between content-center items-center">
    {children}
  </div>
}
