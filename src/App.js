//css
import "./App.css";

//dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//Contexts
import Context from "./store/Context";

//Layout
import Container from "./layout/Container";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

//Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
    const [userLogin, setUserLogin] = useState();

    return (
        <Context.Provider value={[userLogin, setUserLogin]}>
            <Router>
                <Navbar />
                <Container customClass="min-height">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Container>
                <Footer />
            </Router>
        </Context.Provider>
    );
}

export default App;
