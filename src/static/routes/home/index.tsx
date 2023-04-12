import React, { FC, useEffect } from "react";

import { Divider, Grid } from "@mui/material";

import { ListMockTokens } from "@premier-mock";

import SceneLoader, { sceneRef } from "@common/3d/scenes/skate_0";
import Clickable from "@common/components/clickable";
import Typos from "@common/components/typography";
import { useTheme } from "@common/theme";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Style from "./style";
import Marquee from "@common/components/marquee";
import {
  DeckImg,
  IconDiscord,
  IconEth,
  IconEtherscan,
  IconGithub,
  IconInstagram,
  IconOpenSea,
  PremierLogo,
  PremierMagazineLogo,
  PremierStudioLogo,
} from "@common/assets/images";
import { DISCORD_URL, ETHERSCAN_URL, GITHUB_URL, OPENSEA_URL } from "@common/constants";
import { Box } from "@mui/system";

const DemoPlaceholderList: {
  collectionName: string;
  collectionSymbol: string;
  contract: string;
  item: string;
  img: string;
  color: string;
}[] = [
  {
    collectionName: "Bored Ape Yatch Club",
    collectionSymbol: "BAYC",
    contract: "0xbc4c...f13d",
    item: "#7693",
    img: "https://i.seadn.io/gae/awlHMs7ZVRLxuiJJ84CylogTTmTYRUTt_pPdWI6oED_60LOGSnH5pnQxpceQcQvUQL7uM4BQlPaBJuvn-pq7xkatOuqj2_nc3SCkeKk?auto=format&w=1920",
    color: "#ED2424",
  },
  {
    collectionName: "Cool Cats",
    collectionSymbol: "COOL",
    contract: "0x1a92...050c",
    item: "#8019",
    img: "https://i.seadn.io/gcs/files/0ad7b770889648e0a6f0e208979fb24a.png?auto=format&w=1920",
    color: "#4862DD",
  },
  {
    collectionName: "Doodles",
    collectionSymbol: "Doodles",
    contract: "0x8a90...992e",
    item: "#7504",
    img: "https://i.seadn.io/gcs/files/ac109284965cd2514bceb2874996830b.png?auto=format&w=1920",
    color: "#FDE467",
  },
];

const DemoTextures = ["models/0.texture.png", "models/1.texture.png", "models/2.texture.png"];

