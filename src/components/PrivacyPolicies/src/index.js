import React, { useEffect, useState } from "react";
import { Logout } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Modal from "@mui/material/Modal";
import { closePrivacyPolicies } from "../common/closePrivacyPolicies";
import { AuthContext } from "../../../Context/AuthContext";
import "../style/index.css";
export default function PrivacyPolicies() {
  const [openPolicies, setOpenPolicies] = useState(false);
  const handleOpenPolicies = () => setOpenPolicies(true);
  const handleClosePolicies = () => setOpenPolicies(false);
  const style = {};
  useEffect(() => {
    // document.getElementsByClassName('overlay-div')[0].classList.add('overlay');
    document
      .getElementsByClassName("folio-privacy-policies")[0]
      .addEventListener("mouseup", function (event) {
        var pol = document.getElementById("policies-div");
        if (!pol.contains(event.target)) {
          closePrivacyPolicies();
          return;
        }
      });
  }, []);

  return (
    <div className="folio-privacy-policies display-none" style={style}>
      <div id="policies-div">
        {/* <Slide direction="up" in={openPolicies} mountOnEnter unmountOnExit> */}
        {/* <div style={{ fontFamily: "poppins", width: "100%", height: "100%" }}> */}
        {/* <embed src={require("../../../images/privacyPolicies.pdf").default} style={{ fontFamily: "poppins",width:"100%",height:"100%",borderRadius:"12px" }}/> */}
        {/* <div> */}
        <p className="c25">
          <span className="c8">[</span>
          <span className="c8 c27">Last updated on _____</span>
          <span className="c8">]</span>
        </p>
        <p className="c12">
          <span className="c5">PRIVACY POLICY</span>
        </p>
        <p className="c12 c2">
          <span className="c5"></span>
        </p>
        <p className="c1">
          <span className="c5">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </p>
        <p className="c16">
          <span className="c5">
            This privacy policy (the &ldquo;Privacy Policy&rdquo;) explains how
            we collect, use, share, and safeguard personal information. This
            Privacy Policy also tells you about your rights, and how you can
            reach us if you have any concerns or questions with respect to your
            personal information. &nbsp;
          </span>
        </p>
        <p className="c1">
          <span className="c5">
            &ldquo;Personal information&rdquo; will include all and any
            information which, either alone or in combination with other data
            enable you to be identified. For example, your name, email address,
            username, contact details or any unique identifier such as an IP
            address, device ID or other online identifier. &nbsp;
          </span>
        </p>
        <p className="c1 c2">
          <span className="c5"></span>
        </p>
        <p className="c1">
          <span className="c8">
            Any of the terms that is not defined in this Privacy Policy will
            have the meaning given to it in the terms and condition for use of
            the Services (&ldquo;
          </span>
          <span className="c6">T&amp;C</span>
          <span className="c0">
            &rdquo;). Please refer to the T&amp;C before accessing any Services
            available on our Platform.
          </span>
        </p>
        <p className="c1 c2">
          <span className="c5"></span>
        </p>
        <p className="c1 c4">
          <span className="c6">
            1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type of
            Information we
            collect&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </p>
        <p className="c1 c4">
          <span className="c0">&nbsp;</span>
        </p>
        <ol className="c3 lst-kix_list_3-1 start" start="1">
          <li className="c1 c11 li-bullet-0">
            <span className="c0">We collect</span>
            <span className="c5">&nbsp;</span>
            <span className="c0">
              and process certain data/information of, and from the user for
              duly legitimate purpose on a valid legal basis for provision of
              the Services and maintenance of the Platform, among others, its
              operation, improvement and to diagnose its problems.
            </span>
          </li>
        </ol>
        <p className="c2 c9">
          <span className="c0"></span>
        </p>
        <ol className="c3 lst-kix_list_3-1" start="2">
          <li className="c1 c11 li-bullet-0">
            <span className="c0">
              Some of this data is collected automatically, when a user or a
              visitor uses the Platform and/or the Services, such as login
              information, device information, activities, location and those
              collected by cookies. We also collect information when you create
              an Account, participate in any interactive features of the
              Services, fill out a form, participate in a contest or promotion,
              make a purchase, communicate with us via third party social media
              sites, request customer support, or otherwise communicate with us.
              This includes your name, email address, telephone number etc. You
              may provide this information to us directly, or by signing in to
              your account/service with a third party, including without
              limitation, Facebook or Google. In addition, the Company for the
              provision of Services and compliance with Law, could also request
              for additional data including, your gender, date of birth, place
              of birth, addresses, nationality, national insurance number,
              social security number citizenship and residency status, trading
              history, and other details, as may be required from time to time.
              &nbsp;
            </span>
          </li>
        </ol>
        <p className="c9 c2">
          <span className="c0"></span>
        </p>
        <p className="c9 c2">
          <span className="c0"></span>
        </p>
        <ol className="c3 lst-kix_list_3-1" start="3">
          <li className="c1 c11 li-bullet-0">
            <span className="c0">
              We have provided below examples of the type of information that we
              may collect from you, and purpose of collecting such information.
            </span>
          </li>
        </ol>
        <p className="c1 c2">
          <span className="c0"></span>
        </p>
        <a id="t.5bc57dbea3e8590808250d293459c3606e9d49d0"></a>
        <a id="t.0"></a>
        <table className="c26">
          <tr className="c14">
            <td className="c13 c20" colspan="1" rowSpan="1">
              <p className="c12">
                <span className="c5">Nature</span>
              </p>
            </td>
            <td className="c15 c20" colspan="1" rowSpan="1">
              <p className="c12">
                <span className="c5">Type of data</span>
              </p>
            </td>
            <td className="c7 c20" colspan="1" rowSpan="1">
              <p className="c12">
                <span className="c5">Legitimate Interest </span>
              </p>
              <p className="c12 c2">
                <span className="c5"></span>
              </p>
            </td>
          </tr>
          <tr className="c14">
            <td className="c13" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c6">Account Registration </span>
              </p>
            </td>
            <td className="c15" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  We collect your name and contact information when you create
                  an account.
                </span>
              </p>
              <p className="c1 c2">
                <span className="c0"></span>
              </p>
            </td>
            <td className="c7" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c8">
                  We use this information to provide account related
                  functionalities to our users. Also, to confirm user&rsquo;
                  identify, prevent fraud and compliance with legal obligation.
                </span>
                <span className="c8 c21 c23">&nbsp;</span>
              </p>
              <p className="c1">
                <span className="c0">&nbsp;</span>
              </p>
            </td>
          </tr>
          <tr className="c14">
            <td className="c13" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c5">Demographic Information</span>
              </p>
            </td>
            <td className="c15" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  We may collect personal information, such as your age,
                  location, and gender.
                </span>
              </p>
              <p className="c1 c2">
                <span className="c0"></span>
              </p>
            </td>
            <td className="c7" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  We use this information to comply with applicable Law.
                </span>
              </p>
            </td>
          </tr>
          <tr className="c14">
            <td className="c13" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c5">Client Information</span>
              </p>
              <p className="c1 c2">
                <span className="c5"></span>
              </p>
            </td>
            <td className="c15" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  We collect the name, and contact information, of our clients
                  and their employees with whom we may interact.
                </span>
              </p>
              <p className="c1 c2">
                <span className="c0"></span>
              </p>
            </td>
            <td className="c7" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  To contact clients and communicate with them for business
                  administration such as projects, services, and billing.
                </span>
              </p>
            </td>
          </tr>
          <tr className="c14">
            <td className="c13" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c5">Support Information </span>
              </p>
            </td>
            <td className="c15" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  When you contact us for technical and customer support
                  requests, we collect the information shared with us, including
                  any follow-up interactions we have with you.
                </span>
              </p>
            </td>
            <td className="c7" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  Your consent and our legitimate interests in assisting the
                  users on issues relating to the Services.
                </span>
              </p>
              <p className="c1 c2">
                <span className="c0"></span>
              </p>
            </td>
          </tr>
          <tr className="c14">
            <td className="c13" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c5">Survey Information</span>
              </p>
            </td>
            <td className="c15" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  We may from time to time invite you to participate in surveys
                  about your experience using the Platform. If you agree to
                  participate in a survey, we collect the information included
                  in your answers to the survey.
                </span>
              </p>
              <p className="c1 c2">
                <span className="c0"></span>
              </p>
            </td>
            <td className="c7" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  Your consent and our legitimate interest in developing and
                  enhancing the Services.
                </span>
              </p>
            </td>
          </tr>
          <tr className="c14">
            <td className="c13" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c5">Device Information</span>
              </p>
            </td>
            <td className="c15" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  Usage Data, i.e., Internet Protocol address, browser type,
                  browser version, the pages of our Service that you visit, the
                  time and date of your visit, the time spent on those pages,
                  unique device identifiers and other diagnostic data.
                </span>
              </p>
              <p className="c1 c2">
                <span className="c0"></span>
              </p>
            </td>
            <td className="c7" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  Performance of analytic operation in order to improve the
                  Services.
                </span>
              </p>
              <p className="c1 c2">
                <span className="c0"></span>
              </p>
            </td>
          </tr>
          <tr className="c14">
            <td className="c13" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c5">Cookies</span>
              </p>
            </td>
            <td className="c15" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  Various browsing information of user resulting from use of
                  Cookies.
                </span>
              </p>
              <p className="c1 c2">
                <span className="c0"></span>
              </p>
            </td>
            <td className="c7" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  We use this information to ensure our website operates
                  efficiently, and where required by Law, we base the use of
                  cookies upon consent.
                </span>
              </p>
              <p className="c1 c2">
                <span className="c0"></span>
              </p>
            </td>
          </tr>
          <tr className="c14">
            <td className="c13" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c5">Third Party Information</span>
              </p>
            </td>
            <td className="c15" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  We may receive personal information about you from third
                  parties including business partners, our Affiliates, or
                  publicly available sources. Example, user KYC verification
                  through third party or background check of employee to ensure
                  compliance with Law.
                </span>
              </p>
              <p className="c1 c2">
                <span className="c0"></span>
              </p>
            </td>
            <td className="c7" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  For the provision of the Services, compliance with Law and to
                  further develop and enhance the Platform.
                </span>
              </p>
              <p className="c1 c2">
                <span className="c0"></span>
              </p>
            </td>
          </tr>
          <tr className="c14">
            <td className="c13" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c5">Transaction Information</span>
              </p>
            </td>
            <td className="c15" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  When you connect your wallet to our Platform/Services we will
                  collect information on all transactions connected to your
                  public key through our Platform.
                </span>
              </p>
              <p className="c1">
                <span className="c0">&nbsp;</span>
              </p>
            </td>
            <td className="c7" colspan="1" rowSpan="1">
              <p className="c1">
                <span className="c0">
                  To prevent fraud, compliance with legal obligation, and our
                  legitimate interest in developing and enhancing the Services.
                </span>
              </p>
            </td>
          </tr>
        </table>
        <p className="c1 c2">
          <span className="c0"></span>
        </p>
        <p className="c1 c2">
          <span className="c0"></span>
        </p>
        <p className="c1 c4 c21">
          <span className="c6">
            2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DATA
            SUBJECT&rsquo;S RIGHTS AND DUTIES
          </span>
        </p>
        <p className="c1 c17 c2 c21">
          <span className="c0"></span>
        </p>
        <p className="c1 c4 c21">
          <span className="c8">2.1</span>
          <span className="c6">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Right of the Data
            Subject:{" "}
          </span>
          <span className="c0">
            As a data subject, you have certain rights with respect to your
            personal information, such as:
          </span>
        </p>
        <p className="c1 c2 c19">
          <span className="c0"></span>
        </p>
        <ul className="c3 lst-kix_list_1-0 start">
          <li className="c1 c10 li-bullet-1">
            <span className="c6">Right to Consent:</span>
            <span className="c0">
              &nbsp;You have the right not to consent/provide us any such data,
              however, if you do so, we may not be able to provide you with the
              Services, or the products and/or Services offered through the
              Platform.
            </span>
          </li>
        </ul>
        <p className="c1 c19">
          <span className="c0">&nbsp;</span>
        </p>
        <ul className="c3 lst-kix_list_1-0">
          <li className="c1 c10 li-bullet-1">
            <span className="c6">Access</span>
            <span className="c0">
              :&nbsp;You have the right to request details of your personal
              information from us.
            </span>
          </li>
        </ul>
        <p className="c1 c2 c19">
          <span className="c0"></span>
        </p>
        <ul className="c3 lst-kix_list_1-0">
          <li className="c1 c10 li-bullet-1">
            <span className="c6">Data Erasure.&nbsp;</span>
            <span className="c8">
              You can request for deletion of your personal information.
              However, if such data is required for the provision of the
              Services, you may be required to delete your Account and/or may
              not be able to use our Services.{" "}
            </span>
            <span className="c6">&nbsp;</span>
          </li>
        </ul>
        <p className="c1 c2 c19">
          <span className="c0"></span>
        </p>
        <ul className="c3 lst-kix_list_1-0">
          <li className="c1 c10 li-bullet-1">
            <span className="c6">Correction</span>
            <span className="c0">
              :&nbsp;If you believe any personal information held by us is
              inaccurate, out of date, incomplete, irrelevant, or misleading,
              please contact us to correct such information, or update the same
              via your Account, if allowed.
            </span>
          </li>
        </ul>
        <p className="c1 c2 c19">
          <span className="c0"></span>
        </p>
        <ul className="c3 lst-kix_list_1-0">
          <li className="c1 c10 li-bullet-1">
            <span className="c6">Concerns and Queries</span>
            <span className="c0">
              :&nbsp;If you want to exercise your rights or have any concerns
              and queries on how we process, handle, and keep your personal
              information, please make a request to us accompanied by a proof of
              identity and full details of your concerns and queries. We will
              take appropriate steps to address them.
            </span>
          </li>
        </ul>
        <p className="c1 c2 c19">
          <span className="c0"></span>
        </p>
        <ul className="c3 lst-kix_list_1-0">
          <li className="c1 c10 li-bullet-1">
            <span className="c6">Unsubscribe</span>
            <span className="c0">
              :&nbsp;To unsubscribe from our e-mail or to opt-out of any
              communications, please contact us at the address provided on the
              Platform or where available, use opt-out option.
            </span>
          </li>
        </ul>
        <p className="c1 c2 c19">
          <span className="c0"></span>
        </p>
        <ul className="c3 lst-kix_list_1-0">
          <li className="c1 c10 li-bullet-1">
            <span className="c6">Anonymity:</span>
            <span className="c0">
              &nbsp;We will allow you the option of not identifying yourself or
              using a pseudonym, where practicable.
            </span>
          </li>
        </ul>
        <p className="c1 c2">
          <span className="c5"></span>
        </p>
        <p className="c1 c4">
          <span className="c8">
            2.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="c6">Data Security</span>
          <span className="c0">
            : We will use appropriate security measures (organizational and
            technical) to prevent your personal information from being
            accidentally lost, used, damaged, or accessed in an unauthorised or
            unlawful way, altered, or disclosed. Unfortunately, the transmission
            of information via the Internet is not completely secure, and
            despite implementing appropriate security measures, we cannot
            guarantee that the personal information we collect will not be
            shared/disclosed in a way that is inconsistent with this Privacy
            Policy. We cannot guarantee the security of your data transmitted to
            us over the email or through the Platform, and any such transmission
            is at your own risk. Further, where we need to use or share your
            personal information, we will allow access to your personal
            information only to those employees, agents, contractors and other
            third parties who have a legitimate business need to know and are
            subject to a duty of confidentiality.
          </span>
        </p>
        <p className="c1 c4 c2">
          <span className="c0"></span>
        </p>
        <p className="c1 c4">
          <span className="c8">
            2.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="c6">Anonymized Info</span>
          <span className="c0">
            :&nbsp;The Company may also aggregate Anonymized Info, i.e.,
            personal and other data such that the data is no longer capable of
            identifying an individual. We reserve the right to use this
            Anonymized Info for the purposes of improving and enhancing our
            Services, generating insights, and otherwise for the purposes of our
            business. Provided that such aggregated data does not directly or
            indirectly identify you as an individual, this data is not
            considered to be personal information and not covered by this
            Privacy Statement. &nbsp;
          </span>
        </p>
        <p className="c1 c4 c2">
          <span className="c0"></span>
        </p>
        <p className="c1 c4">
          <span className="c8">
            2.4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="c6">Duty:</span>
          <span className="c0">
            &nbsp;It is important that the personal information that we collect
            from you is accurate and current. Please update your personal
            information when such information changes by using the Services
            available on the Platform. If you do not wish for your personal
            information to be used in the ways described within this Policy then
            you should not use the Services, the Platform, functions, or
            features offered by us. You are under no obligation to provide the
            requested personal information. However, if we need information from
            you to offer our Services or meet any of our legal or regulatory
            requirements, failure to provide such information will mean that you
            will not get access to the Services.
          </span>
        </p>
        <p className="c1 c4 c2">
          <span className="c5"></span>
        </p>
        <p className="c1 c4">
          <span className="c8">2.5</span>
          <span className="c6">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Right to disclose
          </span>
          <span className="c8">&nbsp;</span>
          <span className="c6">Personal Information</span>
          <span className="c0">
            : You represent and warrant that when you disclose personal
            information to the us you have the legal right to disclose such data
            to us and such data is true and correct, and when such information
            includes personal information of other natural person, such person
            has been provided with this Privacy Policy and, to the extent
            applicable, have consented to the processing of their data.
          </span>
        </p>
        <p className="c1 c4 c2">
          <span className="c0"></span>
        </p>
        <p className="c1 c4">
          <span className="c8">2.6</span>
          <span className="c6">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Minor
          </span>
          <span className="c8">
            : As provided in our T&amp;C, our Service is not intended for anyone
            under the age of 18 or minor under the law of the country where the
            Services are accessed (&ldquo;
          </span>
          <span className="c6">Minor</span>
          <span className="c0">
            &rdquo;). We do not intend to or knowingly collect any personal
            information related to a Minor. If you believe that personal
            information of any Minor has been collected or provided to us,
            please contact us.
          </span>
        </p>
        <p className="c1 c4 c2">
          <span className="c0"></span>
        </p>
        <p className="c1 c4">
          <span className="c5">
            3. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CONSENT OF USER
          </span>
        </p>
        <p className="c1 c2">
          <span className="c5"></span>
        </p>
        <p className="c1 c4">
          <span className="c8">3.1</span>
          <span className="c6">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consent:{" "}
          </span>
          <span className="c0">
            By accessing our Platform and/or using our Services you agree to
            allow us to collect, hold, use, and disclose your data in accordance
            with this Privacy Policy.
          </span>
        </p>
        <p className="c1 c2">
          <span className="c0"></span>
        </p>
        <p className="c1 c4">
          <span className="c8">
            3.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="c6">Consent for Third Party Disclosure</span>
          <span className="c0">
            : Without prejudice to the above, for the provision of the Services
            and for fulfilling the purposes specified in this Privacy Policy,
            you understand and accept that we may disclose your personal
            information to:
          </span>
        </p>
        <p className="c1 c2 c19">
          <span className="c0"></span>
        </p>
        <ul className="c3 lst-kix_list_1-0">
          <li className="c1 c10 li-bullet-1">
            <span className="c0">
              third party service providers for provision of the Services,
              including data storage, webhosting and server providers, debt
              collectors, professional advisors and payment systems operators,
            </span>
          </li>
          <li className="c1 c10 li-bullet-1">
            <span className="c0">
              our employees, contractors and/or related entities,
            </span>
          </li>
          <li className="c1 c10 li-bullet-2">
            <span className="c0">
              our existing or potential agents or business partners,
            </span>
          </li>
          <li className="c1 c10 li-bullet-1">
            <span className="c0">
              anyone to whom our business or assets are, or may be, transferred,
            </span>
          </li>
          <li className="c1 c10 li-bullet-1">
            <span className="c0">
              credit reporting agencies, courts, tribunals and regulatory
              authorities, in the event you fail to pay for the Services,
            </span>
          </li>
          <li className="c1 c10 li-bullet-1">
            <span className="c0">
              courts, tribunals, regulatory authorities and law enforcement
              officers, as required by Law, or in order to establish, exercise
              or defend our legal rights,
            </span>
          </li>
          <li className="c1 c10 li-bullet-1">
            <span className="c0">
              third parties, including agents or sub-contractors, who assist us
              in providing information, products, services or direct marketing
              to you,
            </span>
          </li>
          <li className="c1 c10 li-bullet-1">
            <span className="c0">
              third parties to collect and process data, such as Google
              Analytics or other relevant businesses,
            </span>
          </li>
          <li className="c1 c10 li-bullet-2">
            <span className="c0">
              operate and maintain the security or integrity of the Services,
              including to prevent or stop an attack on our computer systems or
              networks,
            </span>
          </li>
          <li className="c1 c10 li-bullet-1">
            <span className="c0">
              protect the rights, interests, or property of our or third
              parties,
            </span>
          </li>
          <li className="c1 c10 li-bullet-2">
            <span className="c0">
              prevent or investigate possible wrongdoing in connection with the
              Services, or
            </span>
          </li>
          <li className="c1 c10 li-bullet-1">
            <span className="c8">enforce our&nbsp;</span>
            <span className="c8">
              <a
                className="c24"
                href="https://www.google.com/url?q=https://www.cryptokitties.co/terms-of-use&amp;sa=D&amp;source=editors&amp;ust=1668720024584675&amp;usg=AOvVaw2r6_PmUkenAMXmiwdisKRH"
              >
                &nbsp;T&amp;C.
              </a>
            </span>
          </li>
        </ul>
        <p className="c1 c2 c17">
          <span className="c5"></span>
        </p>
        <p className="c1 c4">
          <span className="c8">
            3.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="c6">Cookies: </span>
          <span className="c8">
            The Company uses cookies to provide necessary website functionality,
            improve your experience and analyze the traffic on the Platform
            (&ldquo;
          </span>
          <span className="c6">Cookies</span>
          <span className="c0">
            &rdquo;). When you browse the Service for the first time, a Cookie
            banner will be displayed requesting you to accept, refuse or
            configure Cookies. You will have the option to accept, refuse and
            delete certain or all Cookies. However, please be informed that the
            refusal of certain Cookies may affect the delivery of the Service
            provided and your navigation of the Platform. We may use the
            following Cookies:
          </span>
        </p>
        <p className="c1 c4 c2">
          <span className="c0"></span>
        </p>
        <ul className="c3 lst-kix_list_1-0">
          <li className="c1 c10 li-bullet-1">
            <span className="c6">Functional Cookies: </span>
            <span className="c0">
              We use functional cookies to recognize you when you return to our
              Platform.
            </span>
          </li>
        </ul>
        <p className="c1 c2 c19">
          <span className="c0"></span>
        </p>
        <ul className="c3 lst-kix_list_1-0">
          <li className="c1 c10 li-bullet-1">
            <span className="c6">Analytics and Performance Cookies.</span>
            <span className="c0">
              &nbsp;We use analytics and performance cookies for website
              analytics purposes to operate, maintain, and improve the Platform
              and the Services. The information gathered by these cookies is
              aggregated and anonymized and does not identify any specific
              individual visitor.
            </span>
          </li>
        </ul>
        <p className="c1 c2 c19">
          <span className="c0"></span>
        </p>
        <ul className="c3 lst-kix_list_1-0">
          <li className="c1 c10 li-bullet-1">
            <span className="c6">Advertising Cookies</span>
            <span className="c0">
              . We may allow third-party advertising partners to use cookies on
              the Platform to collect information about your browsing activities
              over time and across websites.
            </span>
          </li>
        </ul>
        <p className="c1 c2">
          <span className="c5"></span>
        </p>
        <p className="c1 c4">
          <span className="c5">
            4. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DATA RETENTION
            AND TRANSFER
          </span>
        </p>
        <p className="c1 c17 c2">
          <span className="c5"></span>
        </p>
        <p className="c1 c4 c21">
          <span className="c8">
            4.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="c6">Data Retention:</span>
          <span className="c8">
            &nbsp;The Company will retain the Personal Information for a limited
            duration, not exceeding the time required for fulfilment of purposes
            described in this Privacy Policy. Further, we may retain personal
            information for an additional period permitted or required under
            applicable Laws, for legal, tax, or regulatory reasons, or for
            legitimate and lawful business purposes.
          </span>
        </p>
        <p className="c1 c2">
          <span className="c0"></span>
        </p>
        <p className="c1 c4">
          <span className="c8">
            4.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="c6">Data Transfer</span>
          <span className="c0">
            : The personal information collected by us may be stored and
            processed in Panama or in any other country where we or our
            Affiliates or service providers maintain facilities.&nbsp;If we
            decide to transfer your data to other countries, we will take all
            commercially reasonable steps required to ensure that the data is
            stored, processed, and used in according to the provisions of this
            Policy, and the requirements of applicable Law wherever the data is
            located. Further, no transfer of your personal information will take
            place to an organization or a country unless there are adequate
            controls in place including the security of your data and other
            personal information.
          </span>
        </p>
        <p className="c1 c4 c2">
          <span className="c0"></span>
        </p>
        <p className="c1 c17">
          <span className="c5">
            Your consent to this Privacy Policy represents your agreement to the
            above-mentioned transfers.
          </span>
        </p>
        <p className="c1 c2">
          <span className="c0"></span>
        </p>
        <p className="c1 c4">
          <span className="c5">
            5. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LINKS TO OTHER
            SITES AND THIRD-PARTY SERVICE PROVIDER
          </span>
        </p>
        <p className="c1 c4 c2">
          <span className="c5"></span>
        </p>
        <p className="c1 c4">
          <span className="c0">
            5.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Platform may
            contain links to other websites. Those websites are not governed by
            this Privacy Policy. Clicking on those links or enabling those
            connections may allow third parties to collect or share data about
            you. Please read the privacy policy and terms and conditions of such
            websites before using such websites. We have no control over and
            shall not be responsible for the content, privacy policies or
            practices of any third-party sites or services.
          </span>
        </p>
        <p className="c1 c17 c2">
          <span className="c0"></span>
        </p>
        <p className="c1 c4">
          <span className="c8">
            5.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you elect to
            use our{" "}
          </span>
          <span className="c8 c22">
            applications provided via social networks, such as Facebook,
            Twitter, etc.,
          </span>
          <span className="c0">
            &nbsp;our application will be granted access to your social network
            account general information which includes your name and username in
            the social network, profile picture, gender, networks, user ID, list
            of friends, and any other information you have permitted to be
            shared depending on the settings you establish with the entity that
            provides the social sharing feature. For more information, please
            visit the privacy policies of the social network entities that
            provide these features.
          </span>
        </p>
        <p className="c1 c2">
          <span className="c0"></span>
        </p>
        <p className="c1 c4">
          <span className="c5">
            6.
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MISCELLANEOUS
          </span>
        </p>
        <p className="c1 c4 c2">
          <span className="c5"></span>
        </p>
        <p className="c1 c4" id="h.gjdgxs">
          <span className="c8">
            6.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="c5">
            Modification: We reserve the right to update this Privacy Policy at
            any time and at our sole discretion. Any changes to or modifications
            of this Privacy Policy shall be in effect as of the &ldquo;Last
            Updated Date&rdquo; referred to at the top of this page. We will
            notify you of such change prominently either by posting a notice of
            such changes before they take effect, or by sending you a
            notification directly. The amended Privacy Policy is effective once
            we notify you of the change. We encourage you to periodically review
            this Privacy Policy.
          </span>
        </p>
        <p className="c1 c2">
          <span className="c5"></span>
        </p>
        <p className="c1 c4">
          <span className="c8">
            6.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="c6">Contact Details: </span>
          <span className="c8">
            For queries on any aspect of this Privacy Policy or to provide any
            feedback please contact us at the address provided under the
            &ldquo;Contact Us&rdquo; on the Platform.
          </span>
        </p>
        <p className="c1 c17 c2">
          <span className="c5"></span>
        </p>
        <ol className="c3 lst-kix_list_2-1 start" start="3">
          <li className="c1 c28 li-bullet-2">
            <span className="c5">Cookies Update:</span>
            <span className="c0">
              &nbsp;To update your cookie preferences, visit the&nbsp;
            </span>
            <span className="c0 c22">
              &ldquo;Cookie Consent Manager&rdquo;.
            </span>
          </li>
        </ol>
        <p className="c1 c17 c2">
          <span className="c5"></span>
        </p>
        <ol className="c3 lst-kix_list_2-1" start="4">
          <li className="c1 c28 li-bullet-1">
            <span className="c5">Accessibility:</span>
            <span className="c0">
              &nbsp;If you are visually impaired, you may access this notice
              through your browser&rsquo;s audio reader.
            </span>
          </li>
        </ol>
      </div>
    </div>

    //   </div>
    // </div>
  );
}
