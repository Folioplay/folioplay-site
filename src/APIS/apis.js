export const SERVER = process.env.REACT_APP_API_SERVER;
export const S3_URL = process.env.REACT_APP_S3_URL

export async function getAllTournaments() {
  return await fetch(`${SERVER}/tournament/`, {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("authtoken"),
    }
  }).then((res) => res.json());
}

export async function getTournamentById({ _id }) {
  return await fetch(`${SERVER}/tournament/` + _id, {
    method: "GET",
  }).then((res) => res.json());
}

export async function getAmountWon({ _id }) {
  return await fetch(`${SERVER}/tournament/rank/` + _id + `?amount`, {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("authtoken"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data.total_amount_won;
    });
}

export async function getAllCoins() {
  return await fetch(`${SERVER}/coins/`, {
    method: "GET",
  }).then((res) => res.json());
}

export async function getAuthToken(walletAddress, walletSignature, email) {
  console.log("getting auth token");
  return await fetch(`${SERVER}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      walletAddress: walletAddress,
      signature: walletSignature,
      email: email
    }),
  })
    .then((res) => {
      if (!res.ok) throw "Invalid user";
      else return res.json();
    })
    .then((data) => {
      localStorage.removeItem("authtoken");
      localStorage.setItem("authtoken", data.accessToken);
      return {
        "userdata": data.user,
        "new_user": data.newUser
      };
    });
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

export async function getWinRateAPI() {
  return await fetch(`${SERVER}/user/activity?win-rate`, {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("authtoken"),
    },
  }).then((res) => {
    return res.json();
  });
}

export async function getPersonalLeaderboard(tournament_id) {
  console.log(tournament_id);
  return await fetch(`${SERVER}/tournament/rank/${tournament_id}`, {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("authtoken"),
    },
  }).then((res) => res.json());
}

export async function getRewardDetailsAPI(tournament_id) {
  return await fetch(`${SERVER}/tournament/winners/${tournament_id}`, {
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


export async function validUser() {
  return await fetch(`${SERVER}/user/is-valid`, {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("authtoken"),
    },
  })
    .then((res) => {
      if (!res.ok) throw "Invalid user";
      else return res.json();
    })
    .catch((err) => err.json());
}
export async function getRank({ tournamentId }) {
  const authtoken = localStorage.getItem("authtoken");
  return await fetch(`${SERVER}/tournament/rank/` + tournamentId + "/", {
    method: "GET",
    headers: {
      "x-access-token": authtoken,
    },
  }).then((res) => res.json());
}

export async function getPreviousUserTournaments() {
  const authtoken = localStorage.getItem("authtoken");
  return await fetch(`${SERVER}/user/activity/`, {
    method: "GET",
    headers: {
      "x-access-token": authtoken,
    },
  }).then((res) => res.json());
}
export async function getTeamByid({ teamId }) {
  const authtoken = localStorage.getItem("authtoken");
  return await fetch(`${SERVER}/teams/` + teamId, {
    method: "GET",
    headers: {
      "x-access-token": authtoken,
    },
  }).then((res) => res.json());
}

export async function checkAvailableUsername(name) {
  const authtoken = localStorage.getItem("authtoken");
  return await fetch(`${SERVER}/user/username/available?username=${name}`, {
    method: "GET",
    headers: {
      "x-access-token": authtoken,
    },
  }).then((res) => {
    return res.ok;
  });
}

export async function changeUserName(name) {
  const authtoken = localStorage.getItem("authtoken");
  return await fetch(`${SERVER}/user/username/`, {
    method: "PUT",
    headers: {
      "x-access-token": authtoken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: name.toString() }),
  })
    .then((res) => {
      if (res.ok) return true;
      else return false;
    })
    .catch((err) => false);
  // return x.message;
}

export async function getCoinsTableData(tournamentId, teamId) {
  const authToken = localStorage.getItem("authtoken");
  return await fetch(
    `${SERVER}/tournament/allocation/${tournamentId}?teamId=${teamId}`,
    {
      method: "GET",
      headers: {
        "x-access-token": authToken,
      },
    }
  ).then((res) => res.json());
}

export async function changeProfilePicture(data) {
  const authToken = localStorage.getItem("authtoken");
  return await fetch(`${SERVER}/user/profile`, {
    method: "PUT",
    headers: {
      "x-access-token": authToken,
    },
    body: data,
  }).then((res) => res.json());
}

export async function referralCodePost(referralCode) {
  return await fetch(`${SERVER}/referral/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "x-access-token": localStorage.getItem("authtoken"),
    },
    body: JSON.stringify({
      referralCode: referralCode
    }),
  })
    .then((res) => res.json())
    .catch((err) => err.json());
}

export async function getWalletBalance() {
  const authToken = localStorage.getItem("authtoken");
  return await fetch(
      `${SERVER}/wallet`,
      {
        method: "GET",
        headers: {
          "x-access-token": authToken,
        },
      }
  ).then((res) => res.json());
}
