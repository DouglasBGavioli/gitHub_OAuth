import { Link } from "react-router-dom";
import Container from "./Container";
import React, { useState } from "react";

import styles from "./Navbar.module.css";
import logo from "../img/GithubLogo.png";
import { AiOutlineSearch } from "react-icons/ai";

function Navbar() {
    const [inputValue, setInputValue] = useState();
    const [repos, setRepos] = useState([]);

    function handleInput(e) {
        setInputValue(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        fetch(`https://api.github.com/users/${inputValue}/repos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                window.location.href = `${data[0].owner.html_url}`;
            })
            .catch((err) => console.log(err));
    }
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/home">
                    <img src={logo} alt="Costs" className={styles.logo} />
                </Link>
                <ul className={styles.list}>
                    <form className={styles.search} onSubmit={onSubmit}>
                        <AiOutlineSearch className={styles.lupa} />
                        <input
                            type="text"
                            placeholder="Acessar Git hub de..."
                            onChange={handleInput}
                        />
                    </form>

                    <Link to="/about" className={styles.sobre}>
                        <h2>Sobre</h2>
                    </Link>
                </ul>
            </Container>
        </nav>
    );
}
export default Navbar;
