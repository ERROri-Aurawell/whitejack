interface props {
    numero: number
    tipo: string
}

function askMoreCards(who: number): props {
    return {
        numero: 0,
        tipo: "comum"
    }
}

export default askMoreCards;