const SERVER = "https://folioplay-api.ssrivastava.tech";

export async function getAllTournaments() {
  return await fetch(`${SERVER}/tournament/`, {
    method: "GET",
  }).then((res) => res.json());
}

export async function getTournamentById({ _id }) {
  return await fetch(`${SERVER}/tournament/` + _id, {
    method: "GET",
  }).then((res) => res.json());
}

export async function getAllCoins() {
  return await fetch(`${SERVER}/coins/`, {
    method: "GET",
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
    .then((res) => {
      if (!res.ok) throw 'Invalid user';
      else return res.json();
    })
    .then((data) => {
      localStorage.removeItem("authtoken")
      localStorage.setItem("authtoken", data.accessToken)
    })
}
export async function getAllUserTeams() {
  return await fetch(`${SERVER}/teams/`, {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("authtoken"),
    },
  }).then((res) => res.json());
}

export async function joinTournamentAPI(tournamentId, teamId) {
  console.log("678");
  return await fetch(`${SERVER}/tournament/join`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "x-access-token": localStorage.getItem("authtoken"),
    },
    body: JSON.stringify({
      tournamentId: tournamentId,
      teamId: teamId,
    }),
  })
    .then((res) => res.json())
    .catch((err) => err);
}

export async function getLeaderboard(tournament_id) {
  console.log(tournament_id);
  return await fetch(`${SERVER}/tournament/leaderboard/${tournament_id}`, {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("authtoken"),
    },
  }).then((res) => res.json());
}

export async function createTeam({ selectedCoins, name }) {
  const authtoken = localStorage.getItem("authtoken");

  return await fetch(`${SERVER}/teams/`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      "x-access-token": authtoken,
    },
    body: JSON.stringify({
      selectedCoins: selectedCoins,
      name: name,
    }),
  }).then((res) => res.json());
}

export async function deleteTeam({ teamId, teamIndex }) {
  const authtoken = localStorage.getItem("authtoken");

  return await fetch(`${SERVER}/teams/` + teamId + "/", {
    method: "DELETE",
    headers: {
      "x-access-token": authtoken,
    },
  }).then(() => {
    document.getElementById("team-" + teamIndex).classList.add("display-none");
    document.getElementById("jointournament-button").style.display = "none";
  });
}
export async function joinValidTournamentAPI(tournamentId, teamId) {
  return await fetch(`${SERVER}/tournament/join/is_valid`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "x-access-token": localStorage.getItem("authtoken"),
    },
    body: JSON.stringify({
      tournamentId: tournamentId,
      teamId: teamId,
    }),
  })
    .then((res) => res.json())
    .catch((err) => err);
}


export async function validUser() {
  return await fetch(`${SERVER}/user/is-valid`, {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("authtoken"),
    },
  })
    .then((res) => {
      if (!res.ok) throw 'Invalid user';
      else return res.json();
    })
    .catch((err) => err);
}
export async function getRank({ tournamentId }) {
  const authtoken = localStorage.getItem('authtoken');
  return await fetch(`${SERVER}/tournament/rank/` + tournamentId + "/", {
    method: "GET",
    headers: {
      'x-access-token': authtoken
    }
  }).then((res) => res.json());
}
