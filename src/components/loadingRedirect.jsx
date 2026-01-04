export default function LoadingRedirect() {
  return (
    <>
      <div className="flex justify-center h-screen items-center flex-row gap-2">
        <div className="w-6 h-6 rounded-full bg-[#013B35] animate-bounce"></div>
        <div className="w-6 h-6 rounded-full bg-[#013B35] animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-6 h-6 rounded-full bg-[#013B35] animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </>
  );
}
