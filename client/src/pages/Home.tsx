/**
 * 이너스뮤직 축가 상품안내 랜딩페이지
 * Design: 사회 상품 홈페이지와 동일한 디자인 시스템
 * - 브랜드 컬러: 민트 (#5BBCB4)
 * - 다크/라이트 섹션 교차
 * - 영문 대문자 섹션 라벨 + 한글 제목
 * - Playfair Display + Noto Sans KR
 * - 네비게이션 바 (sticky, 민트 CTA)
 * - 플로팅 버튼 (카카오톡 + 싱어 프로필) - 3초 라벨 표시
 */
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mic, Music, Star, CheckCircle, Calendar, Users,
  MessageSquare, ChevronDown, ChevronLeft, ChevronRight,
  Play, Award, Shield, Heart, Phone, ExternalLink,
  Sparkles, FileText, Headphones, Clock, MapPin, User, X
} from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import InusCardPopup from "@/components/InusCardPopup";
import FloatingButtonsNew from "@/components/FloatingButtons";

/* ─── Image URLs ─── */
const IMAGES = {
  hero: "/images/hero-banner.webp",
  singer: "/images/singer-stage.webp",
  reviewBg: "/images/hero-banner.webp",
  eventBg: "/images/hero-banner.webp",
  ctaBg: "/images/singer-stage.webp",
};

const MINT = "#5BBCB4";
const DARK_BG = "#1a1a1a";
const DARK_CARD = "#222222";

/* ─── Links ─── */
const LINKS = {
  kakao: "https://pf.kakao.com/_wxovaM/chat",
  package: "https://blog.naver.com/inusmusics/220652965646",
  reviewAll: "http://musicin.godohosting.com/bbs/board.php?bo_table=forum",
  singerPremium: "https://blog.naver.com/PostThumbnailList.nhn?blogId=inusmusics&from=postList&categoryNo=60",
  singerBest: "https://blog.naver.com/PostThumbnailList.nhn?blogId=inusmusics&from=postList&categoryNo=70",
  singerStandard: "https://blog.naver.com/PostThumbnailList.nhn?blogId=inusmusics&from=postList&categoryNo=61",
  ctaVideo: "https://blog.naver.com/PostThumbnailList.nhn?blogId=inusmusics&from=postList&categoryNo=32",
  ctaReserve: "https://blog.naver.com/inusmusics/223023961320",
  ctaReview: "https://blog.naver.com/inusmusics/223023835728",
  ctaHistory: "https://blog.naver.com/inusmusics/221231802647",
  ctaBooking: "http://inusmusics.dothome.co.kr/xe/board_nOmW18/",
};

/* ─── Song Links ─── */
const SONGS = [
  { artist: "규현", song: "화려하지 않은 고백", url: "https://www.youtube.com/watch?v=EIlHbCfHUfI" },
  { artist: "구윤회", song: "Marry Me", url: "https://www.youtube.com/watch?v=c8LUBh939qQ" },
  { artist: "성시경", song: "내게 오는 길", url: "https://www.youtube.com/watch?v=zH3OWtNIFcA" },
  { artist: "이선희", song: "그중에 그대를 만나", url: "https://www.youtube.com/watch?v=y_3FwSTIM8w" },
  { artist: "제이세라", song: "언제나 사랑해", url: "https://www.youtube.com/watch?v=8v3ecTXfycY" },
  { artist: "케이시", song: "너의 발걸음에 빛을 비춰줄게", url: "https://www.youtube.com/watch?v=ncOaEidJbos" },
  { artist: "정인", song: "오르막길", url: "https://www.youtube.com/watch?v=XCfVOudIBlQ" },
  { artist: "멜로망스", song: "선물", url: "https://www.youtube.com/watch?v=KZPlcGF7fA8" },
  { artist: "이석훈", song: "그대를 사랑하는 10가지 이유", url: "https://www.youtube.com/watch?v=i8wAJXBbJJY" },
  { artist: "전미도", song: "사랑하게 될 줄 알았어", url: "https://www.youtube.com/watch?v=9JzqLSJX3n8" },
];

/* ─── Video Links (수정: 첫번째 영상 링크 교체) ─── */
const VIDEOS = [
  { url: "https://youtu.be/_myxQGKKK2U", id: "_myxQGKKK2U", label: "축가 영상 1" },
  { url: "https://youtu.be/XCfVOudIBlQ?si=V00v6zWX5YPJlbbd", id: "XCfVOudIBlQ", label: "축가 영상 2" },
  { url: "https://youtu.be/Oq3INO5PIsU?si=e6yWxdrYW_Y3CtOS", id: "Oq3INO5PIsU", label: "축가 영상 3" },
];

/* ─── Review Images ─── */
const REVIEW_IMAGES: string[] = [
  "/images/review1_aeb003e0.jpg",
  "/images/review2_6784a278.jpg",
  "/images/review3_9b079cec.jpg",
  "/images/review4_247501cc.jpg",
  "/images/review5_fff60f93.jpg",
  "/images/review6_1c1707e6.jpg",
  "/images/review7_8d1ec07b.jpg",
];

/* ─── Singer Profiles ─── */
const SINGER_PROFILES: { name: string; career: string; desc: string; image: string; profileUrl: string; grade: "premium" | "best" | "standard"; styles: string[]; videoId?: string }[] = [
  { name: "김영일", career: "축가 400회 이상", desc: "부드럽고 섬세한 음색의 감성 보컬", image: "/images/singer_kimyoungil_787db8ce.jpg", profileUrl: "https://blog.naver.com/inusmusics/220681337963", grade: "best", styles: ["감성형", "가창력형"], videoId: "i8wAJXBbJJY" },
  { name: "제은빈", career: "축가 500회 이상", desc: "풍부한 경험과 안정적인 라이브로 사랑받는 싱어", image: "/images/singer_jeeunbin_9523ebe9.jpg", profileUrl: "https://blog.naver.com/inusmusics/223539681185", grade: "premium", styles: ["감동형", "가창력형", "뮤지컬형"], videoId: "FxqeCCIcRMM" },
  { name: "박달해", career: "축가 400회 이상", desc: "따뜻한 음색으로 하객의 마음을 사로잡는 싱어", image: "/images/singer_parkdalhae_2db130ed.jpg", profileUrl: "https://blog.naver.com/inusmusics/220678041150", grade: "premium", styles: ["감동형", "가창력형", "뮤지컬형"], videoId: "10dA7Bc-BvA" },
  { name: "이윤주", career: "축가 400회 이상", desc: "다채로운 장르를 소화하는 실력파 싱어", image: "/images/singer_leeyunju_af81750f.jpg", profileUrl: "https://blog.naver.com/inusmusics/223660600728", grade: "best", styles: ["감성형", "뮤지컬형"] },
  { name: "서동준", career: "축가 300회 이상", desc: "깊은 울림의 보컬로 감동을 선사하는 싱어", image: "/images/singer_seodongjun_059211c6.jpg", profileUrl: "https://blog.naver.com/inusmusics/223969101745", grade: "standard", styles: ["감동형", "감성형", "가창력형"], videoId: "Oq3INO5PIsU" },
  { name: "권소이", career: "축가 500회 이상", desc: "풍부한 감성과 안정적인 라이브로 사랑받는 프리미엄 싱어", image: "/images/singer_kwonsoi.jpg", profileUrl: "https://blog.naver.com/inusmusics/224307108463", grade: "premium", styles: ["감동형", "가창력형", "뮤지컬형"], videoId: "J_QfTfWz1CI" },
  { name: "최병준", career: "축가 300회 이상", desc: "탄탄한 기본기와 진심 어린 무대로 감동을 전하는 싱어", image: "/images/singer_choibyungjun.jpg", profileUrl: "https://blog.naver.com/inusmusics/224307114690", grade: "standard", styles: ["감성형", "가창력형"], videoId: "Ux5ouZOgyj0" },
];

