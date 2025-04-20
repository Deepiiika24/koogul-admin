import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';
import logoImage from '../../images/logo1.png'
// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logoElement = (
    <Box
      ref={ref}
      component="div"
      sx={{
        maxWidth: 121,
        maxHeight: 80,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
     <img src={logoImage} alt="logo" style={{ borderRadius: '50%', margin: '5px 0px 0px 60px' }} />

    </Box>
  );

  if (disabledLink) {
    return <>{logoElement}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logoElement}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
