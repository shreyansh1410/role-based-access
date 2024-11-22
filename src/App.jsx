import { React, useContext } from "react";
import { UserProvider } from "./context/UserContext";
import { RoleProvider } from "./context/RoleContext";
import { ThemeProvider } from "./context/ThemeContext";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainHeading from "./components/MainHeading";

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <RoleProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className={`flex-grow`}>
              <MainHeading />
              <UserManagement />
              <RoleManagement />
            </main>
            <Footer />
          </div>
        </RoleProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
