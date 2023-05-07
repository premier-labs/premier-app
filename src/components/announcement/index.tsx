import { FC } from "react";
import Style from "./style";
import Typography from "@app/_common/components/typography";

export const AnnouncementComponent: FC = () => {
  return (
    <Style.Root>
      <Typography.Normal style={{ fontSize: "0.75em" }}>
        Now live on <b>Mainnet</b> 🌞
      </Typography.Normal>
    </Style.Root>
  );
};

export default AnnouncementComponent;
