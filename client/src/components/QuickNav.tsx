import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MINT = "#5BBCB4";
const DARK = "#0e1a18";

const SECTIONS = [
  { id: "intro",            label: "소개" },
  { id: "trust",            label: "특징" },
  { id: "service",          label: "서비스" },
  { id: "reviews",          label: "후기" },
  { id: "singer-profiles",  label: "싱어" },
  { id: "video",            label: "영상" },
  { id: "pricing",          label: "요금" },
  { id: "additional-options", label: "추가옵션" },
];

export default function QuickNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(false);

  // 스크롤 100px 이상이면 표시
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 현재 보이는 섹션 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      {/* 펼쳐지는 메뉴 패널 */}
      <div
        className="flex flex-col overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          width: open ? "88px" : "0px",
          opacity: open ? 1 : 0,
          fontFamily: '"Noto Sans KR", sans-serif',
        }}
      >
        <div
          className="py-2 border border-r-0 shadow-2xl"
          style={{
            backgroundColor: "rgba(14,26,24,0.95)",
            backdropFilter: "blur(12px)",
            borderColor: `${MINT}30`,
          }}
        >
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="w-full text-left px-4 py-2.5 text-xs tracking-wide transition-all duration-200 whitespace-nowrap"
              style={{
                color: active === id ? MINT : "rgba(232,248,247,0.55)",
                backgroundColor: active === id ? `${MINT}18` : "transparent",
                borderLeft: active === id ? `2px solid ${MINT}` : "2px solid transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 토글 버튼 */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="퀵 메뉴"
        className="flex flex-col items-center justify-center gap-1 px-1.5 py-5 transition-all duration-300 shadow-lg group"
        style={{
          backgroundColor: open ? "rgba(14,26,24,0.95)" : "rgba(14,26,24,0.70)",
          backdropFilter: "blur(8px)",
          border: `1px solid ${MINT}30`,
          borderRadius: "4px 0 0 4px",
        }}
      >
        {open ? (
          <ChevronRight className="w-3 h-3 transition-colors" style={{ color: `${MINT}b0` }} />
        ) : (
          <ChevronLeft className="w-3 h-3 transition-colors" style={{ color: `${MINT}b0` }} />
        )}
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "0.15em",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            color: `${MINT}99`,
            fontFamily: '"Noto Sans KR", sans-serif',
          }}
        >
          메뉴
        </span>
      </button>
    </div>
  );
}
