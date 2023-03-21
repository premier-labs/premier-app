import { FC } from "react";

import { Grid } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

import DiscordIcon from "@common/assets/icons/discord.svg";
import LogoTypo from "@common/assets/images/logo-typo.svg";
import Clickable from "@common/components/clickable";
import Style from "./style";

import { CREDENTIALS, DISCORD_URL, GITHUB_URL, TWITTER_URL } from "@common/constants";

export const Footer: FC = () => {
  return (
    <Style.RootFooter>
      <Grid container rowSpacing={4}>
        <Grid item xs={12} md={4}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Clickable address="/">
                <img alt="" src={LogoTypo} style={{ width: "175px" }} />
              </Clickable>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container>
            {/* <Grid item xs={12} md={4}>
              <Style.ContentCategory>
                <ul>
                  <li>
                    <div style={{ display: "inline-block" }}>
                      <Clickable address="">Docs</Clickable>
                    </div>
                  </li>
                </ul>
              </Style.ContentCategory>
            </Grid> */}

            <Grid item xs={12} md={4}>
              <Style.ContentCategory>
                <ul>
                  {/* <li>
                    <div style={{ display: "inline-block" }}>
                      <Clickable address="">Instagram</Clickable>
                    </div>
                  </li> */}
                  <li>
                    <div style={{ display: "inline-block" }}>
                      <Clickable address={DISCORD_URL}>Discord</Clickable>
                    </div>
                  </li>
                  <li>
                    <div style={{ display: "inline-block" }}>
                      <Clickable address={TWITTER_URL}>Twitter</Clickable>
                    </div>
                  </li>
                </ul>
              </Style.ContentCategory>
            </Grid>
            <Grid item xs={12} md={4}>
              <Style.ContentCategory>
                <ul>
                  <li>
                    <div style={{ display: "inline-block" }}>
                      <Clickable address="/policy/refunds-policy">Refunds Policy</Clickable>
                    </div>
                  </li>
                  <li>
                    <div style={{ display: "inline-block" }}>
                      <Clickable address="/policy/privacy-policy">Privacy Policy</Clickable>
                    </div>
                  </li>
                </ul>
              </Style.ContentCategory>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={0} md={2}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Grid
                container
                sx={{ flexDirection: { sx: "row", md: "row-reverse" } }}
                spacing={1}
                alignContent="center"
              >
                <Grid item>
                  <Clickable address={GITHUB_URL}>
                    <GitHubIcon />
                  </Clickable>
                </Grid>
                <Grid item>
                  <Clickable address={DISCORD_URL}>
                    <Style.ImgIcon2 src={DiscordIcon} alt="" />
                  </Clickable>
                </Grid>
                <Grid item>
                  <Clickable address={TWITTER_URL}>
                    <TwitterIcon />
                  </Clickable>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: { xs: "left", md: "right" } }}>
              <Grid container>
                <Grid item xs={12}>
                  <Style.Credentials>{CREDENTIALS}</Style.Credentials>
                </Grid>
                <Grid item xs={12}>
                  <Style.ExternalLink>{"Terms & Conditions"}</Style.ExternalLink>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Style.RootFooter>
  );
};
