import { lazy, Suspense } from "react";
// Import dari 'react-router-dom' hanya yang dibutuhkan untuk Data Router
import { createBrowserRouter, Outlet } from "react-router-dom";
import LoadingRedirect from "./components/loadingRedirect";
import CampusDescription from "./components/CampusDescription";
import ScrollToTop from "./components/ScrollToTop";

// Catatan: ScrollToTop harus direimplementasi sebagai listener di RouterProvider
// atau sebagai hook/component yang menggunakan useLocation di dalam elemen.

const SuspenseWrapper = ({ Component }) => (
  <Suspense fallback={<LoadingRedirect />}>
    <ScrollToTop />
    <Component />
  </Suspense>
);

// --- Lazy Imports ---
const LandingPage = lazy(() => import("./page/Landingpage"));
const LoginMentor = lazy(() => import("./page/loginMentor"));
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

// start Dashboard Mentee Pages
const DashboardMenteePage = lazy(() =>
  import("./page/Dashboard/DashboardMentee/dashboardMentee")
);
const DashboardMenteeBeranda = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardBeranda")
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
const DashboardTestJurusanForm = lazy(() =>
  import("@/page/Dashboard/DashboardMentee/DashboardTestJurusanForm")
);
// end dashboard mentee

// start dashboard lainnya
const DashboardCampus = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampus")
);
const DashboardAdmin = lazy(() =>
  import("./page/Dashboard/DashboardAdmin/DashboardAdmin")
);
const DashboardMentor = lazy(() =>
  import("@/page/Dashboard/DashboardMentor/DashboardMentor")
);
// end dashboard lainnya

// --- Konfigurasi Data Router ---
const router = createBrowserRouter([
  // Rute Landing Page dan Halaman Publik
  {
    path: "/",
    element: <SuspenseWrapper Component={LandingPage} />,
  },
  {
    path: "/login-mentee",
    element: <SuspenseWrapper Component={LoginMentee} />,
  },
  {
    path: "/login-campus",
    element: <SuspenseWrapper Component={LoginCampus} />,
  },
  {
    path: "/login-mentor",
    element: <SuspenseWrapper Component={LoginMentor} />,
  },
  { path: "/login-admin", element: <SuspenseWrapper Component={LoginAdmin} /> },

  // Rute Halaman Kampus/Jurusan Publik
  { path: "/CampusPage", element: <SuspenseWrapper Component={CampusPage} /> },
  {
    path: "/JurusanPage",
    element: <SuspenseWrapper Component={JurusanPage} />,
  },
  {
    path: "/campus-detail/:id",
    element: <SuspenseWrapper Component={CampusDetailPage} />,
  },
  {
    path: "/campus/:id",
    element: <SuspenseWrapper Component={CampusDetailPage} />,
  },
  {
    path: "/campus/:id/prestasi",
    element: <SuspenseWrapper Component={CampusPrestasiPage} />,
  },
  {
    path: "/jurusan/:slug",
    element: <SuspenseWrapper Component={DetailJurusan} />,
  },
  {
    path: "/campus/:id/jurusan",
    element: <SuspenseWrapper Component={CampusJurusanPage} />,
  },
  {
    path: "/campus/:id/program",
    element: <SuspenseWrapper Component={CampusProgram} />,
  },
  { path: "/panduan", element: <SuspenseWrapper Component={PanduanPage} /> },

  // --- Rute Dashboard Utama ---
  {
    path: "/dashboard-campus",
    element: <SuspenseWrapper Component={DashboardCampus} />,
  },
  {
    path: "/dashboard-admin",
    element: <SuspenseWrapper Component={DashboardAdmin} />,
  },
  {
    path: "/dashboard-mentor",
    element: <SuspenseWrapper Component={DashboardMentor} />,
  },

  // --- Rute DASHBOARD MENTEE (NESTED ROUTES) ---
  {
    path: "dashboard-mentee",
    element: <SuspenseWrapper Component={DashboardMenteePage} />, // Ini adalah Layout Dashboard Mentee
    children: [
      // Index Route (dashboard-mentee/)
      {
        index: true,
        element: <SuspenseWrapper Component={DashboardMenteeBeranda} />,
      },
      // Rute eksplisit (dashboard-mentee/beranda)
      {
        path: "beranda",
        element: <SuspenseWrapper Component={DashboardMenteeBeranda} />,
      },
      {
        path: "program",
        element: <SuspenseWrapper Component={DashboardProgram} />,
      },
      {
        path: "kampus",
        element: <SuspenseWrapper Component={DashboardMenteeCampus} />,
      },
      {
        path: "program/:id",
        element: <SuspenseWrapper Component={DetailProgramMentee} />,
      },
      {
        path: "program/daftar",
        element: <SuspenseWrapper Component={DashboardMenteeProgramDaftar} />,
      },
      {
        path: "test-jurusan",
        element: <SuspenseWrapper Component={TestJurusan} />,
      },
      {
        path: "test-jurusan/form",
        element: <SuspenseWrapper Component={DashboardTestJurusanForm} />,
      },
      {
        path: "jurusan",
        element: <SuspenseWrapper Component={DashboardJurusan} />,
      },
      {
        path: "jurusan/:slug",
        element: <SuspenseWrapper Component={DashboardJurusanDetail} />,
      },

      // Nested Route untuk Detail Kampus Dashboard (dashboard-mentee/kampus/:id/*)
      {
        path: "kampus/:id",
        element: <SuspenseWrapper Component={DashboardCampusDetail} />,
        children: [
          {
            index: true,
            element: <CampusDescription />,
          },
          {
            path: "prestasi",
            element: <SuspenseWrapper Component={DashboardCampusPrestasi} />,
          },
          {
            path: "jurusan",
            element: <SuspenseWrapper Component={DashboardCampusJurusan} />,
          },
          {
            path: "program",
            element: <SuspenseWrapper Component={DashboardCampusProgram} />,
          },
        ],
      },
      // Rute Penilaian (jika diperlukan)
      // {
      //   path: "penilaian",
      //   element: <SuspenseWrapper Component={Penilaian} />,
      // },
    ],
  },
]);

// Ekspor objek router untuk digunakan di main.jsx
export default router;