const HomeComponent: FC = ({}) => {
  const theme = useTheme();

  const sceneRef = React.useRef<sceneRef>(null!);
  const [currentVersion, setVersion] = React.useState(0);

  const [currentItem, setCurrentItem] = React.useState(0);
  const [currentItem2, setCurrentItem2] = React.useState(0);

  useEffect(() => {
    let rotationInterval = setInterval(() => {
      if (currentItem === DemoPlaceholderList.length - 1) {
        setCurrentItem(0);
        setColor(DemoPlaceholderList[0].color);
        sceneRef.current._changeTexturePlaceholder(DemoPlaceholderList[0].img);
      } else {
        setCurrentItem(currentItem + 1);
        setColor(DemoPlaceholderList[currentItem + 1].color);
        sceneRef.current._changeTexturePlaceholder(DemoPlaceholderList[currentItem + 1].img);
      }
    }, 5000);

    //Clean up can be done like this
    return () => {
      clearInterval(rotationInterval);
    };
  }, [currentItem]); // Add dependencies here

  const placeholderItem = DemoPlaceholderList[currentItem];

  const updateVersion = (version: number) => {
    if (!sceneRef.current) return;
    setVersion(version);
    sceneRef.current.updateVersion(
      0,
      version,
      placeholderItem.collectionSymbol,
      placeholderItem.collectionName + " #" + "123"
    );
  };

  const [color, setColor] = React.useState(placeholderItem.color);
  const [hover, setHover] = React.useState(0);

  const colored = (str: any, fontWeight = 700) => (
    <span style={{ color, fontWeight: fontWeight }}>{str}</span>
  );

  const versions = DemoTextures.map((elem) => {
    return { name: "", texture: elem };
  });

  return (
    <Style.Root>
      <Grid container>
        <Grid item xs={12} style={{ paddingTop: "75px", paddingBottom: "5vh" }}>
          <Typos.Huge style={{ textAlign: "center", fontFamily: "wide" }}>
            Get Your
            <br />
            {colored(placeholderItem.collectionSymbol)}
            <span
              style={{
                marginLeft: "10px",
                fontSize: "12.5px",
                color,
                fontWeight: 600,
                fontFamily: theme.fontFamily.primary,
                letterSpacing: "0.1px",
              }}
            >
              {colored(placeholderItem.item)}
            </span>
            <br />
            On The Wall !
          </Typos.Huge>

          <div style={{ height: "25px" }} />
          <Typos.Normal
            style={{
              textAlign: "center",
              fontFamily: theme.fontFamily.primary,
              fontWeight: 700,
              letterSpacing: "-0.5px",
              color: theme.colors.tertiary,
            }}
          >
            A Brand For The New World.
          </Typos.Normal>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
        style={{ minHeight: `calc(100vh - ${theme.header.height}` }}
      >
        <Grid item xs={12} md={9} lg={8} xl={7} style={{ paddingTop: "10vh" }}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12}>
              <Style.ContainerExempleDrip>
                <Grid container columnSpacing={2} rowSpacing={2} direction="row-reverse">
                  <Grid item xs={12} md={6} lg={7} flexGrow={1}>
                    <Grid container direction="column" style={{ height: "100%" }}>
                      <Grid item flexGrow={1} style={{ paddingTop: "5px", paddingBottom: "25px" }}>
                        <Grid container justifyContent="space-between">
                          <Grid>
                            <Typos.Normal
                              style={{
                                fontSize: "2em",
                                letterSpacing: "-0.025em",
                                fontWeight: 800,
                                color: theme.colors.primary,
                                backgroundColor: color,
                                padding: "5px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                borderRadius: "5px",
                              }}
                            >
                              Drop #0
                            </Typos.Normal>
                          </Grid>
                          <Grid>
                            <Typos.Normal style={{ fontSize: "0.8em", color: "grey" }}>
                              0 / 500 <span style={{ fontSize: "0.9em" }}>(Minted)</span>
                            </Typos.Normal>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ paddingBottom: "10px" }}>
                        <Style.ContainerExempleDripContainer style={{}}>
                          <Style.InfoDivItemName>PLACEHOLDER</Style.InfoDivItemName>
                          <Style.ContainerInfoDiv>
                            <Style.ContainerContract>
                              <span style={{ fontWeight: 500 }}>Collection: </span>
                              {placeholderItem.collectionName}
                            </Style.ContainerContract>
                            <div style={{ height: "5px" }} />

                            <Style.ContainerContract>
                              <span style={{ fontWeight: 500 }}>Contract: </span>{" "}
                              {placeholderItem.contract}
                            </Style.ContainerContract>
                            <div style={{ height: "5px" }} />

                            <Style.ContainerContract>
                              <span style={{ fontWeight: 500 }}>Item: </span>
                              {placeholderItem.collectionSymbol} {placeholderItem.item}
                            </Style.ContainerContract>
                            <div style={{ height: "5px" }} />

                            <Style.ContainerContract>
                              <span style={{ fontWeight: 500 }}>Owner: </span>
                              {" You "}
                            </Style.ContainerContract>
                          </Style.ContainerInfoDiv>
                        </Style.ContainerExempleDripContainer>
                      </Grid>

                      <Grid item style={{ paddingBottom: "10px" }}>
                        <Style.ContainerExempleDripContainer>
                          <Style.InfoDivItemName>DECK</Style.InfoDivItemName>
                          <Style.GalleryWrap2>
                            {DemoTextures.map((item, index) => (
                              <Style.GalleryItem
                                key={index}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(currentVersion)}
                                onClick={() => updateVersion(index)}
                                $onHover={hover === index}
                                color={item}
                                style={{
                                  height: "50px",
                                  borderRadius: "5px",
                                }}
                              ></Style.GalleryItem>
                            ))}
                          </Style.GalleryWrap2>
                        </Style.ContainerExempleDripContainer>
                      </Grid>

                      <Grid item>
                        <Grid container columnSpacing={2} style={{ height: "100%" }}>
                          <Grid
                            item
                            flexGrow={1}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Clickable address="/app/drop/0">
                              <Style.ButtonDiscover>Mint Now !</Style.ButtonDiscover>
                            </Clickable>
                          </Grid>

                          <Grid item>
                            <Grid
                              container
                              justifyContent="space-evenly"
                              alignItems="center"
                              style={{ height: "100%" }}
                            >
                              <Grid item>
                                <Style.Price>0.5</Style.Price>
                              </Grid>
                              <Grid item>
                                <IconEth style={{ height: "20px" }} />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={5}>
                    <img
                      src={placeholderItem.img}
                      style={{ width: "100%", height: "100%", borderRadius: "25px" }}
                      alt=""
                    />
                  </Grid>
                </Grid>
              </Style.ContainerExempleDrip>
            </Grid>

            <Grid item xs={12}>
              <Typos.NormalBig
                style={{
                  textAlign: "center",
                }}
              >
                We collaborate hand to hand with artists and luxury companies to create{" "}
                {colored("unique")}, {colored("high-end")} and {colored("exclusive")} usable assets
                from your digital possessions.
              </Typos.NormalBig>
            </Grid>

            <Grid item xs={12} />

            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={1.5}>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" spacing={1}>
                    <Grid item>
                      <Typos.Normal style={{ color: theme.colors.tertiary, fontSize: "0.95em" }}>
                        Discover More
                      </Typos.Normal>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container justifyContent="center" spacing={1}>
                    <Grid item>
                      <Clickable address={ETHERSCAN_URL}>
                        <IconEtherscan
                          style={{
                            color: theme.colors.tertiary,
                            width: "35px",
                            height: "35px",
                          }}
                        />
                      </Clickable>
                    </Grid>
                    <Grid item>
                      <Clickable address={ETHERSCAN_URL}>
                        <IconInstagram
                          style={{
                            color: theme.colors.tertiary,
                            width: "35px",
                            height: "35px",
                          }}
                        />
                      </Clickable>
                    </Grid>
                    <Grid item>
                      <Clickable address={GITHUB_URL}>
                        <IconGithub
                          style={{
                            color: theme.colors.tertiary,
                            width: "35px",
                            height: "35px",
                          }}
                        />
                      </Clickable>
                    </Grid>
                    <Grid item>
                      <Clickable address={OPENSEA_URL}>
                        <IconOpenSea
                          style={{
                            color: theme.colors.tertiary,
                            width: "35px",
                            height: "35px",
                          }}
                        />
                      </Clickable>
                    </Grid>
                    <Grid item>
                      <Clickable address={DISCORD_URL}>
                        <IconDiscord
                          style={{ color: theme.colors.tertiary, width: "35px", height: "35px" }}
                        />
                      </Clickable>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={0} xl={1} />

        <Grid
          item
          xs={12}
          md={3}
          lg={4}
          xl={4}
          style={{
            position: "relative",
          }}
          sx={{ paddingTop: { xs: "5vh", md: "0px" } }}
        >
          <div
            style={{
              position: "absolute",
              WebkitMaskImage: `-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,0.25)), to(rgba(0,0,0,0.001)))`,
              borderRadius: "200px",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <Typos.NormalBold
              style={{
                fontFamily: "wide",
              }}
            >
              Premier is a brand that specialize itself into the creation of Drip. A Drip is a new
              form of NFT that combines both an NFT and a usable asset. This usable asset takes a
              physical form in the real world and a digital form in the metaverse. Premier is a
              brand that specialize itself into the creation of Drip. A Drip is a new form of NFT
              that combines both an NFT and a usable asset. This usable asset takes a physical form
              in the real world and a digital form in the metaverse. Premier is a brand that
              specialize itself into the creation of Drip. A Drip is a new form of NFT that combines
              both an NFT and a usable asset. This usable asset takes a physical form in the real
              world and a digital form in the metaverse. Premier is a brand that specialize itself
              into the creation of Drip. A Drip is a new form of NFT that combines both an NFT and a
              usable asset. This usable asset takes a physical form in the real world and a digital
              form in the metaverse. Premier is a brand that specialize itself into the creation of
              Drip. A Drip is a new form of NFT that combines both an NFT and a usable asset. This
              usable asset takes a physical form in the real world and a digital form in the
              metaverse. Premier is a brand that specialize itself into the creation of Drip. A Drip
              is a new form of NFT that combines both an NFT and a usable asset. This usable asset
              takes a physical form in the real world and a digital form in the metaverse. Premier
              is a brand that specialize itself into the creation of Drip. A Drip is a new form of
              NFT that combines both an NFT and a usable asset. This usable asset takes a physical
              form in the real world and a digital form in the metaverse. Premier is a brand that
              specialize itself into the creation of Drip. A Drip is a new form of NFT that combines
              both an NFT and a usable asset. This usable asset takes a physical form in the real
              world and a digital form in the metaverse. Premier is a brand that specialize itself
              into the creation of Drip. A Drip is a new form of NFT that combines both an NFT and a
              usable asset. This usable asset takes a physical form in the real world and a digital
              form in the metaverse. Premier is a brand that specialize itself into the creation of
              Drip. A Drip is a new form of NFT that combines both an NFT and a usable asset. This
              usable asset takes a physical form in the real world and a digital form in the
              metaverse. Premier is a brand that specialize itself into the creation of Drip. A Drip
              is a new form of NFT that combines both an NFT and a usable asset. This usable asset
              takes a physical form in the real world and a digital form in the metaverse. Premier
              is a brand that specialize itself into the creation of Drip. A Drip is a new form of
              NFT that combines both an NFT and a usable asset. This usable asset takes a physical
              form in the real world and a digital form in the metaverse.
            </Typos.NormalBold>
          </div>

          <div
            style={{
              height: `calc(100vh)`,
            }}
          >
            <SceneLoader
              sceneRef={sceneRef}
              model="models/model.glb"
              initialVersion={0}
              initialId={0}
              initialPlaceholderTexture={DemoPlaceholderList[0].img}
              versions={versions}
              initialDropSymbol="random"
              initialTokenNameId="random"
            />
          </div>
        </Grid>
      </Grid>

      <div
        style={{
          height: "1px",
          marginTop: "10vh",
          marginBottom: "10vh",
          backgroundColor: "rgba(0,0,0,0.12)",
        }}
      />

      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Typos.Big
            style={{
              fontFamily: "wide",
            }}
          >
            DISCOVER <span style={{ color }}>DRIP</span>
          </Typos.Big>

          <div style={{ height: "15px" }} />
          <Typos.Normal
            style={{
              fontFamily: theme.fontFamily.primary,
              fontWeight: 700,
              marginBottom: "5vh",
              color: theme.colors.tertiary,
            }}
          >
            Between Real-World & Metaverse.
          </Typos.Normal>

          <Grid container direction="row" spacing={0}>
            <Grid item xs={12} style={{ marginBottom: "7.5vh" }}>
              <Grid item xs={12}>
                <Typos.NormalBig>
                  A Drip is a new form of NFT that combines an NFT with a {colored("unique")},{" "}
                  {colored("high-end")} and {colored("exclusive")} usable asset. This asset takes a
                  physical form in the real world and a digital form in the metaverse.
                </Typos.NormalBig>
              </Grid>
            </Grid>

            <Grid item xs={12} lg={8} style={{}}>
              <Grid
                container
                style={{
                  backgroundColor: theme.colors.primary,
                  padding: "25px",
                  borderRadius: "25px",
                }}
              >
                <Grid item xs={4} sx={{ display: { xs: "none", sm: "block" } }}>
                  <Grid container direction="row" style={{ height: "100%" }}>
                    <Grid item xs={12}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "25px",
                          backgroundImage: `url(${DemoTextures[currentVersion]})`,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={0.5} sx={{ display: { xs: "none", sm: "block" } }} />
                <Grid item xs={12} sm={7.5}>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid>
                      <Typos.NormalBold style={{ fontFamily: theme.fontFamily.wide }}>
                        MINT
                      </Typos.NormalBold>
                    </Grid>
                    <Grid>
                      <Typos.Normal
                        style={{ color: theme.colors.tertiary, fontWeight: 700, fontSize: "0.9em" }}
                      >
                        STEP 1
                      </Typos.Normal>
                    </Grid>
                  </Grid>
                  <Typos.Normal
                    style={{
                      paddingTop: "25px",
                    }}
                  >
                    The first step is to {colored("mint")} a Drip.
                    <br />
                    <br />
                    While doing so one might be able to pre-customize it accordingly to the{" "}
                    {colored("parameters")} it may have.
                    <br />
                    <br />
                    Drips have two states: {colored("Default")} and {colored("Mutated")}.
                  </Typos.Normal>
                </Grid>
              </Grid>
              <div style={{ height: "25px" }} />

              <Grid
                container
                style={{
                  backgroundColor: theme.colors.primary,
                  padding: "25px",
                  borderRadius: "25px",
                }}
              >
                <Grid item xs={4} sx={{ display: { xs: "none", sm: "block" } }}>
                  <img
                    src={placeholderItem.img}
                    alt=""
                    style={{ width: "100%", borderRadius: "25px" }}
                  />
                </Grid>
                <Grid item xs={0.5} />
                <Grid item xs={12} sm={7.5} style={{}}>
                  <Grid container justifyContent="space-between">
                    <Grid>
                      <Typos.NormalBold style={{ fontFamily: theme.fontFamily.wide }}>
                        MUTATE
                      </Typos.NormalBold>
                    </Grid>
                    <Grid>
                      <Typos.Normal
                        style={{
                          color: theme.colors.tertiary,
                          fontWeight: 700,
                          fontSize: "0.9em",
                        }}
                      >
                        STEP 2
                      </Typos.Normal>
                    </Grid>
                  </Grid>
                  <Typos.Normal style={{ paddingTop: "25px" }}>
                    Mutating is the fact of {colored("combining")} a Drip with an NFT.
                    <br />
                    <br />
                    The {colored("mutation")} process is straightforward and the only thing one has
                    to do is to have in their {colored("wallet")} the NFT mutating their Drip.
                    <br />
                    <br />
                    Once a Drip has been mutated, its state become {colored("Mutated")} and it is{" "}
                    {colored("irreversible")}.
                  </Typos.Normal>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4} sx={{ display: { xs: "none", lg: "block" } }}>
              <SceneLoader
                sceneRef={sceneRef}
                model="models/model.glb"
                initialVersion={0}
                initialId={0}
                initialPlaceholderTexture={DemoPlaceholderList[0].img}
                versions={versions}
                initialDropSymbol="random"
                initialTokenNameId="random"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box
        style={{
          height: "1px",
          marginTop: "10vh",
          marginBottom: "10vh",
          backgroundColor: "rgba(0,0,0,0.12)",
        }}
      />

      <Grid item xs={12}>
        <Typos.Huge
          style={{ fontFamily: "wide", lineHeight: "1.25em", textTransform: "uppercase" }}
        >
          Drips are {colored("redeemable")} in the real-world as {colored("physical assets")} & and{" "}
          {colored("usable")} in the metaverse as {colored("3D assets")}.
        </Typos.Huge>
      </Grid>

      <Box
        sx={{ display: { xs: "none", sm: "block" } }}
        style={{
          height: "1px",
          marginTop: "10vh",
          marginBottom: "10vh",
          backgroundColor: "rgba(0,0,0,0.12)",
        }}
      />

      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Grid
          container
          style={{
            backgroundImage:
              "url(https://cdn.discordapp.com/attachments/976997370132848640/1095363156538294382/nobody0000_living_room_with_a_window_overlooking_the_beach_and__600968ba-dd08-494f-a197-52eb65f1ee2e.png)",
            filter: "grayscale(40%)",
            fontFamily: "wide",
            fontWeight: 900,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          <Grid sm={5} xl={4}>
            <Typos.Big style={{ fontFamily: "wide" }}>PREMIER</Typos.Big>
            <Typos.Big style={{ fontFamily: "wide" }}>PREMIER</Typos.Big>
            <Typos.Big style={{ fontFamily: "wide" }}>PREMIER</Typos.Big>
            <Typos.Big style={{ fontFamily: "wide" }}>PREMIER</Typos.Big>
            <Typos.Big style={{ fontFamily: "wide" }}>PREMIER</Typos.Big>
            <Typos.Big style={{ fontFamily: "wide" }}>PREMIER</Typos.Big>
            <Typos.Big style={{ fontFamily: "wide" }}>PREMIER</Typos.Big>
            <Typos.Big style={{ fontFamily: "wide" }}>PREMIER</Typos.Big>
            <Typos.Big style={{ fontFamily: "wide" }}>PREMIER</Typos.Big>
            <Typos.Big style={{ fontFamily: "wide" }}>PREMIER</Typos.Big>
            <Typos.Big style={{ fontFamily: "wide" }}>PREMIER</Typos.Big>
            <Typos.Big style={{ fontFamily: "wide" }}>PREMIER</Typos.Big>
          </Grid>
          <Grid
            item
            sm={7}
            xl={8}
            style={{
              borderRadius: "5px",
              backgroundPosition: "60%",
              backgroundImage:
                "url(https://cdn.discordapp.com/attachments/976997370132848640/1095363156538294382/nobody0000_living_room_with_a_window_overlooking_the_beach_and__600968ba-dd08-494f-a197-52eb65f1ee2e.png)",
            }}
          ></Grid>
        </Grid>
      </Box>

      <div
        style={{
          height: "1px",
          marginTop: "10vh",
          marginBottom: "10vh",
          backgroundColor: "rgba(0,0,0,0.12)",
        }}
      />

      <Grid container>
        <Grid item xs={12}>
          <Typos.Big
            style={{
              fontFamily: "wide",
              marginBottom: "5vh",
            }}
          >
            ROADMAP
          </Typos.Big>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ padding: { xs: "25px", md: "35px" } }}
          style={{
            backgroundColor: theme.colors.black,
            borderRadius: "25px",
            color: theme.colors.secondary,
            paddingTop: "5vh",
            paddingBottom: "5vh",
          }}
        >
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typos.NormalBig style={{ fontFamily: "wide" }}>
                        🚀 Mainnet {colored("Launch")}
                      </Typos.NormalBig>
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Grid
                          item
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                        >
                          <Typos.Normal
                            style={{
                              fontFamily: theme.fontFamily.wide,
                              fontWeight: 600,
                            }}
                          >
                            Q2 2023 -
                          </Typos.Normal>
                        </Grid>
                        <Grid item>
                          <Typos.Normal
                            style={{
                              fontFamily: theme.fontFamily.wide,
                              fontWeight: 600,
                              backgroundColor: theme.colors.primary,
                              color: theme.colors.black,
                              padding: "5px",
                              borderRadius: "2.5px",
                              fontSize: "0.75em",
                            }}
                          >
                            DROP #0
                          </Typos.Normal>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10}>
                  <Typos.Normal style={{ padding: "5px", paddingTop: "20px" }}>-</Typos.Normal>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typos.NormalBig style={{ fontFamily: "wide" }}>
                        📦 Assets {colored("Delivery")}
                      </Typos.NormalBig>
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Grid
                          item
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                        >
                          <Typos.Normal
                            style={{
                              fontFamily: theme.fontFamily.wide,
                              fontWeight: 600,
                            }}
                          >
                            TBA -
                          </Typos.Normal>
                        </Grid>
                        <Grid item>
                          <Typos.Normal
                            style={{
                              fontFamily: theme.fontFamily.wide,
                              fontWeight: 600,
                              backgroundColor: theme.colors.primary,
                              color: theme.colors.black,
                              padding: "5px",
                              borderRadius: "2.5px",
                              fontSize: "0.75em",
                            }}
                          >
                            DROP #0
                          </Typos.Normal>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10}>
                  <Typos.Normal style={{ padding: "5px", paddingTop: "20px" }}>-</Typos.Normal>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typos.NormalBig style={{ fontFamily: "wide" }}>
                        🌐 3D Assets {colored("Delivery")}
                      </Typos.NormalBig>
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Grid
                          item
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                        >
                          <Typos.Normal
                            style={{
                              fontFamily: theme.fontFamily.wide,
                              fontWeight: 600,
                            }}
                          >
                            TBA -
                          </Typos.Normal>
                        </Grid>
                        <Grid item>
                          <Typos.Normal
                            style={{
                              fontFamily: theme.fontFamily.wide,
                              fontWeight: 600,
                              backgroundColor: theme.colors.primary,
                              color: theme.colors.black,
                              padding: "5px",
                              borderRadius: "2.5px",
                              fontSize: "0.75em",
                            }}
                          >
                            DROP #0
                          </Typos.Normal>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10}>
                  <Typos.Normal style={{ padding: "5px", paddingTop: "20px" }}>-</Typos.Normal>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div
        style={{
          height: "1px",
          marginTop: "10vh",
          marginBottom: "10vh",
          backgroundColor: "rgba(0,0,0,0.12)",
        }}
      />

      <Grid container>
        <Grid item xs={12}>
          <Typos.Big
            style={{
              fontFamily: "wide",
              marginBottom: "5vh",
            }}
          >
            FAQ
          </Typos.Big>
        </Grid>
        <Grid item xs={12}>
          <Style.Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typos.Normal
                style={{
                  fontFamily: theme.fontFamily.wide,
                  fontWeight: 600,
                  letterSpacing: "-1px",
                  opacity: "0.85",
                }}
              >
                How can I buy a DRIP ?
              </Typos.Normal>
            </AccordionSummary>
            <AccordionDetails>
              <Typos.Normal>-</Typos.Normal>
            </AccordionDetails>
          </Style.Accordion>
          <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.05)" }}></div>
          {/*  */}
          <Style.Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typos.Normal
                style={{
                  fontFamily: theme.fontFamily.wide,
                  fontWeight: 600,
                  letterSpacing: "-1px",
                  opacity: "0.85",
                }}
              >
                Where is the DRIP I just bought ?
              </Typos.Normal>
            </AccordionSummary>
            <AccordionDetails>
              <Typos.Normal>-</Typos.Normal>
            </AccordionDetails>
          </Style.Accordion>
          <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.05)" }}></div>
          {/*  */}
          <Style.Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typos.Normal
                style={{
                  fontFamily: theme.fontFamily.wide,
                  fontWeight: 600,
                  letterSpacing: "-1px",
                  opacity: "0.85",
                }}
              >
                When will I receive my DRIP at home ?
              </Typos.Normal>
            </AccordionSummary>
            <AccordionDetails>
              <Typos.Normal>-</Typos.Normal>
            </AccordionDetails>
          </Style.Accordion>
          <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.05)" }}></div>
          {/*  */}
          <Style.Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typos.Normal
                style={{
                  fontFamily: theme.fontFamily.wide,
                  fontWeight: 600,
                  letterSpacing: "-1px",
                  opacity: "0.85",
                }}
              >
                Can I use my DRIP in video games ?
              </Typos.Normal>
            </AccordionSummary>
            <AccordionDetails>
              <Typos.Normal>-</Typos.Normal>
            </AccordionDetails>
          </Style.Accordion>
          <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.05)" }}></div>
          {/*  */}
          <Style.Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typos.Normal
                style={{
                  fontFamily: theme.fontFamily.wide,
                  fontWeight: 600,
                  letterSpacing: "-1px",
                  opacity: "0.85",
                }}
              >
                I want to sell my DRIP what can I do ?
              </Typos.Normal>
            </AccordionSummary>
            <AccordionDetails>
              <Typos.Normal>-</Typos.Normal>
            </AccordionDetails>
          </Style.Accordion>
          <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.05)" }}></div>
          {/*  */}
          <Style.Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typos.Normal
                style={{
                  fontFamily: theme.fontFamily.wide,
                  fontWeight: 600,
                  letterSpacing: "-1px",
                  opacity: "0.85",
                }}
              >
                I'm a brand and I want to be featured on your items
              </Typos.Normal>
            </AccordionSummary>
            <AccordionDetails>
              <Typos.Normal>-</Typos.Normal>
            </AccordionDetails>
          </Style.Accordion>
        </Grid>
      </Grid>

      <div
        style={{
          height: "1px",
          marginTop: "10vh",
          marginBottom: "10vh",
          backgroundColor: "rgba(0,0,0,0.12)",
        }}
      />

      <Grid container>
        <Grid item xs={12}>
          <Typos.Big
            style={{
              fontFamily: "wide",
              marginBottom: "5vh",
            }}
          >
            EXPLORE
          </Typos.Big>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            style={{
              marginBottom: "5vh",
            }}
          >
            <Grid item xs={12}>
              <Typos.Normal
                style={{
                  fontFamily: theme.fontFamily.primary,
                  color: "grey",
                  lineHeight: "1.5em",
                  fontWeight: 500,
                }}
              >
                We are all about creating a world that is not only technologically advanced, but
                also socially conscious. We are firm believers that by integrating cutting-edge
                technology with the world's resources, we can not only improve the lives of
                individuals but also contribute to the greater good. We are committed to working
                tirelessly to ensure that we leave a positive impact on the world.
              </Typos.Normal>
            </Grid>
          </Grid>

          <Grid container justifyContent="center">
            <Grid item xs={12} md={10} xl={8}>
              <Grid container columnSpacing={8} justifyContent="center">
                <Grid item xs={6} md={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <PremierMagazineLogo />
                    </Grid>
                    <Grid item xs={12}>
                      <Typos.Normal
                        style={{ color: "grey", fontSize: "0.75em", textAlign: "center" }}
                      >
                        Our magazine about fashion, streetwear and technology.
                      </Typos.Normal>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justifyContent="center">
                        <Grid item xs={6}>
                          <Grid container justifyContent="center">
                            <Grid>
                              <IconInstagram
                                style={{ width: "25px", height: "25px", color: "black" }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div
        style={{
          height: "1px",
          paddingTop: "5vh",
          paddingBottom: "5vh",
        }}
      />
    </Style.Root>
  );
};

export default HomeComponent;
