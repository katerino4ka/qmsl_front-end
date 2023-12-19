import Appbar from "./AppBar";
import Navbar from "./Navbar";
import React, { useState } from "react";
import { UserContext } from "../Routes/App";
function NavigationComponent() {

    const [open, setOpen] = React.useState(false);
    
    
    const toggleDrawer = (open) =>
     {
        setOpen(open);
     };
 
    return (
        <div>
            <Appbar toggleDrawer = {toggleDrawer}/>
            <Navbar toggleDrawer = {toggleDrawer} open={open} />
        </div>
      );
}

export default NavigationComponent;