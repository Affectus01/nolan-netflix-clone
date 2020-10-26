import React from "react";
import "../css/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__linksCol">
        <h3>Questions? Call 1-800-123-4567</h3>
        <ul>
          <li>FAQ</li>
          <li>Investor Relations</li>
          <li>Terms of Use</li>
          <li>Contact Use</li>
        </ul>
        <h3>Netflix United States</h3>
      </div>

      <div className="footer__linksCol">
        <ul>
          <li>Help Center</li>
          <li>Jobs</li>
          <li>Privacy</li>
          <li>Speed Test</li>
        </ul>
      </div>

      <div className="footer__linksCol">
        <ul>
          <li>Account</li>
          <li>Gift Cards</li>
          <li>Cookie Preferences</li>
          <li>Netflix Originals</li>
        </ul>
      </div>

      <div className="footer__linksCol">
        <ul>
          <li>Media Center</li>
          <li>Ways to Watch</li>
          <li>Corporate Information</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
