import React from "react";

import Style from "../styles/privacy.module.css";

const Privacy = () => {
  return (
    <div className={Style.container}>
      <h1 className={Style.title}>NFT Marketplace</h1>
      <div className={Style.container}>
        <h2>GENERAL POLICY</h2>
        <p>
          Last Updated: 11/11/2023
        </p>
        <p>
          Welcome to LOGO! This Privacy Policy outlines how we collect, use,
        disclose, and protect your information on our platform. By accessing or
        using our services, you agree to the terms outlined in this Privacy
        Policy.
        </p>

      <h3>1. Information We Collect:</h3>
      <p>
        <strong>1.1 Personal Information:</strong>
        <br />
          When you register for an account, we may collect your name, email
        address, and other necessary information to create and manage your
        account.
      </p>
      <p>
        <strong>1.2 Transaction Information:</strong>
        <br />
          To facilitate transactions on our platform, we collect information about
        the NFTs you buy or sell, including transaction details, wallet
        addresses, and payment information.
      </p>
      <p>
        <strong>1.3 Usage Information:</strong>
        <br />
          We collect information about how you use our platform, including your
        interactions with NFTs, features, and other users.
      </p>
      <p>
        <strong>1.4 Device and Log Information:</strong>
        <br />
          We may collect information about the device you use to access our
        platform, including IP address, browser type, and device identifiers. We
        also collect log information related to your activities on our platform.
      </p>

      <h3>2. How We Use Your Information:</h3>
      <p>
        <strong>2.1 Providing and Improving Our Services:</strong>
        <br />
          We use your information to provide, personalize, and improve our
        platform, services, and user experience.
      </p>
      <p>
        <strong>2.2 Communication:</strong>
        <br />
          We may use your email address to send you important updates,
        announcements, and marketing communications. You can opt-out of marketing
        communications at any time.
      </p>
      <p>
        <strong>2.3 Security:</strong>
        <br />
          We use your information to enhance the security of our platform, detect
        and prevent fraudulent activities, and protect the integrity of our
        services.
      </p>
      </div>
    </div>
  );
};

export default Privacy;
