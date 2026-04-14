export default function HeaderPage({ title, description, badge }) {
  return (
    <div className="relative mb-10 overflow-hidden rounded-3xl border border-primary/40 bg-primary p-10 md:p-8 shadow-lg backdrop-blur-xl">
      {/* Glow left top */}
      <div className="absolute -left-16 -top-16 h-80 w-80 rounded-full bg-emerald-400/20 blur-[100px] pointer-events-none" />

      {/* Glow right bottom */}
      <div className="absolute -right-16 -bottom-16 h-80 w-80 rounded-full bg-emerald-600/30 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Badge Premium */}
        <div className="mb-6 rounded-full bg-white/5 px-4 py-1.5 border border-white/10 backdrop-blur-md">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-100/80">
            Explore {badge}
          </p>
        </div>

        {/* title */}
        <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-4xl drop-shadow-2xl">
          {title}
        </h1>

        {/* Divider Gradient */}
        <div className="mb-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

        {/* description */}
        <p className="max-w-3xl text-base font-normal leading-relaxed text-white/80 md:text-md drop-shadow-sm">
          {description}
        </p>
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
