import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Appointments() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>
              <div className='text-base' >2024</div>
              <div className='text-xl'>November</div>
              <div className='border-2'></div>
              <div className='flex flex-row items-center mx-8 w-full'>
                <div className='w-2/5 text-7xl '>22</div>
                <div className='border-2 w-2.5'></div>
                <div className='w-2/5 text-7xl'>29</div>
              </div>
              <div>1st Home visit</div>
            </Item>
            
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}