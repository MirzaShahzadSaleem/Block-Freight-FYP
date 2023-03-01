import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

// const StatCards = () => {
//   const cardList = [
//     { name: 'Total Drivers', amount: 3050, icon: 'group' },
//     { name: 'Revenue', amount: '$80,500', icon: 'attach_money' },
//     { name: 'Trips', amount: '8.5%+ to Last Week', icon: 'store' },
//     { name: 'Orders to Deliver', amount: '305 Orders', icon: 'shopping_cart' },
//   ];

//   return (
//     <Grid container spacing={3} sx={{ mb: '24px' }}>
//       {cardList.map((item, index) => (
//         <Grid item xs={12} md={6} key={index}>
//           <StyledCard elevation={6}>
//             <ContentBox>
//               <Icon className="icon">{item.icon}</Icon>
//               <Box ml="12px">
//                 <Small>{item.name}</Small>
//                 <Heading>{item.amount}</Heading>
//               </Box>
//             </ContentBox>

//             <Tooltip title="View Details" placement="top">
//               <IconButton>
//                 <Icon>arrow_right_alt</Icon>
//               </IconButton>
//             </Tooltip>
//           </StyledCard>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };
const StatCards = () => {
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [totalTrips, setTotalTrips] = useState(0);

  const cardList = [
    { name: 'Total Drivers', amount: `${totalDrivers} Drivers`, icon: 'group' },
    { name: 'Revenue', amount: '$80,500', icon: 'attach_money' },
    { name: 'Trips', amount: `${totalTrips}`, icon: 'store' },
    { name: 'Trips To Start', amount: '305 ', icon: 'shopping_cart' },
  ];

  useEffect(() => {
    // Fetch total number of drivers
    axios.get('http://localhost:3003/drivers/viewdrivers')
      .then(response => {
        setTotalDrivers(response.data.length);
      })
      .catch(error => {
        console.log(error);
      });

    // Fetch total number of trips
    axios.get('http://localhost:3003/trips/viewtrips')
      .then(response => {
        setTotalTrips(response.data.length);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{index === 0 ? totalDrivers : item.amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
