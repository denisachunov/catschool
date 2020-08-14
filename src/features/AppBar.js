import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { change, setText, selectABC } from './alphabet/abcSlice';
import { Menu, MenuItem, Toolbar, AppBar, Button, Typography } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import HomeIcon from '@material-ui/icons/Home';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import Langs from './alphabet/translations';

export default () => {

    const { lang } = useSelector ( selectABC );
    const dispatch = useDispatch();

    const [ anchorEl, setAnchorEl ] = useState ( null );

    const openMenu = ({ currentTarget }) => {
        setAnchorEl ( currentTarget );
    };

    const closeMenu = () => setAnchorEl ( null );

    const changeLang = lang => () => {
        dispatch ( change ( lang ));
        dispatch ( setText ( '' ));
        closeMenu();
    }

    const { pathname } = useLocation();

    return (
        <AppBar position="static" className="App-bar">
            <Toolbar>
                <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" href="/">
                        <HomeIcon />
                    </Button>
                    {
                        pathname === '/abc' && (
                            <Button aria-controls="simple-menu" aria-haspopup="true" href="/math">
                                <AddToQueueIcon />
                            </Button>
                        )
                    }
                    {
                        pathname === '/math' && (
                            <Button aria-controls="simple-menu" aria-haspopup="true" href="/abc">
                                <SpellcheckIcon />
                            </Button>
                        )
                    }
                </div>
                {
                    pathname === '/abc' && (
                        <div className="lang">
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={openMenu}>
                                <LanguageIcon />
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean ( anchorEl )}
                                onClose={closeMenu}
                            >
                                {
                                    Object.keys ( Langs ).map ( lang => (
                                        <MenuItem key={lang} onClick={changeLang ( lang )}>
                                            {Langs[ lang ].name}
                                        </MenuItem>
                                    ))
                                }
                            </Menu>
                            <Typography variant="h6">
                                {Langs[ lang ].name}
                            </Typography>
                        </div>
                    )
                }
            </Toolbar>
        </AppBar>
    );
}