const SINGER_STYLE_FILTERS = [
  { key: "전체", label: "전체", desc: "" },
  { key: "감동형", label: "감동형", desc: "진한 감성과 몰입감 있는 무대" },
  { key: "감성형", label: "감성형", desc: "편안하고 자연스러운 분위기" },
  { key: "가창력형", label: "가창력형", desc: "폭발적인 성량과 안정적인 라이브" },
  { key: "뮤지컬형", label: "뮤지컬형", desc: "드라마틱한 표현력과 무대장악력" },
];

/* ─── Animated Section ─── */
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Counter Animation ─── */
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── Section Label ─── */
function SectionLabel({ en, sub }: { en: string; sub?: string }) {
  return (
    <div className="text-center mb-4">
      <p className="text-xs tracking-[0.25em] uppercase" style={{ color: MINT }}>
        {en}
      </p>
      {sub && <p className="text-xs text-gray-400 tracking-wider mt-1">{sub}</p>}
    </div>
  );
}

/* ─── Review Slider ─── */
function ReviewSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="text-center p-12 rounded-xl border border-gray-200 bg-white">
        <p className="text-gray-400 text-sm">후기 이미지가 준비 중입니다</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="relative aspect-[4/3] md:aspect-[16/9]">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`고객 후기 ${current + 1}`}
            className="absolute inset-0 w-full h-full object-contain bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 py-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "w-6" : "bg-gray-300"}`}
            style={i === current ? { backgroundColor: MINT } : {}}
          />
        ))}
      </div>
      {/* Counter */}
      <p className="text-center text-xs text-gray-400 pb-3">
        {current + 1} / {images.length}
      </p>
    </div>
  );
}

