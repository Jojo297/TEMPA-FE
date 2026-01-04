export default function LoadingSkeletonFetchRecomendationMajors() {
  // Buat array statis untuk meniru 3 item hasil yang dimuat
  const skeletonItems = [1, 2, 3];

  return (
    <div className="bg-gray-50 min-h-screen p-8 animate-pulse">
      <div className="max-w-4xl mx-auto">
        {/* Header dan judul - Skeleton */}
        <div className="mb-8">
          {/* Judul */}
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          {/* Paragraf */}
          <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        </div>

        {/* Daftar Hasil Rekomendasi - Skeleton */}
        <div className="space-y-6">
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-xl shadow-md border-l-4 border-gray-300"
            >
              {/* Nama Jurusan */}
              <div className="h-6 bg-primary/40 rounded w-2/5 mb-4"></div>

              {/* Deskripsi Kesesuaian */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bagian Penutup / Next Step - Skeleton */}
        <div className="mt-12 p-6 bg-gray-300 rounded-lg text-center shadow-md">
          {/* Judul Next Step */}
          <div className="h-6 bg-white/50 rounded w-1/3 mx-auto mb-4"></div>
          {/* Paragraf Penutup */}
          <div className="h-4 bg-white/50 rounded w-1/2 mx-auto mb-6"></div>
          {/* Tombol */}
          <div className="h-10 bg-secondary/50 rounded-lg w-40 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
