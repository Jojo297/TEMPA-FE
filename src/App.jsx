import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingRedirect from "./components/loadingRedirect";
import CampusDescription from "./components/CampusDescription";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

const SuspenseWrapper = ({ Component }) => (
  <Suspense fallback={<LoadingRedirect />}>
    <ScrollToTop />
    <Component />
  </Suspense>
);

// --- Lazy Imports ---
const LandingPage = lazy(() => import("./page/Landingpage"));
// const LoginMentee = lazy(() => import("./page/loginMentee"));
const LoginCampus = lazy(() => import("./page/loginCampus"));
const LoginAdmin = lazy(() => import("./page/loginAdmin"));
const LoginMentor = lazy(() => import("./page/loginMentor"));
const CampusPage = lazy(() => import("./page/CampusPage"));
const JurusanPage = lazy(() => import("./page/JurusanPage"));
const Kontak = lazy(() => import("./page/Kontak"));
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
  import("./page/Dashboard/DashboardMentee/DashboardMenteeBeranda")
);
const DashboardProgram = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardMenteeProgram")
);
const DashboardMenteeCampus = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardMenteeCampus")
);
const DashboardCampusDetail = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardMenteeCampusDetail")
);
const DashboardMenteeDetailProgram = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardMenteeDetailProgram")
);
const DashboardCampusPrestasi = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardMenteeCampusPrestasi")
);
const DashboardCampusJurusan = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardMenteeCampusJurusan")
);
const DashboardMenteeProgramDaftar = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashbordMenteeProgramDaftar")
);
const DashboardMenteeCampusProgram = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardMenteeCampusProgram")
);
const DashboardJurusan = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardMenteeJurusan")
);
const DashboardJurusanDetail = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardMenteeJurusanDetail")
);
const DashboardTestJurusanForm = lazy(() =>
  import("@/page/Dashboard/DashboardMentee/DashboardMenteeTestJurusanForm")
);

const Penilaian = lazy(() =>
  import("./page/Dashboard/DashboardMentee/Penilaian")
);
const DashboardMenteeMateri = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardMenteeMateri")
);
const DashboardMenteeProfil = lazy(() =>
  import("./page/Dashboard/DashboardMentee/DashboardMenteeProfil")
);

// Dashboard Kampus
const DashboardCampus = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampus")
);

const DashboardCampusRegisterMitra = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampusRegisterMitra")
);
const DashboardCampusEditRegisterMitra = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampusEditRegisterMitra")
);
const DashboardCampusVerivication = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampusVerivication")
);
const KampusVerifikasiBerhasil = lazy(() =>
  import("./page/Dashboard/DashboardCampus/CampusVerificationAccept")
);
const KampusVerifikasiGagal = lazy(() =>
  import("./page/Dashboard/DashboardCampus/KampusVerifikasiGagal")
);
const DashboardCampusBeranda = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampusBeranda")
);
// --- NEW IMPORT ---
const DashboardCampusBerlangganan = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampusBerlangganan")
);

//Dashboard Admin
const DashboardAdmin = lazy(() =>
  import("./page/Dashboard/DashboardAdmin/DashboardAdmin")
);
const DashboardAdminBeranda = lazy(() =>
  import("./page/Dashboard/DashboardAdmin/DashboardAdminBeranda")
);
const DashboardAdminVerivication = lazy(() =>
  import("./page/Dashboard/DashboardAdmin/DashboardAdminVerivication")
);
const DashboardAdminCampus = lazy(() =>
  import("./page/Dashboard/DashboardAdmin/DashboardAdminCampus")
);
const DashboardAdminCampusDetail = lazy(() =>
  import("./page/Dashboard/DashboardAdmin/DashboardAdminCampusDetail")
);
const DashboardAdminMentee = lazy(() =>
  import("./page/Dashboard/DashboardAdmin/DashboardAdminMentee")
);
const DashboardAdminServices = lazy(() =>
  import("./page/Dashboard/DashboardAdmin/DashboardAdminServices")
);
const DashboardAdminProgram = lazy(() =>
  import("./page/Dashboard/DashboardAdmin/DashboardAdminProgram")
);
const DashboardAdminDetailProgram = lazy(() =>
  import("./page/Dashboard/DashboardAdmin/DashboardAdminDetailProgram")
);

