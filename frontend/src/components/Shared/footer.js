import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

function Copyright(props) {
    return (
        <Typography 
        variant="body2" 
        fontWeight="600"
        style={{ marginTop: '16px' }}
        align="center" 
        {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://gamitronics.com/#/">
                Gamitronics
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = (props) => {
    return (<Container
        maxWidth="md"
        component="footer"
        sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`
        }}
        style={{
            marginTop: '26px',
            bottom: '0px',
            maxWidth: 'none'
        }}
    >
        <Copyright sx={{ mt: 5 }} />
    </Container>);
};

export default Footer;