export function closePrivacyPolicies(){
    console.log("closing privacy policies baby")
    document.getElementsByClassName('overlay-div')[0].classList.remove('overlay');
    document.getElementsByClassName('folio-privacy-policies')[0].classList.remove('fade-in-policies');
    document.getElementsByClassName('folio-privacy-policies')[0].classList.add('fade-out-policies');
    setTimeout(() => {
        document.getElementsByClassName('folio-privacy-policies')[0].classList.add('display-none');
    }, 450)
}
