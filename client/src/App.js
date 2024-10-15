import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/sign-in";
import Home from "./pages/home/home";
import AllCases from "./pages/all-cases/cases";
import AllOrders from "./pages/all-orders/orders";
import AddProcess from "./pages/add/process";
import AllProcesses from "./pages/all-processes/processes";
import AllPersonas from "./pages/all-personas/personas";
import AddPersona from "./pages/add/persona";
import AddCase from "./pages/add/case";
import EditPersona from "./pages/edit/persona";
import EditCase from "./pages/edit/case";
import AllFunctionalities from "./pages/all-functionalities/functionalities";
import AddFunctionality from "./pages/add/functionality";
import EditFunctionality from "./pages/edit/functionality";
import AddAsset from "./pages/add/asset";
import EditAsset from "./pages/edit/asset";
import EditProcess from "./pages/edit/process";
import DashboardLayoutBasic from './components/templates/template';
import AllSubFunctionalities from "./pages/all-subFunctionalities/subFunctionalities";
import AddSubFunctionality from "./pages/add/subFunctionality";
import EditSubFunctionality from "./pages/edit/subFunctionality";
import AllAggregatedPersonas from "./pages/all-aggregated-personas/aggregated_personas";
import AllStatuses from "./pages/all-aggregated-personas/statuses";
import AddPermission from "./pages/add/permission"

import AllCis from "./pages/all_cis/cis";
import AddCi from "./pages/add/ci";
import EditCi from "./pages/edit/ci";

import AllAccounts from "./pages/all-accounts/accounts";
import AddAccount from "./pages/add/account";
import EditAccount from "./pages/edit/account";

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
        <Route path="add-case" element={<AddCase/>} />
        <Route path="add-persona" element={<AddPersona/>} />
        <Route path="edit-asset" element={<EditAsset/>} />
        <Route path="edit-persona" element={<EditPersona/>} />
        <Route path="edit-case" element={<EditCase/>} />
        <Route path="edit-process" element={<EditProcess/>} />
        <Route path="datasets/cases" element={<AllCases/>} />
        <Route path="datasets/orders" element={<AllOrders/>} />
        <Route path="datasets/personas" element={<AllPersonas/>} />
        <Route path="datasets/processes" element={<AllProcesses/>} />
        <Route path="add-process" element={<AddProcess/>} />
        <Route path="datasets/functionalities" element={<AllFunctionalities/>} />
        <Route path="add-functionality" element={<AddFunctionality/>} />
        <Route path="edit-functionality" element={<EditFunctionality/>} />
        <Route path="datasets/subFunctionalities" element={<AllSubFunctionalities/>} />
        <Route path="add-subFunctionality" element={<AddSubFunctionality/>} />
        <Route path="edit-subFunctionality" element={<EditSubFunctionality/>} />
        <Route path="datasets/aggregated" element={<AllAggregatedPersonas/>} />
        <Route path="datasets/permissions" element={<AddPermission/>}/>
        <Route path="datasets/statuses" element={<AllStatuses/>}/>
        <Route path="add-ci" element={<AddCi/>} />
        <Route path="edit-ci" element={<EditCi/>} />
        <Route path="datasets/cis" element={<AllCis/>} />
        <Route path="add-account" element={<AddAccount/>} />
        <Route path="edit-account" element={<EditAccount/>} />
        <Route path="datasets/accounts" element={<AllAccounts/>} />

      </Routes>
    </BrowserRouter>
    </UserProvider>
    </TokenProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);