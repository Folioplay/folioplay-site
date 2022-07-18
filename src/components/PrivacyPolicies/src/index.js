import React, { useEffect, useState } from "react";
import { Logout } from "@mui/icons-material";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Slide from '@mui/material/Slide';
import Modal from '@mui/material/Modal';
import { AuthContext } from "../../../Context/AuthContext";
import '../style/index.css'
export default function PrivacyPolicies() {
    const [openPolicies, setOpenPolicies] = useState(false);
    const handleOpenPolicies = () => setOpenPolicies(true);
    const handleClosePolicies = () => setOpenPolicies(false);
    const style = {

    };
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
        ['@media (max-width:600px)']: {
            left: "8%",
            width: "70%"
        }
    };
    useEffect(() => {
        // document.getElementsByClassName('overlay-div')[0].classList.add('overlay');
        document.getElementsByClassName('folio-privacy-policies')[0].addEventListener('mouseup', function (event) {
            console.log("clicked");
            var pol = document.getElementsByClassName('policies-div')[0];
            if (event.target !== pol && event.target.parentNode !== pol) {
                document.getElementsByClassName('overlay-div')[0].classList.remove('overlay');
                document.getElementsByClassName('folio-privacy-policies')[0].classList.remove('fade-in-policies');
                document.getElementsByClassName('folio-privacy-policies')[0].classList.add('fade-out-policies');
                setTimeout(() => {
                    document.getElementsByClassName('folio-privacy-policies')[0].classList.add('display-none');
                }, 450)
                return;
            }
        });
    }, [])


    return (
        <div className="folio-privacy-policies display-none" style={style}>
            <div style={style1} className="policies-div">
                {/* <Slide direction="up" in={openPolicies} mountOnEnter unmountOnExit> */}
                < Box >
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontFamily: "poppins" }}>
                        <h1 id="privacy-policy">FOLIOPLAY</h1>
                        <h2 id="privacy-policy">Privacy Policy</h2>
                        <p>Last revised on [DATE]</p>
                        <h3 id="the-gist">The Gist</h3>
                        <p>[COMPANY] will collect certain non-personally identify information about you as you use our sites. We may use this data to better understand our users. We can also publish this data, but the data will be about a large group of users, not individuals.</p>
                        <p>We will also ask you to provide personal information, but you&#39;ll always be able to opt out. If you give us personal information, we won&#39;t do anything evil with it.</p>
                        <p>We can also use cookies, but you can choose not to store these.</p>
                        <p>That&#39;s the basic idea, but you must read through the entire Privacy Policy below and agree with all the details before you use any of our sites.</p>
                        <h3 id="reuse">Reuse</h3>
                        <p>This document is based upon the <a href="http://automattic.com/privacy/">Automattic Privacy Policy</a> and is licensed under <a href="http://creativecommons.org/licenses/by-sa/2.5/">Creative Commons Attribution Share-Alike License 2.5</a>. Basically, this means you can use it verbatim or edited, but you must release new versions under the same license and you have to credit Automattic somewhere (like this!). Automattic is not connected with and does not sponsor or endorse [COMPANY] or its use of the work.</p>
                        <p>[COMPANY], Inc. (&quot;[COMPANY]&quot;) makes available services include our web sites ([URL] and [URL]), our blog, our API, and any other software, sites, and services offered by [COMPANY] in connection to any of those (taken together, the &quot;Service&quot;). It is [COMPANY]&#39;s policy to respect your privacy regarding any information we may collect while operating our websites.</p>
                        <h3 id="questions">Questions</h3>
                        <p>If you have question about this Privacy Policy, please contact us at [CONTACT EMAIL]</p>
                        <h3 id="visitors">Visitors</h3>
                        <p>Like most website operators, [COMPANY] collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. [COMPANY]&#39;s purpose in collecting non-personally identifying information is to better understand how [COMPANY]&#39;s visitors use its website. From time to time, [COMPANY] may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.</p>
                        <p>[COMPANY] also collects potentially personally-identifying information like Internet Protocol (IP) addresses. [COMPANY] does not use such information to identify its visitors, however, and does not disclose such information, other than under the same circumstances that it uses and discloses personally-identifying information, as described below. We may also collect and use IP addresses to block users who violated our Terms of Service.</p>
                        <h3 id="gathering-of-personally-identifying-information">Gathering of Personally-Identifying Information</h3>
                        <p>Certain visitors to [COMPANY]&#39;s websites choose to interact with [COMPANY] in ways that require [COMPANY] to gather personally-identifying information. The amount and type of information that [COMPANY] gathers depends on the nature of the interaction. [COMPANY] collects such information only insofar as is necessary or appropriate to fulfill the purpose of the visitor&#39;s interaction with [COMPANY]. [COMPANY] does not disclose personally-identifying information other than as described below. And visitors can always refuse to supply personally-identifying information, with the caveat that it may prevent them from engaging in certain Service-related activities.</p>
                        <p>Additionally, some interactions, such as posting a comment, may ask for optional personal information. For instance, when posting a comment, may provide a website that will be displayed along with a user&#39;s name when the comment is displayed. Supplying such personal information is completely optional and is only displayed for the benefit and the convenience of the user.</p>
                        <h3 id="aggregated-statistics">Aggregated Statistics</h3>
                        <p>[COMPANY] may collect statistics about the behavior of visitors to the Service. For instance, [COMPANY] may monitor the most popular parts of the [URL]. [COMPANY] may display this information publicly or provide it to others. However, [COMPANY] does not disclose personally-identifying information other than as described below.</p>
                        <h3 id="protection-of-certain-personally-identifying-information">Protection of Certain Personally-Identifying Information</h3>
                        <p>[COMPANY] discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on [COMPANY]&#39;s behalf or to provide services available at [COMPANY]&#39;s websites, and (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; by using the Service, you consent to the transfer of such information to them. [COMPANY] will not rent or sell potentially personally-identifying and personally-identifying information to anyone. Other than to its employees, contractors and affiliated organizations, as described above, [COMPANY] discloses potentially personally-identifying and personally-identifying information only when required to do so by law, or when [COMPANY] believes in good faith that disclosure is reasonably necessary to protect the property or rights of [COMPANY], third parties or the public at large. If you are a registered user of the Service and have supplied your email address, [COMPANY] may occasionally send you an email to tell you about new features, solicit your feedback, or just keep you up to date with what&#39;s going on with [COMPANY] and our products. We primarily use our website and blog to communicate this type of information, so we expect to keep this type of email to a minimum. If you send us a request (for example via a support email or via one of our feedback mechanisms), we reserve the right to publish it in order to help us clarify or respond to your request or to help us support other users. [COMPANY] takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.</p>
                        <h3 id="cookies">Cookies</h3>
                        <p>A cookie is a string of information that a website stores on a visitor&#39;s computer, and that the visitor&#39;s browser provides to the Service each time the visitor returns. [COMPANY] uses cookies to help [COMPANY] identify and track visitors, their usage of [COMPANY] Service, and their Service access preferences. [COMPANY] visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using [COMPANY]&#39;s websites, with the drawback that certain features of [COMPANY]&#39;s websites may not function properly without the aid of cookies.</p>
                        <h3 id="data-storage">Data Storage</h3>
                        <p>[COMPANY] uses third party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service. You understand that although you retain full rights to your data, it may be stored on third party storage and transmitted through third party networks.</p>
                        <h3 id="privacy-policy-changes">Privacy Policy Changes</h3>
                        <p>Although most changes are likely to be minor, [COMPANY] may change its Privacy Policy from time to time, and in [COMPANY]&#39;s sole discretion. [COMPANY] encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change. </p>

                    </Typography>
                </Box >
                {/* </Slide> */}
            </div >
        </div >
    );
}