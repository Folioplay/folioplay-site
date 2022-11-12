export function chooseTeamClose() {
    document.getElementsByClassName('overlay-div')[0].classList.remove('overlay');
    document
        .getElementById("choose-team-div")
        .classList.remove("animation-move-up");
    setTimeout(() => {
        document
            .getElementById("choose-team-div")
            .classList.add("animation-move-down");
    }, 100);

    setTimeout(() => {
        document
            .getElementById("choose-team-div")
            .classList.add("display-none");
    }, 700);
}

export function chooseTeamOpen() {
    return new Promise(function(resolve, reject) {
        document
        .getElementById("choose-team-div")
        .classList.remove("animation-move-down");
    setTimeout(() => {
        document
            .getElementById("choose-team-div")
            .classList.add("animation-move-up");
    }, 100);
    setTimeout(() => {
        document
            .getElementById("choose-team-div")
            .classList.remove("display-none");
    }, 400);
    document.getElementsByClassName('overlay-div')[0].classList.add('overlay');
    resolve();
    })
}
