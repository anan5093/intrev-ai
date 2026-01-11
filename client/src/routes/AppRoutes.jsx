import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import InterviewLanding from "../pages/InterviewLanding";
import InterviewSetup from "../pages/InterviewSetup";
import InterviewSession from "../pages/InterviewSession";
import InterviewResult from "../pages/InterviewResult";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AppLayout from "../components/common/AppLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<InterviewLanding />} />
            <Route path="/interview/setup" element={<InterviewSetup />} />
            <Route
              path="/interview/session/:interviewId"
              element={<InterviewSession />}
            />
            <Route
              path="/interview/result/:interviewId"
              element={<InterviewResult />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
