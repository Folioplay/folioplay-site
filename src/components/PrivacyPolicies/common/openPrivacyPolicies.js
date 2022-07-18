export default function openPrivacyPolicies() {
    document.getElementsByClassName('overlay-div')[0].classList.add('overlay');
    var policies = document.getElementsByClassName('folio-privacy-policies')[0];
    policies.classList.remove('fade-out-policies');
    policies.classList.remove('display-none');
    policies.classList.add('fade-in-policies');
}