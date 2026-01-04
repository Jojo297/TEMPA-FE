import React from "react";

const DetailProgramSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* 1. Gambar Header Skeleton */}
      <div className="relative rounded-xl overflow-hidden shadow-md mb-10">
        {/* Skeleton untuk Gambar (Placeholder abu-abu dengan tinggi yang sama) */}
        <div className="w-full h-72 bg-gray-200 dark:bg-gray-700"></div>

        {/* Overlay konten di bawah gambar Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0E3B3D]/90 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            {/* Skeleton untuk Nama Program (H1) */}
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-64 mb-3"></div>

            {/* Skeleton untuk Tanggal Mulai */}
            <div className="flex items-center gap-2 mt-2">
              {/* Ikon Kalender Placeholder */}
              <div className="h-4 w-4 bg-gray-400 dark:bg-gray-500 rounded"></div>
              {/* Text Tanggal Placeholder */}
              <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-32"></div>
            </div>
          </div>

          {/* Skeleton untuk Tombol Daftar Sekarang */}
          <div className="mt-4 sm:mt-0 h-10 w-40 bg-[#B4D0E7]/80 rounded-md flex-shrink-0"></div>
        </div>
      </div>
      {/* --- */}

      {/* 2. Bagian Detail dan Mentor Skeleton (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Detail Program Skeleton (2 kolom) */}
        <div className="md:col-span-2 bg-white shadow-md rounded-xl p-6">
          {/* Judul Detail Program */}
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-6"></div>

          {/* Paragraf Deskripsi Placeholder */}
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>

          {/* Detail List (Tanggal dan Tempat) */}
          <ul className="space-y-3 text-sm">
            {/* Tanggal Pelaksanaan Skeleton */}
            <li className="flex items-center">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-28"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 ml-2"></div>
            </li>
            {/* Tempat Skeleton */}
            <li className="flex items-center">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 ml-2"></div>
            </li>
          </ul>

          {/* Fasilitas Skeleton */}
          <div className="mt-6">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-3"></div>
            <ul className="list-inside space-y-2 text-sm">
              {/* Item Fasilitas */}
              <li className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></li>
              <li className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></li>
              <li className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></li>
            </ul>
          </div>
        </div>
        {/* --- */}

        <div className="md:col-span-1 flex flex-col space-y-8">
          {/* Informasi Mentor Skeleton (1 kolom) */}
          <div className="bg-white shadow-md rounded-xl p-6 h-fit">
            {/* Judul Informasi Mentor */}
            <div className="h-14 bg-gray-300 dark:bg-gray-600 rounded w-full mb-6"></div>

            {/* Detail Mentor */}
            <div className="space-y-3 text-sm">
              {/* Nama Mentor */}
              <div className="flex items-center">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 ml-2"></div>
              </div>
              {/* Email Mentor */}
              <div className="flex items-center">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-14"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36 ml-2"></div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 h-fit">
            {/* Judul Informasi Mentor */}
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-40 mb-6"></div>

            {/* Detail Mentor */}
            <div className="space-y-3 text-sm">
              {/* Nama Mentor */}
              <div className="flex items-center">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 ml-2"></div>
              </div>
              {/* Email Mentor */}
              <div className="flex items-center">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-14"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36 ml-2"></div>
              </div>
            </div>
          </div>
          {/* --- */}
        </div>
      </div>
    </div>
  );
};

export default DetailProgramSkeleton;
