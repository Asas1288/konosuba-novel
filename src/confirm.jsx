import React from "react";
import { Link } from "react-router-dom";

const Confirm = () => {
 return (
    <div className="confirm__action-box">
     <Link to='/main-menu' className="confirm__link">Согласиться</Link>
    </div>
 )
};

export default Confirm;