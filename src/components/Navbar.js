import { AppBar, Toolbar, Grid} from '@mui/material'
import Button from '@mui/material/Button';
import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { SmileContext } from "../context";

const Navbar = () => {
    const {auth} = useContext(SmileContext)
    const [user, loading, error] = useAuthState(auth);

    Date.prototype.getUTCTime = function(){ 
        return this.getTime()-(this.getTimezoneOffset()*60000); 
      };
    
    function timeConverterMy(UNIX_timestamp){
        const dateObject = new Date(UNIX_timestamp)
        return dateObject.toLocaleString()
    }

    const[currentDateUNIX, setCurrentDateUNIX] = useState(
        new Date().getUTCTime()
    )

    setInterval(()=>{
        setCurrentDateUNIX(new Date().getUTCTime())
    },1000)


    return (
        <div className='Navbar'
        style={{height: '50px'}}
        
        >
            <div className='timerDIv'>
                <p
                style={{textAlign:'center'}}
                >
                    Time: <br/>
                    {timeConverterMy(currentDateUNIX)}
                </p>
            </div>
            
            {user ?
                <button 
                style={{height: '50px'}}
                onClick={()=>signOut(auth)}
                variant="contained" >Exit</button>
                :
                <div className='linksNavbarBlock'>
                    <Link to='/chat/login'>
                        <button 
                        style={{height: '50px'}}
                        >Login</button>
                    </Link>
                    <Link to='/chat/register'>
                        <button 
                        style={{height: '50px'}}
                        >Register</button>
                    </Link>

                </div>
                // <Link to='/login'>
                //     <button 
                //     style={{height: '50px'}}
                //     variant="contained" >Login</button>
                // </Link>
                

            }
                
        </div>
    )
}

export default Navbar