import React from 'react';

export const FooterComponent = ({children}) => {
  return <div
    className="bottom-0 fixed z-50 bg-black flex flex-row p-2 justify-between content-center items-center" style={{maxWidth: '450px', width: '450px'}}>
    {children}
  </div>
}
