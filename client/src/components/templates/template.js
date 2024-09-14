import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useNavigate } from 'react-router-dom'; // Import the navigation hook

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'datasets',
    title: 'Datasets',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'assets',
        title: 'Assets',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'cases',
        title: 'Cases',
        icon: <DescriptionIcon />,
      },
      ,
      {
        segment: 'orders',
        title: 'Orders',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
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
  return (
   <></>
  );
}

Template.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic({ window, component: CustomComponent }) {
  const [pathname, setPathname] = React.useState('/dashboard');
  const navigate = useNavigate();  // Use navigate to change URL

  const handleNavigationClick = (segment) => {
    const newPath = `${segment}`;
    setPathname(newPath);
    navigate(newPath);  // Change the URL
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