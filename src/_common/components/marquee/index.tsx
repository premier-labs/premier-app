import { FC } from "react";

// styles
import Style from "./style";

import Ticker from "react-ticker";
import { usePageVisible } from "@common/hooks/pageVisible";

const Marquee: FC<{
  word: any;
  direction?: "toLeft" | "toRight";
  fontSize?: string;
  speed?: number;
}> = ({ word, direction = "toLeft", fontSize, speed }) => {
  const isPageVisible = usePageVisible();

  return (
    <Style.Root>
      {isPageVisible && (
        <Ticker direction={direction} speed={speed}>
          {({ index }) => (
            <>
              <Style.Sentence fontSize={fontSize}>{word}</Style.Sentence>
            </>
          )}
        </Ticker>
      )}
    </Style.Root>
  );
};

export default Marquee;
