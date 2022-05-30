import React, { useState, useContext } from 'react'
import { HexColorPicker } from "react-colorful";
import { getAnalytics, setUserProperties } from "firebase/analytics";
import { SmileContext } from '../context'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set , onValue} from "firebase/database";

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { auth }= useContext(SmileContext)
    const [user, setUser] = useState('')

    const analytics = getAnalytics();

    const [color, setColor] = useState("#498fd4");
    const [colorFont, setColorFont] = useState("#001429");
    
    // console.log(auth)
    // const db = getDatabase();
    // const db = getDatabase("https://chat-666-521fe-default-rtdb.europe-west1.firebasedatabase.app/");
    
    // console.log(ref(db))
    // const starCountRef = ref(db, 'users/123');
    // console.log(starCountRef)
    // console.log(db)


    const { database } = useContext(SmileContext)
    // console.log(database)

    const regAccount = () =>{
        createUserWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            user.color = color
            setUser(user.email)
            set(ref(database, 'users/' + user.uid), {
                email: email,
                color: color,
                fontColor: colorFont,
            });
          })

    }


    console.log(user)

    return (
        <div className='registerWindow'>
            <input value={email} onChange={(event) => setEmail(event.target.value)}
            type="text" placeholder='email' />
            <input value={password} onChange={(event) => setPassword(event.target.value)}
            type="text" placeholder='password' />
            <div className='colorWrap'>
                <div className='color'>
                    <HexColorPicker className='HexColorPicker1' color={color} onChange={setColor} />
                    <HexColorPicker className='HexColorPicker1' color={colorFont} onChange={setColorFont} />
                </div>
                <div className='colorInside'>
                    <p
                    style={{
                        background: color,
                        color: colorFont
                    }}
                    >Pick your font color</p>
                    <p
                    style={{
                        background: color,
                        color: colorFont
                    }}
                    >Pick your message color</p>
                </div>
            </div>
            <button onClick={regAccount}>REGISTER</button>
        </div>
    )
}

export default Register