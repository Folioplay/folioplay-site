export default async function saveTeam(event,coins,finalRanks,setError,setNameSnackOpen,setSuccessSnackOpen,createTeam,navigate,state) {
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
  if (rankAssigned !== 3) {
    setError("Assign all three roles to coins.");
    setNameSnackOpen(true);
    return;
  }
  // api
  var name = document.getElementById("team-name").value;
  if (name !== null && name !== undefined && name.length > 0) {
    let response = await createTeam({ selectedCoins: selectedCoins, name: name });
    if(response.statusCode === 200){
      setSuccessSnackOpen(true);
      setTimeout(() => {
        if ("superstars" in window.localStorage)
          window.localStorage.removeItem("superstars");
        if ("mooning" in window.localStorage)
          window.localStorage.removeItem("mooning");
        if ("rekt" in window.localStorage) window.localStorage.removeItem("rekt");
        if(state && state.comingFrom == "/tournaments"){
          navigate('/tournaments' , {state:{tournamentId:state.tournamentId,openDrawer:true,comingFrom:""}});
        }else{
          if(state && state.comingFrom == "/tournament/" + state.tournamentId){
            navigate(`/tournament/`+state.tournamentId , {state:{tournamentId:state.tournamentId,openDrawer:true,comingFrom:""}});
          }else{
            navigate('/activity');
          } 
        }
      }, 500);
    }else{
      setError(response.message);
      setNameSnackOpen(true);
    }
    
  } else {
    setError("Team name can't be empty.");
    setNameSnackOpen(true);
  }
}
