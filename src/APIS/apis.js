const SERVER = 'https://folioplay-api.ssrivastava.tech';

export async function getAllTournaments() {
    // const authtoken = localStorage.getItem("authtoken");
    return await fetch(`${SERVER}/tournament/`, {
        method: "GET"
    })
        .then((res) => res.json());
}

export async function getTournamentById({ _id }) {
    return await fetch(`${SERVER}/tournament/` + _id, {
        method: "GET"
    }).then((res) => res.json());
}

export async function getAllCoins() {
    return await fetch(`${SERVER}/coins/`, {
        method: "GET"
    }).then((res) => res.json());
}

export async function getAuthToken(walletAddress, walletSignature, email) {
    return await fetch(`${SERVER}/user/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress: walletAddress, signature: walletSignature, email: email })
    })
        .then((res) => res.json())
        .then((data) => {
            return localStorage.setItem("authtoken", data.accessToken)
        })
}
export async function getAllUserTeams() {
    return await fetch(`${SERVER}/teams/`, {
        method: "GET",
        headers: {
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWM5ZDI3N2U3ZTk4MWQ1NDc3ZDBjZiIsImVtYWlsIjoiaG9uZXlAZm9saW9wbGF5LmluIiwiaWF0IjoxNjU1NDgwODE2LCJleHAiOjE2NTU1NjcyMTZ9.LzmTrOjF1KnCsOXnKUFJ3vJNJh7BPP826Sv1JOaeNlo"
        }
    }).then((res) => res.json());
}

export async function createTeam({ selectedCoins, name, }) {
    return await fetch(`${SERVER}/teams/`, {
        method: "POST",
        headers: {
            "Content-type": "Application/json",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWM5ZDI3N2U3ZTk4MWQ1NDc3ZDBjZiIsImVtYWlsIjoiaG9uZXlAZm9saW9wbGF5LmluIiwiaWF0IjoxNjU1NDgwODE2LCJleHAiOjE2NTU1NjcyMTZ9.LzmTrOjF1KnCsOXnKUFJ3vJNJh7BPP826Sv1JOaeNlo"
        },
        body: JSON.stringify({
            selectedCoins: selectedCoins,
            name: name
        })
    }).then(res => res.json());
}