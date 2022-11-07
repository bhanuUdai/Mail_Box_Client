import React from "react";
import classes from './Inbox.module.css';


const Inbox=(prop)=>
{

    console.log(prop,"==>inside inbox")

    return(<React.Fragment>
        <main className={classes.main} >
            <ul>
                <li className={classes.list}>{prop.mails.message}</li>
            </ul>
        </main>
    </React.Fragment>)
}
export default Inbox;