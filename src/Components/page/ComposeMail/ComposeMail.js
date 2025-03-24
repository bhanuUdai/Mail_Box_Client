import React, { useState, useRef } from "react";
import classes from "./ComposeMail.module.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import useHttp from "../../Hook/useHttp";
import { useSelector, useDispatch } from "react-redux";
import { manageEmailActions } from "../../store/manage-email-reducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// Import Toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComposeMail = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const enteredMailAddRef = useRef();
  const enteredSubjectRef = useRef();
  const [error, sendRequest] = useHttp();
  const userMail = useSelector((state) => state.auth.MailBoxId);
  const dispatch = useDispatch();

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  const sendMailHandler = () => {
    const enteredMail = enteredMailAddRef.current.value;
    const enteredSub = enteredSubjectRef.current.value;
    const mail1 = enteredMail.replace("@", "");
    const mail2 = mail1.replace(".", "");
    const messageHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const currentTime = new Date().toLocaleString();
  
    const dataObj = {
      subject: enteredSub,
      message: messageHtml,
      time: currentTime,
      seen: false
    };
  
    if (enteredMail.trim().length === 0) {
      toast.error('Please enter email address');
    } else if (!enteredMail.includes('@') || !enteredMail.includes('.')) {
      toast.error('Please enter valid email Id');
    } else {
      const resData = () => {
        const responseHandler = (res) => {
          let emailWithId = { ...dataObj, id: res.data.name };
          dispatch(manageEmailActions.setSendMail(emailWithId));
          toast.success('Mail Sent');
          // Reset input fields and editor state
          enteredMailAddRef.current.value = '';
          enteredSubjectRef.current.value = '';
          setEditorState(EditorState.createEmpty());
        };
        sendRequest(
          {
            request: "post",
            url: `https://mail-box-client-2811f-default-rtdb.firebaseio.com/sent${userMail}.json`,
            data: dataObj,
            header: { "Content-type": "application/json" },
          },
          responseHandler
        );
      };
  
      sendRequest(
        {
          request: "post",
          url: `https://mail-box-client-2811f-default-rtdb.firebaseio.com/receive${mail2}.json`,
          data: dataObj,
          header: { "Content-type": "application/json" },
        },
        resData
      );
    }
  };

  return (
    <React.Fragment>
      <ToastContainer /> {/* Add ToastContainer */}
      {error && <h2>{error}</h2>}
      <main className={classes.main}>
        <section className={classes.add_section}>
          <label htmlFor="to">
            <FontAwesomeIcon icon={faEnvelope} className={classes.icon} /> To:
          </label>
          <input
            ref={enteredMailAddRef}
            type="email"
            id="to"
            placeholder="email address"
          />
        </section>
        <section className={classes.compose_section}>
          <input ref={enteredSubjectRef} type="text" placeholder="subject" />
        </section>

        <form>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            placeholder="    your message"
            editorStyle={{
              border: "1px solid antiquewhite",
              padding: "0px 10px 0px 10px",
              height: "calc(100vh - 500px)",
            }}
            onEditorStateChange={onEditorStateChange}
          />
        </form>
        <button className={classes.send_button} onClick={sendMailHandler}>
          <FontAwesomeIcon icon={faPaperPlane} className={classes.icon} /> Send
        </button>
      </main>
    </React.Fragment>
  );
};

export default ComposeMail;

