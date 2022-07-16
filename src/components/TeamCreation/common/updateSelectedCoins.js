export default function updateSelectedCoins({ wasActiveTab, add }) {
    var prev = parseInt(document.getElementById(wasActiveTab + '-selected-number').innerText);
    if (add) {
        document.getElementById(wasActiveTab + '-selected-number').innerText = prev + 1;
    } else {
        document.getElementById(wasActiveTab + '-selected-number').innerText = prev - 1;
    }
}