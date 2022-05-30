import React, { useContext, useEffect, useRef, useState } from "react";
// import React, { useEffect, useRef, useContext, useState } from 'react'
import { render } from 'react-dom'

import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'

function EmojiPicker(props) {
    const ref = useRef()

    useEffect(() => {
        new Picker({ ...props, data, ref })
    }, [])

    return <div ref={ref} />
}

// const EmoijPicker = ({cursorPosition,setValue, valueImport, setModalActive, modalActive}) => {
const EmoijPicker = (props) => {


    // console.log(props.valueImport)
    const [emojiT,setEmojiT] = useState([])
    const [emojiRes,setEmojiRes] = useState([])
    // console.log(emojiT)

    var string1 = props.valueImport.slice(0, props.cursorPosition)
    var string2 = props.valueImport.slice(props.cursorPosition)
    // console.log(string1)
    // console.log(string2)

    useEffect(() => {
        props.setValue([string1, emojiT.join(''),string2].join(''))
    }, [emojiRes]);


    
    const addEmoji = (e) => {
        var emoji = e.native;
        setEmojiT(emojiT=>[...emojiT, emoji])
        setEmojiRes(emojiRes=>[...emojiRes, emoji])
        // console.log('emojiRes ' + emojiRes)
        // props.setModalActive(false)
    };
    
    const closeWindow = () =>{
        // console.log('closed')
        setEmojiT([])
        props.setModalActive(false)
        // props.cursorPosition = 0
      }

    return (
        <div onClick={closeWindow}
        className={props.modalActive ? `myModal active` : `myModal`}>
            <div
            onClick={(e) => e.stopPropagation()}
            >
                <EmojiPicker onEmojiSelect={(event) => addEmoji(event)} />
            </div>
        </div>
    )
}

export default EmoijPicker