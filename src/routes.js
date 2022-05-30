import React from 'react'
import Chat from './components/Chat'
import Login from './components/Login'
import Register from './components/Register'
// import { LOGIN_ROUTE } from './utils/consts'

export const publicRoutes = [
    {path: '/chat/login', element: <Login/>, exact: true},
    {path: '/chat/register', element: <Register/>, exact: true},
]
export const privateRoutes = [
    {path: '/chat/chat', element: <Chat/>, exact: true},
]

// export const publicRoutes =[
//     {path: '/react-gh-pages-reactposts/login', element: <Login/>, exact: true},
// ]
