import { FC } from "react";

// styles
import Style from "./style";

type props = {
  newPage?: boolean;
  isSpan?: boolean;
  onClick?: Function;
  onClick2?: Function;
  address?: string;
  external?: boolean;
  activated?: boolean;
  hoverAnimation?: boolean;
};
const Clickable: FC<props> = ({
  newPage = false,
  children,
  isSpan = false,
  onClick,
  onClick2,
  address = "https://google.com",
  external = false,
  activated = true,
  hoverAnimation = true,
}) => {
  let elem: any;
  if (onClick) {
    elem = activated ? (
      <Style.Root onClick={(e) => (activated ? onClick(e) : () => {})}>{children}</Style.Root>
    ) : (
      <>{children}</>
    );
  } else if (external) {
    elem = activated ? (
      <Style.RootHref target="_blank" href={address}>
        {children}
      </Style.RootHref>
    ) : (
      <>{children}</>
    );
  } else {
    elem = activated ? <Style.RootLink to={address}>{children}</Style.RootLink> : <>{children}</>;
  }

  if (!isSpan) {
    return (
      <Style.RealRoot
        $activated={activated}
        $hoverAnimation={hoverAnimation}
        onClick={(e) => (onClick2 ? onClick2(e) : {})}
      >
        {elem}
      </Style.RealRoot>
    );
  } else {
    return (
      <Style.RealRootSpan
        $activated={activated}
        $hoverAnimation={hoverAnimation}
        onClick={(e) => (onClick2 ? onClick2(e) : {})}
      >
        {elem}
      </Style.RealRootSpan>
    );
  }
};

export default Clickable;
