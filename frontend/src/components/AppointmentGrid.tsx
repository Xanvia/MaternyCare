import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F5F5F5',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '50px',
  boxShadow: 'none',
}));

export default function Appointments() {
  return (
    <div className='bg-white mx-8 md:p-16 sm:p-8 xs:p-4 rounded-3xl'>
      <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={{ xs: 2, md: 8 }} columns={{ xs: 4, sm: 8, md: 16 }} >
          {Array.from(Array(9)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>
                <div className='text-base text-blue_primary' >2024</div>
                <div className='text-xl md:text-xl sm:text-lg xs:text-base text-pink_primary mt-0.5 font-bold'>November</div>
                <hr className='rounded-xl'/>
                {/* <div className='border mt-3 border-gray-300 rounded-xl'></div> */}
                <div className='flex flex-row items-center justify-center w-full mt-3'>
                  <div className='w-2/5 md:text-3xl sm:text-3xl xs:text-2xl text-blue_primary font-bold text-right mx-2'>22</div>
                  <div className='border-2 w-5 border-gray-300 rounded-xl'></div>
                  <div className='w-2/5 md:text-3xl sm:text-3xl xs:text-2xl text-blue_primary font-bold text-left mx-2'>29</div>
                </div>
                <div className='text-pink_primary text-sm mt-3'>1st Home visit</div>
              </Item>
              
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
    
  );
}