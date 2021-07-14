import MenuIcon from '@material-ui/icons/Menu';
import { MenuItem } from '@material-ui/core';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { media } from '../../constants/material';


const Navigation = () => {
  const location = useLocation();
  const mediaMD = useMediaQuery(media.md);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return <nav style={mediaMD ? {  marginTop: '20px'} : { marginTop: '-3px', float: 'right', clear: 'both'}}>

    {mediaMD ? (
      <>
        <MenuItem component={Link} to="/" >Entrar</MenuItem>
        <MenuItem component={Link} to="/veiculos" selected={location.pathname === "/veiculos"}>Veículos</MenuItem>
        <MenuItem component={Link} to="/marcas" selected={location.pathname === "/marcas"}>Marcas</MenuItem>
        <MenuItem component={Link} to="/usuarios" selected={location.pathname === "/usuarios"}>Usuários</MenuItem>
        <MenuItem component={Link} to="/dashboard" selected={location.pathname === "/dashboard"}>Dashboard</MenuItem>
        <MenuItem component={Link} to="/sair" >Sair</MenuItem>
      </>
    ) : (
      <>
        <IconButton
          id="demo-positioned-button"
          aria-controls="demo-positioned-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >

          <MenuItem component={Link} to="/" >Entrar</MenuItem>
          <MenuItem component={Link} to="/veiculos" selected={location.pathname === "/veiculos"}>Veículos</MenuItem>
          <MenuItem component={Link} to="/marcas" selected={location.pathname === "/marcas"}>Marcas</MenuItem>
          <MenuItem component={Link} to="/usuarios" selected={location.pathname === "/usuarios"}>Usuários</MenuItem>
          <MenuItem component={Link} to="/dashboard" selected={location.pathname === "/dashboard"}>Dashboard</MenuItem>
          <MenuItem component={Link} to="/sair" >Sair</MenuItem>

        </Menu>
      </>
    )}

  </nav>;
};

export default Navigation;
