import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import QencodeLogin from './containers/QencodeLogin/QencodeLogin';
import ForgotContainer from './containers/ForgotContainer/ForgotContainer';
import CreateContainer from './containers/CreateContainer/CreateContainer';

const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<QencodeLogin />} />
                <Route >
                    <Route path="/forgot" element={<ForgotContainer />} />
                    <Route path="/create" element={<CreateContainer />} />
                </Route>
                <Route path="*" element={<div>404 | Page is not found !</div>} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
