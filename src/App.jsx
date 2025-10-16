import React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingRedirect from "./components/loadingRedirect";
import { Home } from "lucide-react";

import LoginAdmin from "./page/loginAdmin";
import LoginCampus from "./page/loginCampus";

const LandingPage = lazy(() => import("./page/Landingpage"));
const LoginMentee = lazy(() => import("./page/loginMentee"));
const DashboardMentee = lazy(() => import("./page/Dashboard/dashboardMentee"));
const CampusPage = lazy(() => import("./page/campuspage"));
const JurusanPage = lazy(() => import("./page/JurusanPage"));
const CampusDetailPage = lazy(() => import("./components/CampusDetailPage"));
const DetailJurusan = lazy(() => import("./components/DetailJurusan"));
const CampusPrestasiPage = lazy(() =>
  import("./components/CampusPrestasiPage")
);
const CampusJurusanPage = lazy(() => import("./components/CampusJurusanPage"));
const CampusProgram = lazy(() => import("./components/CampusProgram"));
const PanduanPage = lazy(() => import("./page/PanduanPage")); // ✅ Tambahkan ini

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

        {/* Login */}
        <Route
          path="/login-campus"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <LoginCampus title="Halaman Login Kampus" />
            </Suspense>
          }
        />
        <Route
          path="/login-admin"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <LoginAdmin title="Halaman Login Admin" />
            </Suspense>
          }
        />
        <Route
          path="/login-mentee"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <LoginMentee title="Halaman Login Mentee" />
            </Suspense>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard-mentee"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardMentee title="Dashboard Mentee" />
            </Suspense>
          }
        />

        {/* Halaman Kampus */}
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
          path="/jurusan/:slug"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DetailJurusan />
            </Suspense>
          }
        />

        {/* Detail Kampus */}
        <Route path="/campus-detail/:id" element={<CampusDetailPage />} />
        <Route path="/campus/:id" element={<CampusDetailPage />} />
        <Route path="/campus/:id/prestasi" element={<CampusPrestasiPage />} />
        <Route path="/jurusan/:id" element={<DetailJurusan />} />
        <Route path="/campus/:id/jurusan" element={<CampusJurusanPage />} />
        <Route path="/campus/:id/program" element={<CampusProgram />} />

        {/* ✅ Halaman Panduan */}
        <Route
          path="/panduan"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <PanduanPage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}
