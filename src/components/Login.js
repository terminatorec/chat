import { Box, Button, Grid } from "@mui/material";
import { Container } from "@mui/system";
// import React, { useContext, useState } from "react";
import { SmileContext } from "../context";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import React, { useEffect, useRef, useContext, useState } from 'react'
// import { render } from 'react-dom'

// import data from '@emoji-mart/data'
// import { Picker } from 'emoji-mart'

// function EmojiPicker(props) {
//     const ref = useRef()

//     useEffect(() => {
//         new Picker({ ...props, data, ref })
//     }, [])

//     return <div ref={ref} />
// }


const Login = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


//   const addEmoji = e => {
//     let emoji = e.native;
//     setEmail(
//         email => email + emoji
//         // ...emoji, emoji
//         );
//   };


  return (
    <div
      style={{
        background: "rgb(0, 122, 204)",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        width: "60%",
      }}
    >
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="text"
        placeholder="email"
      />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="text"
        placeholder="password"
      />
      <button onClick={() => signInWithEmailAndPassword(auth, email, password)}>
        LOGIN123
      </button>
      <div id="picker">
          
        {/* <EmojiPicker onEmojiSelect={setEmail} /> */}
        {/* <EmojiPicker onEmojiSelect={console.log} /> */}
        {/* <EmojiPicker onEmojiSelect={(event) => addEmoji(event)} /> */}
      </div>
    </div>
  );
};



// render(<EmojiPicker onEmojiSelect={console.log} />, document.querySelector('#picker'))

export default Login;
