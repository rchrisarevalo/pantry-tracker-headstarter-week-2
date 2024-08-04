import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{ backgroundColor: "black" }}
      width={"100%"}
      paddingTop={"4vh"}
      paddingBottom={"4vh"}
      color={"white"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginLeft={"10%"}
        marginRight={"10%"}
      >
        <Typography variant="body1">
          <p className="font-sans">(c) {`${new Date().getFullYear()} Ruben Christopher Arevalo.`}</p>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
