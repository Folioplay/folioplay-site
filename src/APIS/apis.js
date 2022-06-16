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