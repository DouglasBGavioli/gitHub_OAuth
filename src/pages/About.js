import styles from "../pages/About.module.css";
function About() {
    return (
        <section className={styles.about_container}>
            <div>
                <p className={styles.paragrafo}>
                    Site desenvolvido com intuito de estudo por Douglas Biassi
                    Gavioli
                </p>
            </div>
        </section>
    );
}
export default About;
