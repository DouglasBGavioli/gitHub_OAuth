import styles from "../form/FormBusca.module.css";
import Input from "./Input";
function FormBusca({
    onSubmit,
    handleInput,
    button,
    clickRepos,
    clickStarred,
}) {
    return (
        <form className={styles.form_card} onSubmit={onSubmit}>
            <Input
                type="text"
                text="Buscar"
                placeholder="Digite nome de usuario"
                handleOnChange={handleInput}
            />
            <button
                disabled={button}
                className={styles.buttons}
                onClick={clickRepos}
            >
                Repositorios
            </button>
            <button
                disabled={button}
                className={styles.buttons}
                onClick={clickStarred}
            >
                Starred
            </button>
        </form>
    );
}
export default FormBusca;
