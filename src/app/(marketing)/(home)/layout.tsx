import { AnnouncementBar, SiteFooter, SiteHeader } from "@/components/layout";

export default function MarketingHomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-[#ff4e3a] px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/80"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <AnnouncementBar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
