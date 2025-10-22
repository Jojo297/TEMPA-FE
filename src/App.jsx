import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingRedirect from "./components/loadingRedirect";

// start Route landing page
const LandingPage = lazy(() => import("./page/Landingpage"));
const LoginMentee = lazy(() => import("./page/loginMentee"));
const LoginCampus = lazy(() => import("./page/loginCampus"));
const LoginAdmin = lazy(() => import("./page/loginAdmin"));
const CampusPage = lazy(() => import("./page/CampusPage"));
const JurusanPage = lazy(() => import("./page/JurusanPage"));
const CampusDetailPage = lazy(() => import("./components/CampusDetailPage"));
const DetailJurusan = lazy(() => import("./components/DetailJurusan"));
const CampusPrestasiPage = lazy(() =>
  import("./components/CampusPrestasiPage")
);
const CampusJurusanPage = lazy(() => import("./components/CampusJurusanPage"));
const CampusProgram = lazy(() => import("./components/CampusProgram"));
const PanduanPage = lazy(() => import("./page/PanduanPage"));
// end Route before login

// start Dashboard Mentee Pages (folder DashboardMentee)
const DashboardMenteePage = lazy(() =>
  import("./page/Dashboard/DashboardMentee/dashboardMentee")
);
const DashboardProgram = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardProgram")
);
const DashboardMenteeCampus = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardCampus")
);
const DashboardCampusDetail = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashbordCampusDetail")
);

const DashboardCampusPrestasi = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardCampusPrestasi")
);
const DashboardCampusJurusan = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardCampusJurusan")
);
const DetailProgramMentee = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DetailProgramMentee")
);
const DashboardMenteeProgramDaftar = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashbordMenteeProgramDaftar")
);
const DashboardCampusProgram = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardCampusProgram")
);
const TestJurusan = lazy(() =>
  import("./page/Dashboard/DashboardMentee/Testjurusan")
);

const Penilaian = lazy(() =>
  import("./page/Dashboard/DashboardMentee/Penilaian")
);

const DashboardJurusan = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardJurusan")
);

const DashboardJurusanDetail = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardJurusanDetail")
);
// end dashboard mentee

// start dashboard campus
const DashboardCampus = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampus")
);
// end dashboard campus

// start dashboard admin
const DashboardAdmin = lazy(() =>
  import("./page/Dashboard/DashboardAdmin/DashboardAdmin")
);
// end dashboard admin

export default function App() {
  return (
    <Router>
      <Routes>
        {/* start route Landing Page */}
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <LandingPage />
            </Suspense>
          }
        />

        {/* 🔐 Login Pages */}
        {/* 🔐 Login Pages */}
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

        {/* 🎓 Campus Related Pages */}
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

        {/* 📘 Panduan */}
        {/* 📘 Panduan */}
        <Route
          path="/panduan"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <PanduanPage />
            </Suspense>
          }
        />

        {/* end route Landing Page */}

        {/* start Dashboard Mentee */}
        <Route
          path="/dashboard-mentee"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardMenteePage />
            </Suspense>
          }
        />

        {/* 🧩 Program Dashboard Mentee */}
        <Route
          path="/dashboard-mentee/program"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardProgram />
            </Suspense>
          }
        />

        {/* 🏫 Kampus Dashboard Mentee */}
        <Route
          path="/dashboard-mentee/kampus"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardMenteeCampus />
            </Suspense>
          }
        />

        {/* 🏫 Detail Kampus Dashboard */}
        <Route
          path="/dashboard-mentee/kampus/:id"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardCampusDetail />
            </Suspense>
          }
        />

        {/* 🆕 🏆 Prestasi Kampus Dashboard */}
        <Route
          path="/dashboard-mentee/kampus/:id/prestasi"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardCampusPrestasi />
            </Suspense>
          }
        />

        {/* 🏫 Jurusan Kampus Dashboard */}
        <Route
          path="/dashboard-mentee/kampus/:id/jurusan"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardCampusJurusan />
            </Suspense>
          }
        />

        {/* 📄 Detail Program Dashboard Mentee */}
        <Route
          path="/dashboard-mentee/program/:id"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DetailProgramMentee />
            </Suspense>
          }
        />

        {/* 📝 Form Daftar Program Dashboard Mentee */}
        <Route
          path="/dashboard-mentee/program/daftar"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardMenteeProgramDaftar />
            </Suspense>
          }
        />
        {/* 🏫 Program Kampus Dashboard Mentee */}
        <Route
          path="/dashboard-mentee/kampus/:id/program"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardCampusProgram />
            </Suspense>
          }
        />
        {/* Test Jurusan Mentee */}

        <Route
          path="/dashboard-mentee/test-jurusan"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <TestJurusan />
            </Suspense>
          }
        />

        {/* Penilaian */}
        <Route
          path="/dashboard-mentee/Penilaian"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <Penilaian />
            </Suspense>
          }
        />

        <Route
          path="/dashboard-mentee/jurusan"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardJurusan />
            </Suspense>
          }
        />

        <Route
          path="/dashboard-mentee/jurusan/:slug"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardJurusanDetail />
            </Suspense>
          }
        />
        {/* end dashboard mentee */}

        {/* start dashboard campus */}
        <Route
          path="/dashboard-campus"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardCampus />
            </Suspense>
          }
        />
        {/* end dashboard campus */}

        {/* start dashboard admin */}
        <Route
          path="/dashboard-admin"
          element={
            <Suspense fallback={<LoadingRedirect />}>
              <DashboardAdmin />
            </Suspense>
          }
        />
        {/* end dashboard admin */}
      </Routes>
    </Router>
  );
}
