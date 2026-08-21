import Image from "next/image";

/**
 * Maintenance page shown when MAINTENANCE_MODE is enabled.
 * Clean, corporate design matching PT Lugas Inti Semesta branding.
 */
export function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0F1A24]">
      {/* Background gradient layers */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0F1A24 0%, #1B2733 40%, #23303D 70%, #2D3E4F 100%)",
        }}
      />

      {/* Subtle diagonal accent strip */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background:
            "linear-gradient(135deg, transparent 55%, #F5A623 100%)",
        }}
      />

      {/* Animated subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-10">
          <Image
            src="/luise-logo.png"
            alt="PT Lugas Inti Semesta"
            width={180}
            height={60}
            className="h-14 w-auto brightness-0 invert opacity-90"
            priority
          />
        </div>

        {/* Accent line */}
        <div className="w-16 h-1 bg-[#F5A623] rounded-full mb-8" />

        {/* Main heading */}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5"
          style={{
            fontFamily: "var(--font-heading), var(--font-sans), sans-serif",
            color: "#F5F5F5",
          }}
        >
          Website Under Maintenance
        </h1>

        {/* Subtext */}
        <p
          className="text-base md:text-lg leading-relaxed max-w-xl"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
        >
          Website PT Lugas Inti Semesta saat ini sedang dalam proses
          pemeliharaan dan pembaruan sistem. Website akan kembali tersedia
          setelah proses selesai.
        </p>

        {/* Decorative bottom accent */}
        <div className="mt-12 flex items-center gap-2 opacity-40">
          <div className="w-2 h-2 rounded-full bg-[#F5A623]" />
          <div className="w-8 h-[2px] bg-[#F5A623] rounded-full" />
          <div className="w-2 h-2 rounded-full bg-[#F5A623]" />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F5A623] to-transparent opacity-30" />
    </div>
  );
}
