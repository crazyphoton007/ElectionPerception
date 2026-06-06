"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import {
  ArrowUpRight, BadgeCheck, BarChart3, BookOpen, ChevronRight, CircleDollarSign,
  Fingerprint, GraduationCap, HeartPulse, Landmark, Lightbulb, RefreshCw,
  Rocket, Route, ShieldAlert, ShieldCheck, Sparkles, Sprout, Stethoscope,
  TrafficCone, Train, Trash2, Users, Vote, Zap,
} from "lucide-react";
import candidatesJson from "../data/candidates.json";

type Candidate = (typeof candidatesJson)[number];
type Lang = "en" | "hi";
const genericMyNetaUrl = "https://www.myneta.info/search_myneta.php?q=kheri";

function seededNumber(seed: number) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

function dailyCandidates(salt = 0): Candidate[] {
  const date = new Date();
  const seed = Number(`${date.getUTCFullYear()}${date.getUTCMonth() + 1}${date.getUTCDate()}`) + salt * 97;
  const utkarsh = 18 + Math.floor(seededNumber(seed + 3) * 4);
  const ajayLead = 1 + Math.floor(seededNumber(seed + 6) * 6);
  const shares = {
    "new-face": 38 + Math.floor(seededNumber(seed + 1) * 5),
    ajay: utkarsh + ajayLead,
    utkarsh,
    mohan: 5 + Math.floor(seededNumber(seed + 5) * 3),
    yogesh: 2 + Math.floor(seededNumber(seed + 4) * 3),
  };
  const nota = 100 - shares["new-face"] - shares.ajay - shares.utkarsh - shares.mohan - shares.yogesh;

  return candidatesJson
    .map(candidate => ({ ...candidate, popularity: candidate.id === "nota" ? nota : shares[candidate.id as keyof typeof shares] }))
    .sort((a, b) => b.popularity - a.popularity);
}

function sortCandidates(candidates: Candidate[]) {
  return [...candidates].sort((a, b) => b.popularity - a.popularity);
}

const mood = [
  { label: "Youth support", hi: "युवा समर्थन", value: 86, color: "#9d6bff" },
  { label: "Clean image score", hi: "स्वच्छ छवि स्कोर", value: 91, color: "#48d58a" },
  { label: "Local connection", hi: "स्थानीय जुड़ाव", value: 78, color: "#41a8ff" },
  { label: "Simplicity score", hi: "सादगी स्कोर", value: 89, color: "#ff9b45" },
  { label: "Rich-politician rejection", hi: "अमीर-नेता सोच से दूरी", value: 82, color: "#ff4e8a" },
  { label: "NOTA frustration level", hi: "NOTA नाराज़गी स्तर", value: 64, color: "#f5cf63" },
];

const waveData = [
  { month: "Jan", fresh: 29, old: 62 }, { month: "Feb", fresh: 35, old: 58 },
  { month: "Mar", fresh: 43, old: 52 }, { month: "Apr", fresh: 56, old: 45 },
  { month: "May", fresh: 68, old: 39 }, { month: "Jun", fresh: 82, old: 31 },
];

const particles = Array.from({ length: 24 }, (_, i) => ({
  left: `${(i * 41) % 100}%`, delay: (i % 8) * 0.7, duration: 7 + (i % 5),
}));

const leaderProfiles = [
  { title: "Engineer", hiTitle: "इंजीनियर", copy: "Problem-solving mindset", hiCopy: "समस्या हल करने वाली सोच", icon: Lightbulb },
  { title: "Doctor", hiTitle: "डॉक्टर", copy: "Service mindset", hiCopy: "सेवा भाव", icon: Stethoscope },
  { title: "Civil servant", hiTitle: "सिविल सेवक", copy: "Governance experience", hiCopy: "शासन का अनुभव", icon: Landmark },
  { title: "Founder", hiTitle: "फाउंडर", copy: "Entrepreneurial vision", hiCopy: "उद्यमी दृष्टि", icon: Rocket },
  { title: "Educator", hiTitle: "शिक्षक", copy: "Research and public purpose", hiCopy: "शोध और जनसेवा", icon: GraduationCap },
  { title: "Young leader", hiTitle: "युवा नेता", copy: "Clean image and long-term thinking", hiCopy: "स्वच्छ छवि और लंबी सोच", icon: Sparkles },
];

