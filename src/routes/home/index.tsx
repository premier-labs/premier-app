import Box from "@common/components/box";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/drop/0");
  }, []);
  return <Box>la</Box>;
};

export default Home;
