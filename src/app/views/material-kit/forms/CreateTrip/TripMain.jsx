import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import TripForm from "./TripForm";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const TripMain = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Create Trip", path: "#" }, { name: "Form" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Create Trip">
          <TripForm />
        </SimpleCard>

       
      </Stack>
    </Container>
  );
};

export default TripMain;
