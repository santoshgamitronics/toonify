import React from 'react';
import {
    AppBar,
    Toolbar
} from '@material-ui/core';
import CompanyLogo from '../../assets/Images/company-logo.png';

const Header = () => {
    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <img src={CompanyLogo} alt="company-logo" style={{ width: '172px', cursor: 'pointer' }} onClick={() => window.location.reload()} />
            </Toolbar>
        </AppBar>
    );
}

export default Header;