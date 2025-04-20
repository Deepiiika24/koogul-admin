import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @mui
import { Box, List, ListItemText, Collapse } from '@mui/material';
// import { StyledNavItem, StyledNavItemIcon } from './styles';

import { useLocation } from 'react-router-dom';
import { StyledNavItem, StyledNavItemIcon } from 'src/components/nav-section/styles';
import Iconify from '../iconify';
NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1, paddingLeft: "5px" }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, children } = item;
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Get the current route

  // Check if the current path matches the item path OR any of its children's paths
  const isActive = location.pathname === path;
  const isSubActive = children && children.some((child) => location.pathname.startsWith(child.path));

  useEffect(() => {
    if (isActive) setOpen(true); // Ensure submenu is open when visiting a child route
  }, [isActive]);

  const handleClick = () => {
    if (children) setOpen(!open);
  };

  return (
    <>
      <StyledNavItem
        component={RouterLink}
        to={path}
        onClick={handleClick}
        sx={{
          color: isActive ? 'text.primary' : 'text.secondary',
          bgcolor: isActive ? 'action.selected' : 'transparent',
          fontWeight: isActive ? 'fontWeightBold' : 'normal',
        }}
      >
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
        <ListItemText disableTypography primary={title} />
        {children ? open ? <Iconify icon="mdi:chevron-down" /> : <Iconify icon="mdi:chevron-right" /> : null}
      </StyledNavItem>

      {/* Submenu */}
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {children.map((subItem) => {
              const isSubActive = location.pathname.startsWith(subItem.path);
              return (
                <StyledNavItem
                  key={subItem.title}
                  component={RouterLink}
                  to={subItem.path}
                  sx={{
                    pl: 4,
                    color: isSubActive ? 'text.primary' : 'text.secondary',
                    bgcolor: isSubActive ? 'action.selected' : 'transparent',
                    fontWeight: isSubActive ? 'fontWeightBold' : 'normal',
                  }}
                >
                  <StyledNavItemIcon>{subItem.icon && subItem.icon}</StyledNavItemIcon>
                  <ListItemText disableTypography primary={subItem.title} />
                </StyledNavItem>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
}