const deserves = [
  { text: "Direct connectivity from Lakhimpur Kheri to Delhi, Lucknow, and major cities", hi: "लखीमपुर खीरी से दिल्ली, लखनऊ और बड़े शहरों तक सीधी कनेक्टिविटी", icon: Train },
  { text: "A strong university and better higher education ecosystem", hi: "मजबूत विश्वविद्यालय और बेहतर उच्च शिक्षा व्यवस्था", icon: GraduationCap },
  { text: "Traffic planning, bypasses, parking, and safer roads", hi: "ट्रैफिक प्लानिंग, बाईपास, पार्किंग और सुरक्षित सड़कें", icon: TrafficCone },
  { text: "More greenery, clean parks, and better public spaces", hi: "अधिक हरियाली, साफ पार्क और बेहतर सार्वजनिक स्थान", icon: Sprout },
  { text: "Real trash management, cleaner markets, and daily sanitation", hi: "सच्चा कचरा प्रबंधन, साफ बाजार और रोज़ सफाई", icon: Trash2 },
  { text: "Reliable electricity with fewer power cuts", hi: "कम कटौती वाली भरोसेमंद बिजली", icon: Zap },
  { text: "Better healthcare and emergency facilities", hi: "बेहतर स्वास्थ्य सेवा और आपातकालीन सुविधाएं", icon: HeartPulse },
  { text: "Jobs, startups, industries, and local business growth", hi: "नौकरी, स्टार्टअप, उद्योग और स्थानीय व्यापार विकास", icon: Rocket },
  { text: "Farmer support, storage, irrigation, and better market access", hi: "किसान सहायता, स्टोरेज, सिंचाई और बेहतर बाजार पहुंच", icon: Sprout },
  { text: "Digital services and transparent governance", hi: "डिजिटल सेवाएं और पारदर्शी शासन", icon: Route },
];

const tiredOf = [
  { en: "Criminal image politics", hi: "अपराधी छवि वाली राजनीति" },
  { en: "Caste-based voting pressure", hi: "जाति आधारित वोटिंग दबाव" },
  { en: "Leaders who appear only during elections", hi: "सिर्फ चुनाव में दिखने वाले नेता" },
  { en: "Rich-politician attitude", hi: "अमीर-नेता वाला रवैया" },
  { en: "Empty speeches without execution", hi: "काम के बिना खाली भाषण" },
  { en: "Party loyalty above public interest", hi: "जनहित से ऊपर पार्टी वफादारी" },
  { en: "Old faces without fresh vision", hi: "नई सोच के बिना पुराने चेहरे" },
  { en: "Public issues being ignored year after year", hi: "सालों से जनता के मुद्दों की अनदेखी" },
];

const voiceScores = [
  { label: "Vision", hi: "दृष्टि", value: 95 },
  { label: "Integrity", hi: "ईमानदारी", value: 96 },
  { label: "Courage", hi: "साहस", value: 94 },
  { label: "Education", hi: "शिक्षा", value: 92 },
  { label: "Public Accessibility", hi: "जनता तक पहुंच", value: 90 },
  { label: "Development Focus", hi: "विकास फोकस", value: 98 },
];

