import { FC, Fragment } from "react";

// styles
import Style from "./style";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useTheme } from "@mui/material/styles";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Typos from "@common/components/typography";

const Faq: FC<{
  content: {
    question: any;
    answer: any;
  }[];
}> = ({ content }) => {
  const theme = useTheme();

  return (
    <Style.Root>
      {content.map((item, index) => (
        <Fragment key={index}>
          <Style.Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ paddingLeft: "0px" }}>
              <Typos.Normal
                style={{
                  fontSize: "1.05em",
                  fontFamily: theme.fontFamily.wide,
                  fontWeight: 600,
                  letterSpacing: "-1px",
                  opacity: "0.9",
                }}
              >
                {item.question}
              </Typos.Normal>
            </AccordionSummary>
            <AccordionDetails>
              <Typos.Normal style={{ fontSize: "0.95em" }}>{item.answer}</Typos.Normal>
            </AccordionDetails>
          </Style.Accordion>
          <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.05)" }}></div>
        </Fragment>
      ))}
    </Style.Root>
  );
};

export default Faq;
