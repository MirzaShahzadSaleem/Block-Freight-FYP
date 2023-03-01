import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import ViewAllTrip from "./ViewAllTrip";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const ViewAllTripMain = () => {
  return (
    <Container>

      <Stack spacing={3}>
        <SimpleCard title="View All Trips">
        <ViewAllTrip />
        </SimpleCard>
       
      </Stack>
    </Container>
  );
};

export default ViewAllTripMain;
