import React, { FC, useEffect } from "react";

import { Grid } from "@mui/material";

import { ListMockTokens } from "@premier-labs/mock";

import SceneLoader, { sceneRef } from "@common/3d/scenes/skate_0";
import Clickable from "@common/components/clickable";
import Typos from "@common/components/typography";
import { useTheme } from "@common/theme";

import Style from "./style";

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
    item: "BAYC #7693",
    img: "https://i.seadn.io/gae/awlHMs7ZVRLxuiJJ84CylogTTmTYRUTt_pPdWI6oED_60LOGSnH5pnQxpceQcQvUQL7uM4BQlPaBJuvn-pq7xkatOuqj2_nc3SCkeKk?auto=format&w=1920",
    color: "#ED2424",
  },
  {
    collectionName: "Doodles",
    collectionSymbol: "Doodles",
    contract: "0x8a90...992e",
    item: "Doodles #3686",
    img: "https://i.seadn.io/gcs/files/a5c0e8e7603a1db5ad1ab6d0380a2c22.png?auto=format&w=1920",
    color: "#98E2FF",
  },
  {
    collectionName: "Bored Ape Yatch Club",
    collectionSymbol: "BAYC",
    contract: "0xbc4c...f13d",
    item: "BAYC #6268",
    img: "models/placeholder.png",
    color: "#EDDE10",
  },
  {
    collectionName: "Cool Cats",
    collectionSymbol: "COOL",
    contract: "0x1a92...050c",
    item: "COOL #8019",
    img: "https://i.seadn.io/gcs/files/0ad7b770889648e0a6f0e208979fb24a.png?auto=format&w=1920",
    color: "#4862DD",
  },
  {
    collectionName: "Bored Ape Yatch Club",
    collectionSymbol: "BAYC",
    contract: "0xbc4c...f13d",
    item: "BAYC #8663",
    img: ListMockTokens.BoredApe.tokens[8663],
    color: "#6DB3CF",
  },
  {
    collectionName: "Moonbirds",
    collectionSymbol: "MOONBIRD",
    contract: "0x2358...a68b",
    item: "MOONB #2165",
    img: "https://i.seadn.io/gcs/files/a2015c72807bea9147d81be6150ed310.png?auto=format&w=1920",
    color: "#BA8CFA",
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

  const colored = (str: any) => <span style={{ color, fontWeight: 700 }}>{str}</span>;

  const versions = DemoTextures.map((elem) => {
    return { name: "", texture: elem };
  });

  return (
    <Style.Root>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12} md={9} lg={8} xl={7}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            rowSpacing={5}
            sx={{ height: { lg: "90%" }, marginTop: { xs: "25px", lg: "0px" } }}
          >
            <Grid item>
              <Typos.Big>
                Get Your
                <br />
                <b style={{ fontWeight: 700, color: color }}>${placeholderItem.item}</b> <br />
                On The wall !
              </Typos.Big>
            </Grid>

            <Grid item>
              <Style.ContainerExempleDrip>
                <Grid container columnSpacing={2} rowSpacing={2} direction="row-reverse">
                  <Grid item xs={12} md={7} flexGrow={1}>
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
                              {placeholderItem.item}
                            </Style.ContainerContract>
                          </Style.ContainerInfoDiv>
                        </Style.ContainerExempleDripContainer>
                      </Grid>

                      <Grid item style={{ paddingBottom: "10px" }}>
                        <Style.ContainerExempleDripContainer>
                          <Style.InfoDivItemName>DECK</Style.InfoDivItemName>
                          <Style.GalleryWrap2>
                            <Style.GalleryItem
                              $onHover={false}
                              color={versions[currentVersion].texture}
                              style={{
                                height: "50px",
                                borderRadius: "5px",
                              }}
                            />
                          </Style.GalleryWrap2>
                        </Style.ContainerExempleDripContainer>
                      </Grid>

                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item flexGrow={1}>
                            <Clickable address="/app/drop/0">
                              <Style.ButtonDiscover>Mint Now !</Style.ButtonDiscover>
                            </Clickable>
                          </Grid>

                          <Grid item style={{ display: "flex", alignItems: "center" }}>
                            <Style.Price>0.5 ETH</Style.Price>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <img
                      src={placeholderItem.img}
                      style={{ width: "100%", height: "100%", borderRadius: "25px" }}
                      alt=""
                    />
                  </Grid>
                </Grid>
              </Style.ContainerExempleDrip>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          lg={4}
          xl={5}
          style={{ height: `calc(100vh - ${theme.header.height}` }}
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
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            paddingTop: "50px",
            paddingBottom: "50px",
          }}
        >
          <Typos.NormalBig style={{ fontWeight: 700, textAlign: "center" }}>
            We collaborate hand to hand with artists and luxury companies to create{" "}
            <span style={{ color: color }}>custom-made</span>,{" "}
            <span style={{ color: color }}>unique</span>,{" "}
            <span style={{ color: color }}>high end</span> and{" "}
            <span style={{ color: color }}>exlusive</span> physical objects from your digital
            possessions.
          </Typos.NormalBig>
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            backgroundColor: theme.colors.secondary,
            padding: "25px",
            marginTop: "5vh",
            marginBottom: "5vh",
            borderRadius: "5px",
          }}
        >
          <Typos.Huge
            style={{
              marginTop: "7.5vh",
              marginBottom: "7.5vh",
              textAlign: "center",
            }}
          >
            Discover Drip
          </Typos.Huge>

          <Grid container direction="row" spacing={0}>
            <Grid xs={12} style={{ marginBottom: "5vh" }}>
              <Grid container justifyContent="center">
                <Grid xs={12} md={8}>
                  <Typos.Big
                    style={{
                      textAlign: "center",
                      padding: "15px",
                      borderRadius: "5px",
                    }}
                  >
                    A Drip is a <span style={{ color: color }}>custom-made</span> NFT backed by a{" "}
                    <span style={{ color: color }}>unique</span>,{" "}
                    <span style={{ color: color }}>high end</span> and{" "}
                    <span style={{ color: color }}>exlusive</span> physical object.
                  </Typos.Big>
                </Grid>
              </Grid>
            </Grid>

            <Grid xs={12} lg={7.5} style={{}}>
              <Grid
                container
                style={{
                  backgroundColor: theme.colors.primary,
                  padding: "25px",
                  borderRadius: "25px",
                }}
              >
                <Grid item xs={12} sm={6}>
                  <Typos.Big style={{ fontFamily: "futura" }}>Mint</Typos.Big>
                  <Typos.Normal style={{ paddingTop: "25px" }}>
                    The first step is to {colored("mint your Drip")}.
                    <br />
                    <br />
                    Upon minting you will be able to modify your Drip accordingly to your liking and
                    depending on the amount of different changeable {colored("parameters")} the Drip
                    will have.
                    <br />
                    <br />
                    For this first Drop you will only be able to modify the{" "}
                    {colored("texture and color")} of the skateboard deck.
                    <br />
                    <br />
                    When minting your Drip, you can either{" "}
                    {colored("mutate it directly, or do it later")}.
                  </Typos.Normal>
                </Grid>
                <Grid item xs={1} sx={{ display: { xs: "none", sm: "block" } }} />
                <Grid item xs={5} sx={{ display: { xs: "none", sm: "block" } }}>
                  <Grid container direction="row" spacing={1} style={{ height: "100%" }}>
                    <Grid item xs={9}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "25px",
                          backgroundImage: `url(${DemoTextures[currentVersion]})`,
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Style.GalleryWrap>
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
                              borderRadius: "25px",
                            }}
                          />
                        ))}
                      </Style.GalleryWrap>
                    </Grid>
                  </Grid>
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
                <Grid item xs={5} sx={{ display: { xs: "none", sm: "block" } }}>
                  <img
                    src={placeholderItem.img}
                    alt=""
                    style={{ width: "100%", borderRadius: "25px" }}
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={12} sm={6} style={{}}>
                  <Typos.Big style={{ fontFamily: "futura" }}>Mutate</Typos.Big>
                  <Typos.Normal style={{ paddingTop: "25px" }}>
                    A Drip can either be in two states: {colored("Default and Mutated")}.
                    <br />
                    <br />
                    Upon minting a Drip is not mutated, it is in a {colored("Default state")}. It
                    means that the Drip {colored("can still be mutated")}.
                    <br />
                    <br />
                    Mutating is the fact of {colored('"stamping"')} your Drip with an NFT. Once a
                    Drip has been mutated, it is {colored("irreversible")}.
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
                <Grid item xs={12} sm={6}>
                  <Typos.Big style={{ fontFamily: "futura" }}>Redeem</Typos.Big>
                  <Typos.Normal style={{ paddingTop: "25px" }}>
                    Once in a Mutated state a Drip become {colored("redeemable")}.
                    <br />
                    <br />
                    However, there will be a {colored("cooldown period")} from the opening of a mint
                    to the opening of redeem requests.
                    <br />
                    <br />
                    On top of that, the time it will take to arrive will depends on both the object
                    and your location.
                    <br />
                    <br />
                    Rest assured that {colored("we will try our best")} to deliver your Drip as fast
                    as possible and in the best conditions.
                  </Typos.Normal>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5} sx={{ display: { xs: "none", sm: "block" } }}>
                  <img
                    src="./delivery.png"
                    alt=""
                    style={{ width: "100%", borderRadius: "25px", transform: "" }}
                  />
                </Grid>
              </Grid>
              <div style={{ height: "25px" }} />
            </Grid>

            <Grid xs={4} sx={{ display: { xs: "none", lg: "block" } }}>
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

        <Grid
          item
          xs={12}
          style={{
            backgroundColor: theme.colors.secondary,
            padding: "25px",
            marginTop: "5vh",
            marginBottom: "5vh",
            borderRadius: "5px",
          }}
        >
          <Typos.Huge
            style={{
              marginTop: "7.5vh",
              marginBottom: "10vh",
              textAlign: "center",
            }}
          >
            Royalties
          </Typos.Huge>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={10} xl={8}>
              <Typos.Normal>
                The first 10% holders of a Drop will share 5% of the total revenue of its mint sale.
              </Typos.Normal>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            backgroundColor: theme.colors.secondary,
            padding: "25px",
            marginTop: "5vh",
            marginBottom: "5vh",
            borderRadius: "5px",
          }}
        >
          <Typos.Huge
            style={{
              marginTop: "7.5vh",
              marginBottom: "10vh",
              textAlign: "center",
            }}
          >
            Governance
          </Typos.Huge>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={10} xl={8}>
              <Typos.Normal>
                At terms, we want to be community driven. It will take some time but there will be a
                governance system.
              </Typos.Normal>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Style.Root>
  );
};

export default HomeComponent;
