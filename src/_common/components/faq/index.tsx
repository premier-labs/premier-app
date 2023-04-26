import { FC, Fragment } from "react";

// styles
import Style from "./style";

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
          <Style.Accordion defaultExpanded={index === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ paddingLeft: "0px" }}>
              <Typos.Normal
                style={{
                  fontSize: "0.8em",
                  fontWeight: 500,
                }}
              >
                {item.question}
              </Typos.Normal>
            </AccordionSummary>
            <AccordionDetails>
              <Typos.Normal style={{ fontSize: "0.75em", lineHeight: "1.5em", fontWeight: 400 }}>
                {item.answer}
              </Typos.Normal>
            </AccordionDetails>
          </Style.Accordion>
          <div style={{ height: "1px", backgroundColor: theme.colors.secondary }}></div>
        </Fragment>
      ))}
    </Style.Root>
  );
};

export default Faq;
