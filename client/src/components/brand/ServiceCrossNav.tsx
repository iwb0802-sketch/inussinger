/**
 * 서비스 페이지 공통 — 하단 "다른 연주도 함께" 이미지 카드 + 완성형 패키지
 * 한 브랜드 안에서 서비스를 오갈 수 있게 하는 통일된 연결 구조.
 * (개별 도메인 사이트용: 서비스 링크는 각 서비스의 독립 도메인으로 연결)
 */
import { ChevronRight } from "lucide-react";

type Key = "classic" | "jazz" | "musical" | "mc" | "singer";

const EXTRAS: { en: string; ko: string; desc: string; href: string; isNew?: boolean; badge?: string }[] = [
  { en: "Mobile Invitation", ko: "모바일 청첩장", desc: "이너스뮤직이 만드는 감성 모바일 청첩장. 예약을 완료하신 고객님께만 무료로 제공해 드리는 특별 혜택입니다.", href: "https://inuscard.com", badge: "예약 고객 무료" },
  { en: "Audio Editing", ko: "음원 편집", desc: "축가·행사에 사용할 음원을 원하는 구간과 톤으로 편집해 드리는 서비스입니다.", href: "https://www.inusmusic.com/audio", isNew: true },
  { en: "Pre-wedding Video", ko: "식전영상 제작", desc: "예식 전 상영할 영상을 온라인 에디터로 손쉽게 제작할 수 있는 서비스입니다.", href: "https://prewedding-video-renderer-production.up.railway.app/editor", isNew: true },
];

const ITEMS: { key: Key; en: string; ko: string; desc: string; href: string; img: string }[] = [
  { key: "mc", en: "Wedding MC", ko: "결혼식 사회", desc: "사회자 18인 중, 예식에 맞는 한 사람", href: "https://inusmc.co.kr", img: "https://uyhtppjapcdmaekfixve.supabase.co/storage/v1/object/public/inusmusic-assets/AuYlivFZrjsDexsU.webp" },
  { key: "classic", en: "Classic", ko: "클래식 연주", desc: "공간의 격을 높이는 현악 · 피아노", href: "https://www.inusclassic.kr", img: "/images/service-classic.webp" },
  { key: "jazz", en: "Jazz", ko: "재즈 연주", desc: "식전부터 행진까지 흐르는 라이브", href: "https://inusjazz.kr", img: "/images/service-jazz.webp" },
  { key: "musical", en: "Musical Wedding", ko: "뮤지컬웨딩", desc: "예식이 한 편의 공연이 되는 순간", href: "https://www.inusmw.kr", img: "/images/service-musical.webp" },
  { key: "singer", en: "Wedding Vocal", ko: "축가", desc: "검증된 현역 보컬리스트의 라이브", href: "https://inusmusic.kr", img: "/images/service-vocal.webp" },
];

export default function ServiceCrossNav({ current, background = "#0D0E12" }: { current: Key; background?: string }) {
  const others = ITEMS.filter((i) => i.key !== current);
  return (
    <section
      id="more-services"
      aria-labelledby="cross-nav-title"
      className="relative py-20 md:py-28"
      style={{ backgroundColor: background, borderTop: "1px solid rgba(201,169,110,0.14)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-14">
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C9A96E" }}>More from INUSMUSIC</p>
          <h2
            id="cross-nav-title"
            className="break-keep leading-snug"
            style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 700, fontSize: "clamp(1.4rem, 3.4vw, 2.1rem)", color: "#F0EFE9", wordBreak: "keep-all" }}
          >
            더 특별한 웨딩을 위한 제안
          </h2>
          <p className="mt-4 text-sm leading-[1.9] break-keep" style={{ color: "#8A8B93", wordBreak: "keep-all" }}>
            두 분의 예식에 어울리는 서비스를 더해<br />한층 깊은 감동을 선사합니다.
          </p>
          <div className="w-10 h-px mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {others.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-xl aspect-[4/5] sm:aspect-[3/4]"
              style={{ border: "1px solid #2A2B32", backgroundColor: "#141519" }}
            >
              <img src={s.img} alt={s.ko} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,14,18,0.05) 30%, rgba(13,14,18,0.92) 100%)" }} />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1.5" style={{ color: "#C9A96E", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>{s.en}</p>
                <h3 className="text-base sm:text-lg font-semibold" style={{ fontFamily: "'Noto Serif KR', serif", color: "#F0EFE9" }}>{s.ko}</h3>
                <p className="mt-1.5 text-xs leading-relaxed break-keep hidden sm:block" style={{ color: "rgba(240,239,233,0.7)", wordBreak: "keep-all" }}>{s.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium" style={{ color: "#5BB5A2" }}>
                  자세히 보기 <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <a
          href="https://www.inusmusic.com/package"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl px-6 py-6 sm:px-8 transition-colors hover:bg-[#C9A96E]/[0.07]"
          style={{ border: "1px solid rgba(201,169,110,0.4)", background: "linear-gradient(135deg, rgba(201,169,110,0.08), rgba(91,181,162,0.04))" }}
        >
          <div>
            <p className="text-xs tracking-[0.25em] uppercase mb-2" style={{ color: "#C9A96E" }}>Premium Package</p>
            <p className="text-lg font-semibold break-keep" style={{ fontFamily: "'Noto Serif KR', serif", color: "#F0EFE9", wordBreak: "keep-all" }}>완성형 패키지</p>
            <p className="mt-1.5 text-sm break-keep" style={{ color: "#8A8B93", wordBreak: "keep-all" }}>사회 · 연주 · 축가를 하나로 묶은 구성을 확인해 보세요</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap" style={{ color: "#C9A96E" }}>
            패키지 자세히 보기 <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </a>

        <div className="mt-10 md:mt-14">
          <p className="text-center text-xs tracking-[0.3em] uppercase mb-4 md:mb-5" style={{ color: "#8A8B93" }}>함께 준비하면 좋은 서비스</p>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 max-md:overflow-hidden max-md:rounded-xl max-md:border max-md:border-[#2A2B32] max-md:divide-y max-md:divide-[#2A2B32]">
            {EXTRAS.map((x) => (
              <a
                key={x.en}
                href={x.href}
                {...(x.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-start justify-between gap-4 bg-[#141519] px-4 py-3.5 md:rounded-xl md:border md:border-[#2A2B32] md:px-5 md:py-5 transition-colors md:hover:border-[#C9A96E]/40"
              >
                <div className="min-w-0">
                  <p className="hidden md:block text-xs tracking-[0.2em] uppercase mb-1.5" style={{ color: "#C9A96E", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>{x.en}</p>
                  <p className="flex items-center gap-2 text-base font-semibold" style={{ fontFamily: "'Noto Serif KR', serif", color: "#F0EFE9" }}>
                    {x.ko}
                    {x.isNew && <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold tracking-wide leading-none" style={{ backgroundColor: "rgba(201,169,110,0.2)", color: "#C9A96E" }}>NEW</span>}
                    {x.badge && <span className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide leading-none whitespace-nowrap" style={{ backgroundColor: "rgba(91,181,162,0.16)", color: "#5BB5A2" }}>{x.badge}</span>}
                  </p>
                  <p className="mt-1 md:mt-2 text-xs leading-relaxed break-keep text-pretty" style={{ color: "#8A8B93", wordBreak: "keep-all" }}>{x.desc}</p>
                </div>
                <ChevronRight size={15} className="mt-1 shrink-0 transition-transform group-hover:translate-x-1" style={{ color: "#5BB5A2" }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
