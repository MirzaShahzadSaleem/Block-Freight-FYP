import { Stack } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import ViewDriver from './ViewDriver';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const ViewDriverMain = () => {
  return (
    <Container>
      <Stack spacing={3}>
        <SimpleCard title="View Driver">
        <ViewDriver />
        </SimpleCard>
      </Stack>
      
    </Container>
  );
};

export default ViewDriverMain;
