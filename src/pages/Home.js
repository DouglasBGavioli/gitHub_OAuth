import styles from "./Home.module.css";
import React, { useContext, useState } from "react";

import Context from "../store/Context";
import Input from "../form/Input";

function Home() {
    const [userLogin, setUserLogin] = useContext(Context);
    const [repos, setRepos] = useState([]);
    const [starred, setStarred] = useState([]);
    const [inputValue, setInputValue] = useState();

    const [hideRepos, setHideRepos] = useState(false);
    const [hideStarred, setHideStarred] = useState(false);

    function handleInput(e) {
        setInputValue(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
    }

    function clickRepos() {
        console.log("click repos");
        setHideStarred(true);
        setHideRepos(false);
        fetch(`https://api.github.com/users/${inputValue}/repos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                setRepos(data);
            })
            .catch((err) => console.log(err));
    }

    function clickStarred(e) {
        console.log("clicl starred");
        setHideStarred(false);
        setHideRepos(true);
        fetch(`https://api.github.com/users/${inputValue}/starred`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                setStarred(data);
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            {userLogin ? (
                <>
                    <h3 className={styles.user}>Bem-vindo: {userLogin} </h3>
                    <section className={styles.home_container}>
                        <form className={styles.form_card} onSubmit={onSubmit}>
                            <Input
                                type="text"
                                text="Buscar"
                                placeholder="Digite nome de usuario"
                                handleOnChange={handleInput}
                            />
                            <button
                                className={styles.buttons}
                                onClick={clickRepos}
                            >
                                Repositorios
                            </button>
                            <button
                                className={styles.buttons}
                                onClick={clickStarred}
                            >
                                Starred
                            </button>
                        </form>
                    </section>

                    {!hideStarred &&
                        starred.map((starr) => (
                            <div className={styles.homeCard} key={starr.id}>
                                <img
                                    className={styles.avatar}
                                    alt="avatar"
                                    src={starr.owner.avatar_url}
                                />
                                <h4>Postado por: {starr.owner.login}</h4>

                                <div className={styles.homeCardDown}>
                                    <h4>Repositorio: {starr.name}</h4>
                                    {starr.description ? (
                                        <p>Descrição: {starr.description}</p>
                                    ) : (
                                        <p>Sem descrição</p>
                                    )}
                                </div>
                                <div className={styles.link}>
                                    <a href={starr.html_url}>
                                        Link:{starr.html_url}
                                    </a>
                                </div>
                                <div className={styles.data}>
                                    <p> {starr.created_at.substring(0, 10)}</p>
                                </div>
                            </div>
                        ))}
                    {!hideRepos &&
                        repos.map((rep) => (
                            <div className={styles.homeCard} key={rep.id}>
                                <h4>Repositorio: {rep.name}</h4>
                                <div className={styles.homeCardDown}>
                                    {rep.description ? (
                                        <p>Descrição: {rep.description}</p>
                                    ) : (
                                        <p>Sem descrição</p>
                                    )}
                                </div>
                                <div className={styles.link}>
                                    <a href={rep.html_url}>
                                        Link:{rep.html_url}
                                    </a>
                                </div>
                                <div className={styles.data}>
                                    <p> {rep.created_at.substring(0, 10)}</p>
                                </div>
                            </div>
                        ))}
                </>
            ) : (
                <span>Você deve logar primeiro</span>
            )}
        </>
    );
}
export default Home;
