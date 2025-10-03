interface props {
    numero: string | number
    tipo: string
    show?: boolean
}

import styles from "./cards.module.css"

export default function Cards({ numero, tipo, show }: props) {
    return (
        <div className={tipo != "soma" ? styles.carta : styles.soma} >
            {(tipo != "escondida" && tipo != "ERROR" && tipo != "soma" || show) &&
                <p className={styles.texto} >{numero}</p>
            }

            {
                tipo == "ERROR" &&
                <p className={styles.texto} >ERRO</p>
            }

            {
                tipo == "escondida" && !show  &&
                <p className={styles.texto} >??</p>
            }

            {
                tipo == "soma" &&
                <p className={styles.texto}>{numero}</p>
            }
        </div>
    )
}