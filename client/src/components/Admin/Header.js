import React, { Fragment, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
function Header({
  getCategories,
  category: { categories },
  auth: { isAuthenticated, loading },
  logout,
}) {
  useEffect(() => {}, [isAuthenticated, logout, loading]);
  const pages = [
    {
      text: "Products",
      onclick: "/admin/products",
    },
    {
      text: "Category",
      onclick: "/admin/categories",
    },
    {
      text:"Orders",
      onclick:"/admin/orders"
    }
  ];

  const guestLinks = [
    {
      text: "Register",
      onclick: "/admin/register",
    },
    {
      text: "Login",
      onclick: "/admin/login",
    },
  ];

  const authLinks = [
    {
      text: "Dashboard",
      onClick: "/admin/dashboard",
    },
    {
      text: "Logout",
      onClick: "/admin/logout",
    },
  ];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ background: "#2E3B55" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingBagIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/admin/dashboard"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-COMMERCE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {isAuthenticated && (
                <>
                  {pages.map((page, index) => {
                    const { text, onclick } = page;
                    return (
                      <Link key={page} to={onclick}>
                        <ListItem
                          button
                          sx={{ my: 2, color: "blue", display: "block" }}
                        >
                          <ListItemText primary={text} />
                        </ListItem>
                      </Link>
                    );
                  })}
                </>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-COMMERCE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isAuthenticated && (
              <>
                {pages.map((page, index) => {
                  const { text, onclick } = page;
                  return (
                    <Link key={page} to={onclick}>
                      <ListItem
                        button
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        <ListItemText primary={text} />
                      </ListItem>
                    </Link>
                  );
                })}
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open guestLinks">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {
                <>
                  {isAuthenticated
                    ? authLinks.map((auth) => {
                        const { text, onClick } = auth;
                        return (
                          <Link key={auth} to={onClick}>
                            <ListItem
                              button
                              sx={{ my: 2, color: "blue", display: "block" }}
                            >
                              <ListItemText primary={text} />
                            </ListItem>
                          </Link>
                        );
                      })
                    : guestLinks.map((guest) => {
                        const { text, onclick } = guest;
                        return (
                          <Link key={guest} to={onclick}>
                            <ListItem
                              button
                              sx={{ my: 2, color: "blue", display: "block" }}
                            >
                              <ListItemText primary={text} />
                            </ListItem>
                          </Link>
                        );
                      })}
                </>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
Header.propTypes = {
  getCategories: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  category: state.category,
});

export default connect(mapStateToProps, { logout })(Header);
