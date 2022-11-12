import React, {useEffect} from 'react';

const ReferralModal = () => {

    const style1 = {
        width: "max(320px,60%)",
        height: "70%",
        borderRadius: "12px",
        boxShadow: 24,
        position: "absolute",
        p: 4,
        backgroundColor: "var(--dim-white)",
        color: "var(--grey-shade)",
        overflowY: "scroll",
        scrollbarWidth: "none",
        zIndex: "10",
        padding: "1rem",
        ['@media (maxWidth:600px)']: {
            left: "8%",
            width: "70%"
        }
    };
    useEffect(() => {
        // document.getElementsByClassName('overlay-div')[0].classList.add('overlay');
        document.getElementsByClassName('folio-referral')[0].addEventListener('mouseup', function (event) {
            console.log("clicked");
            var pol = document.getElementsByClassName('referral-div')[0];
            if (event.target !== pol && event.target.parentNode !== pol) {
                document.getElementsByClassName('overlay-div')[0].classList.remove('overlay');
                document.getElementsByClassName('folio-referral')[0].classList.remove('fade-in-referral');
                document.getElementsByClassName('folio-referral')[0].classList.add('fade-out-referral');
                setTimeout(() => {
                    document.getElementsByClassName('folio-referral')[0].classList.add('display-none');
                }, 450)
                return;
            }
        });
    }, [])


    return (
        <div>
            
        </div>
    );
};

export default ReferralModal;