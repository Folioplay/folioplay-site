export default function assignRoles(superstarfilter, mooningfilter, rektfilter, setSnackOpen, navigate,state) {
  var selectedSuperstars = [];
  var selectedMooning = [];
  var selectedRekt = [];
  for (var i = 0; i < superstarfilter.length; i++) {
    if (superstarfilter[i].selected === true) {
      selectedSuperstars.push(superstarfilter[i]);
    }
  }
  for (var i = 0; i < mooningfilter.length; i++) {
    if (mooningfilter[i].selected === true) {
      selectedMooning.push(mooningfilter[i]);
    }
  }
  for (var i = 0; i < rektfilter.length; i++) {
    if (rektfilter[i].selected === true) {
      selectedRekt.push(rektfilter[i]);
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
    setSnackOpen({ isOpen: true, message: "You can't select more than 2 coins" });
    return;
  }
console.log(state);

  navigate("/teams/createteam/assignrole",{state:state});

}