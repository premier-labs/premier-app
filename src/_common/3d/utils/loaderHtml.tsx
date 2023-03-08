import { ThemeProvider, useTheme } from "@mui/material/styles";
import { Html } from "@react-three/drei";
import { HtmlProps } from "@react-three/drei/web/Html";

export default function LoaderHtml({ ...props }: HtmlProps & React.RefAttributes<HTMLDivElement>) {
  const theme = useTheme();

  return (
    <Html {...props}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </Html>
  );
}
