import { FC } from "react";

// styles
import Style from "./style";

type props = {
  title: string | React.ReactElement;
  secondary?: boolean;
  small?: boolean;
  bgcolor?: string;
};

const Pastille: FC<props> = ({ title, secondary, small, bgcolor }) => {
  return (
    <Style.Root $secondary={secondary} $small={small} bgcolor={bgcolor}>
      {title}
    </Style.Root>
  );
};

export default Pastille;
