import roboterror from "@/assets/robot-error.png";

export default function NotFounPages({ message }) {
  return (
    <div className="col-span-full flex justify-center py-16 w-full">
      <div className="flex flex-col items-center justify-center">
        <img src={roboterror} alt="Belum Ada Aktivitas" className="w-40 mb-4" />
        <div className="text-center">
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
}
