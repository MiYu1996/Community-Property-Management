import React, { CSSProperties }from 'react';
import { Switch, Route } from "react-router-dom";

import './Announcement.css'

export const Announcement = () => {
    return (
        <div className="announcement">
            <div className="announcement-title">
                <h1>Covid-19 Notice</h1>
            </div>
        </div>
    )
}



// import './Login.css'
// import Background from '../../asset/login_background.jpg';
// import { LoginForm } from './LoginForm'
// import { SignupForm } from './SignupForm'

// const loginBackground: CSSProperties = {
//     backgroundImage: `url(${Background})`,
// }

// export const Login = () => {
//     return (
//         <div className="login" style={loginBackground}>
//             <div className="login-left">
//                 <Switch>
//                     <Route exact path="/">
//                         <h1>Welcome Home</h1>
//                         <p>Some slogan goes here asjkoasdh oasdioasjdkoaj iojasiopdj asiopdjiopasjdopas iopasj</p>
//                     </Route>
//                     <Route path="/signup">
//                         <h1>This is your new home</h1>
//                         <p>Thank you for choosing us asjkoasdh oasdioasjdkoaj iojasiopdj asiopdjiopasjdopas iopasj</p>
//                     </Route>
//                 </Switch>
//             </div>
//             <div className="login-right">
//                 <div className="login-form">
//                     <Switch>
//                         <Route exact path="/" component={LoginForm} />
//                         <Route path="/signup" component={SignupForm} />
//                     </Switch>
//                 </div>
//             </div>
//         </div>
//     )
// }