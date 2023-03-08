import { FC } from "react";

import Style from "./style";

import { useTheme } from "@common/theme";
import Typos from "@common/components/typography";
import { Grid } from "@mui/material";

const HomeComponent: FC = ({}) => {
  const theme = useTheme();

  return (
    <Style.Root>
      <Typos.Big style={{ textAlign: "center", paddingTop: "10vh", paddingBottom: "5vh" }}>
        Returns & Refunds
      </Typos.Big>

      <Grid container justifyContent="center">
        <Grid item xs={11} sm={8}>
          <Typos.Normal>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices, velit non
            elementum venenatis, magna libero viverra purus, a lacinia nisl nulla eget metus. Nullam
            feugiat volutpat mi et faucibus. Suspendisse tristique nunc non orci efficitur
            porttitor. Phasellus pretium rutrum iaculis. Duis faucibus eleifend porttitor. Aliquam
            erat volutpat. Curabitur varius, nunc eget faucibus pulvinar, diam magna rhoncus nisl,
            nec vulputate urna arcu et magna. Nulla a nisi nec sapien sagittis blandit. Donec vitae
            risus vitae tortor dignissim ullamcorper. Ut aliquam neque a est volutpat ultrices.
            Aliquam orci leo, interdum mollis risus eget, hendrerit mattis felis. Nam lobortis
            eleifend nisl vel ultrices. Donec vehicula enim dolor, vitae egestas est tincidunt in.
            Morbi pellentesque libero luctus pharetra lacinia.
          </Typos.Normal>
        </Grid>
      </Grid>
    </Style.Root>
  );
};

export default HomeComponent;
