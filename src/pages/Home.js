import styles from "./Home.module.css";
import React, { useContext, useState } from "react";

import Context from "../store/Context";
import Input from "../form/Input";
import Loading from "../layout/Loading";
import CardStarred from "../cards/CardStarred";
import CardRepos from "../cards/CardRepos";
import FormBusca from "../form/FormBusca";

function Home() {
    //const [userLogin, setUserLogin] = useContext(Context);
    const [userLogin, setUserLogin] = useState("Usuario de testes");
    const [repos, setRepos] = useState([]);
    const [starred, setStarred] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const [hideRepos, setHideRepos] = useState(false);
    const [hideStarred, setHideStarred] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(true);
    const [button, setButton] = useState(true);

    function handleInput(e) {
        setInputValue(e.target.value);
        if (inputValue !== " ") {
            setButton(false);
        }
        if (inputValue.length <= 1) {
            setButton(true);
        }
    }

    function onSubmit(e) {
        e.preventDefault();
    }

    function clickRepos() {
        setRemoveLoading(false);
        setHideRepos(true);
        setHideStarred(true);

        if (localStorage.getItem(`repos${inputValue}`)) {
            console.log("achou");
            let repoString = localStorage.getItem(`repos${inputValue}`);
            let repoObj = JSON.parse(repoString);
            // !!parei aqui falta verificar se os repositorios mudaram ou nao
            setRepos(repoObj);
        } else {
            fetch(`https://api.github.com/users/${inputValue}/repos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data);

                    if (data.message === "Not Found") {
                        console.log("not found");
                        setRepos([]);
                    } else {
                        setRepos(data);
                        localStorage.setItem(
                            `repos${inputValue}`,
                            JSON.stringify(data)
                        );
                    }
                })
                .catch((err) => console.log(err));
        }

        setTimeout(() => {
            setHideStarred(true);
            setHideRepos(false);
            setRemoveLoading(true);
        }, 1000);
    }
    function clickStarred() {
        setRemoveLoading(false);
        setHideStarred(true);
        setHideRepos(true);

        if (localStorage.getItem(`starred${inputValue}`)) {
            console.log("achou");
            let starredString = localStorage.getItem(`starred${inputValue}`);
            let starredObj = JSON.parse(starredString);
            setStarred(starredObj);
        } else {
            fetch(`https://api.github.com/users/${inputValue}/starred`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data);

                    if (data.message === "Not Found") {
                        console.log("not found");
                        setStarred([]);
                    } else {
                        setStarred(data);
                        localStorage.setItem(
                            `starred${inputValue}`,
                            JSON.stringify(data)
                        );
                    }
                })
                .catch((err) => console.log(err));
        }
        setTimeout(() => {
            setHideStarred(false);
            setHideRepos(true);
            setRemoveLoading(true);
        }, 1000);
    }
    return (
        <>
            {userLogin ? (
                <>
                    <h3 className={styles.user}>Bem-vindo: {userLogin} </h3>
                    <section className={styles.home_container}>
                        <FormBusca
                            onSubmit={onSubmit}
                            handleInput={handleInput}
                            button={button}
                            clickRepos={clickRepos}
                            clickStarred={clickStarred}
                        />
                    </section>
                    <section className={styles.containerCards}>
                        {!removeLoading && <Loading />}
                        {starred.length === 0 && !hideStarred && (
                            <p>Starreds Vazios</p>
                        )}
                        {repos.length === 0 && !hideRepos && (
                            <p>Repertorios Vazios</p>
                        )}
                        {!hideStarred &&
                            starred.map((starr) => (
                                <CardStarred
                                    id={starr.id}
                                    avatar={starr.owner.avatar_url}
                                    login={starr.owner.login}
                                    repName={starr.name}
                                    description={starr.description}
                                    html_url={starr.html_url}
                                    created_at={starr.created_at.substring(
                                        0,
                                        10
                                    )}
                                />
                            ))}
                        {!hideRepos &&
                            repos.map((rep) => (
                                <CardRepos
                                    id={rep.id}
                                    name={rep.name}
                                    description={rep.description}
                                    html_url={rep.html_url}
                                    created_at={rep.created_at.substring(0, 10)}
                                />
                            ))}
                    </section>
                </>
            ) : (
                <div className={styles.home_container}>
                    <span>Você deve logar primeiro</span>
                </div>
            )}
        </>
    );
}
export default Home;
