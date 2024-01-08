import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom" 
import home from './routes/home'
import updateUserInfo from './routes/updateUserInfo'
import showUserInfo from './routes/showUserInfo'



const App = () => {
    return <div>
        <Router>
            <Routes>
                <Route exact path="/" Component={home} />
                <Route exact path="/users/:id/update" Component={updateUserInfo} />
                <Route exact path="/users/:id" Component={showUserInfo} />
            </Routes>
        </Router>
        app
    </div>;
};
export default App;
