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
  { id: "52660", num: 9, name: "น.ส. ภีรดา",     surname: "โมจมสิน",         nickname: "แพร"       },
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

function loadPay() {
  if (typeof window === "undefined") return freshPay();
  try {
    const d = JSON.parse(localStorage.getItem(KEY));
    if (d && d.key === KEY) return d.pay;
  } catch {}
  return freshPay();
}

function savePay(pay) {
  try { localStorage.setItem(KEY, JSON.stringify({ key: KEY, pay })); } catch {}
}

export default function App() {
  const [pay, setPay]             = useState(freshPay); // เริ่มต้นด้วย freshPay ก่อนป้องกัน Error บน Server
  const [view, setView]           = useState("admin");
  const [isAdmin, setIsAdmin]     = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passErr, setPassErr]     = useState("");
  const [search, setSearch]       = useState("");
  const [picked, setPicked]       = useState(null);
  const [toast, setToast]         = useState(null);

  // โหลดข้อมูลจริงเมื่อหน้าเว็บรันบน Browser แล้ว
  useEffect(() => {
    setPay(loadPay());
  }, []);

  useEffect(() => { 
    if (Object

