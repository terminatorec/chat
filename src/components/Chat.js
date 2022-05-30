import React, { useContext, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SmileContext } from "../context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  addDoc,
  doc,
  deleteField,
  serverTimestamp,
  deleteDoc,
  setDoc,
  getDoc,
  updateDoc,
  FieldValue,
  Timestamp,
  // toMillis,
} from "firebase/firestore";
// import { } from "firebase/firestore";
import Loader from "./Loader";
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import EmoijPicker from "./ModalEmoijPicker";
// import closeSvgIcon from ".././img/close.svg";
import closeSvgIcon from ".././img/close2.svg";
import editSvgIcon from ".././img/edit.svg";

const Chat = () => {
  const [cursorPosition, setCursorPosition] = useState("");

  const [modalActive, setModalActive] = useState(false);
  const { auth, db } = useContext(SmileContext);
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(collection(db, "messages"));

  // console.log(messages);

  const chatScroll = useRef(null);

  const [colorMessage, setColorMessage] = useState();
  const [colorFont, setColorFont] = useState();

  const dbRef = ref(getDatabase());

  useEffect(() => {
    get(child(dbRef, `users/${user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setColorMessage(snapshot.val().color);
          setColorFont(snapshot.val().fontColor);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (loading === false) {
    // messages.sort((a, b) => parseFloat(a.createdAt) - parseFloat(b.createdAt));
    messages.sort((a, b) => parseFloat(a.createdAt) - parseFloat(b.createdAt));
    // console.log(messages[0]);
    setTimeout(
      () => (chatScroll.current.scrollTop = chatScroll.current.scrollHeight),
      100
    );
  }

  // console.log(messages)

  const [value, setValue] = useState("");
  const [valueImport, setValueImport] = useState("");

  async function deleteMessage(id) {
    await deleteDoc(doc(db, "messages", `${id}`));
  }

  async function updateMessage(id) {
    const washingtonRef = doc(db, "messages", `${id}`);

    await updateDoc(washingtonRef, {
      change: true,
      whenChanged: new Date().getUTCTime(),
      text: value,
    });
  }

  Date.prototype.getUTCTime = function () {
    return this.getTime() - this.getTimezoneOffset() * 60000;
  };

  const sendMessage = async () => {
    addDoc(collection(db, "messages"), {
      uid: user.uid,
    }).then(function (docRef) {
      setDoc(doc(db, "messages", `${docRef.id}`), {
        id: docRef.id,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        email: user.email,
        color: colorMessage,
        colorFont: colorFont,
        createdAt: new Date().getUTCTime(),
        // createdAt: serverTimestamp(),
        change: false,
      });
    });
    setValue("");
  };



  if (loading) {
    return <Loader />;
  }

  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      // sendMessage();
    }
  };



  const takeMe = async () => {
    setValueImport(value);
    setModalActive(true);
  };

  function getCaret(el) {
    if (el.selectionStart) {
      return el.selectionStart;
    } else if (document.selection) {
      el.focus();

      var r = document.selection.createRange();
      if (r == null) {
        return 0;
      }

      var re = el.createTextRange(),
        rc = re.duplicate();
      re.moveToBookmark(r.getBookmark());
      rc.setEndPoint("EndToStart", re);

      return rc.text.length;
    }
    return 0;
  }
  function getPosInRow(el) {
    var caret = getCaret(el);
    var text = el.value
      .substr(0, caret)
      .replace(/^(.*[\n\r])*([^\n\r]*)$/, "$2");
    return text.length;
  }

  // console.log(cursorPosition);

  const setCursorPositionFunction = () => {
    setCursorPosition(getCaret(document.getElementById("thetext")));
  };

  function timeConverterMy(UNIX_timestamp) {
    const dateObject = new Date(UNIX_timestamp);
    return dateObject.toLocaleString();
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        overflowY: "auto",
        background: "rgb(14, 22, 33)",
      }}
    >
      <div style={{ width: "95%", margin: "0 auto ", overflowY: "hidden" }}>
        <div
          ref={chatScroll}
          style={{
            height: "75vh",
            borderBottom: "1px solid gray",
            overflowY: "auto",
            margin: "0 auto",
            background: "rgb(14, 22, 33)",
            width: "100%",
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                width: "100%",
              }}
            >
              <div
                className="messageWrap"
                style={{
                  margin: "5px 0",
                  marginLeft: user.uid === message.uid ? "auto" : "0px",
                  gridTemplateColumns:
                    user.uid === message.uid ? "45px 1fr" : "1fr",
                  width: "fit-content",
                }}
              >
                <div
                  className="buttonsMessageWrap"
                  style={{
                    display: user.uid === message.uid ? "block" : "none",
                  }}
                >
                  <img
                    onClick={() => deleteMessage(message.id)}
                    src={closeSvgIcon}
                    alt=""
                  />
                  <img
                    onClick={() => updateMessage(message.id)}
                    src={editSvgIcon}
                    alt=""
                  />
                </div>

                <div
                  className="message"
                  style={{
                    color: message.colorFont ? message.colorFont : "white",
                    background: message.color
                      ? message.color
                      : "rgb(24, 37, 51)",
                    padding: "15px 15px 5px 15px",
                    borderRadius: "15px",
                  }}
                >
                  <div 
                  className="messageInside"
                  
                  
                  >
                    <h4>{message.email}</h4>
                    <h6
                    className="messageInsideChange"
                    style={{
                      display: message.change?'block':'none'
                    }}
                    >{message.change?`Changed ${timeConverterMy(message.whenChanged)}`:''}</h6>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      position: "relative",
                      paddingBottom: "15px",
                    }}
                  >
                    <p className="TextMessage">{message.text}</p>
                    <p className="timeUnderTextMessage">
                      {timeConverterMy(message.createdAt)}
                      {/* {sendMeYourUnix(message.createdAt)} */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="insertBlock">
          <textarea
            onClick={setCursorPositionFunction}
            onKeyUp={setCursorPositionFunction}
            id="thetext"
            onKeyDown={onKeyDown}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Input text..."
            rows="3"
          ></textarea>

          <button
            className="insertBlockButton2"
            // onClick={()=>setModalActive(true)}
            onClick={takeMe}
          >
            <p>😇</p>
          </button>
          <button className="insertBlockButton" onClick={sendMessage}>
            <p>Send</p>
          </button>
        </div>
        <EmoijPicker
          modalActive={modalActive}
          setModalActive={setModalActive}
          setValue={setValue}
          cursorPosition={cursorPosition}
          valueImport={valueImport}
        />
      </div>
    </div>
  );
};

export default Chat;