// ------------------

const Jurusan = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampusJurusan")
);

const DetailCampus = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampusDetailCampus")
);

const DashboardCampusDetailProgram = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampusDetailProgram")
);

const DashboardCampusProgram = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampusProgram")
);

const CampusPrestasiDashboard = lazy(() =>
  import("./page/Dashboard/DashboardCampus/prestasi")
);

const CampusFirst = lazy(() =>
  import("./page/Dashboard/DashboardCampus/CampusFirst")
);

const DashboardCampusWaitingRegisterMitra = lazy(() =>
  import("./page/Dashboard/DashboardCampus/CampusVerificationPending")
);

const DashboardCampusAddProgram = lazy(() =>
  import("./page/Dashboard/DashboardCampus/DashboardCampusAddProgram")
);
// dashboard mentor
const DashboardMentorBeranda = lazy(() =>
  import("./page/Dashboard/DashboardMentor/DashboardMentorBeranda")
);
const DashboardMentorDeskripsi = lazy(() =>
  import("./page/Dashboard/DashboardMentor/ProgramDeskripsi")
);
const DashboardMentorPeserta = lazy(() =>
  import("./page/Dashboard/DashboardMentor/ProgramPeserta")
);

const DashboardMentor = lazy(() =>
  import("./page/Dashboard/DashboardMentor/DashboardMentor")
);

const DashboardMentorProgramDetail = lazy(() =>
  import("@/page/Dashboard/DashboardMentor/DashboardMentorProgramDetail")
);
const DashboardMentorProgram = lazy(() =>
  import("@/page/Dashboard/DashboardMentor/DashboardMentorProgram")
);
const DashboardMentorAddProgram = lazy(() =>
  import("./page/Dashboard/DashboardMentor/DashboardMentorAddProgram")
);
const DashboardMentorDetailCampus = lazy(() =>
  import("./page/Dashboard/DashboardMentor/DashboardMentorDetailCampus")
);

const NotFounPages = lazy(() => import("@/components/NotFoundPage"));

// ================= ROUTER =================

