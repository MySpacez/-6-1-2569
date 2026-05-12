"use client";

import { useState, useEffect, useMemo } from "react";

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

const WEEKS = Array.from({ length: 34 }, (_, i) => i + 1);
const KEY = "rfs_v7";
const S = { U: "u", P: "p", L: "l", E: "e" };
const CYCLE = { u: "p", p: "l", l: "e", e: "u" };
const COLOR = { p: "#16a34a", l: "#dc2626", e: "#2563eb", u: "#94a3b8" };
const BG = { p: "#dcfce7", l: "#fee2e2", e: "#dbeafe", u: "#f8fafc" };
const ICON = { p: "✓", l: "฿", e: "~", u: "" };
const LABEL = { p: "ชำระแล้ว ฿10", l: "ค้างชำระ ฿15", e: "ยกเว้น", u: "ยังไม่ชำระ" };

export default function App() {
  const [pay, setPay] = useState({});
  const [view, setView] = useState("admin");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passErr, setPassErr] = useState("");
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState(null);
  const [toast, setToast] = useState(null);

  // ดึงข้อมูลเมื่อโหลดหน้า
  useEffect(() => {
    const d = localStorage.getItem(KEY);
    if (d) {
      try {
        const parsed = JSON.parse(d);
        if (parsed.pay) setPay(parsed.pay);
      } catch (e) { console.error(e); }
    }
  }, []);

  // บันทึกข้อมูลเมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    if (Object.keys(pay).length > 0) {
      localStorage.setItem(KEY, JSON.stringify({ key: KEY, pay }));
    }
  }, [pay]);

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

  function reset() {
    if (!window.confirm("ล้างข้อมูลทั้งหมดและเริ่มใหม่?")) return;
    setPay({});
    localStorage.removeItem(KEY);
    notify("รีเซ็ตเรียบร้อย");
  }

  function toggle(id, week) {
    if (!isAdmin) return;
    setPay(prev => ({
      ...prev,
      [id]: { ...prev[id], [week]: CYCLE[prev[id]?.[week] || S.U] }
    }));
  }

  const stats = useMemo(() => MEMBERS.map(m => {
    let paid = 0, late = 0, exempt = 0, unpaid = 0, owed = 0, got = 0;
    WEEKS.forEach(w => {
      const s = pay[m.id]?.[w] || S.U;
      if (s === S.P) { paid++; got += 10; }
      if (s === S.L) { late++; got += 15; owed += 15; }
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
  const inp = { padding: "8px 12px", borderRadius: 8, border: "1px solid #334155", background: "#0f172a", color: "#f8fafc", fontSize: 13, outline: "none", boxSizing: "border-box" };
  const card = (x) => ({ background: "rgba(30,41,59,.85)", borderRadius: 12, border: "1px solid #334155", ...x });

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0f172a,#1e293b)", fontFamily: "'Sarabun', sans-serif", color: "#f8fafc" }}>
      {toast && (
        <div style={{ position: "fixed", top: 14, right: 14, zIndex: 9999, padding: "9px 18px", borderRadius: 9, background: toast.err ? "#ef4444" : "#22c55e", color: "#fff", fontWeight: 700, fontSize: 13 }}>
          {toast.text}
        </div>
      )}

      {showLogin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#1e293b", borderRadius: 14, padding: 28, border: "1px solid #334155", minWidth: 300, textAlign: "center" }}>
            <h3 style={{ margin: "0 0 16px" }}>เข้าระบบแอดมิน</h3>
            <input type="password" value={passInput} onChange={e => setPassInput(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} style={{ ...inp, width: "100%", marginBottom: 8 }} />
            {passErr && <p style={{ color: "#ef4444", margin: "0 0 8px", fontSize: 12 }}>{passErr}</p>}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowLogin(false)} style={ibtn("#64748b")}>ยกเลิก</button>
              <button onClick={login} style={ibtn("#3b82f6", { flex: 1, background: "#3b82f6", color: "#fff" })}>เข้าสู่ระบบ</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: "rgba(15,23,42,.95)", borderBottom: "1px solid #334155", padding: "10px 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 800 }}>ระบบเก็บเงินห้อง SMTE</div>
            <div style={{ color: "#64748b", fontSize: 10 }}>{MEMBERS.length} สมาชิก · {WEEKS.length} สัปดาห์</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => setView("admin")} style={ibtn(view === "admin" ? "#3b82f6" : "#64748b")}>แผงควบคุม</button>
            <button onClick={() => setView("member")} style={ibtn(view === "member" ? "#3b82f6" : "#64748b")}>สมาชิก</button>
            {isAdmin ? <button onClick={() => setIsAdmin(false)} style={ibtn("#ef4444")}>ออก</button> : <button onClick={() => setShowLogin(true)} style={ibtn("#3b82f6")}>แอดมิน</button>}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: 20 }}>
        {/* ส่วนแสดงสรุปยอด (เหมือนเดิม) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 20 }}>
          <div style={card({ padding: 15 })}>เก็บได้: <span style={{ color: "#22c55e", fontWeight: 800 }}>฿{totals.got.toLocaleString()}</span></div>
          <div style={card({ padding: 15 })}>ค้างชำระ: <span style={{ color: "#ef4444", fontWeight: 800 }}>฿{totals.owed.toLocaleString()}</span></div>
        </div>

        {view === "admin" ? (
          <div>
            <input placeholder="ค้นหา..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inp, width: "100%", marginBottom: 15 }} />
            <div style={{ overflowX: "auto", ...card({}) }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ padding: 10, textAlign: "left" }}>ชื่อ</th>
                    {WEEKS.map(w => <th key={w} style={{ fontSize: 9 }}>{w}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(m => (
                    <tr key={m.id} style={{ borderTop: "1px solid #334155" }}>
                      <td style={{ padding: 10, fontSize: 12 }}>{m.name} ({m.nickname})</td>
                      {WEEKS.map(w => (
                        <td key={w} onClick={() => toggle(m.id, w)} style={{ textAlign: "center", cursor: isAdmin ? "pointer" : "default", background: BG[pay[m.id]?.[w] || "u"], color: COLOR[pay[m.id]?.[w] || "u"], fontWeight: "bold" }}>
                          {ICON[pay[m.id]?.[w] || "u"]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isAdmin && <button onClick={reset} style={{ ...ibtn("#ef4444"), marginTop: 20 }}>รีเซ็ตข้อมูลทั้งหมด</button>}
          </div>
        ) : (
          /* ส่วนตรวจสอบรายบุคคล (เหมือนเดิม) */
          <div>
            <input placeholder="ใส่ชื่อหรือรหัส..." value={search} onChange={e => { setSearch(e.target.value); setPicked(null); }} style={{ ...inp, width: "100%", marginBottom: 15 }} />
            {pickedM ? (
              <div style={card({ padding: 20 })}>
                <h3>{pickedM.name} {pickedM.surname}</h3>
                <p>ค้างชำระ: <span style={{ color: "#ef4444" }}>฿{pickedM.owed}</span></p>
                <button onClick={() => setPicked(null)} style={ibtn("#3b82f6")}>กลับ</button>
              </div>
            ) : (
              filtered.map(m => <div key={m.id} onClick={() => setPicked(m.id)} style={{ ...card({ padding: 10, marginBottom: 5 }), cursor: "pointer" }}>{m.name} ({m.nickname})</div>)
            )}
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { height: 5px; }
        ::-webkit-scrollbar-thumb { background: #334155; }
      `}</style>
    </div>
  );
}
