import React from 'react';
import Skeleton from "@material-ui/lab/Skeleton";

export const EventSkeleton = () => (<div className="flex flex-row mb-3">
  <div className="w-1/5">
  <Skeleton animation="wave" variant="circle" width={40} height={40}/>
  </div>
  <div className="w-full">
    <Skeleton animation="wave" height={13} width="90%" style={{marginBottom: 6}}/>
    <Skeleton animation="wave" height={13} width="50%"/>
  </div>
</div>)