const copy = {
  en: {
    live: "Live demo",
    navMood: "Public Mood",
    navCandidates: "Candidates",
    navSimulator: "Simulator",
    heroPill: "A new political imagination",
    heroTitleA: "Lakhimpur Kheri",
    heroTitleB: "Wants a",
    heroTitleC: "New Voice",
    heroCopy: "Explore public mood, candidate image, clean politics score, and election excitement.",
    explore: "Explore the pulse",
    compare: "Compare candidates",
    seek: "seek fresh choices",
    simulations: "demo simulations",
    signals: "mood signals",
    youthEnergy: "Youth energy",
    veryHigh: "Very high",
    topPriority: "Top priority",
    cleanImage: "Clean image",
    changeIndex: "Change index",
    moodEyebrow: "01 / PUBLIC MOOD METER",
    moodTitle: "What Kheri is feeling",
    moodCopy: "A playful pulse-check of the qualities voters say they want next.",
    demoLabel: "Demo Public Mood Simulation",
    demoNote: "These values are illustrative, not polling or election forecasts.",
    candidateEyebrow: "02 / CANDIDATE LENS",
    candidateTitle: "Compare the field",
    candidateCopy: "Mood signals meet affidavit-conscious profiles. Swipe the field, question everything.",
    profile: "PROFILE",
    mood: "mood",
    criminal: "Criminal cases",
    assets: "Asset level",
    education: "Education",
    trust: "Public trust",
    youth: "Youth connect",
    waveEyebrow: "03 / NEW FACE WAVE",
    waveTitle: "Momentum is changing shape",
    waveCopy: "A demo visualization of rising curiosity for a young, simple and clean public representative.",
    freshInterest: "Fresh voice interest",
    pointRise: "demo point rise since Jan",
    youngCuriosity: "Young clean candidate curiosity",
    oldComfort: "Old politics comfort",
    simEyebrow: "04 / ELECTION PLAYGROUND",
    simTitle: "Run the public mood",
    simCopy: "Tap the button and watch a simulated election-day mood shift in real time.",
    dailyReady: "Daily mood ready",
    simQuestionA: "What if Kheri voted",
    simQuestionB: "with its mood today?",
    simText: "Numbers refresh with each new UTC calendar day. Every demo keeps Young New Face first, Ajay Mishra Teni above Utkarsh Verma by 1 to 6 points, and Yogesh Verma below 5%.",
    run: "Run Public Mood Simulation",
    explored: "demo simulations explored",
    notaEyebrow: "05 / NOTA HEAT BAR",
    notaTitle: "Not apathy. A demand for better.",
    notaCopy: "NOTA can signal frustration with old politics and a desire for a fresh option.",
    calm: "Calm",
    changeWanted: "Change wanted",
    transparency: "Transparency note",
    disclaimer: "This website uses demo popularity data for visualization. Real candidate facts like assets, education, and criminal cases must be verified from ECI affidavits or ADR/MyNeta.",
    verifyRecords: "Check crime & property record on MyNeta",
    genericVerify: "Check any politician",
    candidateVerify: "Check crime, assets & education",
    verifyHint: "Please verify from public affidavit",
    aiBadge: "AI demo mood",
    footer: "Built to imagine cleaner, simpler public life.",
    demoExperience: "DEMO EXPERIENCE",
    guideEyebrow: "READ THIS FIRST",
    guideTitle: "Simple way to understand this page",
    guideCopy: "This page has two types of information. Mood numbers are AI demo simulation. Crime, assets and education must be checked from MyNeta/affidavit links.",
    guideMoodTitle: "AI mood number",
    guideMoodCopy: "Fun demo signal. Not a real survey.",
    guideVerifyTitle: "Affidavit facts",
    guideVerifyCopy: "Crime, assets and education: click MyNeta and verify.",
    guideIssueTitle: "Public issues",
    guideIssueCopy: "Roads, jobs, education, electricity and healthcare.",
    verdictMood: "Demo mood",
    verdictVerify: "Verify facts",
    verdictIssues: "Public issues",
  },
  hi: {
    live: "लाइव डेमो",
    navMood: "जन mood",
    navCandidates: "उम्मीदवार",
    navSimulator: "सिमुलेटर",
    heroPill: "नई राजनीति की कल्पना",
    heroTitleA: "लखीमपुर खीरी",
    heroTitleB: "चाहता है",
    heroTitleC: "नई आवाज़",
    heroCopy: "जनता का mood, उम्मीदवार की छवि, साफ राजनीति स्कोर और चुनावी उत्साह देखें।",
    explore: "पल्स देखें",
    compare: "उम्मीदवार तुलना",
    seek: "नया विकल्प चाहते हैं",
    simulations: "डेमो सिमुलेशन",
    signals: "mood संकेत",
    youthEnergy: "युवा ऊर्जा",
    veryHigh: "बहुत अधिक",
    topPriority: "सबसे ज़रूरी",
    cleanImage: "स्वच्छ छवि",
    changeIndex: "बदलाव सूचक",
    moodEyebrow: "01 / जनता mood मीटर",
    moodTitle: "खीरी क्या महसूस कर रहा है",
    moodCopy: "लोग अगले नेतृत्व में किन गुणों को चाहते हैं, इसका playful pulse-check.",
    demoLabel: "डेमो पब्लिक mood सिमुलेशन",
    demoNote: "ये आंकड़े केवल विज़ुअल डेमो हैं, असली पोल या चुनावी भविष्यवाणी नहीं।",
    candidateEyebrow: "02 / उम्मीदवार लेंस",
    candidateTitle: "Compare the field",
    candidateCopy: "Mood संकेत और affidavit-aware profiles. देखें, सोचें, सवाल करें।",
    profile: "प्रोफाइल",
    mood: "mood",
    criminal: "आपराधिक मामले",
    assets: "संपत्ति स्तर",
    education: "शिक्षा",
    trust: "जन भरोसा",
    youth: "युवा जुड़ाव",
    waveEyebrow: "03 / नई आवाज़ wave",
    waveTitle: "Momentum बदल रहा है",
    waveCopy: "युवा, सरल और स्वच्छ जनप्रतिनिधि के लिए बढ़ती curiosity का डेमो विज़ुअल।",
    freshInterest: "नई आवाज़ रुचि",
    pointRise: "जनवरी से डेमो पॉइंट बढ़त",
    youngCuriosity: "युवा साफ उम्मीदवार curiosity",
    oldComfort: "पुरानी राजनीति comfort",
    simEyebrow: "04 / चुनाव playground",
    simTitle: "आज का जनता का विचार",
    simCopy: "बटन दबाएं और चुनावी mood का simulated बदलाव देखें।",
    dailyReady: "दैनिक mood तैयार",
    simQuestionA: "अगर आज खीरी वोट करे",
    simQuestionB: "अपने mood के साथ?",
    simText: "हर UTC calendar day पर नंबर बदलते हैं। हर डेमो में Young New Face पहले रहता है, Ajay Mishra Teni Utkarsh Verma से 1 से 6 points आगे रहता है, और Yogesh Verma 5% से नीचे रहता है।",
    run: "Public Mood Simulation चलाएं",
    explored: "डेमो सिमुलेशन देखे गए",
    notaEyebrow: "05 / NOTA heat bar",
    notaTitle: "उदासीनता नहीं। बेहतर की मांग।",
    notaCopy: "NOTA पुरानी राजनीति से नाराज़गी और नए विकल्प की इच्छा दिखा सकता है।",
    calm: "शांत",
    changeWanted: "बदलाव चाहिए",
    transparency: "पारदर्शिता नोट",
    disclaimer: "यह वेबसाइट visualization के लिए demo popularity data इस्तेमाल करती है। संपत्ति, शिक्षा और आपराधिक मामलों जैसे वास्तविक उम्मीदवार तथ्य ECI affidavits या ADR/MyNeta से verify होने चाहिए।",
    verifyRecords: "MyNeta पर crime और property record देखें",
    genericVerify: "किसी भी नेता को चेक करें",
    candidateVerify: "crime, संपत्ति और शिक्षा देखें",
    verifyHint: "कृपया public affidavit से verify करें",
    aiBadge: "AI demo mood",
    footer: "स्वच्छ और सरल जनजीवन की कल्पना के लिए बनाया गया।",
    demoExperience: "डेमो अनुभव",
    guideEyebrow: "पहले यह समझें",
    guideTitle: "इस पेज को समझने का आसान तरीका",
    guideCopy: "इस पेज में दो तरह की जानकारी है। Mood numbers AI demo simulation हैं। Crime, संपत्ति और शिक्षा MyNeta/affidavit links से खुद verify करें।",
    guideMoodTitle: "AI mood number",
    guideMoodCopy: "मजेदार demo signal. असली survey नहीं।",
    guideVerifyTitle: "Affidavit facts",
    guideVerifyCopy: "Crime, संपत्ति और शिक्षा: MyNeta खोलकर verify करें।",
    guideIssueTitle: "Public issues",
    guideIssueCopy: "सड़क, नौकरी, शिक्षा, बिजली और स्वास्थ्य।",
    verdictMood: "Demo mood",
    verdictVerify: "Facts verify करें",
    verdictIssues: "Public issues",
  },
};

