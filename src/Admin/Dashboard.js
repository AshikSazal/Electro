import React, { useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  List,
  Toolbar,
  Typography,
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
} from "@mui/material";
import {
  Queue,
  AddShoppingCart,
  Home,
  Menu,
  Inventory2,
  PermIdentity,
  Logout
} from "@mui/icons-material";
import UploadProduct from "./pages/components/UploadProduct";
import HomePage from "./pages/components/HomePage";
import ProductList from "./pages/components/Product/ProductList";
import Order from "./pages/components/Order";
import Customer from "./pages/components/Customer";
import ListItems from "./pages/ListItems";
import { useAuth } from "../shared/hooks/auth-hook";

const drawerWidth = 240;

function Dashboard(props) {
  const { logoutHandler } = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItems
          icon={<Home />}
          onClick={() => navigate("/electro")}
          text="Home"
        />
        <ListItems
          icon={<AddShoppingCart />}
          onClick={() => navigate("/electro/order")}
          text="Order"
        />
        <ListItems
          icon={<Inventory2 />}
          onClick={() => navigate("/electro/product")}
          text="Product"
        />
        <ListItems
          icon={<Queue />}
          onClick={() => navigate("/electro/upload")}
          text="Upload"
        />
        <ListItems
          icon={<PermIdentity />}
          onClick={() => navigate("/electro/customer")}
          text="Customer"
        />
        <ListItems
          icon={<Logout />}
          onClick={logoutHandler}
          text="Logout"
        />
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Electro
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/*" element={<Navigate replace to="/electro" />} />
          <Route exact path="/electro" element={<HomePage />} />
          <Route path="/electro/order" element={<Order />} />
          <Route path="/electro/product" element={<ProductList />} />
          <Route path="/electro/upload" element={<UploadProduct />} />
          <Route path="/electro/customer" element={<Customer />} />
        </Routes>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
