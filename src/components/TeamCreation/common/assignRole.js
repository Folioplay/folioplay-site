export default function assignRoles(superstars, mooning, rekt, setSnackOpen, navigate,state) {
  var selectedSuperstars = [];
  var selectedMooning = [];
  var selectedRekt = [];
  for (var i = 0; i < superstars.length; i++) {
    if (superstars[i].selected === true) {
      selectedSuperstars.push(superstars[i]);
    }
  }
  for (var i = 0; i < mooning.length; i++) {
    if (mooning[i].selected === true) {
      selectedMooning.push(mooning[i]);
    }
  }
  for (var i = 0; i < rekt.length; i++) {
    if (rekt[i].selected === true) {
      selectedRekt.push(rekt[i]);
    }
  }
  if (
    selectedSuperstars.length < 1 ||
    selectedSuperstars.length > 2 ||
    selectedMooning.length < 3 ||
    selectedMooning.length > 6 ||
    selectedRekt.length < 3 ||
    selectedRekt.length > 6 || selectedSuperstars.length + selectedMooning.length + selectedRekt.length !== 11
  ) {
    setSnackOpen(true);
    return;
  }
console.log(state);

  navigate("/teams/createteam/assignrole",{state:state});

}