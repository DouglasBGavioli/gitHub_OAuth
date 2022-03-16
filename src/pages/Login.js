import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";

//context
import Context from "../store/Context";

import styles from "../pages/Login.module.css";
import Input from "../form/Input";
import logo from "../img/logoPreto.png";

//Git
import { authentication } from "../config/Firebase_confi";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";

function Login() {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useContext(Context);

    const signInWithGithub = async () => {
        const provider = new GithubAuthProvider();
        await signInWithPopup(authentication, provider)
            .then((re) => {
                console.log(re);
                setUserLogin(re.user.displayName);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={styles.fundo}>
            <section className={styles.login_container}>
                <form className={styles.formCard}>
                    <Input
                        type="text"
                        text="Login"
                        name="name"
                        placeholder="Usuario(fake Input utilizar github)"
                    />

                    <Input
                        type="password"
                        text="Senha"
                        name="budget"
                        placeholder="Senha(fake Input)"
                    />
                    <button className={styles.loginButton} type="submit">
                        Login
                    </button>
                    <p>Login com o Github</p>
                    <button
                        type="button"
                        className={styles.githubButton}
                        onClick={signInWithGithub}
                    >
                        <img
                            className={styles.gitImg}
                            src={logo}
                            alt="gitButton"
                            height="30"
                            width="30"
                        />
                    </button>
                </form>
            </section>
        </div>
    );
}
export default Login;
