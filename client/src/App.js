import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/sign-in";
import Home from "./pages/home/home";
import AddAsset from "./pages/add/asset";
import EditAsset from "./pages/edit/asset";
import DashboardLayoutBasic from './components/templates/template';
import DataTable from './components/tables/assets/dataTable';  // Import the table component
import { TokenProvider } from './authentication/tokenContext';
import { UserProvider } from './context/userContext';
export default function App() {
  return (
    <div>
      <TokenProvider>
      <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="home" element={<DashboardLayoutBasic component={() => <div>Home Component</div>} />} />
        <Route path="orders" element={<DashboardLayoutBasic component={() => <div>Orders Component</div>} />} />
        <Route path="dashboard" element={<DashboardLayoutBasic component={() => <div>Dashborad Component</div>} />} />
        <Route path="integrations" element={<DashboardLayoutBasic component={() => <div>Integrations Component</div>} />} />
        <Route path="datasets/assets" element={<Home/>} />
        <Route path="add-asset" element={<AddAsset/>} />
        <Route path="edit-asset" element={<EditAsset/>} />
        <Route path="datasets/cases" element={<DashboardLayoutBasic component={() => <div>Cases Component</div>} />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
    </TokenProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);