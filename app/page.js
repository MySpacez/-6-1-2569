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
const KEY = "rfs_final_v1";
const S = { U: "u", P: "p", L: "l", E: "e" };
const CYCLE = { u: "p", p: "l", l: "e", e: "u" };
const COLOR = { p: "#16a34a", l: "#dc2626", e: "#2563eb", u: "#94a3b8" };
const BG = { p: "#dcfce7", l: "#fee2e2", e: "#dbeafe", u: "#f8fafc" };
const ICON = { p: "✓", l: "฿", e: "~", u: "" };

export default function App() {
  const [pay, setPay] = useState({});
  const [view, setView] = useState("admin");
  const [isAdmin, setIsAdmin] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const d = localStorage.getItem(KEY);
    if (d) {
      try {
        const parsed = JSON.parse(d);
        if (parsed.pay) setPay(parsed.pay);
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(pay).length > 0) {
      localStorage.setItem(KEY, JSON.stringify({ key: KEY, pay }));
    }
  }, [pay]);

  const toggle = (id, w) => {
    if (!isAdmin) return;
    setPay(prev => ({
      ...prev,
      [id]: { ...prev[id], [w]: CYCLE[prev[id]?.[w] || S.U] }
    }));
  };

  const filtered = useMemo(() => {
    const q = search.trim();
    if (!q) return MEMBERS;
    return MEMBERS.filter(m =>
      m.name.includes(q) || m.nickname.includes(q) || m.id.includes(q)
    );
  }, [search]);

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#f8fafc", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#1e293b", padding: "15px 20px", borderBottom: "1px solid #334155", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "bold" }}>ระบบเก็บเงินห้อง SMTE</h1>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>จัดการข้อมูลการจ่ายเงิน 34 สัปดาห์</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
             <button onClick={() => setIsAdmin(!isAdmin)} style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: isAdmin ? "#16a34a" : "#3b82f6", color: "#fff", cursor: "pointer", fontWeight: "bold" }}>
              {isAdmin ? "🔓 แอดมิน" : "🔐 ทั่วไป"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <input 
            type="text" 
            placeholder="🔍 ค้นหาชื่อ หรือชื่อเล่น..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #334155", background: "#1e293b", color: "#fff" }}
          />
        </div>

        <div style={{ background: "#1e293b", borderRadius: "15px", overflow: "hidden", border: "1px solid #334155" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "#0f172a" }}>
                  <th style={{ padding: "12px", textAlign: "left", position: "sticky", left: 0, background: "#0f172a", zIndex: 5 }}>สมาชิก</th>
                  {WEEKS.map(w => <th key={w} style={{ padding: "8px", minWidth: "30px", fontSize: "0.7rem" }}>{w}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.map(m => (
                  <tr key={m.id} style={{ borderBottom: "1px solid #334155" }}>
                    <td style={{ padding: "10px 15px", position: "sticky", left: 0, background: "#1e293b", zIndex: 4, whiteSpace: "nowrap" }}>
                      <div style={{ fontWeight: "bold" }}>{m.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{m.nickname} • {m.id}</div>
                    </td>
                    {WEEKS.map(w => {
                      const s = pay[m.id]?.[w] || S.U;
                      return (
                        <td key={w} onClick={() => toggle(m.id, w)} style={{ 
                          textAlign: "center", 
                          cursor: isAdmin ? "pointer" : "default",
                          background: BG[s],
                          color: COLOR[s],
                          border: "1px solid #334155",
                          fontWeight: "bold",
                          transition: "0.2s"
                        }}>
                          {ICON[s]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div style={{ marginTop: "20px", display: "flex", gap: "15px", fontSize: "0.8rem", color: "#94a3b8", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><span style={{ width: "12px", height: "12px", background: BG.p, borderRadius: "2px" }}></span> ชำระแล้ว (10.-)</div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><span style={{ width: "12px", height: "12px", background: BG.l, borderRadius: "2px" }}></span> ค้างชำระ (15.-)</div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><span style={{ width: "12px", height: "12px", background: BG.e, borderRadius: "2px" }}></span> ยกเว้น</div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><span style={{ width: "12px", height: "12px", background: BG.u, borderRadius: "2px" }}></span> ยังไม่ถึงกำหนด</div>
        </div>
      </div>
    </div>
  );
                      }
                  
