/**
 * 서비스 페이지 공통 — 히어로 CTA 아래 한 줄 증거 + 견적 바로가기
 * (홈·사회자·클래식·재즈·뮤지컬·축가 히어로의 톤을 맞추기 위한 단일 컴포넌트)
 */

export default function HeroProof({
  pricingHref = "#pricing",
  className = "",
  total = "5,000+",
}: {
  total?: string;
  pricingHref?: string;
  className?: string;
}) {
  const go = (e: React.MouseEvent) => {
    if (!pricingHref.startsWith("#")) return;
    const el = document.querySelector(pricingHref);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <div className={`flex flex-col items-center gap-3 text-center ${className}`}>
      <a
        href={pricingHref}
        onClick={go}
        className="text-[13px] tracking-wide text-[#e8d5a3] underline underline-offset-[6px] decoration-[#c9a96e]/50 hover:decoration-[#c9a96e] transition-colors"
      >
        견적 바로 보기
      </a>
      <p
        className="flex flex-wrap items-center justify-center gap-x-4 min-[460px]:gap-x-3 gap-y-1 text-[11px] sm:text-xs leading-relaxed text-white/60"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
      >
        <span className="whitespace-nowrap">누적 후기 {total}</span>
        <span aria-hidden className="hidden text-[#c9a96e]/60 min-[460px]:inline">·</span>
        <span className="whitespace-nowrap">223곳 웨딩홀 진행</span>
        <span aria-hidden className="hidden text-[#c9a96e]/60 min-[460px]:inline">·</span>
        <span className="whitespace-nowrap">예식 전주까지 계약금 100% 환불</span>
      </p>
    </div>
  );
}
