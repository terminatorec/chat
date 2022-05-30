// import React from 'react'
import { Box, Button, Grid } from '@mui/material'
import { Container } from '@mui/system'
import React, { useContext } from 'react'
import { SmileContext } from '../context'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Loader = () => {
  return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                width: '100vw',
                height: '100vh', 
                background: 'rgb(156, 39, 176)'
            }}
        >
            <div style={{alignSelf: 'center'}}
            className="lds-dual-ring"></div>

        </div>
    
  )
}

export default Loader