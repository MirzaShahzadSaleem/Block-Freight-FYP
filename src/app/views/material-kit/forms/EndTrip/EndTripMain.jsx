import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import EndTrip from "./EndTrip";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const EndTripMain = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "END TRIP", path: "/material" }, { name: "Form" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="End Trip">
          <EndTrip />
        </SimpleCard>

      </Stack>
    </Container>
  );
};

export default EndTripMain;
