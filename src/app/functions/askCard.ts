interface props {
    numero: number
    tipo: string
}

async function askMoreCards(who: number): Promise<props> {
    try {
        const response = await fetch(`http://localhost:3001/askCard?who=${who}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        return data;
    } catch {
        console.log("Erro ao pedir carta")
        return { numero: 0, tipo: "ERROR" };
    }
}

export default askMoreCards;