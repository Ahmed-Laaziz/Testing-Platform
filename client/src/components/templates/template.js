import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom'; // Import hooks for navigation and location
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import CaseIcon from '@mui/icons-material/BusinessCenter';
import AssetIcon from '@mui/icons-material/ProductionQuantityLimits';
import PersonasIcon from '@mui/icons-material/SupervisorAccount';
import AccessIcon from '@mui/icons-material/VpnKey';
import FunctionalityIcon from '@mui/icons-material/ModeComment';
import SubFunctionalityIcon from '@mui/icons-material/InsertComment';
import ProcessIcon from '@mui/icons-material/AutoMode';
import PermissionsIcon from '@mui/icons-material/NotInterested';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import GavelIcon from '@mui/icons-material/Gavel';
const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'orders', title: 'Orders', icon: <ShoppingCartIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Datasets' },
  {
    segment: 'datasets',
    title: 'All Datasets',
    icon: <FolderOpenIcon />,
    children: [
      { segment: 'aggregated', title: 'Access', icon: <GavelIcon /> },
      { segment: 'statuses', title: 'Permissions Status', icon: <GavelIcon /> },
    ],
  },
  { kind: 'divider' },
  { kind: 'header', title: 'Data Management' },
  {
    segment: 'datasets',
    title: 'Entities',
    icon: <BarChartIcon />,
    children: [
      { segment: 'accounts', title: 'Accounts', icon: <DescriptionIcon /> },
      { segment: 'assets', title: 'Assets', icon: <AssetIcon /> },
      { segment: 'cases', title: 'Cases', icon: <CaseIcon /> },
      { segment: 'cis', title: 'Customer Interactions', icon: <DescriptionIcon /> },
    ],
  },
  {
    segment: 'datasets',
    title: 'Access / Authorization',
    icon: <AccessIcon />,
    children: [
      { segment: 'personas', title: 'Personas', icon: <PersonasIcon /> },
      { segment: 'processes', title: 'Processes', icon: <ProcessIcon /> },
      { segment: 'functionalities', title: 'Functionalities', icon: <FunctionalityIcon /> },
      { segment: 'subFunctionalities', title: 'SubFunctionalities', icon: <SubFunctionalityIcon /> },
      { segment: 'permissions', title: 'Permissions', icon: <PermissionsIcon /> },
    ],
  },
  { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function Template({ pathname }) {
  return <></>;
}

Template.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic({ window, component: CustomComponent }) {
  const location = useLocation(); // Track the current location
  const [pathname, setPathname] = React.useState(location.pathname);
  const navigate = useNavigate(); // Hook for programmatic navigation

  React.useEffect(() => {
    // Update pathname whenever the location changes
    setPathname(location.pathname);
  }, [location]);

  const handleNavigationClick = (segment) => {
    const newPath = `${segment}`;
    navigate(newPath); // Navigate to the new path
  };

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: handleNavigationClick,
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        onNavigate={(segment) => handleNavigationClick(segment)} // Handle navigation on click
      >
        <Template pathname={pathname} />
        {CustomComponent && (
          <Box
            sx={{
              margin: 2, // Adds space around the CustomComponent
              padding: 2, // Optional: Adds space inside the border of the CustomComponent
            }}
          >
            <CustomComponent />
          </Box>
        )}
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
  component: PropTypes.elementType,
};

export default DashboardLayoutBasic;
