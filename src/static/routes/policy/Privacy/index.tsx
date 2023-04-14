import { FC } from "react";

import Style from "./style";

import { useTheme } from "@mui/material/styles";
import Typos from "@common/components/typography";
import { Grid } from "@mui/material";

const HomeComponent: FC = ({}) => {
  const theme = useTheme();

  return (
    <Style.Root>
      <Typos.Big style={{ textAlign: "center", paddingTop: "10vh", paddingBottom: "10vh" }}>
        Privacy Policy
      </Typos.Big>

      <Grid container justifyContent="center" style={{ paddingBottom: "10vh" }}>
        <Grid item xs={11} sm={8}>
          <Typos.Normal>
            1. Collection of Information:
            <br />
            <br />
            We collect information when you register on our site, when you log into your account
            and/or make a purchase. Information collected includes your name, email address, credit
            card and/or phone number. We automatically receive and record information from your
            computer and browser, including your IP address, your hardware, the page you requested
            including your IP address.
            <br />
            <br />
            <br />
            2. Use of Information:
            <br />
            <br />
            Any information we collect from you may be used to: - Improve our site - Customize your
            experience and meet your needs - Improve our customer service - Contact you by e-mail
            <br />
            <br />
            <br />
            3. Online Shopping Privacy:
            <br />
            <br />
            We are the sole owners of the information collected on this site. Your personal
            information will not be sold, transferred, exchanged, or given to any other company
            without your consent, other than what is necessary to fulfill a request and/or
            transacion.
            <br />
            <br />
            <br />
            4. Disclosure to Third Parties:
            <br />
            <br />
            We do not sell, trade or transfer your personally identifiable information to third
            parties. This does not include trusted third parties who assist us in operating our
            website, so long as those parties agree to keep this information confidential.
            <br />
            <br />
            <br />
            5. Protection of Information:
            <br />
            <br />
            We implement a variety of security measures to keep your personal information safe. We
            use state-of-the-art encryption to protect sensitive information transmitted online. We
            also protect your information offline. Only employees who need to perform a specific job
            (e.g., billing, customer service) have access to personally identifiable information.
            The computers and servers used to store personally identifiable information are kept in
            a secure environment.
            <br />
            <br />
            <br />
            6. Unsubscribe:
            <br />
            <br />
            We use the email address you provide to send you information and updates regarding your
            order, occasional company news, product information, etc. If at any time you wish to
            unsubscribe and no longer receive emails, detailed unsubscribe instructions are included
            at the bottom of each email.
            <br />
            <br />
            <br />
            7. Consent:
            <br />
            <br />
            By using our site, you consent to our privacy policy.
          </Typos.Normal>
        </Grid>
      </Grid>
    </Style.Root>
  );
};

export default HomeComponent;
