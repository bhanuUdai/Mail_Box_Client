import React from "react";
import { useHistory } from "react-router-dom";
const Mailbox=()=>
{
    const history =useHistory()


    const ComposeMailHandler=()=>
    {
        history.push('/compose-mail')
    }

    return(<React.Fragment>
        <h4>Your Mail Box</h4>
        <button onClick={ComposeMailHandler} >Compose</button>
    </React.Fragment>)
}

export default Mailbox;