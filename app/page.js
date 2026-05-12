"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

// --- ส่วนการตั้งค่า Supabase ---
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

export default function App() {
  const [pay, setPay]             = useState(freshPay);
  const [view, setView]           = useState("admin");
  const [isAdmin, setIsAdmin]     = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passErr, setPassErr]     = useState("");
  const [search, setSearch]       = useState("");
  const [picked, setPicked]       = useState(null);
  const [toast, setToast]         = useState(null);

  // --- จุดที่แก้ไข 1: ดึงข้อมูลจาก Supabase แทน LocalStorage ---
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('payments').select('*');
      if (data) {
        const formatted = freshPay();
        data.forEach(item => {
          if (formatted[item.student_id]) {
            formatted[item.student_id][item.week_no] = item.status;
          }
        });
        setPay(formatted);
      }
    }
    fetchData();
  }, []);

  function notify(text, err) {
    setToast({ text, err });
    setTimeout(() => setToast(null), 2500);
  }

  function login() {
    if (passInput === "admin1234") {
      setIsAdmin(true); setShowLogin(false); setPassInput(""); setPassErr("");
      notify("เข้าระบบแอดมินแล้ว");
    } else {
      setPassErr("รหัสผ่านไม่ถูกต้อง");
    }
  }

  // --- จุดที่แก้ไข 2: รีเซ็ตข้อมูลใน Supabase ---
  async function reset() {
    if (!window.confirm("ล้างข้อมูลทั้งหมดในระบบออนไลน์? ข้อมูลจะหายไปสำหรับทุกคน")) return;
    const { error } = await supabase.from('payments').delete().neq('status', 'none'); 
    if (!error) {
      setPay(freshPay());
      notify("รีเซ็ตออนไลน์เรียบร้อย");
    }
  }

  // --- จุดที่แก้ไข 3: บันทึกการเปลี่ยนแปลงลง Supabase ทันทีที่คลิก ---
  async function toggle(id, week) {
    if (!isAdmin) return;
    const currentStatus = pay[id]?.[week] || S.U;
    const nextStatus = CYCLE[currentStatus];

    // อัปเดต UI ทันทีเพื่อให้รู้สึกลื่นไหล
    setPay(prev => ({
      ...prev,
      [id]: { ...prev[id], [week]: nextStatus }
    }));

    // บันทึกลง Supabase
    await supabase.from('payments').upsert({
      student_id: id,
      week_no: week,
      status: nextStatus
    }, { onConflict: 'student_id,week_no' });
  }

  const stats = useMemo(() => MEMBERS.map(m => {
    let paid = 0, late = 0, exempt = 0, unpaid = 0, owed = 0, got = 0;
    WEEKS.forEach(w => {
      const s = pay[m.id]?.[w] || S.U;
      if (s === S.P) { paid++;   got  += 10; }
      if (s === S.L) { late++;   got  += 15; owed += 15; }
      if (s === S.E) { exempt++; }
      if (s === S.U) { unpaid++; owed += 10; }
    });
    return { ...m, paid, late, exempt, unpaid, owed, got };
  }), [pay]);

  const totals = stats.reduce((a, m) => ({ got: a.got + m.got, owed: a.owed + m.owed }), { got: 0, owed: 0 });

  const filtered = useMemo(() => {
    const q = search.trim();
    if (!q) return stats;
    return stats.filter(m =>
      m.name.includes(q) || m.surname.includes(q) ||
      m.nickname.includes(q) || m.id.includes(q) || String(m.num) === q
    );
  }, [stats, search]);

  const pickedM = picked ? stats.find(m => m.id === picked) : null;

  const ibtn = (c, extra) => ({ padding: "5px 12px", borderRadius: 7, border: `1px solid ${c}`, background: "transparent", color: c, cursor: "pointer", fontSize: 12, fontWeight: 700, ...extra });
  const inp  = { padding: "8px 12px", borderRadius: 8, border: "1px solid #334155", background: "#0f172a", color: "#f8fafc", fontSize: 13, outline: "none", boxSizing: "border-box" };
  const card = (x) => ({ background: "rgba(30,41,59,.85)", borderRadius: 12, border: "1px solid #334155", ...x });

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0f172a,#1e293b)", fontFamily: "'Sarabun','Noto Sans Thai',sans-serif", color: "#f8fafc" }}>

      {toast && (
        <div style={{ position: "fixed", top: 14, right: 14, zIndex: 9999, padding: "9px 18px", borderRadius: 9, background: toast.err ? "#ef4444" : "#22c55e", color: "#fff", fontWeight: 700, fontSize: 13, boxShadow: "0 4px 16px rgba(0,0,0,.4)" }}>
          {toast.text}
        </div>
      )}

      {showLogin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#1e293b", borderRadius: 14, padding: 28, border: "1px solid #334155", minWidth: 300, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>🔐</div>
            <h3 style={{ margin: "0 0 16px" }}>เข้าระบบแอดมิน</h3>
            <input
              type="password"
              placeholder="รหัสผ่าน"
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

      <div style={{ background: "rgba(15,23,42,.95)", borderBottom: "1px solid #334155", padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🏠</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>ระบบเก็บเงินห้อง</div>
              <div style={{ color: "#64748b", fontSize: 10 }}>27 สมาชิก · 34 สัปดาห์</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ display: "flex", background: "#0f172a", borderRadius: 7, border: "1px solid #334155", overflow: "hidden" }}>
              {[["admin","📋 ภาพรวม"],["member","👤 ตรวจสอบ"]].map(([v,lbl]) => (
                <button key={v} onClick={() => setView(v)}
                  style={{ padding: "5px 14px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: view === v ? "#3b82f6" : "transparent", color: view === v ? "#fff" : "#64748b" }}>
                  {lbl}
                </button>
              ))}
            </div>
            {isAdmin
              ? <button onClick={() => { setIsAdmin(false); notify("ออกจากระบบแล้ว", true); }} style={ibtn("#ef4444")}>🔓 ออก</button>
              : <button onClick={() => setShowLogin(true)} style={ibtn("#3b82f6")}>🔐 แอดมิน</button>
            }
            <button onClick={reset} style={ibtn("#f59e0b")}>🔄 รีเซ็ต</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "16px 12px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
          {[
            { icon: "👥", label: "สมาชิก",      val: MEMBERS.length,                  c: "#3b82f6" },
            { icon: "✅", label: "เก็บได้แล้ว", val: `฿${totals.got.toLocaleString()}`, c: "#22c55e" },
            { icon: "⏳", label: "ค้างชำระรวม", val: `฿${totals.owed.toLocaleString()}`, c: "#ef4444" },
            { icon: "📅", label: "สัปดาห์",     val: WEEKS.length,                    c: "#a855f7" },
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

        <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
          {[
            { s: S.P, lbl: "ชำระแล้ว (฿10)" },
            { s: S.L, lbl: "ค้างชำระเกิน 1 สัปดาห์ (฿15)" },
            { s: S.E, lbl: "ยกเว้นการชำระ" },
            { s: S.U, lbl: "ยังไม่ชำระ" },
          ].map(x => (
            <div key={x.s} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}>
              <div style={{ width: 15, height: 15, borderRadius: 3, background: BG[x.s], border: `1.5px solid ${COLOR[x.s]}66` }} />
              <span style={{ color: "#94a3b8" }}>{x.lbl}</span>
            </div>
          ))}
        </div>

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
                    <th style={{ padding: "8px 12px", textAlign: "left", color: "#94a3b8", fontSize: 11, fontWeight: 700, position: "sticky", left: 0, background: "#0f172a", zIndex: 2, minWidth: 180, borderRight: "2px solid #334155" }}>
                      ที่ · ชื่อ-สกุล
                    </th>
                    <th style={{ padding: "8px", color: "#22c55e", fontSize: 10, fontWeight: 700, minWidth: 60, textAlign: "center" }}>เก็บได้</th>
                    <th style={{ padding: "8px", color: "#ef4444", fontSize: 10, fontWeight: 700, minWidth: 60, textAlign: "center" }}>ค้างชำระ</th>
                    {WEEKS.map(w => (
                      <th key={w} style={{ padding: "6px 2px", color: "#64748b", fontSize: 9, fontWeight: 700, minWidth: 24, textAlign: "center" }}>{w}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m, ri) => (
                    <tr key={m.id} style={{ background: ri % 2 === 0 ? "rgba(30,41,59,.4)" : "rgba(15,23,42,.4)" }}>
                      <td style={{ padding: "6px 12px", position: "sticky", left: 0, zIndex: 1, background: ri % 2 === 0 ? "#1e293b" : "#0f172a", borderRight: "2px solid #334155" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                          <span style={{ color: "#475569", fontSize: 9, minWidth: 16 }}>{m.num}.</span>
                          <span style={{ fontWeight: 600, fontSize: 12, color: "#f1f5f9" }}>{m.name} {m.surname}</span>
                        </div>
                        <div style={{ color: "#64748b", fontSize: 9, paddingLeft: 21 }}>"{m.nickname}" · {m.id}</div>
                      </td>
                      <td style={{ padding: "6px", textAlign: "center", fontWeight: 700, color: "#22c55e", fontSize: 11 }}>฿{m.got}</td>
                      <td style={{ padding: "6px", textAlign: "center", fontWeight: 700, fontSize: 11, color: m.owed > 0 ? "#ef4444" : "#22c55e" }}>
                        {m.owed > 0 ? `฿${m.owed}` : "✓"}
                      </td>
                      {WEEKS.map(w => {
                        const s = pay[m.id]?.[w] || S.U;
                        return (
                          <td key={w} style={{ padding: "2px 1px", textAlign: "center" }}>
                            <div
                              onClick={() => toggle(m.id, w)}
                              style={{ width: 20, height: 20, borderRadius: 3, margin: "0 auto", background: BG[s], border: `1.5px solid ${COLOR[s]}55`, cursor: isAdmin ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700, color: COLOR[s], userSelect: "none" }}>
                              {ICON[s]}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === "member" && (
          <div>
            <h2 style={{ margin: "0 0 12px", fontSize: 14 }}>👤 ตรวจสอบยอดชำระของตัวเอง</h2>
            <input
              placeholder="🔍 พิมพ์ชื่อ นามสกุล ชื่อเล่น หรือรหัสนักศึกษา..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPicked(null); }}
              style={{ ...inp, width: "100%", marginBottom: 12 }}
            />

            {search && !picked && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 8, marginBottom: 12 }}>
                {filtered.map(m => (
                  <div key={m.id} onClick={() => setPicked(m.id)}
                    style={{ ...card({ padding: "12px 14px" }), cursor: "pointer" }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{m.name} {m.surname}</div>
                    <div style={{ color: "#94a3b8", fontSize: 11 }}>"{m.nickname}" · {m.id}</div>
                  </div>
                ))}
              </div>
            )}

            {pickedM && (
              <div>
                <button onClick={() => setPicked(null)} style={{ marginBottom: 12, padding: "5px 14px", borderRadius: 7, border: "1px solid #334155", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 13 }}>
                  ← กลับ
                </button>
                <div style={{ ...card({ padding: 18, marginBottom: 12 }) }}>
                  <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800 }}>{pickedM.name} {pickedM.surname}</h2>
                  <div style={{ fontSize: 22, fontWeight: 800, color: pickedM.owed > 0 ? "#ef4444" : "#22c55e" }}>
                    {pickedM.owed > 0 ? `ค้างชำระ ฿${pickedM.owed}` : "✓ ชำระครบ"}
                  </div>
                </div>
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
      `}</style>
    </div>
  );
            }
          
