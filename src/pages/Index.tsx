
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Dashboard } from "@/components/sections/Dashboard";
import { MenuManagement } from "@/components/sections/MenuManagement";
import { OrdersManagement } from "@/components/sections/OrdersManagement";
import { SettingsPage } from "@/components/sections/SettingsPage";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "menu":
        return <MenuManagement />;
      case "orders":
        return <OrdersManagement />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Hero onGetStarted={() => setActiveSection("dashboard")} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      {renderActiveSection()}
    </div>
  );
};

export default Index;
