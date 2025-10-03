interface props {
    numero: number
    tipo: string
}

import styles from "./cards.module.css"

export default function Cards({ numero, tipo }: props) {
    return (
        <div className={styles.carta} >
            {(tipo != "escondida" && tipo != "ERROR") &&
                <p className={styles.texto} >{numero}</p>
            }

            {
                tipo == "ERROR" &&
                <p className={styles.texto} >ERRO</p>
            }

            {
                tipo == "escondida"  &&
                <p className={styles.texto} >??</p>
            }
        </div>
    )
}