const router = createBrowserRouter([
  { path: "/", element: <SuspenseWrapper Component={LandingPage} /> },
  // {
  //   path: "/login-mentee",
  //   element: <SuspenseWrapper Component={LoginMentee} />,
  // },
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
  }, // Campus detail publik

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
  {
    path: "/kontak",
    element: <SuspenseWrapper Component={Kontak} />,
  },

  // ======================= DASHBOARD CAMPUS =======================
  {
    path: "/dashboard-campus",
    element: (
      <SuspenseWrapper
        Component={() => (
          <ProtectedRoute
            Component={DashboardCampus}
            allowedRoles={["campus"]}
          />
        )}
      />
    ),
    children: [
      {
        index: true,
        element: <SuspenseWrapper Component={DashboardCampusBeranda} />,
      },
      {
        path: "beranda",
        element: <SuspenseWrapper Component={DashboardCampusBeranda} />,
      },

      { path: "jurusan", element: <SuspenseWrapper Component={Jurusan} /> },

      {
        path: "prestasi",
        element: <SuspenseWrapper Component={CampusPrestasiDashboard} />,
      },
      {
        path: "detailcampus",
        element: <SuspenseWrapper Component={DetailCampus} />,
      },
      {
        path: "program",
        element: <SuspenseWrapper Component={DashboardCampusProgram} />,
      },
      {
        path: "program/:id",
        element: <SuspenseWrapper Component={DashboardCampusDetailProgram} />,
      },
      {
        path: "add-program",
        element: <SuspenseWrapper Component={DashboardCampusAddProgram} />,
      },
      {
        path: "berlangganan",
        element: <SuspenseWrapper Component={DashboardCampusBerlangganan} />,
      },
    ],
  },

  // Dashboard campus verification routes
  {
    path: "/campus-verification",
    element: (
      <ProtectedRoute
        Component={DashboardCampusVerivication}
        allowedRoles={["campus"]}
      />
    ),
    children: [
      {
        index: true,
        path: "welcome",
        element: <SuspenseWrapper Component={CampusFirst} />,
      },
      {
        path: "form-data",
        element: <SuspenseWrapper Component={DashboardCampusRegisterMitra} />,
      },
      {
        path: "edit-form-data",
        element: (
          <SuspenseWrapper Component={DashboardCampusEditRegisterMitra} />
        ),
      },
      {
        path: "waiting-register-mitra",
        element: (
          <SuspenseWrapper Component={DashboardCampusWaitingRegisterMitra} />
        ),
      },
    ],
  },

  // ======================= DASHBOARD MENTEE =======================
  {
    path: "dashboard-mentee",
    element: (
      <SuspenseWrapper
        Component={() => (
          <ProtectedRoute
            Component={DashboardMenteePage}
            allowedRoles={["mentee"]}
          />
        )}
      />
    ),
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
        element: <SuspenseWrapper Component={DashboardMenteeDetailProgram} />,
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
        path: "materi/:id",
        element: <SuspenseWrapper Component={DashboardMenteeMateri} />,
      },
      {
        path: "profil",
        element: <SuspenseWrapper Component={DashboardMenteeProfil} />,
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
            element: (
              <SuspenseWrapper Component={DashboardMenteeCampusProgram} />
            ),
          },
        ],
      },
    ],
  },

  // dashboard mentor
  {
    path: "dashboard-mentor",
    element: (
      <SuspenseWrapper
        Component={() => (
          <ProtectedRoute
            Component={DashboardMentor}
            allowedRoles={["mentor"]}
          />
        )}
      />
    ),
    // element:
    //  (
    // <ProtectedRoute
    // element: <SuspenseWrapper Component={DashboardMentor} />,
    // allowedRoles={["mentor"]}
    // />
    // )
    children: [
      {
        index: true,
        element: <SuspenseWrapper Component={DashboardMentorBeranda} />,
      },
      {
        path: "beranda",
        element: <SuspenseWrapper Component={DashboardMentorBeranda} />,
      },
      {
        path: "deskripsi/:id",
        element: <SuspenseWrapper Component={DashboardMentorDeskripsi} />,
      },
      {
        path: "deskripsi/:id/peserta",
        element: <SuspenseWrapper Component={DashboardMentorPeserta} />,
      },
      {
        path: "program/",
        element: <SuspenseWrapper Component={DashboardMentorProgram} />,
      },
      {
        path: "program/:id",
        element: <SuspenseWrapper Component={DashboardMentorProgramDetail} />,
      },
      {
        path: "add-program",
        element: <SuspenseWrapper Component={DashboardMentorAddProgram} />,
      },
      {
        path: "detail-campus",
        element: <SuspenseWrapper Component={DashboardMentorDetailCampus} />,
      },
    ],
  },

  // ======================= DASHBOARD ADMIN =======================
  {
    path: "dashboard-admin",
    element: (
      <SuspenseWrapper
        Component={() => (
          <ProtectedRoute Component={DashboardAdmin} allowedRoles={["admin"]} />
        )}
      />
    ),
    children: [
      {
        index: true,
        element: <SuspenseWrapper Component={DashboardAdminBeranda} />,
      },
      {
        path: "beranda",
        element: <SuspenseWrapper Component={DashboardAdminBeranda} />,
      },
      {
        path: "verifikasi-campus/:id",
        element: <SuspenseWrapper Component={DashboardAdminVerivication} />,
      },
      {
        path: "kampus",
        element: <SuspenseWrapper Component={DashboardAdminCampus} />,
      },
      {
        path: "detail-kampus/:id",
        element: <SuspenseWrapper Component={DashboardAdminCampusDetail} />,
      },
      {
        path: "mentee",
        element: <SuspenseWrapper Component={DashboardAdminMentee} />,
      },
      {
        path: "services",
        element: <SuspenseWrapper Component={DashboardAdminServices} />,
      },
      {
        path: "program",
        element: <SuspenseWrapper Component={DashboardAdminProgram} />,
      },
      {
        path: "program/:id",
        element: <SuspenseWrapper Component={DashboardAdminDetailProgram} />,
      },
    ],
  },
  // ===================== Dashboard lainnya =====================

  {
    path: "*",
    element: <SuspenseWrapper Component={NotFounPages} />,
  },
]);

export default router;
