import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingRedirect from "./components/loadingRedirect";
import CampusDescription from "./components/CampusDescription";
import ScrollToTop from "./components/ScrollToTop";

const SuspenseWrapper = ({ Component }) => (
  <Suspense fallback={<LoadingRedirect />}>
    <ScrollToTop />
    <Component />
  </Suspense>
);

// --- Lazy Imports ---
const LandingPage = lazy(() => import("./page/Landingpage"));
const LoginMentee = lazy(() => import("./page/loginMentee"));
const LoginCampus = lazy(() => import("./page/loginCampus"));
const LoginAdmin = lazy(() => import("./page/loginAdmin"));
const LoginMentor = lazy(() => import("./page/loginMentor"));
const CampusPage = lazy(() => import("./page/CampusPage"));
const JurusanPage = lazy(() => import("./page/JurusanPage"));
const CampusDetailPage = lazy(() => import("./components/CampusDetailPage"));
const DetailJurusan = lazy(() => import("./components/DetailJurusan"));
const CampusJurusanPage = lazy(() => import("./components/CampusJurusanPage"));
const CampusProgram = lazy(() => import("./components/CampusProgram"));
const CampusPrestasiPage = lazy(() =>
  import("./components/CampusPrestasiPage")
);
const PanduanPage = lazy(() => import("./page/PanduanPage"));

// Dashboard Mentee
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
const DetailProgramMentee = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardProgram")
);
const DashboardCampusPrestasi = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardCampusPrestasi")
);
const DashboardCampusJurusan = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardCampusJurusan")
);
const DashboardMenteeProgramDaftar = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashbordMenteeProgramDaftar")
);
const DashboardCampusProgram = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardCampusProgram")
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
const TestJurusan = lazy(() =>
  import("./page/Dashboard/DashboardMentee/Testjurusan")
);
const Penilaian = lazy(() =>
  import("./page/Dashboard/DashboardMentee/Penilaian")
);

// Dashboard Kampus
const DashboardCampus = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampus")
);
const DashboardAdmin = lazy(() =>
  import("./page/Dashboard/DashboardAdmin/DashboardAdmin")
);
const DashboardMentor = lazy(() =>
  import("@/page/Dashboard/DashboardMentor/DashboardMentor")
);

const KampusDataForm = lazy(() =>
  import("./page/Dashboard/DashboardCampus/KampusDataForm")
);
const KampusVerifikasi = lazy(() =>
  import("./page/Dashboard/DashboardCampus/KampusVerifikasi")
);
const KampusVerifikasiBerhasil = lazy(() =>
  import("./page/Dashboard/DashboardCampus/KampusVerifikasiBerhasil")
);
const KampusVerifikasiGagal = lazy(() =>
  import("./page/Dashboard/DashboardCampus/KampusVerifikasiGagal")
);
const DashboardCampusBeranda = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampusBeranda")
);

const Jurusan = lazy(() => import("./page/Dashboard/DashboardCampus/Jurusan"));
const DetailCampus = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DetailCampus")
);

// ✅ Perbaikan: import PRESTASI YANG BENAR
const CampusPrestasiDashboard = lazy(() =>
  import("./page/Dashboard/DashboardCampus/prestasi")
);

// ================= ROUTER =================

const router = createBrowserRouter([
  { path: "/", element: <SuspenseWrapper Component={LandingPage} /> },
  {
    path: "/login-mentee",
    element: <SuspenseWrapper Component={LoginMentee} />,
  },
  {
    path: "/login-campus",
    element: <SuspenseWrapper Component={LoginCampus} />,
  },
  { path: "/login-admin", element: <SuspenseWrapper Component={LoginAdmin} /> },
  {
    path: "/login-mentor",
    element: <SuspenseWrapper Component={LoginMentor} />,
  },
  { path: "/CampusPage", element: <SuspenseWrapper Component={CampusPage} /> },
  {
    path: "/JurusanPage",
    element: <SuspenseWrapper Component={JurusanPage} />,
  },

  // Campus detail publik
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

  // ======================= DASHBOARD CAMPUS =======================
  {
    path: "/dashboard-campus",
    element: <SuspenseWrapper Component={DashboardCampus} />,
    children: [
      {
        index: true,
        element: <SuspenseWrapper Component={DashboardCampusBeranda} />,
      },
      {
        path: "beranda",
        element: <SuspenseWrapper Component={DashboardCampusBeranda} />,
      },
      {
        path: "form-data",
        element: <SuspenseWrapper Component={KampusDataForm} />,
      },
      {
        path: "kampus-verifikasi",
        element: <SuspenseWrapper Component={KampusVerifikasi} />,
      },
      {
        path: "kampus-verifikasi-berhasil",
        element: <SuspenseWrapper Component={KampusVerifikasiBerhasil} />,
      },
      {
        path: "kampus-verifikasi-gagal",
        element: <SuspenseWrapper Component={KampusVerifikasiGagal} />,
      },

      // Jurusan Dashboard Campus
      { path: "jurusan", element: <SuspenseWrapper Component={Jurusan} /> },

      // ✅ PRESTASI DASHBOARD CAMPUS — SUDAH BENAR
      {
        path: "prestasi",
        element: <SuspenseWrapper Component={CampusPrestasiDashboard} />,
      },

      {
        path: "detailcampus",
        element: <SuspenseWrapper Component={DetailCampus} />,
      },
    ],
  },

  // ===================== Dashboard lainnya =====================
  {
    path: "/dashboard-admin",
    element: <SuspenseWrapper Component={DashboardAdmin} />,
  },
  {
    path: "/dashboard-mentor",
    element: <SuspenseWrapper Component={DashboardMentor} />,
  },

  // ===================== Dashboard Mentee =====================
  {
    path: "dashboard-mentee",
    element: <SuspenseWrapper Component={DashboardMenteePage} />,
    children: [
      {
        index: true,
        element: <SuspenseWrapper Component={DashboardMenteeBeranda} />,
      },
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

      {
        path: "kampus/:id",
        element: <SuspenseWrapper Component={DashboardCampusDetail} />,
        children: [
          { index: true, element: <CampusDescription /> },
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
    ],
  },
]);

export default router;