/* ─── Singer Grid (그리드 카드 + 상세 프로필 패널) ─── */
function SingerStyleFilter() {
  const [activeStyle, setActiveStyle] = useState("전체");
  const [selectedSinger, setSelectedSinger] = useState<typeof SINGER_PROFILES[0] | null>(null);

  const filtered = activeStyle === "전체"
    ? SINGER_PROFILES
    : SINGER_PROFILES.filter((s) => s.styles.includes(activeStyle));

  // 필터 앞글자 매핑
  const FILTER_ABBR: Record<string, string> = {
    "전체": "전체",
    "감동형": "감동",
    "감성형": "감성",
    "가창력형": "가창",
    "뮤지컬형": "뮤지",
  };

  // 등급 스타일
  const gradeStyle = (grade: string) => {
    if (grade === 'premium') return { bg: 'linear-gradient(135deg, #C9973A 0%, #E8C56A 50%, #C9973A 100%)', color: '#fff', label: 'P' };
    if (grade === 'best') return { bg: MINT, color: '#fff', label: 'B' };
    return { bg: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)', label: 'S' };
  };

  return (
    <div>
      {/* 필터 배지 — 오른쪽 정렬 */}
      <div className="flex justify-end items-center gap-1.5 mb-8">
        <span className="text-white/30 text-xs mr-1 tracking-wider">FILTER</span>
        {SINGER_STYLE_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveStyle(f.key)}
            className="transition-all duration-200 font-semibold tracking-wider"
            style={{
              fontSize: '10px',
              padding: '4px 10px',
              borderRadius: '20px',
              backgroundColor: activeStyle === f.key ? MINT : 'rgba(255,255,255,0.07)',
              color: activeStyle === f.key ? '#fff' : 'rgba(255,255,255,0.45)',
              border: activeStyle === f.key ? `1.5px solid ${MINT}` : '1.5px solid rgba(255,255,255,0.1)',
              letterSpacing: '0.08em',
              boxShadow: activeStyle === f.key ? `0 0 12px ${MINT}55` : 'none',
            }}
          >
            {FILTER_ABBR[f.key] ?? f.key}
          </button>
        ))}
      </div>

      {/* 필터 설명 리스트 */}
      <div className="flex flex-wrap justify-end gap-x-4 gap-y-1 mb-6 -mt-4">
        {SINGER_STYLE_FILTERS.filter((f) => f.desc).map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveStyle(f.key)}
            className="flex items-center gap-1.5 text-xs transition-all duration-200"
            style={{ color: activeStyle === f.key ? MINT : 'rgba(255,255,255,0.3)' }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: activeStyle === f.key ? MINT : 'rgba(255,255,255,0.2)' }}
            />
            <span style={{ fontWeight: activeStyle === f.key ? 600 : 400 }}>
              {FILTER_ABBR[f.key] ?? f.key}
            </span>
            <span style={{ color: activeStyle === f.key ? 'rgba(91,188,180,0.8)' : 'rgba(255,255,255,0.2)' }}>
              {f.desc}
            </span>
          </button>
        ))}
      </div>

      {/* 싱어 그리드 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStyle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
        >
          {filtered.map((singer, i) => {
            const gs = gradeStyle(singer.grade);
            return (
              <motion.button
                key={singer.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                onClick={() => setSelectedSinger(selectedSinger?.name === singer.name ? null : singer)}
                className="relative group rounded-xl overflow-hidden text-left transition-all duration-300"
                style={{
                  backgroundColor: DARK_CARD,
                  border: selectedSinger?.name === singer.name ? `1.5px solid ${MINT}` : '1.5px solid rgba(255,255,255,0.07)',
                  boxShadow: selectedSinger?.name === singer.name ? `0 0 20px ${MINT}33` : 'none',
                }}
              >
                {/* 사진 */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={singer.image}
                    alt={singer.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {/* 등급 배지 — 오른쪽 상단 */}
                  <span
                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold shadow-lg"
                    style={{
                      background: gs.bg,
                      color: gs.color,
                      boxShadow: singer.grade === 'premium' ? '0 2px 8px rgba(201,151,58,0.5)' : singer.grade === 'best' ? `0 2px 8px ${MINT}66` : 'none',
                    }}
                  >
                    {gs.label}
                  </span>
                  {/* 이름 */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {singer.name}
                    </p>
                    <p className="text-white/50 text-[10px] mt-0.5">{singer.career}</p>
                  </div>
                </div>
                {/* 스타일 태그 */}
                <div className="px-2.5 py-2 flex flex-wrap gap-1">
                  {singer.styles.map((st) => (
                    <span key={st} className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(91,188,180,0.12)', color: MINT }}>
                      {FILTER_ABBR[st] ?? st}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* 싱어 프로필 모달 */}
      <AnimatePresence>
        {selectedSinger && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
            onClick={() => setSelectedSinger(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ backgroundColor: DARK_CARD, maxHeight: '90vh', overflowY: 'auto', maxWidth: selectedSinger.videoId ? '560px' : '672px' }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedSinger.videoId ? (
                /* 영상 모달: 세로 레이아웃 (영상 상단 + 정보 하단) */
                <div className="flex flex-col">
                  {/* 16:9 영상 영역 */}
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedSinger.videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`}
                      title={`${selectedSinger.name} 축가 영상`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 'none' }}
                    />
                  </div>
                  {/* 정보 영역 */}
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: MINT }}>SINGER PROFILE</p>
                        <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                          {selectedSinger.name}
                        </h3>
                        <p className="text-sm font-medium mt-0.5" style={{ color: MINT }}>{selectedSinger.career}</p>
                      </div>
                      <span
                        className="flex-shrink-0 px-2.5 py-1 text-[10px] font-bold rounded-lg mt-1"
                        style={{
                          backgroundColor: selectedSinger.grade === 'premium' ? '#D4A853' : selectedSinger.grade === 'best' ? MINT : 'rgba(255,255,255,0.15)',
                          color: selectedSinger.grade === 'standard' ? 'rgba(255,255,255,0.85)' : '#fff',
                        }}
                      >
                        {selectedSinger.grade === 'premium' ? 'PREMIUM' : selectedSinger.grade === 'best' ? 'BEST' : 'STANDARD'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSinger.styles.map((st) => (
                        <span key={st} className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(91,188,180,0.15)', color: MINT, border: `1px solid ${MINT}44` }}>
                          {FILTER_ABBR[st] ?? st}
                        </span>
                      ))}
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">{selectedSinger.desc}</p>
                    <a
                      href={selectedSinger.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-white rounded-lg transition-all hover:opacity-90 w-fit"
                      style={{ backgroundColor: MINT }}
                    >
                      프로필 보기
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ) : (
                /* 사진 모달: 기존 가로 레이아웃 */
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-5/12 aspect-[3/4] md:aspect-auto md:min-h-[420px] overflow-hidden flex-shrink-0">
                    <img
                      src={selectedSinger.image}
                      alt={selectedSinger.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {selectedSinger.grade && (
                      <span
                        className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold rounded-lg shadow-lg"
                        style={{
                          backgroundColor: selectedSinger.grade === 'premium' ? '#D4A853' : selectedSinger.grade === 'best' ? MINT : 'rgba(255,255,255,0.9)',
                          color: selectedSinger.grade === 'standard' ? '#333' : '#fff',
                        }}
                      >
                        {selectedSinger.grade === 'premium' ? 'PREMIUM' : selectedSinger.grade === 'best' ? 'BEST' : 'STANDARD'}
                      </span>
                    )}
                  </div>
                  <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
                    <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: MINT }}>SINGER PROFILE</p>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {selectedSinger.name}
                    </h3>
                    <p className="text-sm md:text-base font-medium mb-4" style={{ color: MINT }}>{selectedSinger.career}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {selectedSinger.styles.map((st) => (
                        <span key={st} className="text-[10px] px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(91,188,180,0.15)', color: MINT, border: `1px solid ${MINT}44` }}>
                          {FILTER_ABBR[st] ?? st}
                        </span>
                      ))}
                    </div>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">{selectedSinger.desc}</p>
                    <a
                      href={selectedSinger.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-sm text-white rounded-lg transition-all hover:opacity-90 w-fit"
                      style={{ backgroundColor: MINT }}
                    >
                      프로필 보기
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedSinger(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.7)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Singer Slider (사회자 스타일 슬라이드) — 하위 호환용, 미사용 ─── */
function SingerSlider({ singers }: { singers: typeof SINGER_PROFILES }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const goTo = useCallback((idx: number) => {
    if (idx < 0) setCurrent(singers.length - 1);
    else if (idx >= singers.length) setCurrent(0);
    else setCurrent(idx);
  }, [singers.length]);

  const singer = singers[current];

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl" style={{ backgroundColor: DARK_CARD }}>
        <div className="flex flex-col md:flex-row">
          <div
            className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-auto md:min-h-[500px] overflow-hidden"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); }
            }}
          >
            <AnimatePresence mode="wait">
              {singer.image ? (
                <motion.img key={singer.image} src={singer.image} alt={singer.name} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} />
              ) : (
                <motion.div key="placeholder" className="absolute inset-0 w-full h-full flex items-center justify-center" style={{ backgroundColor: DARK_BG }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                  <div className="text-center"><Mic className="w-12 h-12 mx-auto mb-3" style={{ color: MINT }} /><p className="text-white/60 text-sm">{singer.name}</p></div>
                </motion.div>
              )}
            </AnimatePresence>
            {singer.grade && (
              <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold rounded-lg shadow-lg" style={{ backgroundColor: singer.grade === 'premium' ? '#D4A853' : singer.grade === 'best' ? MINT : 'rgba(255,255,255,0.9)', color: singer.grade === 'standard' ? '#333' : '#fff' }}>
                {singer.grade === 'premium' ? 'PREMIUM' : singer.grade === 'best' ? 'BEST' : 'STANDARD'}
              </span>
            )}
          </div>
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={singer.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: MINT }}>SINGER PROFILE</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{singer.name}</h3>
                <p className="text-sm md:text-base font-medium mb-4" style={{ color: MINT }}>{singer.career}</p>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">{singer.desc}</p>
                <a href={singer.profileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 text-sm text-white rounded-lg transition-all hover:opacity-90" style={{ backgroundColor: MINT }}>프로필 보기<ExternalLink className="w-4 h-4" /></a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <button onClick={() => goTo(current - 1)} className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-5 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/50 hover:bg-black/70 text-white transition-all z-10 backdrop-blur-sm"><ChevronLeft className="w-5 h-5 md:w-6 md:h-6" /></button>
      <button onClick={() => goTo(current + 1)} className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-5 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/50 hover:bg-black/70 text-white transition-all z-10 backdrop-blur-sm"><ChevronRight className="w-5 h-5 md:w-6 md:h-6" /></button>
      <div className="flex justify-center gap-2 mt-6">{singers.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8" : "w-2 bg-white/30"}`} style={i === current ? { backgroundColor: MINT } : {}} />))}</div>
      <div className="flex justify-center gap-3 mt-5">{singers.map((s, i) => (<button key={i} onClick={() => setCurrent(i)} className={`w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 transition-all duration-300 ${i === current ? "scale-110 shadow-lg" : "opacity-50 hover:opacity-80"}`} style={{ borderColor: i === current ? MINT : "transparent" }}><img src={s.image} alt={s.name} className="w-full h-full object-cover" /></button>))}</div>
    </div>
  );
}

/* ─── Navigation ─── */
const SERVICE_DROPDOWN = [
  { label: "결혼식사회", href: "https://www.inusmc.co.kr/" },
  { label: "클래식연주", href: "https://inusclassic.kr/" },
  { label: "재즈연주", href: "https://inusjazz.kr/" },
  { label: "뮤지컬웨딩", href: "https://inusmw.kr/" },
  { label: "모바일청첩장", href: "https://inuscard.com/" },
  { label: "완성패키지", href: "https://blog.naver.com/inusmusics/220652965646" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // 드롭다운 외부 클릭 또는 스크롤 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServiceOpen(false);
      }
    };
    const handleScroll = () => setServiceOpen(false);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { label: "메인", href: "#hero" },
    { label: "소개", href: "#intro" },
    { label: "싱어", href: "#singer-profiles" },
    { label: "영상", href: "#video" },
    { label: "후기", href: "#reviews" },
    { label: "견적", href: "#pricing" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16">
        <a href="#hero" className={`text-lg tracking-[0.3em] font-light ${scrolled ? "text-gray-900" : "text-white"}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          INUSMUSIC
        </a>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}
            >
              {item.label}
            </a>
          ))}
          {/* 서비스 드롭다운 */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServiceOpen((v) => !v)}
              className={`flex items-center gap-1 text-sm transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}
            >
              서비스
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${serviceOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {serviceOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  {SERVICE_DROPDOWN.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setServiceOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a
            href={LINKS.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-sm text-white rounded-lg transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: MINT }}
          >
            상담하기
          </a>
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 items-center justify-center w-10 h-10 rounded-full"
          style={{ backgroundColor: MINT }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="w-5 h-0.5 bg-white transition-all" />
          <span className="w-5 h-0.5 bg-white transition-all" />
          <span className="w-5 h-0.5 bg-white transition-all" />
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col py-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                {item.label}
              </a>
            ))}
            {/* 모바일 서비스 드롭다운 */}
            <div>
              <button
                onClick={() => setMobileServiceOpen((v) => !v)}
                className="w-full flex items-center justify-between px-6 py-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                서비스
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileServiceOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServiceOpen && (
                <div className="bg-gray-50 border-t border-gray-100">
                  {SERVICE_DROPDOWN.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => { setMobileOpen(false); setMobileServiceOpen(false); }}
                      className="flex items-center px-10 py-2.5 text-sm text-gray-600 hover:text-gray-900"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a
              href={LINKS.kakao}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-6 mt-3 px-5 py-2.5 text-sm text-white rounded-lg text-center"
              style={{ backgroundColor: MINT }}
            >
              상담하기
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* FloatingButtons 는 @/components/FloatingButtons 에서 import */

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <FloatingButtonsNew />
      <InusCardPopup />

      {/* ═══ HERO SECTION ═══ */}
      <section id="hero" className="relative h-screen min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="웨딩 축가 현장" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm tracking-[0.3em] text-white/60 mb-6 uppercase"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
          >
            PREMIUM WEDDING VOCAL
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)' }}
          >
            <span style={{ color: MINT }}>축가</span>, 감동의 깊이를<br />
            더합니다.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed tracking-wide font-light"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)' }}
          >
            검증된 현역 보컬리스트가 전하는<br />
            <span className="font-medium text-white">완성도 높은 라이브 축가</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xs sm:max-w-none sm:w-auto mx-auto sm:mx-0"
          >
            <a
              href={LINKS.kakao}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 text-white rounded-lg text-base font-medium transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: MINT }}
            >
              <MessageSquare className="w-5 h-5" />
              무료 상담 시작하기
            </a>
            <a
              href="#trust"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 border border-white/40 text-white rounded-lg text-base font-medium hover:bg-white/10 transition-all duration-300"
            >
              자세히 알아보기
            </a>
          </motion.div>
          <motion.a
            href="#trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-10 flex flex-col items-center gap-2 text-white/50 hover:text-white/70 transition-colors"
          >
            <span className="text-xs tracking-[0.2em] uppercase">SCROLL</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.a>
        </div>
      </section>

      {/* ═══ TRUST INDICATORS (Dark Section) ═══ */}
      <section id="trust" className="py-16 md:py-28" style={{ backgroundColor: DARK_BG }}>
        <div className="container max-w-5xl mx-auto px-5 md:px-4">
          <AnimatedSection>
            <SectionLabel en="SINCE 2015 · TRUSTED EXPERIENCE" />
            <div className="text-center mb-10 md:mb-14">
              <p className="text-white/60 text-xs md:text-sm mb-3">이미 수많은 신랑신부님들이 선택한</p>
              <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug md:leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                검증된 웨딩 전문 브랜드,<br />
                <span style={{ color: MINT }}>이너스뮤직</span>입니다.
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: Calendar, value: 0, displayText: "SINCE 2015", desc: "10년 이상 축적된 웨딩 진행 경험" },
              { icon: FileText, value: 1000, suffix: "건 이상", desc: "실제 고객이 남긴 본식 후기" },
              { icon: Users, value: 40000, suffix: "쌍 이상", desc: "오랜 시간 축적된 운영 노하우" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="text-center p-6 md:p-8 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-500" style={{ backgroundColor: DARK_CARD }}>
                  <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full mb-4 md:mb-5" style={{ backgroundColor: `${MINT}20` }}>
                    <item.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: MINT }} />
                  </div>
                  <p className="text-2xl md:text-4xl font-bold mb-2 md:mb-3" style={{ color: MINT, fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {item.value > 0 ? (
                      <AnimatedCounter end={item.value} suffix={item.suffix} />
                    ) : (
                      item.displayText
                    )}
                  </p>
                  <p className="text-white/60 text-xs md:text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.5}>
            <div className="mt-10 md:mt-16 text-center max-w-2xl mx-auto">
              <p className="text-white/70 leading-relaxed text-sm md:text-base">
                결혼식 축가는 예식의 분위기와 감동을<br className="md:hidden" />
                완성하는 가장 중요한 순간입니다.
              </p>
              <p className="text-white/70 leading-relaxed text-sm md:text-base mt-3">
                이너스뮤직은 <span className="text-white font-medium">실용음악 전공 &amp; 현역 보컬리스트</span>로 구성된
                검증된 축가자와 함께합니다.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-12">
              {[
                { text: "No-show 걱정 없는", sub: "철저한 인력 관리" },
                { text: "전속 계약 시스템으로", sub: "100% 책임 진행" },
                { text: "돌발 상황에도", sub: "완벽 대응" },
              ].map((item, i) => (
                <div key={i} className="text-center p-5 md:p-6 rounded-lg border border-white/5" style={{ backgroundColor: DARK_BG }}>
                  <p className="text-white/90 text-sm md:text-base font-medium">{item.text}</p>
                  <p className="text-sm md:text-base font-semibold mt-1.5" style={{ color: MINT }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ RECOMMENDATION (Dark Section with Image) ═══ */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.singer} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="container max-w-5xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <SectionLabel en="RECOMMENDATION" />
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8 leading-tight text-center lg:text-left" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  이런 분들께<br />
                  <span style={{ color: MINT }}>축가를 추천</span>드립니다
                </h2>
              </div>
              <div className="space-y-3 md:space-y-4">
                {[
                  "지인에게 맡기기엔 부담을 느끼시는 분",
                  "완성도 높은 라이브를 원하시는 분",
                  "예식 분위기에 맞는 축가를 고민 중이신 분",
                  "단 한 번의 순간을 특별하게 만들고 싶으신 분",
                ].map((text, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: MINT }} />
                      <span className="whitespace-nowrap text-white/90 text-sm md:text-base">{text}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ DIFFERENCE (Light Section) ═══ */}
      <section id="intro" className="py-16 md:py-28 bg-[#f8f6f3]">
        <div className="container max-w-5xl mx-auto">
          <AnimatedSection>
            <SectionLabel en="INUSMUSIC DIFFERENCE" />
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              합리적인 선택, 확실한 차이
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-12">
            {[
              { num: "01", title: "검증된 보컬리스트" },
              { num: "02", title: "영상 기반 선택 시스템" },
              { num: "03", title: "완성형 웨딩 패키지 설계" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="p-6 md:p-8 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-500 group">
                  <span className="text-3xl md:text-4xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {item.num}
                  </span>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mt-3 md:mt-4">{item.title}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WEDDING PACKAGE (Dark Section) ═══ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: DARK_BG }}>
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <SectionLabel en="WEDDING PACKAGE" />
            <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              완성형 웨딩 패키지
            </h2>
            <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-xl border border-white/10 text-center" style={{ backgroundColor: DARK_CARD }}>
              <p className="text-xs tracking-wider text-white/40 mb-4 uppercase">참고사항</p>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                사회 · 축가 · 연주 · 뮤지컬웨딩을<br />
                <span className="text-white font-medium">각각 따로 준비하지 마세요.</span>
              </p>
              <p className="text-white/80 text-sm md:text-base leading-relaxed mt-2">
                하나로 설계될 때<br />
                <span style={{ color: MINT }} className="font-medium">예식의 흐름과 완성도가 달라집니다.</span>
              </p>
              <a
                href={LINKS.package}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 text-white text-sm rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: MINT }}
              >
                완성형 패키지 자세히 보기
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ PROVIDED MATERIALS (Light Section) ═══ */}
      <section id="service" className="py-16 md:py-28 bg-[#f8f6f3]">
        <div className="container max-w-5xl mx-auto">
          <AnimatedSection>
            <SectionLabel en="PROVIDED MATERIALS" />
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              예약 시 제공 자료 안내
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-10 md:mt-12">
            <AnimatedSection delay={0.1}>
              <div className="p-6 md:p-7 rounded-xl bg-white border border-gray-100">
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${MINT}15` }}>
                    <Music className="w-5 h-5" style={{ color: MINT }} />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-gray-900">축가 곡리스트 제공</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                  예약신청 고객님께 다양한 축가 곡리스트를 메일로 제공해드립니다.
                  인기곡부터 감동적인 곡까지 폭넓은 선택이 가능합니다.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="p-6 md:p-7 rounded-xl bg-white border border-gray-100">
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${MINT}15` }}>
                    <Headphones className="w-5 h-5" style={{ color: MINT }} />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-gray-900">MR 준비 및 사전 체크</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                  선택하신 곡의 MR(반주) 준비부터 사전 리허설까지
                  체계적으로 진행하여 당일 완벽한 축가를 보장합니다.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3}>
            <div className="text-center mt-8">
              <a
                href={LINKS.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-white text-sm rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: MINT }}
              >
                <MessageSquare className="w-4 h-4" />
                실시간 문의하기
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ REAL REVIEWS (슬라이드 후기 - Light Section) ═══ */}
      <section id="reviews" className="py-16 md:py-28 bg-[#f8f6f3]">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <SectionLabel en="REAL REVIEWS, REAL STORIES" />
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              고객님들의 생생한 후기
            </h2>
            <p className="text-gray-500 text-center text-xs md:text-sm mb-10 md:mb-12">
              실제 예식을 진행하신 신랑, 신부님의 카카오톡 후기입니다
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <ReviewSlider images={REVIEW_IMAGES} />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="text-center mt-8 md:mt-10">
              <a
                href={LINKS.reviewAll}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 border-2 text-sm rounded-lg font-medium transition-all duration-300 hover:text-white visited:text-[#5BBCB4]"
                style={{ borderColor: MINT, color: MINT }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = MINT; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = MINT; }}
              >
                실제 고객 후기 전체보기
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ SINGER PROFILES (Dark Section - 슬라이드 형식) ═══ */}
      <section id="singer-profiles" className="py-16 md:py-28" style={{ backgroundColor: DARK_BG }}>
        <div className="container max-w-5xl mx-auto">
          <AnimatedSection>
            <SectionLabel en="INUSMUSIC SINGERS" />
            <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              전문 축가자를 직접 선택하세요
            </h2>
            <p className="text-white/50 text-center text-xs md:text-sm mb-10 md:mb-14">
              고객님들이 가장 많이 선택한 TOP 축가자들입니다
            </p>
          </AnimatedSection>

          {/* Style Filter Tabs */}
          <AnimatedSection delay={0.1}>
            <SingerStyleFilter />
          </AnimatedSection>

          {/* 싱어 등급별 카드 (사진과 구분) */}
          <AnimatedSection delay={0.3}>
            <div className="mt-16 md:mt-20">
              <div className="text-center mb-8 md:mb-10">
                <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: MINT }}>SINGER GRADE</p>
                <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  등급별 싱어 라인업
                </h3>
                <p className="text-white/40 text-xs md:text-sm mt-2">
                  각 등급별 싱어의 프로필과 축가 영상을 확인해보세요
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {[
                  { grade: "Premium", badge: "PREMIUM", desc: "최상위 프리미엄 싱어", detail: "탁월한 음색과 무대 매너를 겸비한 최고의 보컬리스트", link: LINKS.singerPremium, icon: Sparkles },
                  { grade: "Best", badge: "BEST", desc: "인기 베스트 싱어", detail: "안정적인 가창력과 풍부한 경험을 갖춘 인기 싱어", link: LINKS.singerBest, icon: Award },
                  { grade: "Standard", badge: "STANDARD", desc: "검증된 일반 싱어", detail: "기본기가 탄탄한 검증된 보컬리스트", link: LINKS.singerStandard, icon: Mic },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-white/10 overflow-hidden hover:border-white/25 transition-all duration-500 group"
                    style={{ backgroundColor: DARK_CARD }}
                  >
                    <div className="p-6 md:p-8 text-center">
                      <span
                        className="inline-block px-3 py-1 text-xs font-medium text-white rounded-full mb-4"
                        style={{ backgroundColor: MINT }}
                      >
                        {item.badge}
                      </span>
                      <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${MINT}10` }}>
                        <item.icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: MINT }} />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {item.grade}
                      </h3>
                      <span className="text-sm md:text-base text-white/80">{item.desc}</span>
                      <p className="text-xs text-white/40 leading-relaxed">{item.detail}</p>
                      <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium" style={{ color: MINT }}>
                        싱어 목록 보기 <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ VIDEO PORTFOLIO (Light Section) ═══ */}
      <section id="video" className="py-16 md:py-28 bg-[#f8f6f3]">
        <div className="container max-w-5xl mx-auto">
          <AnimatedSection>
            <SectionLabel en="REAL WEDDING VOCAL" />
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              리얼 웨딩 축가 영상
            </h2>
            <p className="text-gray-500 text-center text-xs md:text-sm mb-10 md:mb-12">
              실제 본식에서 촬영된 영상으로 축가 스타일과 분위기를 직접 확인해보세요
            </p>
          </AnimatedSection>

          {/* 3 Video Cards */}
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
              {VIDEOS.map((video, i) => (
                <a
                  key={i}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-xl overflow-hidden group aspect-video bg-gray-100 shadow-sm hover:shadow-lg transition-all duration-500"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.dataset.fallback) {
                        target.dataset.fallback = '1';
                        target.src = `https://img.youtube.com/vi/${video.id}/0.jpg`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl" style={{ backgroundColor: `${MINT}E6` }}>
                      <Play className="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Song List with Links */}
          <AnimatedSection delay={0.2}>
            <div>
              <p className="text-center text-gray-700 text-base md:text-lg font-semibold tracking-wide mb-6">실황 축가 영상 더보기</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SONGS.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 md:p-4 rounded-lg bg-white border border-gray-100 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${MINT}15` }}>
                      <Play className="w-3.5 h-3.5" style={{ color: MINT }} />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">{item.artist}</span>
                      <span className="text-gray-400 text-sm ml-2">— {item.song}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ SONG LIST (Light Section - Accordion) ═══ */}
      <section className="py-16 md:py-24 bg-[#f8f6f3]">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <SectionLabel en="SONG LIST" />
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              축가 곡 리스트
            </h2>
            <p className="text-gray-500 text-center text-xs md:text-sm mb-10 md:mb-12">
              아래의 축가 리스트 곡 이외에 원하시는 곡으로도 진행 가능합니다.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3" onValueChange={(val) => {
              if (val) {
                setTimeout(() => {
                  const el = document.getElementById(`songlist-${val}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 150);
              }
            }}>
              <AccordionItem value="male-solo" id="songlist-male-solo" className="border rounded-xl bg-white px-5 md:px-6 shadow-sm scroll-mt-4">
                <AccordionTrigger className="text-base md:text-lg font-semibold text-gray-900 hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${MINT}15` }}>
                      <Mic className="w-4 h-4" style={{ color: MINT }} />
                    </div>
                    남자 솔로
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1.5 text-sm text-gray-600">
                    {[
                      "결혼해줘_임창정", "그대와 영원히_유재하", "사랑합니다_이재훈", "사랑의 서약_한동준",
                      "사랑하나요_이승환", "라라라_SG워너비", "언제나_허각", "결혼해줄래_이승기",
                      "Happy wedding song_이승환", "신부에게_유리상자", "연애_김현철", "감사_김동률",
                      "다행이다_이적", "사랑한다는 말_김동률", "러브_조장혁", "그대 고운 사람_이정렴",
                      "그대라면_알렉스", "I'm in love_라디", "두사람_성시경",
                      "Hey jude_비틀즈", "You are so beautiful_조 코커",
                      "You are the sunshine of my life_스티브원더",
                      "Love me tender_엠비스프레슬리",
                      "How deep is your love_비지스", "Marry you_브루노마스"
                    ].map((song, i) => (
                      <span key={i} className="py-1">· {song}</span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="female-solo" id="songlist-female-solo" className="border rounded-xl bg-white px-5 md:px-6 shadow-sm scroll-mt-4">
                <AccordionTrigger className="text-base md:text-lg font-semibold text-gray-900 hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${MINT}15` }}>
                      <Music className="w-4 h-4" style={{ color: MINT }} />
                    </div>
                    여자 솔로
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1.5 text-sm text-gray-600">
                    {[
                      "그중에 그대를 만나_이선희", "자기야 여보야사랑해_린", "언제나 사랑해_제이세라",
                      "청혼_이소라", "I'm in love_나르샤", "Marry me_양파", "물들어_BMK",
                      "널 사랑하겠어_휘린", "우리 결혼할까_리사", "결혼할까요_씨아",
                      "달아요_박정현", "Je t'aime_해이", "잘할게요_브아걸",
                      "사랑합니다_신보라", "축복_권진원", "청혼_럼블피쉬",
                      "오르막길_정인", "반쪽이 되어줘요_리디아", "서약_알리",
                      "Love_나탈리콜", "Love you i do_제니퍼허드슨",
                      "When i fall in love_셀린디온", "Close to you_카펜터즈",
                      "A moment like this_캘리클락슨",
                      "I will always love you_휘트니휴스턴"
                    ].map((song, i) => (
                      <span key={i} className="py-1">· {song}</span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="duet" id="songlist-duet" className="border rounded-xl bg-white px-5 md:px-6 shadow-sm scroll-mt-4">
                <AccordionTrigger className="text-base md:text-lg font-semibold text-gray-900 hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${MINT}15` }}>
                      <Users className="w-4 h-4" style={{ color: MINT }} />
                    </div>
                    남녀 듀엣
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1.5 text-sm text-gray-600">
                    {[
                      "남과여_김범수, 박선주", "다시태어나도_김도규에스더",
                      "기적_김동률, 이소은", "사랑사랑_김범수, 박정현",
                      "All for you_쿨", "짧은머리_허각, 정은지",
                      "결혼합니다_지천비화태사비애",
                      "욕심쟁이_김동률이소은",
                      "시작되는 연인들을 위해_홍경민, 한영",
                      "우리사랑이대로_주영훈, 이해진",
                      "결혼_가인최정철", "Endless love_머라이어캐리, 루더반더로스",
                      "Beauty and the beast (미녀와 야수 OST)",
                      "Take me as i am_(지킬앤하이드 OST)"
                    ].map((song, i) => (
                      <span key={i} className="py-1">· {song}</span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ BOOKING STATUS (Dark Section) ═══ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: DARK_BG }}>
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <SectionLabel en="BOOKING STATUS" />
            <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-10 md:mb-12" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              현재 예약 진행 상황
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
              <div className="p-5 md:p-6 rounded-xl border border-white/10" style={{ backgroundColor: DARK_CARD }}>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5" style={{ color: MINT }} />
                  <p className="text-white/80 text-xs md:text-sm font-medium">주말 예식 / 인기 싱어</p>
                </div>
                <p className="text-white font-semibold text-sm md:text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>평균 3개월 전 마감</p>
              </div>
              <div className="p-5 md:p-6 rounded-xl border border-white/10" style={{ backgroundColor: DARK_CARD }}>
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5" style={{ color: MINT }} />
                  <p className="text-white/80 text-xs md:text-sm font-medium">11시~2시 주요 시간대</p>
                </div>
                <p className="text-white font-semibold text-sm md:text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>조기 마감 빈도 높음</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-white/50 text-xs md:text-sm text-center leading-relaxed">
              특히 성수기 시즌에는 상담 이후 일정이 빠르게 마감되는 경우가 많습니다.<br />
              여러 업체를 비교 중이시라면 원하시는 시간대 확보를 위해 미리 일정 확인을 권장드립니다.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ PRICING (Light Section) ═══ */}
      <section id="pricing" className="py-16 md:py-28 bg-[#f8f6f3]">
        <div className="container max-w-5xl mx-auto">
          <AnimatedSection>
            <SectionLabel en="WEDDING VOCAL PRICING" />
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-10 md:mb-12" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              축가 가격 안내
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 지정 배정 */}
              <div className="p-6 md:p-8 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-500">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">싱어 지정 배정</h3>
                <p className="text-xl md:text-2xl font-bold mb-4" style={{ color: MINT, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  120,000원~180,000원
                </p>
                {/* 등급별 가격 */}
                <div className="space-y-2 mb-5 p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">일반 등급</span>
                    <span className="font-semibold text-gray-900">120,000원</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">베스트 등급</span>
                    <span className="font-semibold text-gray-900">150,000원</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">프리미엄 등급</span>
                    <span className="font-semibold text-gray-900">180,000원</span>
                  </div>
                </div>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                    <span>원하는 싱어 직접 선택</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                    <span>축가 스타일 &amp; 영상 사전 확인</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                    <span>예식에 최적화된 맞춤형 설계</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                    <span>MR 준비 및 사전 리허설</span>
                  </li>
                </ul>
              </div>

              {/* 랜덤 배정 */}
              <div className="p-6 md:p-8 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-500">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">싱어 랜덤 배정</h3>
                <p className="text-xl md:text-2xl font-bold mb-6" style={{ color: MINT, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  100,000원
                </p>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                    <span>검증된 싱어 중 1인 자동 배정</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                    <span>예식 전주 배정 안내</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                    <span>안정적인 라이브 진행</span>
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-center text-gray-400 text-xs mt-6">
              ※ 모든 가격은 부가세 포함 금액입니다. 자세한 내용은 카카오톡 상담을 통해 확인해주세요. *서울 외 지역 출장비 별도
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ SAFETY SYSTEM (Dark Section) ═══ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: DARK_BG }}>
        <div className="container max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-white/50 text-xs md:text-sm mb-3">예식 당일, 가장 걱정되는 부분</p>
            <h2 className="text-xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              혹시 모를 변수나<br />
              당일 진행에 대한 불안감
            </h2>
            <p className="text-xs md:text-sm mb-10 md:mb-12" style={{ color: MINT }}>이너스뮤직은 시스템으로 대비합니다.</p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
              {[
                { icon: Shield, title: "전속 계약 진행으로", sub: "No-show 걱정 없음" },
                { icon: CheckCircle, title: "예식 2시간 전 / 1시간 전", sub: "이중 체크" },
                { icon: Users, title: "예비 인력 시스템", sub: "상시 대기" },
              ].map((item, i) => (
                <div key={i} className="p-5 md:p-6 rounded-xl border border-white/10" style={{ backgroundColor: DARK_CARD }}>
                  <item.icon className="w-7 h-7 md:w-8 md:h-8 mx-auto mb-3 md:mb-4" style={{ color: MINT }} />
                  <p className="text-white/80 text-xs md:text-sm">{item.title}</p>
                  <p className="font-semibold text-white text-sm md:text-base mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-8 md:mb-10">
              마지막까지 안정적으로<br />
              <span className="text-white font-medium">완성되는 예식을</span><br />
              직접 경험하실 수 있습니다.
            </p>
          </AnimatedSection>

          {/* CTA Grid - 가독성 개선 */}
          <AnimatedSection delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[
                { label: "실제 영상 확인", icon: Play, href: LINKS.ctaVideo },
                { label: "카톡 상담하기", icon: MessageSquare, href: LINKS.kakao },
                { label: "이너스 예약하기", icon: Calendar, href: LINKS.ctaReserve },
                { label: "실제 후기 보기", icon: Star, href: LINKS.ctaReview },
                { label: "이너스 진행이력", icon: FileText, href: LINKS.ctaHistory },
                { label: "이너스 예약현황", icon: Clock, href: LINKS.ctaBooking },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2.5 p-4 md:p-5 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 group"
                  style={{ backgroundColor: DARK_CARD }}
                >
                  <div
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${MINT}20` }}
                  >
                    <item.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: MINT }} />
                  </div>
                  <span className="text-white text-sm md:text-base font-medium text-center leading-tight">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ EVENTS (Light Section) ═══ */}
      <section className="py-16 md:py-24 bg-[#f8f6f3]">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <SectionLabel en="SPECIAL EVENT" />
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              이너스뮤직 특별 이벤트
            </h2>
            <p className="text-gray-500 text-center text-xs md:text-sm mb-10 md:mb-12">
              예식을 준비하시는 고객님들께 실질적으로 도움이 되는 혜택을 함께 제공합니다
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <AnimatedSection delay={0.1}>
              <div className="p-6 md:p-7 rounded-xl bg-white border border-gray-100">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">숨고 리뷰 이벤트 참여 혜택</h3>
                <ul className="space-y-3 text-xs md:text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span style={{ color: MINT }}>•</span>
                    <span>최대 <strong style={{ color: MINT }}>2만원 할인</strong> 혜택</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: MINT }}>•</span>
                    <span>결혼 준비에 꼭 필요한 <strong>웨딩 체크리스트 자료</strong> 제공</span>
                  </li>
                  <li className="text-xs text-gray-400 ml-4">(실제 예식 준비에 활용 가능한 자료입니다)</li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="p-6 md:p-7 rounded-xl bg-white border border-gray-100">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">블로그 후기 참여 혜택</h3>
                <ul className="space-y-3 text-xs md:text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span style={{ color: MINT }}>•</span>
                    <span><strong style={{ color: MINT }}>추가 혜택</strong> 제공</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: MINT }}>•</span>
                    <span>자세한 내용은 상담 시 안내드립니다</span>
                  </li>
                </ul>
                <a
                  href="https://blog.naver.com/inusmusics/220652958346"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm font-medium transition-colors hover:underline"
                  style={{ color: MINT }}
                >
                  자세히 알아보기 →
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ FAQ (Dark Section) ═══ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: DARK_BG }}>
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <SectionLabel en="FAQ" />
            <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-10 md:mb-12" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              자주 묻는 질문
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="faq-1" className="border border-white/10 rounded-xl px-5 md:px-6" style={{ backgroundColor: DARK_CARD }}>
                <AccordionTrigger className="text-base md:text-lg font-semibold text-white hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold px-2.5 py-1 rounded-md" style={{ backgroundColor: MINT, color: 'white' }}>Q</span>
                    당일날 펑크날까봐 걱정돼요...
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="pl-10 text-white/80 text-sm md:text-base leading-relaxed space-y-4">
                    <p className="font-medium text-white">걱정하지 않으셔도 됩니다 😊</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                        <span>예식 당일 <strong style={{ color: MINT }}>2시간 전</strong>, 축가자 준비 상태 1차 체크</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                        <span>예식 <strong style={{ color: MINT }}>1시간 전</strong>, 현장 도착 여부 2차 확인</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                        <span>만일의 상황대비, <strong style={{ color: MINT }}>예비 축가자 대기</strong></span>
                      </li>
                    </ul>
                    <div className="border-t border-white/10 pt-4 mt-4">
                      <p className="text-white/60 text-sm mb-2">또한 모든 축가자는</p>
                      <ul className="space-y-1.5">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                          <span>업체와 <strong>전속 계약 체결</strong> 후 진행되며</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                          <span><strong>사전 관리 시스템</strong>을 통해 철저히 관리됩니다</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${MINT}15` }}>
                      <p className="text-sm font-semibold" style={{ color: MINT }}>👉 그 결과, 지금까지 펑크율 0%를 유지하고 있습니다</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="border border-white/10 rounded-xl px-5 md:px-6" style={{ backgroundColor: DARK_CARD }}>
                <AccordionTrigger className="text-base md:text-lg font-semibold text-white hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold px-2.5 py-1 rounded-md" style={{ backgroundColor: MINT, color: 'white' }}>Q</span>
                    등급의 기준은 무엇인가요?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="pl-10 text-white/80 text-sm md:text-base leading-relaxed space-y-4">
                    <p className="font-medium text-white">등급은 '실력'이 아닌 '<span style={{ color: MINT }}>경험</span>'을 기준으로 구분됩니다 😊</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                        <span>모든 싱어는 일정 기준 이상의 실력을 갖춘 <strong>검증된 보컬리스트</strong>로 구성되어 있으며</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                        <span>등급은 <strong>예식 진행 경험과 무대 경험</strong>에 따라 차별화되어 분류됩니다</span>
                      </li>
                    </ul>
                    <div className="border-t border-white/10 pt-4 mt-4">
                      <p className="text-white/60 text-sm mb-2">예를 들어</p>
                      <ul className="space-y-1.5">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                          <span>기본 <strong>3년 이상</strong>의 축가 경험을 보유하고 있으며</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: MINT }} />
                          <span>많게는 <strong>10년 이상</strong>의 경력을 가진 싱어까지 구성되어 있습니다</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${MINT}15` }}>
                      <p className="text-sm font-semibold" style={{ color: MINT }}>👉 즉, 모든 싱어는 일정 수준 이상의 실력을 기반으로 경험에 따라 등급이 나뉘는 구조입니다</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ ADDITIONAL OPTIONS (Light Section) ═══ */}
      <section id="additional-options" className="py-16 md:py-24 bg-[#f8f6f3]">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <SectionLabel en="ADDITIONAL OPTIONS" />
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              추가옵션 서비스
            </h2>
            <p className="text-gray-500 text-center text-xs md:text-sm mb-10 md:mb-12">
              예식의 완성도를 높여줄 다양한 웨딩 서비스를 확인해보세요
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {[
                { title: "결혼식 사회", href: "https://www.inusmc.co.kr/" },
                { title: "클래식 연주", href: "https://inusclassic.kr/" },
                { title: "재즈 연주", href: "https://inusjazz.kr/" },
                { title: "뮤지컬 웨딩", href: "https://inusmw.kr/" },
                { title: "모바일 청첩장", href: "https://inuscard.com/" },
                { title: "완성 패키지", href: "https://blog.naver.com/inusmusics/220652965646" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 md:p-6 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <span className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-gray-700">{item.title}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-10 md:py-12" style={{ backgroundColor: "#111111" }}>
        <div className="container max-w-5xl mx-auto text-center">
          <p className="text-base md:text-lg font-semibold mb-2 tracking-[0.2em]" style={{ color: MINT, fontFamily: "'Playfair Display', Georgia, serif" }}>
            INUSMUSIC
          </p>
          <p className="text-xs md:text-sm text-white/40 mb-4">웨딩연주 &amp; 행사연주 이너스뮤직</p>
          <div className="flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm mb-6">
            <a href={LINKS.kakao} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 transition-colors">
              카카오톡: @inusmusics
            </a>
            <span className="text-white/10">|</span>
            <a href="https://blog.naver.com/inusmusics" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 transition-colors">
              블로그
            </a>
          </div>
          <div className="border-t border-white/10 pt-5 mt-5 space-y-1">
            <p className="text-[11px] md:text-xs text-white/30">대표자: 신유진 | 사업자번호: 299-90-00178</p>
            <p className="text-[11px] md:text-xs text-white/30">사무실 주소: 서울 광진구 자양로 165 4층</p>
            <p className="text-[11px] md:text-xs text-white/30">TEL: 02-423-2772</p>
          </div>
          <p className="text-xs text-white/20 mt-4">&copy; {new Date().getFullYear()} INUSMUSIC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
