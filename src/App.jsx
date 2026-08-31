import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./components/dashboard/Dashboard";
import Payments from "./components/payments/Payments";
import RecentPayments from "./components/dashboard/RecentPayments";
import Customers from "./components/customers/Customers";
import Recovery from "./components/recovery/Recovery";
import Analytics from "./components/analytics/Analytics";
import AIRecovery from "./components/ai-recovery/AIRecovery";

import HowItWorks from "./components/guide/HowItWorks";

import SignIn from "./components/auth/SignIn";
import Signup from "./components/auth/Signup";
import OAuth2Callback from "./components/auth/OAuth2Callback";

function App() {
  return (
    <Routes>
      <Route
        path="/oauth2/callback"
        element={<OAuth2Callback />}
      />
      <Route
        path="/signin"
        element={<SignIn />}
      />

      {/* Keep /login as an alias */}
      <Route
        path="/login"
        element={<SignIn />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />
      <Route
        path="/how-it-works"
        element={<HowItWorks />}
      />
      <Route
        path="/*"
        element={
          <DashboardLayout>
            <Routes>
              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/payments"
                element={<Payments />}
              />

              <Route
                path="/payments/recent"
                element={<RecentPayments />}
              />

              <Route
                path="/customers"
                element={<Customers />}
              />

              <Route
                path="/recovery"
                element={<Recovery />}
              />

              <Route
                path="/analytics"
                element={<Analytics />}
              />

              <Route
                path="/ai-recovery"
                element={<AIRecovery />}
              />

            </Routes>

          </DashboardLayout>
        }
      />

    </Routes>
  );
}

export default App;