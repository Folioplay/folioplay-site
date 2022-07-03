export default function saveTeam(event,coins,finalRanks,setError,setNameSnackOpen,setSuccessSnackOpen,createTeam,navigate) {
  event.preventDefault();
  var rankAssigned = 0;
  var selectedCoins = [];
  for (var i = 0; i < coins.length; i++) {
    coins[i]["rank"] =
      finalRanks[coins[i].name.toLowerCase() + ""] === undefined
        ? -1
        : finalRanks[coins[i].name.toLowerCase() + ""];
    selectedCoins.push({
      name: coins[i].name,
      rank: coins[i]["rank"],
      symbol: coins[i].symbol,
      category: coins[i].category,
    });
    if (coins[i]["rank"] !== -1) {
      rankAssigned++;
    }
  }
  console.log(rankAssigned);
  if (rankAssigned !== 3) {
    setError("Assign all three roles to coins.");
    setNameSnackOpen(true);
    return;
  }
  // api
  var name = document.getElementById("team-name").value;
  if (name !== null && name !== undefined && name.length > 0) {
    createTeam({ selectedCoins: selectedCoins, name: name });
    setSuccessSnackOpen(true);
    setTimeout(() => {
      if ("superstars" in window.localStorage)
        window.localStorage.removeItem("superstars");
      if ("mooning" in window.localStorage)
        window.localStorage.removeItem("mooning");
      if ("rekt" in window.localStorage) window.localStorage.removeItem("rekt");
      navigate(-2);
    }, 2000);
  } else {
    setError("Team name can't be empty.");
    setNameSnackOpen(true);
  }
}
