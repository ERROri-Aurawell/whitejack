interface props {
    numero: number
    tipo: string
}

import styles from "./cards.module.css"

export default function Cards({ numero, tipo }: props) {
    return (
        <div className={styles.carta} >
            {tipo != "escondida" &&
                <p className={styles.texto} >{numero}</p>
            }
        </div>
    )
}