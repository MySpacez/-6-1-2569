"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tddhhgzooggoxgejstyg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkZGhoZ3pvb2dnb3hnZWpzdHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1Nzk4MzAsImV4cCI6MjA5NDE1NTgzMH0.0CZE6QpcJ2t4o62W-Io-B7RN5jraAcPcphwNtl1Qi_Q";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const MEMBERS = [
  { id: "52575", num: 1,  name: "น.ส. สุทิศา",    surname: "เกื้อคีรี",        nickname: "โมจิ"      },
  { id: "52580", num: 2,  name: "น.ส. สุวิชาดา",  surname: "จันทร์เป็ง",      nickname: "การ์ตูน"   },
  { id: "52587", num: 3,  name: "น.ส. ธัญพิชชา",  surname: "หอมศิริกมล",      nickname: "อุ๊งอิ๊ง"  },
  { id: "52595", num: 4,  name: "นาย กิตตินันท์", surname: "ปัญญาแก้ว",       nickname: "ตด(กฎ)"   },
  { id: "52596", num: 5,  name: "น.ส. กันฐ์ฤทัย", surname: "ประทุมเทา",       nickname: "น้ำทิพย์"  },
  { id: "52602", num: 6,  name: "น.ส. วลัยพรรณ",  surname: "จันทรานาค",       nickname: "ปริมมี่"   },
  { id: "52646", num: 7,  name: "นาย ปกรณ์วิชญ์", surname: "คันธามารัตน์",    nickname: "เป"        },
  { id: "52649", num: 8,  name: "น.ส. เมลาณี",    surname: "เฟื่องเพียร",      nickname: "แฅลร์"     },
  { id: "52660", num: 9,  name: "น.ส. ภีรดา",     surname: "โมจมสิน",         nickname: "แพร"       },
  { id: "52681", num: 10, name: "น.ส. นภัชพร",    surname: "บัวลอย",          nickname: "เนเน่"     },
  { id: "52728", num: 11, name: "น.ส. ศตพร",      surname: "สมหวาน",          nickname: "เจ้น"      },
  { id: "52732", num: 12, name: "น.ส. สิปโปทัย",  surname: "วงศ์สิทธิพิศาล",  nickname: "ออมสิน"    },
  { id: "52755", num: 13, name: "น.ส. ศศิลดา",    surname: "ปัญญาน่าน",       nickname: "ศศิ"       },
  { id: "52756", num: 14, name: "น.ส. นฤภร",      surname: "ชมภูทอง",         nickname: "ปัญญา"     },
  { id: "52772", num: 15, name: "น.ส. ชนัญชิดา",  surname: "เจนธนานันท์",     nickname: "ผิง"       },
  { id: "52780", num: 16, name: "น.ส. อัจจิมา",   surname: "ปันธนนันท์",      nickname: "อาจุมม่า"  },
  { id: "53754", num: 17, name: "น.ส. พัชรกันย์",  surname: "ปินตา",           nickname: "บีม"       },
  { id: "54914", num: 18, name: "น.ส. กันตณวรรณ", surname: "คำหล้า",          nickname: "น้ำตก"     },
  { id: "54918", num: 19, name: "น.ส. บุญฑริกา",  surname: "คุณาธรรม",        nickname: "ไอติม"     },
  { id: "54924", num: 20, name: "นาย ศุภณัฐ",     surname: "มูลบรรจง",        nickname: "มะตอม"     },
  { id: "54925", num: 21, name: "นาย ภัทรพล",     surname: "ปานันท์",         nickname: "ฟลุ๊ค"     },
  { id: "54926", num: 22, name: "น.ส. ญารินดา",   surname: "ชัยวงค์",         nickname: "ดี"        },
  { id: "54931", num: 23, name: "นาย ปาณัสม์",    surname: "ทองสา",           nickname: "ภู"        },
  { id: "55060", num: 24, name: "นาย พีรวิชญ์",   surname: "กิจชาลารัตน์",    nickname: "บีมจี"     },
  { id: "55063", num: 25, name: "น.ส. อมรกานต์",  surname: "วานิชยากูล",      nickname: "เอมมี่"    },
  { id: "55349", num: 26, name: "น.ส. นภพร",      surname: "ทิวานันท์",        nickname: "ถิงถิง"    },
  { id: "55445", num: 27, name: "น.ส. กชพรรณ",    surname: "น้อยตั้ง",         nickname: "เพียงฟ้า"  },
];

