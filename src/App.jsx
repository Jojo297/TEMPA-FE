import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingRedirect from "./components/loadingRedirect";

// Lazy imports
const LandingPage = lazy(() => import("./page/Landingpage"));
const LoginMentee = lazy(() => import("./page/loginMentee"));
const LoginCampus = lazy(() => import("./page/loginCampus"));
const LoginAdmin = lazy(() => import("./page/loginAdmin"));
const DashboardMenteePage = lazy(() =>
  import("./page/Dashboard/DashboardMentee/dashboardMentee")
);
const CampusPage = lazy(() => import("./page/campuspage"));
const JurusanPage = lazy(() => import("./page/JurusanPage"));
const CampusDetailPage = lazy(() => import("./components/CampusDetailPage"));
const DetailJurusan = lazy(() => import("./components/DetailJurusan"));
const CampusPrestasiPage = lazy(() =>
  import("./components/CampusPrestasiPage")
);
const CampusJurusanPage = lazy(() => import("./components/CampusJurusanPage"));
const CampusProgram = lazy(() => import("./components/CampusProgram"));
const PanduanPage = lazy(() => import("./page/PanduanPage"));
const DashboardProgram = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardProgram")
);
const DashboardCampus = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardCampus")
);

// ✅ Tambahkan ini (halaman detail program mentee)
const DetailProgramMentee = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DetailProgramMentee")
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <LandingPage />
            </Suspense>
          }
        />

        {/* Login Pages */}
        <Route
          path="/login-mentee"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <LoginMentee />
            </Suspense>
          }
        />
        <Route
          path="/login-campus"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <LoginCampus />
            </Suspense>
          }
        />
        <Route
          path="/login-admin"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <LoginAdmin />
            </Suspense>
          }
        />

        {/* Campus Related Pages */}
        <Route
          path="/CampusPage"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <CampusPage />
            </Suspense>
          }
        />
        <Route
          path="/JurusanPage"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <JurusanPage />
            </Suspense>
          }
        />
        <Route
          path="/campus-detail/:id"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <CampusDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/campus/:id"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <CampusDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/campus/:id/prestasi"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <CampusPrestasiPage />
            </Suspense>
          }
        />
        <Route
          path="/jurusan/:slug"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DetailJurusan />
            </Suspense>
          }
        />
        <Route
          path="/campus/:id/jurusan"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <CampusJurusanPage />
            </Suspense>
          }
        />
        <Route
          path="/campus/:id/program"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <CampusProgram />
            </Suspense>
          }
        />

        {/* Panduan */}
        <Route
          path="/panduan"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <PanduanPage />
            </Suspense>
          }
        />

        {/* Dashboard Mentee */}
        <Route
          path="/dashboard-mentee"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardMenteePage />
            </Suspense>
          }
        />

        {/* Program Dashboard Mentee */}
        <Route
          path="/dashboard-mentee/program"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardProgram />
            </Suspense>
          }
        />
        {/* Program Kampus Mentee */}
        <Route
          path="/dashboard-mentee/kampus"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardCampus />
            </Suspense>
          }
        />

        {/* ✅ Detail Program Dashboard Mentee */}
        <Route
          path="/dashboard-mentee/program/:id"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DetailProgramMentee />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}
