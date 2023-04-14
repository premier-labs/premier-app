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
        Refunds Policy
      </Typos.Big>

      <Grid container justifyContent="center" style={{ paddingBottom: "10vh" }}>
        <Grid item xs={11} sm={8}>
          <Typos.Normal>
            We do not accept returns or exchanges unless the item you purchased is defective.
            <br />
            <br />
            If you receive a defective item, please contact us at the phone number or email address
            below and provide details of the product and the defect. We will then advise you how to
            return the product. You will be responsible for the shipping charges associated with the
            return of your item. We are not responsible for any loss or damage that occurs during
            shipping. You must also prepay shipping and insurance (if applicable) for all returns.
            <br />
            <br />
            If your return is eligible for a refund, the refund will not include any shipping and
            handling charges that may appear on the packing slip or invoice. When we receive the
            returned product, we will examine it and notify you by email, within a reasonable time,
            if you are entitled to a refund or exchange due to the defect.
            <br />
            <br />
            If you are entitled to an exchange or refund, we will replace the product or refund the
            purchase price (depending on the original method of payment). Any shipping and handling
            charges you have already paid are non-refundable and refunded amounts will not include
            the cost of shipping. It may take up to 15 business days after receiving our e-mail
            before you see the refund on your statement.
            <br />
            <br />
            1. Return of Unopened Items:
            <br />
            <br />
            We accept returns of new, unopened items. You may return unopened items in their
            original packaging within 30 days of your purchase with a receipt or proof of purchase.
            If 30 days have passed since your purchase, we cannot offer you a refund or exchange.
            <br />
            <br />
            <br />
            2. Exchanges:
            <br />
            <br />
            We will only exchange goods that are defective or damaged. When you consider a product
            to be defective, please contact us within 30 days of your purchase at the phone number
            or email address below and provide details of the product and the defect. We will then
            advise you how to return the product.
            <br />
            <br />
            <br />
            3. Shipping:
            <br />
            <br />
            You will be responsible for the shipping costs associated with the return of your item.
            We are not responsible for any loss or damage that occurs during shipping. You must also
            prepay shipping and insurance (if applicable) for all returns. If your return is
            eligible for a refund, the refund will not include any shipping and handling charges
            that may appear on the packing slip or invoice. To return or exchange the item you
            purchased, please mail it, along with a copy of your receipt and any other information
            regarding your purchase, to the address listed below:
            <br />
            <br />
            PREMIER, 70 avenue de Castelnau, J2, Appartment 758 34090, Montpellier France
            <br />
            <br />
            4. Process:
            <br />
            <br />
            When we receive your item, we will examine it and notify you by email, within a
            reasonable time, if you are entitled to a refund or an exchange. If you are entitled to
            a refund, we will refund the purchase price and a credit will be applied to the original
            payment method. Shipping and handling charges you have already paid are not refundable
            and refunded amounts will not include the cost of shipping. It may take up to 15
            business days after receiving our email before you see the refund on your statement. If
            you are eligible for an exchange, we will send a new item to the original shipping
            address.
          </Typos.Normal>
        </Grid>
      </Grid>
    </Style.Root>
  );
};

export default HomeComponent;