function Pill({ children, tone = "purple" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

function SectionHead({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="section-head">
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
      <p>{copy}</p>
    </div>
  );
}

function MetricRing({ item, index, lang }: { item: (typeof mood)[number]; index: number; lang: Lang }) {
  return (
    <motion.div className="metric-card glass" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * .07 }}>
      <div className="ring" style={{ background: `conic-gradient(${item.color} ${item.value * 3.6}deg, #ffffff12 0deg)` }}>
        <div><strong>{item.value}</strong><span>/100</span></div>
      </div>
      <span>{lang === "hi" ? item.hi : item.label}</span>
    </motion.div>
  );
}

function CandidateCard({ candidate, rank, lang }: { candidate: Candidate; rank: number; lang: Lang }) {
  const t = copy[lang];
  const displayName = lang === "hi" ? candidate.hiName : candidate.name;
  return (
    <motion.article className={`candidate glass ${candidate.id === "new-face" ? "featured" : ""}`} whileHover={{ y: -7 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
      <div className="ai-badge">{t.aiBadge}</div>
      <div className="card-top">
        <div className="avatar" style={{ color: candidate.color, boxShadow: `0 0 35px ${candidate.color}35` }}>{candidate.initials}</div>
        <div><span className="rank">0{rank} / {t.profile}</span><h3>{displayName}</h3>{lang === "hi" && candidate.hiName !== candidate.name ? <p>{candidate.name}</p> : <p>{candidate.party}</p>}</div>
        <span className="score" style={{ color: candidate.color }}>{candidate.popularity}%<small>{t.mood}</small></span>
      </div>
      <Pill tone={candidate.id === "new-face" || candidate.id === "ajay" ? "green" : "purple"}><ShieldCheck size={13} /> {candidate.cleanBadge}</Pill>
      <div className="verdict-row">
        <span className="verdict-chip mood-chip">{t.verdictMood}</span>
        <span className="verdict-chip verify-chip">{t.verdictVerify}</span>
        <span className="verdict-chip issue-chip">{t.verdictIssues}</span>
      </div>
      <p className="candidate-note">{candidate.note}</p>
      <p className="verify-hint">{t.verifyHint}</p>
      <div className="facts">
        <p><Fingerprint size={15} /><span>{t.criminal}<small>{candidate.criminal}</small></span></p>
        <p><CircleDollarSign size={15} /><span>{t.assets}<small>{candidate.assets}</small></span></p>
        <p><BookOpen size={15} /><span>{t.education}<small>{candidate.education}</small></span></p>
      </div>
      <a className="record-link" href={candidate.mynetaUrl || genericMyNetaUrl} target="_blank" rel="noreferrer">
        <ArrowUpRight size={13} /> {candidate.id === "nota" || candidate.id === "new-face" ? t.verifyRecords : t.candidateVerify}
      </a>
      <div className="mini-meter"><span>{t.trust} <b>{candidate.trust}</b></span><i><em style={{ width: `${candidate.trust}%`, background: candidate.color }} /></i></div>
      <div className="mini-meter"><span>{t.youth} <b>{candidate.youth}</b></span><i><em style={{ width: `${candidate.youth}%`, background: candidate.color }} /></i></div>
      <div className="demo-label">{t.demoLabel}</div>
    </motion.article>
  );
}

function VoterGuide({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const guideItems = [
    { title: t.guideMoodTitle, copy: t.guideMoodCopy, icon: Sparkles, tone: "purple" },
    { title: t.guideVerifyTitle, copy: t.guideVerifyCopy, icon: Fingerprint, tone: "amber" },
    { title: t.guideIssueTitle, copy: t.guideIssueCopy, icon: Route, tone: "green" },
  ];

  return (
    <section className="voter-guide" id="guide">
      <motion.div className="guide-shell glass" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>
        <div className="guide-copy">
          <span className="eyebrow">{t.guideEyebrow}</span>
          <h2>{t.guideTitle}</h2>
          <p>{t.guideCopy}</p>
        </div>
        <div className="guide-cards">
          {guideItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div className={`guide-card ${item.tone}`} key={item.title} whileHover={{ y: -6, scale: 1.02 }}>
                <Icon size={22} />
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function LeaderVisionSection({ lang }: { lang: Lang }) {
  const isHi = lang === "hi";
  return (
    <section className="leader-vision">
      <motion.div className="vision-shell glass" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
        <div className="vision-bg" />
        <div className="vision-float vf1"><Train size={18} /></div>
        <div className="vision-float vf2"><GraduationCap size={18} /></div>
        <div className="vision-float vf3"><ShieldCheck size={18} /></div>

        <div className="vision-title">
          <Pill tone="green"><Sparkles size={14} /> {isHi ? "खीरी जिस नेता की कल्पना कर सकता है" : "The Leader Kheri Can Imagine"}</Pill>
          <h2>{isHi ? "सिर्फ नेता नहीं। खीरी के लिए एक vision." : "Not Just a Politician. A Vision for Kheri."}</h2>
          <p>{isHi ? "खीरी को ऐसा नेता चाहिए जो जाति, अपराध और पुरानी राजनीति से आगे सोच सके — शिक्षित, निडर, स्वच्छ और जहां बात मायने रखती है वहां हमारी आवाज़ उठा सके।" : "Kheri needs a leader who can think beyond caste, crime, and old politics — someone educated, fearless, clean, and capable of raising our voice where it matters."}</p>
        </div>

        <div className="vision-grid">
          <motion.div className="vision-panel lead-types" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
            <span className="eyebrow">{isHi ? "01 / खीरी का नेतृत्व कौन करे?" : "01 / WHO SHOULD LEAD KHERI?"}</span>
            <h3>{isHi ? "जन उद्देश्य वाला professional mind" : "A professional mind with public purpose"}</h3>
            <div className="type-grid">
              {leaderProfiles.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div className="type-card" key={item.title} whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                    <Icon size={20} />
                    <strong>{isHi ? item.hiTitle : item.title}</strong>
                    <span>{isHi ? item.hiCopy : item.copy}</span>
                    <i style={{ animationDelay: `${index * .15}s` }} />
                  </motion.div>
                );
              })}
            </div>
            <p className="vision-note">{isHi ? "पारंपरिक राजनीति से नहीं। छात्र राजनीति से नहीं। जन उद्देश्य वाला professional mind." : "Not from traditional politics. Not from student politics. A professional mind with public purpose."}</p>
          </motion.div>

          <motion.div className="vision-panel deserves-panel" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
            <span className="eyebrow">{isHi ? "02 / खीरी क्या deserve करता है" : "02 / WHAT KHERI DESERVES"}</span>
            <h3>{isHi ? "विकास जिसे लोग रोज़ महसूस करें" : "Development people can feel every day"}</h3>
            <div className="issue-list">
              {deserves.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div className="issue-card" key={item.text} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * .035 }}>
                    <Icon size={17} />
                    <span>{isHi ? item.hi : item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="vision-grid lower">
          <motion.div className="warning-panel" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}>
            <div className="warning-head"><ShieldAlert size={22} /><div><span className="eyebrow">{isHi ? "03 / लोग किससे थक चुके हैं" : "03 / WHAT PEOPLE ARE TIRED OF"}</span><h3>{isHi ? "पुरानी राजनीति भावनात्मक भरोसा खो रही है" : "Old politics is losing emotional trust"}</h3></div></div>
            <div className="timeline-list">
              {tiredOf.map((item) => <p key={item.en}><i />{isHi ? item.hi : item.en}</p>)}
            </div>
          </motion.div>

          <motion.div className="voice-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}>
            <div className="voice-glow" />
            <span className="eyebrow">{isHi ? "04 / खीरी को कैसी आवाज़ चाहिए" : "04 / THE VOICE KHERI NEEDS"}</span>
            <h3>{isHi ? "एक आवाज़ जो पार्टी के अंदर उठ सके और Upper House तक पहुंचने जितनी मजबूत हो।" : "A Voice Strong Enough to Rise Inside the Party and Loud Enough to Reach the Upper House."}</h3>
            <p>{isHi ? "खीरी को मौन प्रतिनिधि नहीं चाहिए। खीरी को ऐसा व्यक्ति चाहिए जो सड़क, शिक्षा, नौकरी, स्वास्थ्य, बिजली, किसान, पर्यावरण और सम्मान के लिए लड़ सके — चाहे अपनी पार्टी नेतृत्व को चुनौती क्यों न देनी पड़े।" : "Kheri does not need a silent representative. Kheri needs someone who can fight for roads, education, jobs, healthcare, electricity, farmers, environment, and dignity — even when it means challenging their own party leadership."}</p>
            <div className="score-grid">
              {voiceScores.map((score, index) => (
                <div className="vision-score" key={score.label}>
                  <span>{isHi ? score.hi : score.label}<b>{score.value}%</b></span>
                  <i><motion.em initial={{ width: 0 }} whileInView={{ width: `${score.value}%` }} transition={{ delay: index * .08, duration: .75 }} /></i>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="vision-tagline" initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }}>
          {isHi ? "खीरी को एक और जाति उम्मीदवार नहीं चाहिए। खीरी को सक्षम उम्मीदवार चाहिए।" : "Kheri does not need another caste candidate. Kheri needs a capable candidate."}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const [candidates, setCandidates] = useState<Candidate[]>(() => sortCandidates(candidatesJson));
  const [runs, setRuns] = useState(12847);
  const [simulationRun, setSimulationRun] = useState(0);
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];

  useEffect(() => {
    setCandidates(dailyCandidates());
  }, []);

  const simulate = () => {
    const nextRun = simulationRun + 1;
    setSimulationRun(nextRun);
    setCandidates(dailyCandidates(nextRun));
    setRuns(r => r + Math.floor(Math.random() * 500) + 80);
  };

  return (
    <main>
      <div className="aurora a1" /><div className="aurora a2" />
      <div className="particles">{particles.map((p, i) => <motion.span key={i} style={{ left: p.left }} animate={{ y: [0, -900], opacity: [0, .8, 0], rotate: [0, 180] }} transition={{ repeat: Infinity, delay: p.delay, duration: p.duration }}><Vote size={13} /></motion.span>)}</div>
      <nav>
        <a className="brand" href="#"><span><Vote size={20} /></span><b>KHERI <em>YOUTH</em> PULSE</b></a>
        <div className="nav-links"><a href="#mood">{t.navMood}</a><a href="#candidates">{t.navCandidates}</a><a href="#simulator">{t.navSimulator}</a></div>
        <div className="nav-actions">
          <button className="lang-toggle" onClick={() => setLang(lang === "en" ? "hi" : "en")} aria-label="Change language">
            <span className={lang === "en" ? "active" : ""}>EN</span>
            <span className={lang === "hi" ? "active" : ""}>हिंदी</span>
          </button>
          <a className="top-record-link" href={genericMyNetaUrl} target="_blank" rel="noreferrer">
            <ArrowUpRight size={13} /> {t.genericVerify}
          </a>
          <Pill tone="green"><i className="live-dot" /> {t.live}</Pill>
        </div>
      </nav>

      <motion.header className="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="hero-copy">
          <Pill><Sparkles size={14} /> {t.heroPill}</Pill>
          <motion.h1 initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .15 }}>
            {t.heroTitleA}<br />{t.heroTitleB} <span>{t.heroTitleC}</span>
          </motion.h1>
          <p>{t.heroCopy}</p>
          <div className="actions"><a className="primary" href="#simulator">{t.explore} <ArrowUpRight size={17} /></a><a className="secondary" href="#candidates">{t.compare} <ChevronRight size={17} /></a></div>
          <div className="hero-stats"><div><strong>78%</strong><span>{t.seek}</span></div><div><strong>12.8K</strong><span>{t.simulations}</span></div><div><strong>6</strong><span>{t.signals}</span></div></div>
        </div>
        <div className="pulse-visual">
          <div className="orbit o1" /><div className="orbit o2" /><div className="orbit o3" />
          <div className="pulse-core"><span>THE</span><strong>YOUTH</strong><span>PULSE</span></div>
          <div className="float-stat fs1"><Users size={16} /><span>{t.youthEnergy}<b>{t.veryHigh}</b></span></div>
          <div className="float-stat fs2"><BadgeCheck size={16} /><span>{t.topPriority}<b>{t.cleanImage}</b></span></div>
          <div className="float-stat fs3"><BarChart3 size={16} /><span>{t.changeIndex}<b>82 / 100</b></span></div>
        </div>
      </motion.header>

      <VoterGuide lang={lang} />

      <section id="mood">
        <SectionHead eyebrow={t.moodEyebrow} title={t.moodTitle} copy={t.moodCopy} />
        <div className="metrics">{mood.map((m, i) => <MetricRing key={m.label} item={m} index={i} lang={lang} />)}</div>
        <div className="simulation-strip"><Sparkles size={16} /><b>{t.demoLabel}</b><span>{t.demoNote}</span></div>
      </section>

      <section id="candidates">
        <SectionHead eyebrow={t.candidateEyebrow} title={t.candidateTitle} copy={t.candidateCopy} />
        <div className="candidate-grid">{candidates.map((c, i) => <CandidateCard key={c.id} candidate={c} rank={i + 1} lang={lang} />)}</div>
      </section>

      <section className="wave-section">
        <SectionHead eyebrow={t.waveEyebrow} title={t.waveTitle} copy={t.waveCopy} />
        <div className="chart-card glass">
          <div className="chart-stat"><span>{t.freshInterest}</span><strong>+53</strong><small>{t.pointRise}</small></div>
          <ResponsiveContainer width="100%" height={360}>
            <AreaChart data={waveData}><defs><linearGradient id="fresh" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9d6bff" stopOpacity={.75}/><stop offset="100%" stopColor="#9d6bff" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#ffffff0c" vertical={false}/><XAxis dataKey="month" stroke="#717188" axisLine={false} tickLine={false}/><YAxis hide/><Tooltip contentStyle={{ background: "#121222", border: "1px solid #ffffff18", borderRadius: 14 }}/><Area type="monotone" dataKey="fresh" stroke="#a77aff" strokeWidth={4} fill="url(#fresh)"/><Area type="monotone" dataKey="old" stroke="#ff9b45" strokeDasharray="7 7" strokeWidth={2} fill="transparent"/></AreaChart>
          </ResponsiveContainer>
          <div className="legend"><span><i className="fresh" /> {t.youngCuriosity}</span><span><i className="old" /> {t.oldComfort}</span><b>{t.demoLabel}</b></div>
        </div>
      </section>

      <section id="simulator">
        <SectionHead eyebrow={t.simEyebrow} title={t.simTitle} copy={t.simCopy} />
        <div className="sim-grid">
          <div className="sim-copy glass"><Pill tone="green"><i className="live-dot" /> {t.dailyReady}</Pill><h3>{t.simQuestionA}<br />{t.simQuestionB}</h3><p>{t.simText}</p><button onClick={simulate}><RefreshCw size={18} /> {t.run}</button><small>{runs.toLocaleString()} {t.explored}</small></div>
          <div className="bar-card glass"><ResponsiveContainer width="100%" height={370}><BarChart data={candidates} layout="vertical" margin={{ left: 20, right: 35 }}><CartesianGrid stroke="#ffffff0b" horizontal={false}/><XAxis type="number" hide domain={[0, 45]}/><YAxis type="category" dataKey="name" width={120} stroke="#aaaabc" axisLine={false} tickLine={false}/><Tooltip cursor={{ fill: "#ffffff08" }} contentStyle={{ background: "#121222", border: "1px solid #ffffff18", borderRadius: 14 }}/><Bar dataKey="popularity" radius={[0, 12, 12, 0]} barSize={24} label={{ position: "right", fill: "#fff", formatter: (v) => `${v ?? 0}%` }}>{candidates.map(c => <Cell key={c.id} fill={c.color}/>)}</Bar></BarChart></ResponsiveContainer><div className="demo-label">{t.demoLabel}</div></div>
        </div>
      </section>

      <LeaderVisionSection lang={lang} />

      <section className="nota glass">
        <div><span className="eyebrow">{t.notaEyebrow}</span><h2>{t.notaTitle}</h2><p>{t.notaCopy}</p></div>
        <div className="heat"><span>{t.calm}</span><i><em /></i><span>{t.changeWanted}</span><strong>64°</strong><small>{t.demoLabel}</small></div>
      </section>

      <footer>
        <div className="disclaimer"><ShieldCheck size={22} /><p><strong>{t.transparency}</strong>{t.disclaimer} <a href={genericMyNetaUrl} target="_blank" rel="noreferrer">{t.verifyRecords}</a></p></div>
        <div className="footer-bottom"><a className="brand" href="#"><span><Vote size={20} /></span><b>KHERI <em>YOUTH</em> PULSE</b></a><p>{t.footer}</p><Pill>{t.demoExperience}</Pill></div>
      </footer>
    </main>
  );
}
