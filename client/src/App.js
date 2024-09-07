import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/sign-in";
import Home from "./pages/home/home";
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
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
    </TokenProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);