const WEEKS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34];

const S = { U: "u", P: "p", L: "l", E: "e" };
const CYCLE = { u: "p", p: "l", l: "e", e: "u" };
const COLOR = { p: "#16a34a", l: "#dc2626", e: "#2563eb", u: "#94a3b8" };
const BG    = { p: "#dcfce7", l: "#fee2e2", e: "#dbeafe", u: "#f8fafc" };
const ICON  = { p: "✓", l: "฿", e: "~", u: "" };
const LABEL = { p: "ชำระแล้ว ฿10", l: "ค้างชำระ ฿15", e: "ยกเว้น", u: "ยังไม่ชำระ" };

function freshPay() {
  const p = {};
  MEMBERS.forEach(m => {
    p[m.id] = {};
    WEEKS.forEach(w => { p[m.id][w] = S.U; });
  });
  return p;
}


  const [pay, setPay]                   = useState(freshPay);
  const [activeWeek, setActiveWeek]     = useState(null);   // สัปดาห์ปัจจุบัน
  const [view, setView]                 = useState("admin");
  const [isAdmin, setIsAdmin]           = useState(false);
  const [showLogin, setShowLogin]       = useState(false);
  const [showWeekModal, setShowWeekModal] = useState(false); // modal เลือกสัปดาห์
  const [passInput, setPassInput]       = useState("");
  const [passErr, setPassErr]           = useState("");
  const [search, setSearch]             = useState("");
  const [picked, setPicked]             = useState(null);
  const [toast, setToast]               = useState(null);
  const [loading, setLoading]           = useState(true);

  // ── โหลดข้อมูลจาก Supabase ──────────────────────────────────────────────
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      // โหลด payment data
      const { data: payData } = await supabase.from("payments").select("*");
      if (payData) {
        const formatted = freshPay();
        payData.forEach(item => {
          if (formatted[item.student_id]) {
            formatted[item.student_id][item.week_no] = item.status;
          }
        });
        setPay(formatted);
      }
      // โหลด active week จาก settings table
      const { data: cfg } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "active_week")
        .single();
      if (cfg?.value) setActiveWeek(Number(cfg.value));

      setLoading(false);
    }
    fetchAll();
  }, []);

  function notify(text, isErr) {
    setToast({ text, isErr });
    setTimeout(() => setToast(null), 2800);
  }

  function login() {
    if (passInput === "admin1234") {
      setIsAdmin(true); setShowLogin(false); setPassInput(""); setPassErr("");
      notify("🔓 เข้าระบบแอดมินแล้ว");
    } else {
      setPassErr("รหัสผ่านไม่ถูกต้อง");
    }
  }

  async function reset() {
    if (!isAdmin) return;
    if (!window.confirm("ล้างข้อมูลการชำระทั้งหมด? ข้อมูลจะหายไปสำหรับทุกคน")) return;
    const { error } = await supabase.from("payments").delete().neq("status", "none");
    if (!error) {
      setPay(freshPay());
      notify("รีเซ็ตเรียบร้อย");
    }
  }

  async function toggle(id, week) {
    if (!isAdmin) return;
    const nextStatus = CYCLE[pay[id]?.[week] || S.U];
    setPay(prev => ({ ...prev, [id]: { ...prev[id], [week]: nextStatus } }));
    await supabase.from("payments").upsert(
      { student_id: id, week_no: week, status: nextStatus },
      { onConflict: "student_id,week_no" }
    );
  }

  // ── ตั้งสัปดาห์ปัจจุบัน + auto-mark ค้างชำระสัปดาห์ก่อน ─────────────────
  async function setCurrentWeek(week) {
    if (!isAdmin) return;

    // สร้าง upsert batch สำหรับทุก U ในสัปดาห์ก่อนหน้า
    const upserts = [];
    const nextPay = { ...pay };

    MEMBERS.forEach(m => {
      const mPay = { ...nextPay[m.id] };
      WEEKS.forEach(w => {
        if (w < week && mPay[w] === S.U) {
          mPay[w] = S.L;
          upserts.push({ student_id: m.id, week_no: w, status: S.L });
        }
      });
      nextPay[m.id] = mPay;
    });

    setPay(nextPay);
    setActiveWeek(week);
    setShowWeekModal(false);

    // บันทึกลง Supabase พร้อมกัน
    const tasks = [];
    if (upserts.length > 0) {
      tasks.push(
        supabase.from("payments").upsert(upserts, { onConflict: "student_id,week_no" })
      );
    }
    tasks.push(
      supabase.from("settings").upsert({ key: "active_week", value: String(week) }, { onConflict: "key" })
    );
    await Promise.all(tasks);

    const lateCount = upserts.length;
    notify(`📅 สัปดาห์ ${week} · มาร์คค้างชำระ ${lateCount} รายการอัตโนมัติ`);
  }

  // ── stats ────────────────────────────────────────────────────────────────
  const stats = useMemo(() => MEMBERS.map(m => {
    let paid = 0, late = 0, exempt = 0, unpaid = 0, owed = 0, got = 0;
    WEEKS.forEach(w => {
      const s = pay[m.id]?.[w] || S.U;
      if (s === S.P) { paid++;   got += 10; }
      if (s === S.L) { late++;   got += 15; owed += 15; }
      if (s === S.E) { exempt++; }
      if (s === S.U) { unpaid++; owed += 10; }
    });
    return { ...m, paid, late, exempt, unpaid, owed, got };
  }), [pay]);

  const totals = stats.reduce((a, m) => ({ got: a.got + m.got, owed: a.owed + m.owed }), { got: 0, owed: 0 });

  // คนที่ยังค้างสัปดาห์ปัจจุบัน (U หรือ L)
  const overdueNow = activeWeek
    ? MEMBERS.filter(m => pay[m.id]?.[activeWeek] === S.U || pay[m.id]?.[activeWeek] === S.L)
    : [];

  const filtered = useMemo(() => {
    const q = search.trim();
    if (!q) return stats;
    return stats.filter(m =>
      m.name.includes(q) || m.surname.includes(q) ||
      m.nickname.includes(q) || m.id.includes(q) || String(m.num) === q
    );
  }, [stats, search]);

  const pickedM = picked ? stats.find(m => m.id === picked) : null;

  // ── style helpers ────────────────────────────────────────────────────────
  const ibtn = (c, extra) => ({
    padding: "5px 12px", borderRadius: 7, border: `1px solid ${c}`,
    background: "transparent", color: c, cursor: "pointer",
    fontSize: 12, fontWeight: 700, ...extra
  });
  const inp = {
    padding: "8px 12px", borderRadius: 8, border: "1px solid #334155",
    background: "#0f172a", color: "#f8fafc", fontSize: 13,
    outline: "none", boxSizing: "border-box"
  };
  const card = (x) => ({
    background: "rgba(30,41,59,.85)", borderRadius: 12,
    border: "1px solid #334155", ...x
  });

  // สีหัวคอลัมน์สัปดาห์
  function weekThStyle(w) {
    const base = {
      padding: "7px 2px", fontSize: 9, fontWeight: 700, minWidth: 26,
      textAlign: "center", userSelect: "none", transition: "all .15s",
      cursor: isAdmin ? "pointer" : "default", position: "relative"
    };
    if (w === activeWeek)
      return { ...base, background: "#1d4ed8", color: "#fff", borderRadius: 4, boxShadow: "0 0 0 2px #60a5fa" };
    if (activeWeek && w < activeWeek)
      return { ...base, background: "#1f2937", color: "#4b5563", borderRadius: 4 };
    return { ...base, color: "#64748b" };
  }

  // ════════════════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0f172a,#1e293b)", fontFamily: "'Sarabun','Noto Sans Thai',sans-serif", color: "#f8fafc" }}>

      {/* ── Loading overlay ── */}
      {loading && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 9000 }}>
          <div style={{ fontSize: 36, marginBottom: 12, animation: "spin 1s linear infinite" }}>⏳</div>
          <div style={{ color: "#94a3b8", fontSize: 14 }}>กำลังโหลดข้อมูล...</div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div style={{ position: "fixed", top: 14, right: 14, zIndex: 9999, padding: "10px 20px", borderRadius: 10, background: toast.isErr ? "#ef4444" : "#22c55e", color: "#fff", fontWeight: 700, fontSize: 13, boxShadow: "0 4px 20px rgba(0,0,0,.4)" }}>
          {toast.text}
        </div>
      )}

      {/* ── Week Picker Modal ── */}
      {showWeekModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }}
          onClick={() => setShowWeekModal(false)}>
          <div style={{ background: "#1e293b", borderRadius: 16, padding: 24, border: "1px solid #334155", minWidth: 360, maxWidth: 440 }}
            onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 6px", fontSize: 16 }}>📅 เลือกสัปดาห์ปัจจุบัน</h3>
            <p style={{ margin: "0 0 16px", color: "#94a3b8", fontSize: 12, lineHeight: 1.6 }}>
              เมื่อเลือก ระบบจะ <span style={{ color: "#fbbf24", fontWeight: 700 }}>มาร์คค้างชำระอัตโนมัติ</span> ให้ทุกคนที่ยังไม่จ่ายในสัปดาห์ก่อนหน้าทั้งหมด
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6 }}>
              {WEEKS.map(w => (
                <button key={w} onClick={() => setCurrentWeek(w)}
                  style={{
                    padding: "10px 4px", borderRadius: 8, border: "none", fontWeight: 700, fontSize: 14,
                    cursor: "pointer", transition: "all .15s",
                    background: w === activeWeek ? "#1d4ed8" : "#0f172a",
                    color: w === activeWeek ? "#fff" : "#94a3b8",
                    boxShadow: w === activeWeek ? "0 0 0 2px #60a5fa" : "none"
                  }}>
                  {w}
                </button>
              ))}
            </div>
            <button onClick={() => setShowWeekModal(false)} style={{ ...ibtn("#64748b"), marginTop: 16, width: "100%", padding: "8px" }}>ปิด</button>
          </div>
        </div>
      )}

      {/* ── Login Modal ── */}
      {showLogin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#1e293b", borderRadius: 14, padding: 28, border: "1px solid #334155", minWidth: 300, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>🔐</div>
            <h3 style={{ margin: "0 0 16px" }}>เข้าระบบแอดมิน</h3>
            <input
              type="password" placeholder="รหัสผ่าน"
              value={passInput}
              onChange={e => setPassInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && login()}
              style={{ ...inp, width: "100%", marginBottom: 8 }}
            />
            {passErr && <p style={{ color: "#ef4444", margin: "0 0 8px", fontSize: 12 }}>{passErr}</p>}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => { setShowLogin(false); setPassInput(""); setPassErr(""); }} style={ibtn("#64748b")}>ยกเลิก</button>
              <button onClick={login} style={ibtn("#3b82f6", { flex: 1, background: "#3b82f6", color: "#fff" })}>เข้าสู่ระบบ</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Top Bar ── */}
      <div style={{ background: "rgba(15,23,42,.95)", borderBottom: "1px solid #334155", padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🏠</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>ระบบเก็บเงินห้อง</div>
              <div style={{ color: "#64748b", fontSize: 10 }}>27 สมาชิก · 34 สัปดาห์</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {/* View tabs */}
            <div style={{ display: "flex", background: "#0f172a", borderRadius: 7, border: "1px solid #334155", overflow: "hidden" }}>
              {[["admin","📋 ภาพรวม"],["member","👤 ตรวจสอบ"]].map(([v,lbl]) => (
                <button key={v} onClick={() => setView(v)}
                  style={{ padding: "5px 14px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: view === v ? "#3b82f6" : "transparent", color: view === v ? "#fff" : "#64748b" }}>
                  {lbl}
                </button>
              ))}
            </div>

            {/* ปุ่มสัปดาห์ปัจจุบัน — เฉพาะแอดมิน */}
            {isAdmin && (
              <button onClick={() => setShowWeekModal(true)}
                style={{
                  padding: "5px 12px", borderRadius: 7, border: "1px solid #1d4ed8",
                  background: activeWeek ? "#1e3a8a" : "#0f172a",
                  color: activeWeek ? "#93c5fd" : "#64748b",
                  cursor: "pointer", fontSize: 12, fontWeight: 700
                }}>
                📅 {activeWeek ? `สัปดาห์ ${activeWeek}` : "เลือกสัปดาห์"}
              </button>
            )}

            {isAdmin
              ? <button onClick={() => { setIsAdmin(false); notify("ออกจากระบบแล้ว", true); }} style={ibtn("#ef4444")}>🔓 ออก</button>
              : <button onClick={() => setShowLogin(true)} style={ibtn("#3b82f6")}>🔐 แอดมิน</button>
            }
            {isAdmin && <button onClick={reset} style={ibtn("#f59e0b")}>🔄 รีเซ็ต</button>}
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "16px 12px" }}>

        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
          {[
            { icon: "👥", label: "สมาชิก",         val: MEMBERS.length,                   c: "#3b82f6" },
            { icon: "✅", label: "เก็บได้แล้ว",    val: `฿${totals.got.toLocaleString()}`, c: "#22c55e" },
            { icon: "⏳", label: "ค้างชำระรวม",    val: `฿${totals.owed.toLocaleString()}`, c: "#ef4444" },
            { icon: "⚠️", label: "ค้างสัปดาห์นี้", val: activeWeek ? `${overdueNow.length} คน` : "—", c: "#f59e0b" },
          ].map((s, i) => (
            <div key={i} style={{ ...card({ padding: "12px 14px", border: `1px solid ${s.c}33` }), display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 19, fontWeight: 800, color: s.c }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Overdue alert */}
        {activeWeek && overdueNow.length > 0 && view === "admin" && (
          <div style={{ ...card({ padding: "12px 16px", marginBottom: 14, border: "1px solid #f59e0b55", background: "rgba(120,53,15,.2)" }), display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            <div>
              <div style={{ fontWeight: 700, color: "#fbbf24", fontSize: 13, marginBottom: 5 }}>
                ยังไม่ชำระสัปดาห์ที่ {activeWeek} — {overdueNow.length} คน
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {overdueNow.map(m => (
                  <span key={m.id} style={{ background: "#78350f", color: "#fcd34d", padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                    {m.nickname}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          {[
            { s: S.P, lbl: "ชำระแล้ว (฿10)" },
            { s: S.L, lbl: "ค้างชำระ+ปรับ (฿15)" },
            { s: S.E, lbl: "ยกเว้น" },
            { s: S.U, lbl: "ยังไม่ชำระ" },
          ].map(x => (
            <div key={x.s} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: BG[x.s], border: `1.5px solid ${COLOR[x.s]}66` }} />
              <span style={{ color: "#94a3b8" }}>{x.lbl}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: "#1d4ed8" }} />
            <span style={{ color: "#94a3b8" }}>สัปดาห์ปัจจุบัน</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: "#1f2937" }} />
            <span style={{ color: "#94a3b8" }}>สัปดาห์ที่ผ่านแล้ว</span>
          </div>
          {isAdmin && <span style={{ color: "#fbbf24", fontSize: 11, marginLeft: 4 }}>✏️ คลิกช่องเพื่อเปลี่ยนสถานะ</span>}
</div>

        {/* ══ ADMIN VIEW ══ */}
        {view === "admin" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>📊 ตารางการชำระเงิน</span>
              <input placeholder="🔍 ค้นหาสมาชิก..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inp, width: 200 }} />
            </div>
            <div style={{ overflowX: "auto", ...card({ padding: 0 }) }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
                <thead>
                  <tr style={{ background: "#0f172a" }}>
                    <th style={{ padding: "8px 12px", textAlign: "left", color: "#94a3b8", fontSize: 11, fontWeight: 700, position: "sticky", left: 0, background: "#0f172a", zIndex: 2, minWidth: 185, borderRight: "2px solid #334155" }}>
                      ที่ · ชื่อ-สกุล
                    </th>
                    <th style={{ padding: "8px", color: "#22c55e", fontSize: 10, fontWeight: 700, minWidth: 60, textAlign: "center" }}>เก็บได้</th>
                    <th style={{ padding: "8px", color: "#ef4444", fontSize: 10, fontWeight: 700, minWidth: 60, textAlign: "center" }}>ค้างชำระ</th>
                    {WEEKS.map(w => (
                      <th key={w}
                        onClick={() => isAdmin && setShowWeekModal(true)}
                        title={isAdmin ? "คลิกเพื่อเลือกสัปดาห์ปัจจุบัน" : ""}
                        style={weekThStyle(w)}>
                        {w}
                        {w === activeWeek && (
                          <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "#93c5fd" }} />
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m, ri) => {
                    const evenBg   = "rgba(30,41,59,.4)";
                    const oddBg    = "rgba(15,23,42,.4)";
                    const stickyBg = ri % 2 === 0 ? "#1e293b" : "#0f172a";
                    return (
                      <tr key={m.id} style={{ background: ri % 2 === 0 ? evenBg : oddBg }}>
                        <td style={{ padding: "6px 12px", position: "sticky", left: 0, zIndex: 1, background: stickyBg, borderRight: "2px solid #334155" }}>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                            <span style={{ color: "#475569", fontSize: 9, minWidth: 18 }}>{m.num}.</span>
                            <span style={{ fontWeight: 600, fontSize: 12, color: "#f1f5f9" }}>{m.name} {m.surname}</span>
                          </div>
                          <div style={{ color: "#64748b", fontSize: 9, paddingLeft: 23 }}>"{m.nickname}" · {m.id}</div>
                        </td>
                        <td style={{ padding: "6px", textAlign: "center", fontWeight: 700, color: "#22c55e", fontSize: 11 }}>฿{m.got}</td>
                        <td style={{ padding: "6px", textAlign: "center", fontWeight: 700, fontSize: 11, color: m.owed > 0 ? "#ef4444" : "#22c55e" }}>
                          {m.owed > 0 ? `฿${m.owed}` : "✓"}
                        </td>
                        {WEEKS.map(w => {
                          const s          = pay[m.id]?.[w] || S.U;
                          const isCurrent  = w === activeWeek;
                          const isPast     = activeWeek && w < activeWeek;
                          return (
                            <td key={w} style={{
                              padding: "2px 1px", textAlign: "center",
                              background: isCurrent ? "rgba(29,78,216,.1)" : isPast ? "rgba(0,0,0,.15)" : "transparent"
                            }}>
                              <div
                                onClick={() => toggle(m.id, w)}
                                title={`${m.nickname} สัปดาห์ ${w}: ${LABEL[s]}`}
                                style={{
                                  width: 20, height: 20, borderRadius: 3, margin: "0 auto",
                                  background: BG[s],
                                  border: isCurrent ? `2px solid #3b82f6` : `1.5px solid ${COLOR[s]}55`,
                                  cursor: isAdmin ? "pointer" : "default",
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  fontSize: 7, fontWeight: 700, color: COLOR[s], userSelect: "none",
                                  transition: "transform .1s",
                                }}>
                                {ICON[s]}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p style={{ color: "#475569", fontSize: 11, marginTop: 8 }}>
              {isAdmin
                ? "คลิกช่องเพื่อวนเปลี่ยนสถานะ · กดปุ่ม 📅 หรือคลิกแถบเลขสัปดาห์เพื่อตั้งสัปดาห์ปัจจุบัน"
                : "🔐 เข้าระบบแอดมินเพื่อแก้ไขข้อมูล"}
            </p>
          </div>
        )}

        {/* ══ MEMBER VIEW ══ */}
        {view === "member" && (
          <div>
            <h2 style={{ margin: "0 0 12px", fontSize: 14 }}>👤 ตรวจสอบยอดชำระของตัวเอง</h2>

            {/* แสดงสัปดาห์ปัจจุบันให้สมาชิกเห็น */}
            {activeWeek && (
              <div style={{ ...card({ padding: "10px 16px", marginBottom: 12, border: "1px solid #1d4ed855", background: "rgba(29,78,216,.1)" }), display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#93c5fd", fontSize: 13, fontWeight: 700 }}>📅 สัปดาห์ปัจจุบัน: สัปดาห์ที่ {activeWeek}</span>
              </div>
            )}

            <input
              placeholder="🔍 พิมพ์ชื่อ นามสกุล ชื่อเล่น หรือรหัสนักเรียน..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPicked(null); }}
              style={{ ...inp, width: "100%", marginBottom: 12 }}
            />

            {search && !picked && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 8, marginBottom: 12 }}>
                {filtered.length === 0 && <p style={{ color: "#64748b", fontSize: 13 }}>ไม่พบสมาชิก</p>}
                {filtered.map(m => (
                  <div key={m.id} onClick={() => setPicked(m.id)}
                    style={{ ...card({ padding: "12px 14px" }), cursor: "pointer", transition: "border-color .2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#3b82f6"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#334155"}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{m.name} {m.surname}</div>
                    <div style={{ color: "#94a3b8", fontSize: 11 }}>"{m.nickname}" · {m.id}</div>
                    <div style={{ marginTop: 8, fontWeight: 700, fontSize: 13, color: m.owed > 0 ? "#ef4444" : "#22c55e" }}>
                      {m.owed > 0 ? `ค้างชำระ ฿${m.owed}` : "✓ ชำระครบแล้ว"}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {pickedM && (
              <div>
                <button onClick={() => setPicked(null)} style={{ marginBottom: 12, padding: "5px 14px", borderRadius: 7, border: "1px solid #334155", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 13 }}>
                  ← กลับ
                </button>

                {/* ยอดสรุป */}
                <div style={{ ...card({ padding: 20, marginBottom: 12 }) }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
                    <div>
                      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800 }}>{pickedM.name} {pickedM.surname}</h2>
                      <p style={{ margin: 0, color: "#94a3b8", fontSize: 12 }}>"{pickedM.nickname}" · รหัส {pickedM.id}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>ยอดค้างชำระทั้งหมด</div>
                      <div style={{ fontSize: 26, fontWeight: 800, color: pickedM.owed > 0 ? "#ef4444" : "#22c55e" }}>
                        {pickedM.owed > 0 ? `฿${pickedM.owed}` : "✓ ชำระครบ"}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 16 }}>
                    {[
                      { lbl: "ชำระแล้ว",      v: pickedM.paid,   c: "#22c55e" },
                      { lbl: "ค้างชำระ+ปรับ", v: pickedM.late,   c: "#ef4444" },
                      { lbl: "ยกเว้น",         v: pickedM.exempt, c: "#3b82f6" },
                      { lbl: "ยังไม่ชำระ",    v: pickedM.unpaid, c: "#94a3b8" },
                    ].map((x, i) => (
                      <div key={i} style={{ background: "#0f172a", borderRadius: 8, padding: 10, textAlign: "center" }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: x.c }}>{x.v}</div>
                        <div style={{ fontSize: 10, color: "#64748b" }}>{x.lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* รายละเอียดสัปดาห์ */}
                <div style={{ ...card({ padding: 18 }) }}>
                  <h3 style={{ margin: "0 0 12px", fontSize: 13 }}>รายละเอียดแต่ละสัปดาห์</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(68px,1fr))", gap: 5 }}>
                    {WEEKS.map(w => {
                      const s = pay[pickedM.id]?.[w] || S.U;
                      const isCurrent = w === activeWeek;
                      return (
                        <div key={w} style={{
                          background: BG[s],
                          border: isCurrent ? `2px solid #3b82f6` : `1.5px solid ${COLOR[s]}55`,
                          borderRadius: 7, padding: "7px 4px", textAlign: "center"
                        }}>
                          <div style={{ fontSize: 9, color: isCurrent ? "#3b82f6" : "#64748b", fontWeight: isCurrent ? 800 : 400 }}>
                            สัปดาห์ {w}{isCurrent ? " ◀" : ""}
                          </div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: COLOR[s], marginTop: 2 }}>
                            {s === S.P ? "✓ ฿10" : s === S.L ? "฿15" : s === S.E ? "ยกเว้น" : "—"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {!search && !picked && (
              <div style={{ textAlign: "center", padding: "50px 20px", color: "#475569" }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>🔍</div>
                <p style={{ fontSize: 14 }}>พิมพ์ชื่อหรือรหัสเพื่อค้นหายอดชำระของคุณ</p>
                <p style={{ fontSize: 12 }}>ดูได้อย่างเดียว ไม่สามารถแก้ไขข้อมูลได้</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        button:hover { opacity: .85; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

                      
