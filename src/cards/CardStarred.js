import styles from "../cards/Cards.module.css";
function CardStarred({
    id,
    avatar,
    login,
    repName,
    description,
    html_url,
    created_at,
}) {
    return (
        <div className={styles.homeCard} key={id}>
            <img className={styles.avatar} alt="avatar" src={avatar} />
            <h4>Postado por: {login}</h4>

            <div className={styles.homeCardDown}>
                <h4>Repositorio: {repName}</h4>
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
export default CardStarred;
