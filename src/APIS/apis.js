const SERVER = 'https://folioplay-api.ssrivastava.tech';

export async function getAllTournaments() {
    // const authtoken = localStorage.getItem("authtoken");
    return await fetch(`${SERVER}/tournament/`, {
        method: "GET"
    })
        .then((res) => res.json());
}

export async function getTournamentById({ _id }) {
    return await fetch(`${SERVER}/tournament/info/` + _id, {
        method: "GET"
    }).then((res) => res.json());
}

export async function getAllCoins() {
    return await fetch(`${SERVER}/coins/`, {
        method: "GET"
    }).then((res) => res.json());
}

export async function getAuthToken(walletAddress, walletSignature) {
    return await fetch(`${SERVER}/auth/token`, {
        method: "POST",
        headers: {
            body: JSON.stringify({account: walletAddress, signature: walletSignature})
        }
    })
        .then((res)=> res.json())
        .then((data)=> localStorage.setItem("auth-token", data))
}