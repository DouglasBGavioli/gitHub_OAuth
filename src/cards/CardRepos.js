import styles from "../cards/Cards.module.css";
function CardRepos({ id, name, description, html_url, created_at }) {
    return (
        <div className={styles.homeCard} key={id}>
            <h4>Repositorio: {name}</h4>
            <div className={styles.homeCardDown}>
                {description ? (
                    <p>Descrição: {description}</p>
                ) : (
                    <p>Sem descrição</p>
                )}
            </div>
            <div className={styles.link}>
                <a href={html_url}>Link:{html_url}</a>
            </div>
            <div className={styles.data}>
                <p> {created_at.substring(0, 10)}</p>
            </div>
        </div>
    );
}
export default CardRepos;
