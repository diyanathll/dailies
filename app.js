// ============ CONSTANTS ============
const APP_DISPLAY_NAME='boneeps';
try{document.title=APP_DISPLAY_NAME;}catch(e){}
const MAX_ROKOK=5,WATER_TARGET=2.5,WATER_GLASS=0.25,WATER_GLASSES=10;
const WATER_WARN_HIGH=3.5,WATER_WARN_STRONG=4.0,WATER_WARN_STOP=5.0,WATER_FAST_WARNING=1.0;
const MOTIVASI=["Konsistensi > Motivasi. Lakuin aja, perasaan ikut nanti. 🔥","Orang sukses bukan yang paling berbakat — yang paling konsisten! 🏆","Satu kebiasaan kecil hari ini = kebiasaan besar 3 bulan lagi! 📈","Kamu bukan malas, kamu belum punya sistem. Sekarang kamu punya! ✅","Jangan compare sama orang lain. Compare sama kamu kemarin! 💪","Mulai dari yang kecil, tapi mulai sekarang. 🚀","Done is better than perfect. Selesai lebih baik dari sempurna! 🎯"];

// ============ DATE HELPERS ============
function dateKey(d=new Date()){
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,'0');
  const day=String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}
function todayKey(){return dateKey(new Date());}
function parseDateKey(key){
  const [y,m,d]=String(key).split('-').map(Number);
  return new Date(y,(m||1)-1,d||1);
}
function addDaysKey(key,days){
  const d=parseDateKey(key);
  d.setDate(d.getDate()+days);
  return dateKey(d);
}
function fmtDate(key){
  const d=parseDateKey(key);
  const dd=String(d.getDate()).padStart(2,'0');
  const mm=String(d.getMonth()+1).padStart(2,'0');
  const yy=String(d.getFullYear()).slice(2);
  const days=['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
  return days[d.getDay()]+'\n'+dd+'/'+mm+'/'+yy;
}
function getWeekOfMonth(){return Math.ceil(new Date().getDate()/7);}
function getTodayDow(){return new Date().getDay();}

// ============ SCHEDULE DATA ============
function getSkincareSchedule(){
  const d=getTodayDow();
  return{isExfo:d===2||d===6,isMaskerBright:d===4,isMaskerCharcoal:d===0};
}
function buildSchedule(){
  const{isExfo,isMaskerBright,isMaskerCharcoal}=getSkincareSchedule();
  const dow=getTodayDow();
  const dn=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  let pmDetail='';
  if(isExfo) pmDetail='Malam EXFO ('+dn[dow]+'): Micellar Water → Face Wash → Exfoliating Pad → Hydrating Toner → Serum Brightening gentle → Moisturizer → Night Lotion. Skip retinol.';
  else if(isMaskerBright) pmDetail='Malam MASKER BRIGHT ('+dn[dow]+'): Micellar Water → Face Wash → Masker Brightening → Bilas → Toner → Serum Brightening → Moisturizer → Night Lotion.';
  else if(isMaskerCharcoal) pmDetail='Malam CLAY MASK ('+dn[dow]+'): Micellar Water → Face Wash → Clay Mask → Bilas → Toner → Serum Hydrating/Brightening ringan → Moisturizer → Night Lotion.';
  else pmDetail='Malam normal ('+dn[dow]+'): Micellar Water → Face Wash → Toner → Retinol Serum → Moisturizer → Night Lotion.';
  return[
    {time:"05:00",label:"Bangun Pagi",emoji:"⏰",cat:"routine",dur:"5 mnt",detail:"Langsung matiin alarm, jangan snooze! Duduk tegak 30 detik, tarik napas dalam 3x."},
    {time:"05:05",label:"Minum Air — 2 Gelas (0.5L)",emoji:"💧",cat:"air",dur:"5 mnt",detail:"Hidrasi pertama setelah bangun. Taruh botol air di samping kasur dari malem.",water:2},
    {time:"05:10",label:"Olahraga Pagi",emoji:"💪",cat:"exercise",dur:"30 mnt",detail:"Lihat tab Workout untuk program hari ini. Semua bisa di kamar kos tanpa alat!"},
    {time:"05:40",label:"Grounding & Udara Segar",emoji:"🌱",cat:"health",dur:"10 mnt",detail:"Keluar kos setelah olahraga. Injak tanah/rumput langsung (barefoot). Tarik napas udara pagi, cooling down post-workout. Belum cukup UV-B — murni untuk mood & recovery."},
    {time:"05:50",label:"Minum Whey Protein",emoji:"🥛",cat:"suplemen",dur:"5 mnt",detail:"1 scoop + 200ml air dingin. Minum dalam 30–45 menit setelah workout untuk recovery otot optimal."},
    {time:"05:55",label:"Mandi",emoji:"🚿",cat:"routine",dur:"15 mnt",detail:"Mandi air dingin — ngilangin sisa ngantuk. Berpakaian rapi meski di kos."},
    {time:"06:10",label:"AM Skincare Routine",emoji:"🌿",cat:"skincare",dur:"5 mnt",detail:"Face wash saat mandi → Toner → Serum Brightening → Moisturizer → Day Lotion → Sunscreen. Proteksi UV tetap prioritas."},
    {time:"06:15",label:"Minum Air — 1 Gelas (0.25L)",emoji:"💧",cat:"air",dur:"2 mnt",detail:"Sebelum sarapan. Bantu pencernaan dan persiapan makan.",water:1},
    {time:"06:20",label:"Sarapan",emoji:"🍳",cat:"meal",dur:"20 mnt",detail:"Usahain ada protein tiap sarapan: telur, tahu, tempe, atau ikan."},
    {time:"06:40",label:"Minum Multivitamin + Omega-3",emoji:"💊",cat:"suplemen",dur:"2 mnt",detail:"Minum setelah makan agar tidak mual. Multivitamin = imun & energi. Omega-3 = otak, kulit & anti-inflamasi."},
    {time:"06:45",label:"Belajar / Kerja Fokus Sesi 1",emoji:"📚",cat:"productive",dur:"1 jam 15 mnt",detail:"Golden hour! HP jauh, notif off. Kerjain tugas paling penting & susah."},
    {time:"07:00",label:"Udara Pagi / Sinar Matahari Ringan ☀️",emoji:"☀️",cat:"health",dur:"10–15 mnt",detail:"Keluar kos sebentar untuk cahaya pagi, mood, dan ritme tidur. Jangan memaksa panas lama; sunscreen tetap dipakai sebagai proteksi kulit."},
    {time:"07:15",label:"Cek Sunscreen",emoji:"🌞",cat:"skincare",dur:"2 mnt",detail:"Pastikan sunscreen sudah dipakai merata. Reapply jika banyak keringat atau banyak aktivitas luar."},
    {time:"07:20",label:"Belajar / Kerja Fokus Sesi 2",emoji:"💼",cat:"productive",dur:"2 jam",detail:"Lanjut deep work. Kondisi optimal: otak udah dapat sinar matahari, kulit terlindungi."},
    {time:"09:30",label:"Istirahat + Cemilan",emoji:"☕",cat:"meal",dur:"15 mnt",detail:"Jalan-jalan sebentar. Cemilan: pisang / susu / kacang rebus."},
    {time:"09:30",label:"Minum Air — 1 Gelas (0.25L)",emoji:"💧",cat:"air",dur:"2 mnt",detail:"Saat istirahat pagi. Jangan tunggu haus!",water:1},
    {time:"09:45",label:"Sesi Produktif 3",emoji:"🎯",cat:"productive",dur:"2 jam",detail:"Lanjut kerja/kuliah. Tugas komunikasi, diskusi, atau review."},
    {time:"12:00",label:"Minum Air — 1 Gelas (0.25L) Sebelum Makan",emoji:"💧",cat:"air",dur:"2 mnt",detail:"Minum sebelum makan siang. Bantu kenyang lebih lama.",water:1},
    {time:"12:05",label:"Makan Siang",emoji:"🍱",cat:"meal",dur:"30 mnt",detail:"Usahain ada protein + sayur tiap makan siang."},
    {time:"12:40",label:"Power Nap (Opsional)",emoji:"😴",cat:"routine",dur:"20 mnt",detail:"MAX 20 menit — set alarm sekarang!"},
    {time:"13:00",label:"Sesi Produktif 4",emoji:"📝",cat:"productive",dur:"2–3 jam",detail:"Tugas kreatif, diskusi, atau review. Otak udah recharge."},
    {time:"14:00",label:"Minum Air — 1 Gelas (0.25L)",emoji:"💧",cat:"air",dur:"2 mnt",detail:"Sesi sore. Dehidrasi ringan bikin ngantuk & susah fokus.",water:1},
    {time:"16:00",label:"Jalan Kaki Sore",emoji:"🚶",cat:"exercise",dur:"30 mnt",detail:"Jalan keliling komplek atau taman. Refresh pikiran setelah seharian kerja."},
    {time:"16:00",label:"Minum Air — 1 Gelas (0.25L) Saat Jalan",emoji:"💧",cat:"air",dur:"2 mnt",detail:"Bawa botol air saat jalan kaki sore.",water:1},
    {time:"16:30",label:"Mandi Sore",emoji:"🚿",cat:"routine",dur:"15 mnt",detail:"Mandi lagi — transisi dari mode kerja ke santai. Bersihkan sisa sunscreen."},
    {time:"17:00",label:"Me Time / Hobi",emoji:"🎮",cat:"routine",dur:"1 jam",detail:"Main game, nonton, ngobrol. Set timer 1 jam!"},
    {time:"18:00",label:"Minum Air — 1 Gelas (0.25L) Sebelum Makan Malam",emoji:"💧",cat:"air",dur:"2 mnt",detail:"Sebelum makan malam. Bantu kenyang dan pencernaan.",water:1},
    {time:"18:05",label:"Makan Malam",emoji:"🍜",cat:"meal",dur:"30 mnt",detail:"Usahain selesai makan sebelum jam 19:00."},
    {time:"18:35",label:"Minum Omega-3 Dosis Malam",emoji:"🐟",cat:"suplemen",dur:"1 mnt",detail:"Dosis kedua omega-3 setelah makan malam. 2x sehari lebih optimal."},
    {time:"19:00",label:"Review Hari + Planning Besok",emoji:"📝",cat:"productive",dur:"10 mnt",detail:"Tulis: 3 hal yang udah dicapai + 3 prioritas besok. Isi juga tab Produktif!"},
    {time:"19:10",label:"Belajar / Self-Development",emoji:"🧠",cat:"productive",dur:"1 jam",detail:"Baca buku, kursus online, atau side project."},
    {time:"20:00",label:"Minum Air — 1 Gelas (0.25L) Terakhir",emoji:"💧",cat:"air",dur:"2 mnt",detail:"Gelas terakhir! Tidak lebih dari ini malam hari.",water:1},
    {time:"20:10",label:"PM Skincare Routine",emoji:"🌙",cat:"skincare",dur:"5–10 mnt",detail:pmDetail+' Lihat tab Skincare untuk urutan lengkap malam ini!'},
    {time:"20:25",label:"Wind Down",emoji:"🌙",cat:"routine",dur:"30 mnt",detail:"Redup layar HP, hindari konten yang bikin overthinking."},
    {time:"21:00",label:"Tidur",emoji:"🛌",cat:"routine",dur:"8 jam",detail:"Target tidur 21:00–22:00 maksimal. Tidur cukup = kulit regenerasi + otak reset!"},
  ];
}
const CAT_LABEL={routine:"Rutinitas",health:"Kesehatan",exercise:"Olahraga",meal:"Makan",productive:"Produktif",suplemen:"Suplemen",skincare:"Skincare",air:"Minum Air"};

const WORKOUT_DAYS=[
  {day:"Senin & Kamis",focus:"Upper Body 💪",color:"#4f46e5",bg:"#eef2ff",exercises:[
    {name:"Push-up",sets:"3 set",reps:"10–15 reps",note:"Versi lutut kalau masih susah"},
    {name:"Pike Push-up",sets:"3 set",reps:"8–12 reps",note:"Fokus bahu & trisep"},
    {name:"Tricep Dip (pakai kursi)",sets:"3 set",reps:"10–12 reps",note:"Kursi stabil, tangan di belakang"},
    {name:"Diamond Push-up",sets:"2 set",reps:"8–10 reps",note:"Tangan bentuk berlian di dada"},
    {name:"Plank",sets:"3 set",reps:"30–45 detik",note:"Core kencang, pinggul lurus"},
    {name:"Superman Hold",sets:"3 set",reps:"10 reps",note:"Berbaring, angkat tangan & kaki"},
  ]},
  {day:"Selasa & Jumat",focus:"Lower Body 🦵",color:"#059669",bg:"#d1fae5",exercises:[
    {name:"Squat",sets:"4 set",reps:"15–20 reps",note:"Turunkan sampai paha sejajar lantai"},
    {name:"Jump Squat",sets:"3 set",reps:"10 reps",note:"Lompat saat naik, landing pelan"},
    {name:"Lunges",sets:"3 set",reps:"12 reps/kaki",note:"Lutut depan jangan lewati jari kaki"},
    {name:"Glute Bridge",sets:"3 set",reps:"15 reps",note:"Berbaring, angkat pinggul, tahan 1 detik"},
    {name:"Calf Raise",sets:"3 set",reps:"20 reps",note:"Pegang dinding untuk keseimbangan"},
    {name:"Wall Sit",sets:"3 set",reps:"45 detik",note:"Punggung nempel tembok, paha 90°"},
  ]},
  {day:"Rabu",focus:"Cardio + Core 🔥",color:"#d97706",bg:"#fef3c7",exercises:[
    {name:"Jumping Jacks",sets:"3 set",reps:"30 detik",note:"Warm-up cardio"},
    {name:"High Knees",sets:"3 set",reps:"30 detik",note:"Angkat lutut setinggi pinggang"},
    {name:"Mountain Climber",sets:"3 set",reps:"30 detik",note:"Posisi push-up, kaki bergantian cepat"},
    {name:"Burpee",sets:"3 set",reps:"8–10 reps",note:"Full body cardio utama!"},
    {name:"Sit-up",sets:"3 set",reps:"15–20 reps",note:"Tangan di dada"},
    {name:"Bicycle Crunch",sets:"3 set",reps:"20 reps",note:"Kiri-kanan = 1 rep"},
    {name:"Leg Raise",sets:"3 set",reps:"12–15 reps",note:"Berbaring, angkat kaki lurus"},
  ]},
  {day:"Sabtu",focus:"Full Body Ringan 🌟",color:"#7c3aed",bg:"#ede9fe",exercises:[
    {name:"Inchworm",sets:"3 set",reps:"8 reps",note:"Stretching aktif dari berdiri ke plank"},
    {name:"Squat + Overhead Reach",sets:"3 set",reps:"12 reps",note:"Squat + angkat tangan ke atas"},
    {name:"Bear Crawl",sets:"3 set",reps:"30 detik",note:"Merangkak maju-mundur di kamar"},
    {name:"Push-up Variation",sets:"3 set",reps:"10 reps",note:"Pilih: wide, close, atau incline"},
    {name:"Hip Flexor Stretch",sets:"-",reps:"60 detik/sisi",note:"Lunges stretch, tahan diam"},
    {name:"Child's Pose",sets:"-",reps:"60 detik",note:"Cool down & relaksasi punggung"},
  ]},
  {day:"Minggu",focus:"Rest & Recovery 🌿",color:"#0284c7",bg:"#e0f2fe",exercises:[
    {name:"Jalan Kaki Santai",sets:"-",reps:"30–45 menit",note:"Di luar kos, taman, atau komplek"},
    {name:"Full Body Stretching",sets:"-",reps:"15–20 menit",note:"Cari 'morning stretch 15 menit' di YouTube"},
    {name:"Pijat Mandiri",sets:"-",reps:"10 menit",note:"Pakai bola tenis sambil nonton"},
  ]},
];

const SUPLEMEN=[
  {name:"Whey Protein",icon:"🥛",color:"#4f46e5",bg:"#eef2ff",when:"Setelah olahraga (~05:50)",dosis:"1 scoop + 200ml air",desc:"Minum dalam 30–45 menit post-workout untuk recovery otot optimal.",tips:"Kocok sampai larut. Kalau mual, coba setengah scoop dulu."},
  {name:"Multivitamin",icon:"💊",color:"#059669",bg:"#d1fae5",when:"Setelah sarapan (~06:40)",dosis:"Sesuai anjuran kemasan",desc:"Minum setelah makan agar tidak mual. Melengkapi vitamin & mineral harian.",tips:"Jangan minum saat perut kosong."},
  {name:"Omega-3",icon:"🐟",color:"#0284c7",bg:"#e0f2fe",when:"Setelah sarapan (~06:40) + Setelah makan malam (~18:35)",dosis:"2x sehari sesuai kemasan",desc:"Otak lebih fokus, anti-inflamasi, kulit lembap & sehat, kesehatan sendi.",tips:"Kalau sendawa bau ikan, simpan di kulkas kos."},
];

function getSkincareToday(){
  const dow=getTodayDow();
  const isExfo=dow===2||dow===6,isMaskerBright=dow===4,isMaskerCharcoal=dow===0;
  const dn=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  let specialLabel='';
  if(isExfo) specialLabel='🧴 Malam Exfoliating ('+dn[dow]+')';
  else if(isMaskerBright) specialLabel='✨ Malam Masker Brightening Wash-off ('+dn[dow]+')';
  else if(isMaskerCharcoal) specialLabel='🖤 Malam Clay Mask ('+dn[dow]+')';
  else specialLabel='🌙 Malam Normal — Retinol ('+dn[dow]+')';
  const amSteps=[
    {num:1,name:"Face Wash / Cuci Muka",note:"Dilakukan saat mandi pagi. Kalau kulit kering, cukup gentle cleanse.",color:"#0284c7",bg:"#e0f2fe"},
    {num:2,name:"Toner",note:"Hydrating/soothing toner. Tepuk lembut, jangan digosok keras.",color:"#0284c7",bg:"#e0f2fe"},
    {num:3,name:"Serum Brightening",note:"2–3 tetes. Hindari layering active yang bikin perih.",color:"#db2777",bg:"#fce7f3"},
    {num:4,name:"Moisturizer",note:"Kunci hidrasi sebelum day lotion/sunscreen.",color:"#059669",bg:"#d1fae5"},
    {num:5,name:"Day Lotion",note:"Pakai setelah moisturizer meresap.",color:"#7c3aed",bg:"#ede9fe"},
    {num:6,name:"Sunscreen SPF 30+",note:"Proteksi utama pagi. Reapply kalau banyak keringat/aktivitas luar.",color:"#d97706",bg:"#fef3c7"},
  ];
  let pmSteps=[];
  if(isExfo) pmSteps=[
    {num:1,name:"Micellar Water",note:"Angkat sunscreen/debu dulu sebelum cuci muka.",color:"#0284c7",bg:"#e0f2fe"},
    {num:2,name:"Face Wash saat mandi",note:"Bersihkan residu micellar water dan kotoran.",color:"#0284c7",bg:"#e0f2fe"},
    {num:3,name:"Noure Exfoliating Pad",note:"Pakai setelah wajah bersih dan kering. Jangan gabung retinol.",color:"#7c3aed",bg:"#ede9fe"},
    {num:4,name:"Hydrating Toner",note:"Setelah exfo. Pakai toner hydrating/soothing, bukan toner exfoliating lagi.",color:"#0284c7",bg:"#e0f2fe"},
    {num:5,name:"Serum Brightening Gentle",note:"Boleh jika gentle seperti niacinamide/arbutin/hydrating. Skip kalau perih atau active terlalu kuat.",color:"#db2777",bg:"#fce7f3"},
    {num:6,name:"Moisturizer",note:"Wajib untuk bantu jaga skin barrier setelah exfo.",color:"#059669",bg:"#d1fae5"},
    {num:7,name:"Night Lotion",note:"Langkah terakhir untuk mengunci kelembapan.",color:"#4f46e5",bg:"#eef2ff"},
  ];
  else if(isMaskerBright) pmSteps=[
    {num:1,name:"Micellar Water",note:"Angkat sunscreen/debu dulu.",color:"#0284c7",bg:"#e0f2fe"},
    {num:2,name:"Face Wash saat mandi",note:"Bersihkan wajah sebelum masker.",color:"#0284c7",bg:"#e0f2fe"},
    {num:3,name:"Masker Brightening",note:"Asumsi wash-off mask. Diamkan sesuai instruksi produk, lalu bilas.",color:"#db2777",bg:"#fce7f3"},
    {num:4,name:"Toner",note:"Hydrating/soothing setelah masker dibilas.",color:"#0284c7",bg:"#e0f2fe"},
    {num:5,name:"Serum Brightening",note:"2–3 tetes setelah toner.",color:"#db2777",bg:"#fce7f3"},
    {num:6,name:"Moisturizer",note:"Kunci hidrasi.",color:"#059669",bg:"#d1fae5"},
    {num:7,name:"Night Lotion",note:"Langkah terakhir.",color:"#4f46e5",bg:"#eef2ff"},
  ];
  else if(isMaskerCharcoal) pmSteps=[
    {num:1,name:"Micellar Water",note:"Angkat sunscreen/debu dulu.",color:"#0284c7",bg:"#e0f2fe"},
    {num:2,name:"Face Wash saat mandi",note:"Bersihkan wajah sebelum clay mask.",color:"#0284c7",bg:"#e0f2fe"},
    {num:3,name:"Clay Mask",note:"Fokus T-zone bila kulit mudah kering. Bilas sesuai instruksi produk.",color:"#374151",bg:"#f3f4f6"},
    {num:4,name:"Toner",note:"Hydrating/soothing setelah clay mask.",color:"#0284c7",bg:"#e0f2fe"},
    {num:5,name:"Serum Brightening / Hydrating Ringan",note:"Pakai yang gentle. Skip active kuat kalau kulit terasa kering/perih.",color:"#db2777",bg:"#fce7f3"},
    {num:6,name:"Moisturizer",note:"Clay mask bisa drying, jadi hidrasi wajib.",color:"#059669",bg:"#d1fae5"},
    {num:7,name:"Night Lotion",note:"Kunci kelembapan.",color:"#4f46e5",bg:"#eef2ff"},
  ];
  else pmSteps=[
    {num:1,name:"Micellar Water",note:"Angkat sunscreen/debu dulu.",color:"#0284c7",bg:"#e0f2fe"},
    {num:2,name:"Face Wash saat mandi",note:"Bersihkan residu micellar water dan kotoran.",color:"#0284c7",bg:"#e0f2fe"},
    {num:3,name:"Toner",note:"Hydrating/soothing toner.",color:"#0284c7",bg:"#e0f2fe"},
    {num:4,name:"Retinol Serum",note:"2–3 tetes. Jangan dipakai di malam exfoliating.",color:"#d97706",bg:"#fef3c7"},
    {num:5,name:"Moisturizer",note:"Wajib setelah retinol untuk cegah kering/iritasi.",color:"#059669",bg:"#d1fae5"},
    {num:6,name:"Night Lotion",note:"Kunci kelembapan semalaman.",color:"#4f46e5",bg:"#eef2ff"},
  ];
  return{amSteps,pmSteps,specialLabel,isExfo,isMaskerBright,isMaskerCharcoal};
}
// ============ STATE ============
let SCHEDULE_TODAY=buildSchedule();
let state={
  tab:'schedule',userName:'Bos',
  checked:{},streak:0,history:{},
  workoutDay:0,
  rokokHistory:{},
  waterHistory:{},
  waterEvents:{},
  statsPeriod:'mingguan',
  historyShown:7,
  statsAccordion:'',
  // Books
  books:[],
  activeBookId:null,
  bookTab:'tracker',
  bookFinishedShown:5,
  // Productivity
  prodTab:'tasks',
  todayTasks:[],        // {id,text,done,createdAt,detail,completedAt}
  pendingTasks:[],      // {id,text,detail,sourceDate,createdAt}
  tomorrowTasks:[],     // {id,text,detail,dueDate,done}
  ideas:[],             // {id,text,detail,createdAt}
  prodHistory:{},       // {YYYY-MM-DD: {done:n,total:n,tasks:[...]}}
  prodStatsPeriod:'7',  // 7 | 30 | lifetime
  prodHistoryShown:5,
  lastProdDate:'',
  lastBackupAt:'',
  firstUseDate:'',
  floatPos:null,
};

function todayChecked(){return state.checked[todayKey()]||{};}
function completedCount(){return Object.values(todayChecked()).filter(Boolean).length;}
function progressPct(){return Math.round((completedCount()/SCHEDULE_TODAY.length)*100);}
function todayWater(){return getWaterGlasses(todayKey());}
function todayRokok(){return state.rokokHistory?.[todayKey()]||0;}

const STORAGE_KEY='boneepsData_v1';
const LEGACY_STORAGE_KEY='kosProduktif5';

function nowIso(){return new Date().toISOString();}
function ensureWaterEvents(){if(!state.waterEvents) state.waterEvents={};}
function getWaterEvents(key=todayKey()){ensureWaterEvents();return Array.isArray(state.waterEvents[key])?state.waterEvents[key]:[];}
function getWaterGlassesFromEvents(key=todayKey()){
  ensureWaterEvents();
  if(!Object.prototype.hasOwnProperty.call(state.waterEvents,key)) return null;
  const events=Array.isArray(state.waterEvents[key])?state.waterEvents[key]:[];
  const liters=events.reduce((sum,e)=>sum+(Number(e.amount)||0),0);
  return Math.max(0,Math.round(liters/WATER_GLASS));
}
function getWaterGlasses(key=todayKey()){
  const fromEvents=getWaterGlassesFromEvents(key);
  if(fromEvents!==null) return fromEvents;
  return Math.max(0,Number(state.waterHistory?.[key]||0));
}
function getWaterLiters(key=todayKey()){return +(getWaterGlasses(key)*WATER_GLASS).toFixed(2);}
function syncWaterHistory(key=todayKey()){
  if(!state.waterHistory) state.waterHistory={};
  const fromEvents=getWaterGlassesFromEvents(key);
  if(fromEvents!==null) state.waterHistory[key]=fromEvents;
  else if(state.waterHistory[key]===undefined) state.waterHistory[key]=0;
}
function addWaterEvent(key,amount,source,extra={}){
  ensureWaterEvents();
  if(!Array.isArray(state.waterEvents[key])) state.waterEvents[key]=[];
  const id=extra.id||('water_'+Date.now()+'_'+Math.random().toString(36).slice(2,7));
  state.waterEvents[key].push({id,amount:+amount,source,createdAt:nowIso(),...extra});
  syncWaterHistory(key);
}
function removeWaterEventById(key,id){
  ensureWaterEvents();
  if(!Array.isArray(state.waterEvents[key])) return;
  state.waterEvents[key]=state.waterEvents[key].filter(e=>e.id!==id);
  syncWaterHistory(key);
}
function addScheduleWater(idx,glasses){
  const key=todayKey();
  const id='schedule_'+idx;
  removeWaterEventById(key,id);
  addWaterEvent(key,glasses*WATER_GLASS,'schedule',{id,taskIndex:idx});
}
function removeScheduleWater(idx){removeWaterEventById(todayKey(),'schedule_'+idx);}
function reduceOneWaterGlass(key=todayKey()){
  ensureWaterEvents();
  let events=getWaterEvents(key);
  if(events.length>0){
    // Reduce exactly 1 glass (0.25L) from the latest event, regardless of source.
    // This also handles schedule water, including 0.5L schedule tasks.
    for(let i=events.length-1;i>=0;i--){
      const amt=Math.max(0,Number(events[i].amount)||0);
      if(amt<=0) continue;
      if(amt>WATER_GLASS){
        events[i].amount=+(amt-WATER_GLASS).toFixed(2);
        // If a scheduled water task is partially reduced, the scheduled task is no longer fully complete.
        // Keep the remaining actual water as manual-adjust so future uncheck actions don't delete it twice.
        if(events[i].source==='schedule'&&events[i].taskIndex!==undefined){
          const taskIndex=events[i].taskIndex;
          events[i].source='manual-adjust';
          events[i].id='manual_adjust_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);
          delete events[i].taskIndex;
          if(!state.checked[key]) state.checked[key]={};
          state.checked[key][taskIndex]=false;
        }
      } else {
        const removed=events.splice(i,1)[0];
        if(removed?.source==='schedule'&&removed.taskIndex!==undefined){
          const stillHasSchedule=events.some(e=>e.source==='schedule'&&e.taskIndex===removed.taskIndex&&(Number(e.amount)||0)>0);
          if(!stillHasSchedule){
            if(!state.checked[key]) state.checked[key]={};
            state.checked[key][removed.taskIndex]=false;
          }
        }
      }
      state.waterEvents[key]=events;
      syncWaterHistory(key);
      return true;
    }
  }
  // Legacy fallback: if old data had waterHistory only, decrement it safely to 0.
  const cur=Math.max(0,Number(state.waterHistory?.[key]||0));
  if(cur>0){
    if(!state.waterHistory) state.waterHistory={};
    state.waterHistory[key]=Math.max(0,cur-1);
    return true;
  }
  return false;
}
function addManualWater(deltaGlasses){
  const key=todayKey();
  ensureWaterEvents();
  if(deltaGlasses>0){
    for(let i=0;i<deltaGlasses;i++) addWaterEvent(key,WATER_GLASS,'manual');
  } else if(deltaGlasses<0){
    for(let i=0;i<Math.abs(deltaGlasses);i++){
      const ok=reduceOneWaterGlass(key);
      if(!ok){showToast('Air sudah 0L.');break;}
    }
  }
  saveState();
  const msg=getWaterStatusMessage(key);
  showToast(msg.short);
  render();
}
function setWaterTotalGlasses(targetGlasses){
  const key=todayKey();
  targetGlasses=Math.max(0,Math.round(targetGlasses));
  ensureWaterEvents();
  let cur=getWaterGlasses(key);
  if(targetGlasses===cur) return;
  while(cur>targetGlasses){
    const ok=reduceOneWaterGlass(key);
    if(!ok) break;
    cur=getWaterGlasses(key);
  }
  while(cur<targetGlasses){
    addWaterEvent(key,WATER_GLASS,'manual-adjust');
    cur=getWaterGlasses(key);
  }
  syncWaterHistory(key);
  saveState();
  showToast(getWaterStatusMessage(key).short);
  render();
}
function getWaterStatusMessage(key=todayKey()){
  const liters=getWaterLiters(key);
  const events=getWaterEvents(key);
  const oneHourAgo=Date.now()-60*60*1000;
  const recentLiters=events.filter(e=>new Date(e.createdAt||0).getTime()>=oneHourAgo).reduce((a,e)=>a+(Number(e.amount)||0),0);
  if(recentLiters>=WATER_FAST_WARNING) return {level:'fast',short:'⚠️ Air tercatat ≥1L dalam 1 jam. Jangan minum terlalu cepat.',long:'Terlalu cepat minum bisa berisiko. Beri jeda dan ikuti rasa haus.'};
  if(liters>=WATER_WARN_STOP) return {level:'stop',short:'⛔ Sudah sangat tinggi. Jangan tambah air lagi kecuali memang perlu/atas arahan medis.',long:'Di atas 5L/hari sudah sangat tinggi untuk tracking normal. Jangan mengejar angka.'};
  if(liters>=WATER_WARN_STRONG) return {level:'strong',short:'🚨 Sudah tinggi. Jangan minum karena mengejar target.',long:'4L+ sudah tinggi. Pastikan tidak diminum dalam waktu singkat dan jangan memaksa.'};
  if(liters>=WATER_WARN_HIGH) return {level:'high',short:'⚠️ Di atas target cukup jauh. Ikuti rasa haus.',long:'Di atas 3.5L: lanjut hanya kalau aktivitas/keringat memang tinggi.'};
  if(liters>=3.0) return {level:'over',short:'💧 Di atas target. Masih wajar kalau aktivitas tinggi.',long:'Target sudah lewat. Tidak perlu memaksa tambah air.'};
  if(liters>=WATER_TARGET) return {level:'done',short:'🎉 Target 2.5L tercapai. Sudah cukup.',long:'Target harian tercapai. Setelah ini cukup minum sesuai haus.'};
  return {level:'normal',short:'💧 '+liters.toFixed(2)+'L / '+WATER_TARGET+'L',long:'Masih dalam target harian.'};
}
function getDateRangeKeys(startKey,endKey){
  const out=[];let k=startKey;
  while(k<=endKey&&out.length<5000){out.push(k);k=addDaysKey(k,1);}
  return out;
}
function getFirstUseDate(){
  const all=[state.firstUseDate,...Object.keys(state.history||{}),...Object.keys(state.rokokHistory||{}),...Object.keys(state.waterHistory||{}),...Object.keys(state.waterEvents||{}),...Object.keys(state.prodHistory||{})].filter(Boolean).sort();
  return all[0]||todayKey();
}
function getPeriodKeys(period){
  const today=todayKey();
  const first=getFirstUseDate();
  let start=first;
  if(period==='mingguan') start=addDaysKey(today,-6)>first?addDaysKey(today,-6):first;
  if(period==='bulanan') start=addDaysKey(today,-29)>first?addDaysKey(today,-29):first;
  return getDateRangeKeys(start,today);
}

function saveState(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(e){}}

function loadState(){
  try{
    // Mulai v10.5, boneeps memakai storage key baru.
    // Legacy key tidak dibaca otomatis agar data test lama dari Kos Produktif tidak ikut muncul.
    const raw=localStorage.getItem(STORAGE_KEY);
    if(raw){const s=JSON.parse(raw);state={...state,...s};}
  }catch(e){}
  state.mealWeek=((getWeekOfMonth()-1)%4)+1;
  const today=todayKey();
  if(!state.checked[today]) state.checked[today]={};
  if(!state.rokokHistory) state.rokokHistory={};
  if(!state.rokokHistory[today]) state.rokokHistory[today]=0;
  if(!state.waterHistory) state.waterHistory={};
  if(!state.waterEvents) state.waterEvents={};
  if(!state.waterHistory[today]) state.waterHistory[today]=0;
  if(!state.firstUseDate) state.firstUseDate=getFirstUseDate()||today;
  syncWaterHistory(today);
  if(!state.books) state.books=[];
  if(!state.ideas) state.ideas=[];
  if(!state.tomorrowTasks) state.tomorrowTasks=[];
  if(!state.todayTasks) state.todayTasks=[];
  if(!state.pendingTasks) state.pendingTasks=[];
  if(!state.prodHistory) state.prodHistory={};
  if(!state.prodStatsPeriod) state.prodStatsPeriod='7';
  if(!state.prodHistoryShown) state.prodHistoryShown=5;
  if(!state.lastBackupAt) state.lastBackupAt='';
  if(!state.bookFinishedShown) state.bookFinishedShown=5;
  if(!state.floatPos) state.floatPos=null;
  // Auto move tomorrow -> today on date change
  autoMoveTasks();
  recalcStreak();
  saveState();
}

function prodTaskSnapshot(t,sourceDate){
  return {
    id:t.id||'',
    text:t.text||'',
    detail:t.detail||'',
    done:!!t.done,
    createdAt:t.createdAt||sourceDate||'',
    completedAt:t.done?(t.completedAt||sourceDate||''):'',
    sourceDate:sourceDate||t.sourceDate||''
  };
}
function getProdRecordForDate(k){
  const today=todayKey();
  if(k===today){
    const tasks=(state.todayTasks||[]).map(t=>prodTaskSnapshot(t,today));
    return {done:tasks.filter(t=>t.done).length,total:tasks.length,tasks};
  }
  const rec=(state.prodHistory||{})[k]||{done:0,total:0,tasks:[]};
  return {
    done:rec.done||0,
    total:rec.total||0,
    tasks:Array.isArray(rec.tasks)?rec.tasks:[]
  };
}
function prodRecordPct(rec){return rec.total>0?Math.round((rec.done/rec.total)*100):0;}

function autoMoveTasks(){
  const today=todayKey();
  if(state.lastProdDate===today) return;
  if(!state.pendingTasks) state.pendingTasks=[];

  // Saat hari berganti: simpan detail task kemarin, lalu pindahkan task belum selesai ke Task Tertunda.
  if(state.lastProdDate&&state.lastProdDate!==today){
    const oldTasks=(state.todayTasks||[]).map(t=>prodTaskSnapshot(t,state.lastProdDate));
    const doneCnt=oldTasks.filter(t=>t.done).length;
    const totalCnt=oldTasks.length;
    if(totalCnt>0){
      state.prodHistory[state.lastProdDate]={done:doneCnt,total:totalCnt,tasks:oldTasks};
    }
    const undone=oldTasks.filter(t=>!t.done).map((t,idx)=>({
      id:'pd_'+Date.now()+'_'+idx,
      text:t.text,
      detail:t.detail||'',
      sourceDate:state.lastProdDate,
      createdAt:t.createdAt||state.lastProdDate
    }));
    if(undone.length>0) state.pendingTasks=[...state.pendingTasks,...undone];
    state.todayTasks=[];
  }

  // Setelah reset, baru pindahkan rencana yang punya dueDate hari ini/terlewat.
  // Task tanpa dueDate tetap di "Akan Dilakukan" agar tidak hilang/masuk otomatis.
  const carry=[];
  const moved=[];
  (state.tomorrowTasks||[]).forEach(t=>{
    if(t.dueDate&&t.dueDate<=today){
      moved.push({...t,done:false,createdAt:today,movedAt:today});
    } else {
      carry.push(t);
    }
  });
  state.tomorrowTasks=carry;
  if(moved.length>0){
    state.todayTasks=[...(state.todayTasks||[]),...moved];
  }

  state.lastProdDate=today;
}

function recalcStreak(){
  let s=0;const today=new Date();
  for(let i=0;i<730;i++){
    const d=new Date(today);d.setDate(d.getDate()-i);
    const key=dateKey(d);
    const pct=state.history[key];
    const rokok=state.rokokHistory?.[key]??0;

    // Hari ini belum selesai bukan berarti streak kemarin putus.
    // Kalau hari ini sudah memenuhi syarat, baru ikut dihitung.
    // Kalau hari ini belum memenuhi syarat, lanjut cek hari kemarin.
    if(i===0){
      if(pct>=80&&rokok<=MAX_ROKOK) s++;
      continue;
    }

    if(pct>=80&&rokok<=MAX_ROKOK) s++;
    else break;
  }
  state.streak=s;
}

// ============ RENDER ============
function render(){
  renderHeader();
  const c=document.getElementById('content');
  if(state.tab==='schedule') c.innerHTML=renderSchedule();
  else if(state.tab==='skincare') c.innerHTML=renderSkincare();
  else if(state.tab==='workout') c.innerHTML=renderWorkout();
  else if(state.tab==='productivity') c.innerHTML=renderProductivity();
  else if(state.tab==='stats') c.innerHTML=renderStats();
  bindEvents();
  updateFloats();
  initFloatingDrag();
}

function renderHeader(){
  const days=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const months=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const now=new Date();
  document.getElementById('headerName').textContent=state.userName;
  document.getElementById('headerDate').textContent=days[now.getDay()]+', '+now.getDate()+' '+months[now.getMonth()]+' '+now.getFullYear();
  document.getElementById('streakVal').textContent=state.streak;
  const pct=progressPct();
  document.getElementById('progressBar').style.width=pct+'%';
  document.getElementById('progressLabel').textContent=completedCount()+'/'+SCHEDULE_TODAY.length+' task ('+pct+'%)';
  // Header is intentionally focused on streak + checklist percentage only.
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const n=document.getElementById('nav-'+state.tab);if(n)n.classList.add('active');
}

function updateFloats(){
  // Rokok badge
  const r=todayRokok();
  const rb=document.getElementById('floatRokokBadge');
  rb.textContent=r;
  rb.className='float-badge '+(r<=MAX_ROKOK?'float-badge-green':'float-badge-red');
  // Book badge
  const activeBooks=(state.books||[]).filter(b=>!b.finished).length;
  document.getElementById('floatBookBadge').textContent=activeBooks;
  applyFloatPosition();
}

// ============ SCHEDULE ============
function renderSchedule(){
  const ch=todayChecked();
  const midx=new Date().getDate()%MOTIVASI.length;
  const wg=todayWater();
  const wl=getWaterLiters().toFixed(2);
  const wpct=Math.min(100,(wg/WATER_GLASSES)*100);
  const waterStatus=getWaterStatusMessage();
  const waterOver=Math.max(0,getWaterLiters()-WATER_TARGET);
  const waterGlassCount=Math.max(WATER_GLASSES,Math.ceil(wg));
  let html=`<div class="motivasi-banner"><span style="font-size:22px">💬</span><p class="motivasi-text"><strong>Quote hari ini:</strong><br>${MOTIVASI[midx]}</p></div>`;
  html+=`<div class="water-card">
    <div class="water-card-top">
      <div class="water-card-title">💧 Minum Air Harian</div>
      <div class="water-card-val">${wl}L <span style="font-size:13px;color:var(--text-3);font-weight:400">/ ${WATER_TARGET}L</span></div>
    </div>
    <div class="water-track-wrap"><div class="water-track-bar" style="width:${wpct}%"></div></div>
    ${waterOver>0?`<div class="water-over-label">+${waterOver.toFixed(2)}L di atas target</div>`:''}
    ${wg>=WATER_GLASSES?`<div class="water-quick-controls">
      <button class="water-control-btn" onclick="addManualWater(-1)">−</button>
      <div class="water-control-mid">Target penuh — tambah/kurangi 0.25L</div>
      <button class="water-control-btn primary" onclick="addManualWater(1)">+</button>
    </div>`:''}
    <div class="water-glasses">`;
  for(let i=0;i<waterGlassCount;i++){
    html+=`<div class="water-glass ${i<wg?'filled':''}" onclick="toggleWaterGlass(${i})">${i<wg?'💧':'○'}</div>`;
  }
  html+=`</div>
    <div class="water-status water-status-${waterStatus.level}">${waterStatus.long}</div>
    <p style="font-size:11px;color:var(--text-3);margin-top:8px;text-align:center">Tap gelas untuk atur air • tombol +/− muncul setelah 2.5L penuh • 1 gelas = 0.25L</p>
  </div>`;

  const groups=[
    {label:'🌅 Pagi (05:00 – 07:20)',range:[0,14]},
    {label:'☀️ Siang (09:30 – 16:00)',range:[14,22]},
    {label:'🌆 Sore & Malam (16:00 – 21:00)',range:[22,SCHEDULE_TODAY.length]},
  ];
  groups.forEach(g=>{
    html+=`<div class="section-label">${g.label}</div>`;
    for(let i=g.range[0];i<g.range[1];i++){
      const t=SCHEDULE_TODAY[i];const done=!!ch[i];
      html+=`<div class="task-item ${done?'done':''} ${t.cat==='air'?'water-task':''}" data-idx="${i}">
        <div class="task-check">${done?'✓':''}</div>
        <div class="task-body">
          <div class="task-title-row"><span class="task-emoji">${t.emoji}</span><span class="task-name">${t.label}</span></div>
          <div class="task-meta">
            <span class="tag tag-time">🕐 ${t.time}</span>
            <span class="tag tag-cat">${CAT_LABEL[t.cat]||t.cat}</span>
            <span class="tag tag-dur">${t.dur}</span>
          </div>
          <p class="task-detail">${t.detail}</p>
        </div>
      </div>`;
    }
  });
  html+=`<div class="section-label">💊 Suplemen</div>`;
  SUPLEMEN.forEach(s=>{
    html+=`<div class="suplemen-item">
      <div class="suplemen-icon" style="background:${s.bg}">${s.icon}</div>
      <div><div class="suplemen-name">${s.name}</div><div class="suplemen-when">⏰ ${s.when}</div><div class="suplemen-desc">${s.dosis}</div></div>
    </div>`;
  });
  return html;
}

// ============ SKINCARE ============
function renderSkincare(){
  const sc=getSkincareToday();
  const dow=getTodayDow();
  const dn=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  let html=`<div class="week-banner"><div class="week-banner-icon">✨</div>
    <div><div class="week-banner-title">Skincare Hari Ini</div><div class="week-banner-sub">${dn[dow]} — ${sc.specialLabel}</div></div></div>`;
  html+=`<div class="section-label">📅 Jadwal Mingguan</div>
  <div class="card"><div class="card-body" style="font-size:13px;line-height:2;color:var(--text-2)">
    <p>🌿 <strong>Senin, Rabu, Jumat:</strong> Micellar → Face Wash → Toner → Retinol → Moisturizer → Night Lotion</p>
    <p>🧴 <strong>Selasa & Sabtu:</strong> Micellar → Face Wash → Exfoliating Pad → Hydrating Toner → Serum Brightening gentle → Moisturizer → Night Lotion</p>
    <p>✨ <strong>Kamis:</strong> Micellar → Face Wash → Masker Brightening → Bilas → Toner → Serum Brightening → Moisturizer → Night Lotion</p>
    <p>🖤 <strong>Minggu:</strong> Micellar → Face Wash → Clay Mask → Bilas → Toner → Serum Hydrating/Brightening → Moisturizer → Night Lotion</p>
  </div></div>`;
  html+=`<div class="section-label">🌅 AM Routine — Tiap Pagi</div>
  <div class="info-box">☀️ Pagi dibuat lebih aman: cuci muka, hidrasi, brightening, moisturizer, lalu sunscreen. Cahaya pagi boleh, tapi jangan mengorbankan proteksi UV.</div>
  <div class="card"><div class="card-body">`;
  sc.amSteps.forEach(s=>{
    html+=`<div class="skincare-step">
      <div class="skincare-num" style="background:${s.bg};color:${s.color}">${s.num}</div>
      <div style="flex:1"><div class="skincare-name">${s.name}</div><div class="skincare-note">${s.note}</div></div>
    </div>`;
  });
  html+=`</div></div>`;
  html+=`<div class="section-label">${sc.specialLabel}</div>`;
  if(sc.isExfo) html+=`<div class="info-box">🧴 Malam exfoliating: skip retinol. Toner boleh setelah exfo jika hydrating/soothing, bukan toner exfoliating lagi. Serum brightening hanya jika gentle dan tidak perih.</div>`;
  html+=`<div class="card"><div class="card-body">`;
  sc.pmSteps.forEach(s=>{
    html+=`<div class="skincare-step">
      <div class="skincare-num" style="background:${s.bg};color:${s.color}">${s.num}</div>
      <div style="flex:1"><div class="skincare-name">${s.name}</div><div class="skincare-note">${s.note}</div></div>
    </div>`;
  });
  html+=`</div></div>`;
  html+=`<div class="section-label">💡 Tips</div>
  <div class="card"><div class="card-body" style="font-size:13px;color:var(--text-2);line-height:1.9">
    <p>☀️ <strong>Sunscreen pagi tetap prioritas</strong>, terutama kalau pakai brightening/retinol/exfo.</p>
    <p>🧴 Micellar water dipakai malam untuk angkat sunscreen/debu, lalu tetap cuci muka.</p>
    <p>⚠️ Retinol + Exfoliating Pad jangan di malam yang sama.</p>
    <p>🖤 Setelah clay mask, fokus hidrasi: toner, serum gentle, moisturizer.</p>
    <p>💧 Target air 2.5L/hari; lebih boleh tercatat, tapi jangan memaksa minum.</p>
  </div></div>`;
  return html;
}

// ============ WORKOUT ============
function renderWorkout(){
  const wdays=['Sen & Kam','Sel & Jum','Rabu','Sabtu','Minggu'];
  let html=`<div class="section-label">Pilih Hari</div><div class="chip-row">`;
  WORKOUT_DAYS.forEach((w,i)=>{html+=`<button class="chip ${state.workoutDay===i?'active':''}" onclick="setWorkoutDay(${i})">${wdays[i]}</button>`;});
  html+=`</div>`;
  const w=WORKOUT_DAYS[state.workoutDay];
  html+=`<div class="workout-card"><div class="workout-header" style="background:${w.bg}">
    <div class="workout-icon-wrap" style="background:${w.color}">💪</div>
    <div><div class="workout-focus">${w.focus}</div><div class="workout-day-label">${w.day} · ${w.exercises.length} latihan</div></div>
  </div>`;
  w.exercises.forEach((ex,ei)=>{
    html+=`<div class="exercise-row">
      <div class="exercise-num" style="background:${w.bg};color:${w.color}">${ei+1}</div>
      <div style="flex:1"><div class="exercise-name">${ex.name}</div>${ex.note?`<div class="exercise-note">${ex.note}</div>`:''}</div>
      <div class="exercise-sets"><div class="exercise-sets-num" style="color:${w.color}">${ex.sets}</div><div class="exercise-reps">${ex.reps}</div></div>
    </div>`;
  });
  html+=`<div class="workout-tip">💡 Warm-up 5 menit dulu. Rest 60 detik antar set. Minum air tiap habis set!</div></div>`;
  html+=`<div class="section-label">📌 Tips</div><div class="card"><div class="card-body" style="font-size:13px;color:var(--text-2);line-height:1.9">
    <p>✅ Semua di kamar kos tanpa alat</p>
    <p>✅ Tiap 2 minggu tambah 1–2 reps per set</p>
    <p>✅ 30 menit tiap hari > 2 jam sekali seminggu</p>
    <p>🚬 Jarak minimal 30 menit antara rokok dan olahraga</p>
  </div></div>`;
  return html;
}
// ============ PRODUCTIVITY ============
function renderProductivity(){
  let html=``;
  html+=`<div class="info-box" style="font-size:12px;margin-bottom:12px">
    Drag: pegang ikon <strong>☰</strong>, lalu geser task ke <strong>Hari Ini</strong> atau <strong>Akan Dilakukan</strong>.<br>
    Tap kartu untuk edit detail. Centang hanya lewat kotak checklist.
  </div>`;

  // TODAY
  html+=`<div class="section-label">📌 Harus Dilakukan Hari Ini</div>`;
  html+=`<div class="add-item-row">
    <input class="input-field sm" id="todayInput" placeholder="Tambah task hari ini..." style="flex:1">
    <button class="btn btn-primary btn-sm" onclick="addTodayTask()">+</button>
  </div>`;
  html+=`<div class="prod-drop-zone" data-prod-zone="today">`;
  if(!state.todayTasks||state.todayTasks.length===0){
    html+=`<div class="no-items">Belum ada task hari ini.<br>Tambah di atas atau drag dari Ide/Akan Dilakukan.</div>`;
  } else {
    state.todayTasks.forEach((t,i)=>{
      html+=`<div class="prod-item" data-prod-type="today" data-prod-index="${i}">
        <div class="prod-item-main" onclick="openTodayDetail(${i})">
          <button class="prod-check ${t.done?'done':''}" onclick="event.stopPropagation();toggleTodayTask(${i})" title="Tandai selesai">${t.done?'✓':''}</button>
          <div class="prod-text ${t.done?'done':''}">${escHtml(t.text)}</div>
          <button class="prod-drag-handle" data-drag-type="today" data-drag-index="${i}" onclick="event.stopPropagation()" title="Drag pindah">☰</button>
        </div>
        <div class="prod-actions">
          <button class="prod-action-btn danger" onclick="deleteTodayTask(${i})">Hapus</button>
        </div>
      </div>`;
    });
  }
  html+=`</div>`;

  // PENDING
  html+=`<div class="section-label" style="margin-top:24px">⏳ Task Tertunda</div>`;
  if(!state.pendingTasks||state.pendingTasks.length===0){
    html+=`<div class="no-items">Tidak ada task tertunda.<br>Bagus — backlog masih bersih.</div>`;
  } else {
    state.pendingTasks.forEach((t,i)=>{
      html+=`<div class="prod-item" data-prod-type="pending" data-prod-index="${i}">
        <div class="prod-item-main" onclick="openPendingDetail(${i})">
          <div style="width:22px;height:22px;border-radius:6px;border:2px solid var(--orange);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px;background:var(--orange-bg)">⏳</div>
          <div class="prod-text" style="flex:1">${escHtml(t.text)}</div>
          <span class="prod-badge prod-badge-nodate">Dari ${t.sourceDate||'-'}</span>
          <button class="prod-drag-handle" data-drag-type="pending" data-drag-index="${i}" onclick="event.stopPropagation()" title="Drag pindah">☰</button>
        </div>
        <div class="prod-actions">
          <button class="prod-action-btn danger" onclick="deletePendingTask(${i})">Hapus</button>
        </div>
      </div>`;
    });
  }

  // AKAN DILAKUKAN
  html+=`<div class="section-label" style="margin-top:24px">🗓️ Akan Dilakukan</div>`;
  html+=`<div class="add-item-row">
    <input class="input-field sm" id="tomorrowInput" placeholder="Tambah rencana..." style="flex:1">
    <button class="btn btn-primary btn-sm" onclick="addTomorrowTask()">+</button>
  </div>`;
  html+=`<div class="prod-drop-zone" data-prod-zone="tomorrow">`;
  if(!state.tomorrowTasks||state.tomorrowTasks.length===0){
    html+=`<div class="no-items">Belum ada rencana.<br>Isi sebelum tidur atau drag dari Ide/Hari Ini.</div>`;
  } else {
    state.tomorrowTasks.forEach((t,i)=>{
      const noDate=!t.dueDate;
      const isPast=t.dueDate&&t.dueDate<todayKey();
      let badge='';
      if(noDate) badge=`<span class="prod-badge prod-badge-nodate">❗ Tanpa tanggal</span>`;
      else if(isPast) badge=`<span class="prod-badge prod-badge-nodate">⚠️ Terlambat</span>`;
      else badge=`<span class="prod-badge prod-badge-date">📅 ${t.dueDate}</span>`;
      html+=`<div class="prod-item" data-prod-type="tomorrow" data-prod-index="${i}">
        <div class="prod-item-main" onclick="openTomorrowDetail(${i})">
          <div style="width:22px;height:22px;border-radius:6px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px">🗓</div>
          <div class="prod-text" style="flex:1">${escHtml(t.text)}</div>
          ${badge}
          <button class="prod-drag-handle" data-drag-type="tomorrow" data-drag-index="${i}" onclick="event.stopPropagation()" title="Drag pindah">☰</button>
        </div>
        <div class="prod-actions">
          <button class="prod-action-btn danger" onclick="deleteTomorrowTask(${i})">Hapus</button>
        </div>
      </div>`;
    });
  }
  html+=`</div>`;

  // IDEAS
  html+=`<div class="section-label" style="margin-top:24px">💡 Tempat Ide</div>`;
  html+=`<div class="add-item-row">
    <input class="input-field sm" id="ideaInput" placeholder="Tulis ide..." style="flex:1">
    <button class="btn btn-primary btn-sm" onclick="addIdea()">+</button>
  </div>`;
  if(!state.ideas||state.ideas.length===0){
    html+=`<div class="no-items">Belum ada ide tersimpan.<br>Tulis sebelum lupa! 💡</div>`;
  } else {
    state.ideas.forEach((t,i)=>{
      html+=`<div class="prod-item" data-prod-type="idea" data-prod-index="${i}">
        <div class="prod-item-main" onclick="openIdeaDetail(${i})">
          <div style="font-size:18px;flex-shrink:0">💡</div>
          <div class="prod-text">${escHtml(t.text)}</div>
          <span style="font-size:10px;color:var(--text-3);flex-shrink:0">${t.createdAt?t.createdAt.slice(5):''}</span>
          <button class="prod-drag-handle" data-drag-type="idea" data-drag-index="${i}" onclick="event.stopPropagation()" title="Drag pindah">☰</button>
        </div>
        <div class="prod-actions">
          <button class="prod-action-btn danger" onclick="deleteIdea(${i})">Hapus</button>
        </div>
      </div>`;
    });
  }

  return html;
}

// ============ STATS ============
function renderStats(){
  const period=state.statsPeriod||'mingguan';
  const today=todayKey();
  const keys=getPeriodKeys(period);
  const pLabel={mingguan:'7 Hari',bulanan:'30 Hari',lifetime:'Semua Waktu'};

  const checkVals=keys.map(k=>({k,pct:state.history[k]??(k===today?progressPct():0)}));
  const avgCheck=checkVals.length>0?Math.round(checkVals.reduce((a,b)=>a+b.pct,0)/checkVals.length):0;
  const productiveDays=checkVals.filter(x=>x.pct>=80&&(state.rokokHistory?.[x.k]??0)<=MAX_ROKOK).length;

  let html=`<div class="section-label">📅 Periode</div>
  <div class="stats-period-row">
    <button class="period-btn ${period==='mingguan'?'active':''}" onclick="setStatsPeriod('mingguan')">Mingguan</button>
    <button class="period-btn ${period==='bulanan'?'active':''}" onclick="setStatsPeriod('bulanan')">Bulanan</button>
    <button class="period-btn ${period==='lifetime'?'active':''}" onclick="setStatsPeriod('lifetime')">Lifetime</button>
  </div>`;

  html+=`<div class="section-label">✅ Checklist — ${pLabel[period]}</div>
  <div class="stats-grid">
    <div class="stat-card"><div class="stat-val">${state.streak}</div><div class="stat-label">🔥 Streak Aktif</div></div>
    <div class="stat-card"><div class="stat-val">${avgCheck}%</div><div class="stat-label">📈 Rata-rata</div></div>
    <div class="stat-card"><div class="stat-val">${productiveDays}</div><div class="stat-label">⭐ Hari Produktif</div></div>
    <div class="stat-card"><div class="stat-val">${progressPct()}%</div><div class="stat-label">📅 Hari Ini</div></div>
  </div>`;

  const allHistDates=[...new Set([...Object.keys(state.history||{}),today])].sort().reverse();
  const shown=state.historyShown||7;
  const displayDates=allHistDates.slice(0,shown);
  html+=`<div class="section-label">📋 Riwayat Checklist</div><div class="card"><div class="card-body">`;
  displayDates.forEach(k=>{
    const p=state.history[k]??(k===today?progressPct():0);
    const pColor=p>=80?'var(--green)':p>=50?'var(--orange)':'var(--text-3)';
    html+=`<div class="history-row">
      <div class="history-date" style="white-space:pre;font-size:11px">${fmtDate(k)}</div>
      <div class="history-bars"><div class="history-bar-wrap"><div class="history-bar" style="width:${p}%;background:${pColor}"></div></div></div>
      <div class="history-vals"><div class="history-pct" style="color:${pColor}">${p}%</div></div>
    </div>`;
  });
  html+=`</div></div>`;
  if(allHistDates.length>shown) html+=`<button class="load-more-btn" onclick="loadMoreHistory()">Tampilkan 5 hari lagi (sisa ${allHistDates.length-shown}) ↓</button>`;
  if(shown>7) html+=`<button class="load-more-btn" style="margin-top:6px" onclick="resetHistoryShown()">Sembunyikan ↑</button>`;

  html+=`<div class="section-label">📊 Statistik Lainnya</div>`;

  // Water accordion
  const wa=state.statsAccordion==='water';
  html+=`<button class="accordion-btn ${wa?'open':''}" onclick="toggleStatsAccordion('water')">
    <span>💧 Air</span><span>${wa?'▲':'▼'}</span>
  </button>`;
  if(wa){
    const waterLiters=keys.map(k=>({k,l:getWaterLiters(k)}));
    const totalL=waterLiters.reduce((a,x)=>a+x.l,0);
    const avgL=keys.length>0?(totalL/keys.length):0;
    const targetDays=waterLiters.filter(x=>x.l>=WATER_TARGET).length;
    const shownWater=state.waterHistoryShown||5;
    const displayWater=[...waterLiters].reverse().slice(0,shownWater);
    html+=`<div class="accordion-body">
      <div class="prod-stat-row">
        <div class="prod-stat-card"><div class="prod-stat-val">${avgL.toFixed(2)}L</div><div class="prod-stat-label">Rata-rata / Hari</div></div>
        <div class="prod-stat-card"><div class="prod-stat-val">${totalL.toFixed(2)}L</div><div class="prod-stat-label">Total Air</div></div>
      </div>
      <div class="prod-stat-row">
        <div class="prod-stat-card"><div class="prod-stat-val">${targetDays}/${keys.length}</div><div class="prod-stat-label">Hari Capai Target</div></div>
        <div class="prod-stat-card"><div class="prod-stat-val">${WATER_TARGET}L</div><div class="prod-stat-label">Target Harian</div></div>
      </div>
      <div style="font-size:12px;font-weight:800;color:var(--text-2);margin:12px 0 6px">Riwayat Air</div>`;
    displayWater.forEach(({k,l})=>{
      const pct=Math.min(100,Math.round((l/WATER_TARGET)*100));
      const col=l>=WATER_TARGET?'var(--green)':l>=WATER_TARGET*0.7?'var(--orange)':'var(--text-3)';
      const over=Math.max(0,l-WATER_TARGET);
      html+=`<div class="history-row">
        <div class="history-date" style="white-space:pre;font-size:11px">${fmtDate(k)}</div>
        <div class="history-bars"><div class="history-bar-wrap"><div class="history-bar" style="width:${pct}%;background:${col}"></div></div></div>
        <div class="history-vals"><div class="history-pct" style="color:${col}">${l.toFixed(2)}L</div>${over>0?`<div class="history-rokok-val" style="color:var(--blue)">+${over.toFixed(2)}L</div>`:''}</div>
      </div>`;
    });
    if(waterLiters.length>shownWater) html+=`<button class="load-more-btn" onclick="loadMoreWaterHistory()">Tampilkan 5 hari lagi (sisa ${waterLiters.length-shownWater}) ↓</button>`;
    if(shownWater>5) html+=`<button class="load-more-btn" style="margin-top:6px" onclick="resetWaterHistoryShown()">Sembunyikan ↑</button>`;
    html+=`</div>`;
  }

  // Rokok accordion
  const rka=state.statsAccordion==='rokok';
  html+=`<button class="accordion-btn ${rka?'open':''}" onclick="toggleStatsAccordion('rokok')">
    <span>🚬 Rokok</span><span>${rka?'▲':'▼'}</span>
  </button>`;
  if(rka){
    const rokokRows=keys.map(k=>({k,r:state.rokokHistory?.[k]??0}));
    const totalRokok=rokokRows.reduce((a,x)=>a+x.r,0);
    const avgRokok=keys.length>0?(totalRokok/keys.length):0;
    const idealRokok=MAX_ROKOK*keys.length;
    const overLimitDays=rokokRows.filter(x=>x.r>MAX_ROKOK).length;
    const shownRokok=state.rokokHistoryShown||5;
    const displayRokok=[...rokokRows].reverse().slice(0,shownRokok);
    html+=`<div class="accordion-body">
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-val" style="color:${todayRokok()<=MAX_ROKOK?'var(--green)':'var(--red)'}">${todayRokok()}</div><div class="stat-label">Hari Ini (max ${MAX_ROKOK})</div></div>
        <div class="stat-card"><div class="stat-val" style="color:${avgRokok<=MAX_ROKOK?'var(--green)':avgRokok<=MAX_ROKOK+1?'var(--orange)':'var(--red)'}">${avgRokok.toFixed(1)}</div><div class="stat-label">Rata-rata / Hari</div></div>
        <div class="stat-card"><div class="stat-val" style="color:var(--orange)">${totalRokok}</div><div class="stat-label">Total Batang</div></div>
        <div class="stat-card"><div class="stat-val" style="color:${totalRokok<=idealRokok?'var(--green)':'var(--red)'}">${idealRokok}</div><div class="stat-label">Batas Ideal Periode</div></div>
        <div class="stat-card"><div class="stat-val" style="color:${overLimitDays>0?'var(--red)':'var(--green)'}">${overLimitDays}</div><div class="stat-label">Hari Lewat Batas</div></div>
      </div>
      <div style="font-size:12px;font-weight:800;color:var(--text-2);margin:12px 0 6px">Riwayat Rokok</div>`;
    displayRokok.forEach(({k,r})=>{
      const pct=Math.min(100,Math.round((r/MAX_ROKOK)*100));
      const col=r<=MAX_ROKOK?'var(--green)':r<=MAX_ROKOK+1?'var(--orange)':'var(--red)';
      html+=`<div class="history-row">
        <div class="history-date" style="white-space:pre;font-size:11px">${fmtDate(k)}</div>
        <div class="history-bars"><div class="history-bar-wrap"><div class="history-bar" style="width:${pct}%;background:${col}"></div></div></div>
        <div class="history-vals"><div class="history-pct" style="color:${col}">${r}/${MAX_ROKOK}</div>${r>MAX_ROKOK?`<div class="history-rokok-val" style="color:var(--red)">+${r-MAX_ROKOK}</div>`:`<div class="history-rokok-val" style="color:var(--green)">Aman</div>`}</div>
      </div>`;
    });
    if(rokokRows.length>shownRokok) html+=`<button class="load-more-btn" onclick="loadMoreRokokHistory()">Tampilkan 5 hari lagi (sisa ${rokokRows.length-shownRokok}) ↓</button>`;
    if(shownRokok>5) html+=`<button class="load-more-btn" style="margin-top:6px" onclick="resetRokokHistoryShown()">Sembunyikan ↑</button>`;
    html+=`</div>`;
  }

  // Productivity accordion
  const pa=state.statsAccordion==='prod';
  html+=`<button class="accordion-btn ${pa?'open':''}" onclick="toggleStatsAccordion('prod')">
    <span>🎯 Produktif</span><span>${pa?'▲':'▼'}</span>
  </button>`;
  if(pa){
    const prodPeriod=state.prodStatsPeriod||'7';
    const td2=todayKey();
    const allProdKeys=[...new Set([td2,...Object.keys(state.prodHistory||{})])].sort().reverse();
    const periodProdKeys=allProdKeys.filter(k=>{
      if(prodPeriod==='7') return k>=addDaysKey(td2,-6);
      if(prodPeriod==='30') return k>=addDaysKey(td2,-29);
      return true;
    });
    const prodRecords=periodProdKeys.map(k=>({k,rec:getProdRecordForDate(k)})).filter(x=>x.rec.total>0);
    const prodDone=prodRecords.reduce((a,x)=>a+x.rec.done,0);
    const prodTotal=prodRecords.reduce((a,x)=>a+x.rec.total,0);
    const prodAvg=prodRecords.length>0?Math.round(prodRecords.reduce((a,x)=>a+prodRecordPct(x.rec),0)/prodRecords.length):0;
    const prodDays=prodRecords.length;
    const shownProd=state.prodHistoryShown||5;
    const displayProd=prodRecords.slice(0,shownProd);
    html+=`<div class="accordion-body">
      <div class="stats-period-row" style="margin-bottom:12px">
        <button class="period-btn ${prodPeriod==='7'?'active':''}" onclick="setProdStatsPeriod('7')">7 Hari</button>
        <button class="period-btn ${prodPeriod==='30'?'active':''}" onclick="setProdStatsPeriod('30')">30 Hari</button>
        <button class="period-btn ${prodPeriod==='lifetime'?'active':''}" onclick="setProdStatsPeriod('lifetime')">Lifetime</button>
      </div>
      <div class="prod-stat-row">
        <div class="prod-stat-card"><div class="prod-stat-val">${prodAvg}%</div><div class="prod-stat-label">Rata-rata completion</div></div>
        <div class="prod-stat-card"><div class="prod-stat-val">${prodDone}</div><div class="prod-stat-label">Total task selesai</div></div>
      </div>
      <div class="prod-stat-row">
        <div class="prod-stat-card"><div class="prod-stat-val">${prodTotal}</div><div class="prod-stat-label">Total task dibuat</div></div>
        <div class="prod-stat-card"><div class="prod-stat-val">${prodDays}</div><div class="prod-stat-label">Jumlah hari tercatat</div></div>
      </div>
      <div style="font-size:12px;font-weight:800;color:var(--text-2);margin:12px 0 6px">Riwayat Harian Produktif</div>`;
    if(displayProd.length===0) html+=`<div class="no-items">Belum ada histori produktivitas pada periode ini.</div>`;
    displayProd.forEach(({k,rec})=>{
      const pct=prodRecordPct(rec);
      const col=pct>=80?'var(--green)':pct>=50?'var(--orange)':'var(--text-3)';
      html+=`<div class="history-row">
        <div class="history-date" style="white-space:pre;font-size:11px">${fmtDate(k)}</div>
        <div class="history-bars"><div class="history-bar-wrap"><div class="history-bar" style="width:${pct}%;background:${col}"></div></div></div>
        <div class="history-vals"><div class="history-pct" style="color:${col}">${rec.done}/${rec.total}</div></div>
        <button class="btn btn-ghost btn-sm" onclick="openProdHistoryDetail('${k}')" style="padding:6px 8px;font-size:11px">Detail</button>
      </div>`;
    });
    if(prodRecords.length>shownProd) html+=`<button class="load-more-btn" onclick="loadMoreProdHistory()">Tampilkan 5 hari lagi (sisa ${prodRecords.length-shownProd}) ↓</button>`;
    if(shownProd>5) html+=`<button class="load-more-btn" style="margin-top:6px" onclick="resetProdHistoryShown()">Sembunyikan ↑</button>`;
    html+=`</div>`;
  }

  // Reading accordion
  const ra=state.statsAccordion==='reading';
  html+=`<button class="accordion-btn ${ra?'open':''}" onclick="toggleStatsAccordion('reading')">
    <span>📚 Reading</span><span>${ra?'▲':'▼'}</span>
  </button>`;
  if(ra){
    const books2=state.books||[];
    const finished2=books2.filter(b=>b.finished).sort((a,b)=>String(b.finishedDate||'').localeCompare(String(a.finishedDate||'')) || String(b.id||'').localeCompare(String(a.id||'')));
    const active2=books2.filter(b=>!b.finished);
    const totalPagesRead2=books2.reduce((a,b)=>a+(b.finished?Number(b.totalPages||0):Number(b.currentPage||0)),0);
    const shownFinished=state.bookFinishedShown||5;
    const displayFinished=finished2.slice(0,shownFinished);
    html+=`<div class="accordion-body">
      <div class="prod-stat-row">
        <div class="prod-stat-card"><div class="prod-stat-val">${active2.length}</div><div class="prod-stat-label">📖 Buku Aktif</div></div>
        <div class="prod-stat-card"><div class="prod-stat-val">${finished2.length}</div><div class="prod-stat-label">✅ Buku Selesai</div></div>
      </div>
      <div class="prod-stat-row">
        <div class="prod-stat-card"><div class="prod-stat-val">${totalPagesRead2}</div><div class="prod-stat-label">📄 Halaman Efektif</div></div>
      </div>`;
    if(active2.length>0){
      html+=`<div style="font-size:12px;font-weight:700;color:var(--text-2);margin:8px 0 6px">📖 Sedang Dibaca</div>`;
      active2.forEach(b=>{
        const pct2=Math.round((b.currentPage/b.totalPages)*100);
        html+=`<div class="book-stat-item">
          <div class="book-stat-cover" style="background:var(--primary-bg)">📖</div>
          <div style="flex:1"><div class="book-stat-title">${escHtml(b.title)}</div>
          <div class="book-stat-meta">Hal ${b.currentPage}/${b.totalPages} (${pct2}%)</div>
          <div class="book-progress-wrap" style="margin-top:4px"><div class="book-progress-bar" style="width:${pct2}%"></div></div></div>
        </div>`;
      });
    }
    if(finished2.length>0){
      html+=`<div style="font-size:12px;font-weight:700;color:var(--text-2);margin:12px 0 6px">✅ Buku Selesai</div>`;
      displayFinished.forEach(b=>{
        html+=`<div class="book-stat-item">
          <div class="book-stat-cover" style="background:var(--green-bg)">✅</div>
          <div><div class="book-stat-title">${escHtml(b.title)}</div>
          <div class="book-stat-meta">${b.totalPages} hal • ${b.finishedDate||'-'}</div></div>
        </div>`;
      });
      if(finished2.length>shownFinished) html+=`<button class="load-more-btn" onclick="loadMoreFinishedBooks()">Tampilkan 5 buku lagi (sisa ${finished2.length-shownFinished}) ↓</button>`;
      if(shownFinished>5) html+=`<button class="load-more-btn" style="margin-top:6px" onclick="resetFinishedBooksShown()">Sembunyikan ↑</button>`;
    }
    if(books2.length===0) html+=`<div style="text-align:center;padding:20px;color:var(--text-3);font-size:13px">Belum ada buku. Tambah via tombol 📚!</div>`;
    html+=`</div>`;
  }

  html+=`<div class="section-label">⚙️ Pengaturan</div>
  <div class="card"><div class="card-body">
    <p style="font-size:13px;font-weight:600;margin-bottom:8px">Nama kamu</p>
    <input class="input-field" id="nameInput" type="text" placeholder="Nama kamu..." value="${escHtml(state.userName||'')}" maxlength="20">
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="saveName()" style="flex:1">Simpan</button>
      <button class="btn btn-ghost" onclick="resetFloatPosition()" style="flex:1">Reset Floating</button>
      <button class="btn btn-danger" onclick="resetToday()" style="flex:1">Reset Hari Ini</button>
      <button class="btn btn-danger" onclick="openConfirmDelete()" style="flex:1">Hapus Semua</button>
    </div>
  </div></div>`;

  html+=`<div class="section-label">💾 Data & Backup</div>
  <div class="card"><div class="card-body">
    <p style="font-size:13px;color:var(--text-2);line-height:1.6;margin-bottom:10px">
      Data utama tetap disimpan lokal di device ini. Export backup secara rutin supaya data tidak hilang kalau browser/cache bermasalah atau kamu pindah HP.
    </p>
    <div style="background:var(--bg);border-radius:10px;padding:10px 12px;margin-bottom:10px;font-size:12px;color:var(--text-2)">
      <strong>Terakhir backup:</strong> <span id="lastBackupText">${formatBackupTime(state.lastBackupAt)}</span>
    </div>
    <input type="file" id="backupFileInput" accept="application/json,.json" style="display:none" onchange="handleBackupFileSelect(event)">
    <div style="display:flex;gap:8px;margin-bottom:8px">
      <button class="btn btn-primary" onclick="exportBackup()" style="flex:1">Export Backup</button>
      <button class="btn btn-ghost" onclick="triggerImportBackup()" style="flex:1">Import Backup</button>
    </div>
    <p style="font-size:11px;color:var(--text-3);line-height:1.5">
      Saran: simpan file backup ke Files/iCloud Drive. Import akan mengganti data aplikasi saat ini setelah konfirmasi.
    </p>
  </div></div>`;
  return html;
}
// ============ BOOK POPUP ============
function renderBookTracker(){
  const books=(state.books||[]).filter(b=>!b.finished);
  let html='';
  if(books.length===0){
    html+=`<div style="text-align:center;padding:30px 20px">
      <div style="font-size:48px;margin-bottom:12px">📚</div>
      <p style="font-size:14px;color:var(--text-2);margin-bottom:16px">Belum ada buku aktif.<br>Tambah buku pertamamu!</p>
    </div>`;
  } else {
    books.forEach(b=>{
      const pct=Math.round((b.currentPage/b.totalPages)*100);
      const remaining=b.totalPages-b.currentPage;
      html+=`<div class="book-list-item" onclick="openBookDetail('${b.id}')">
        <div class="book-cover">📖</div>
        <div class="book-info">
          <div class="book-title">${escHtml(b.title)}</div>
          <div class="book-progress-wrap"><div class="book-progress-bar" style="width:${pct}%"></div></div>
          <div class="book-meta">Hal ${b.currentPage} / ${b.totalPages} • Sisa ${remaining} hal</div>
        </div>
        <div class="book-pct">${pct}%</div>
      </div>`;
    });
  }
  // Add new book form
  html+=`<div style="border-top:1px solid var(--border);margin-top:8px;padding-top:14px">
    <p style="font-size:13px;font-weight:700;margin-bottom:10px">➕ Tambah Buku Baru</p>
    <input class="input-field" id="bookTitleInput" placeholder="Judul buku..." style="margin-bottom:8px">
    <div style="display:flex;gap:8px">
      <input class="input-field" id="bookPagesInput" placeholder="Total halaman" type="number" min="1" style="flex:1;margin-bottom:0">
      <button class="btn btn-primary" onclick="addBook()">Tambah</button>
    </div>
  </div>`;
  return html;
}


function trimReadSessionsToPage(sessions,newPage){
  newPage=Math.max(0,Number(newPage)||0);
  const out=[];
  for(const sess of (sessions||[])){
    if(sess.type!=='read') continue;
    const from=Number(sess.from||0),to=Number(sess.to||0);
    if(newPage>=to){
      out.push({...sess,pages:Math.max(0,to-from)});
      continue;
    }
    if(newPage>from){
      out.push({...sess,to:newPage,pages:Math.max(0,newPage-from),corrected:true});
    }
    break;
  }
  return out.filter(x=>Number(x.pages||0)>0);
}

function getBookReadingModel(b){
  const totalPages=Number(b?.totalPages||0)||Infinity;
  const raw=Array.isArray(b.sessions)?b.sessions:[];
  const legacyCurrent=Math.max(0,Math.min(Number(b.currentPage||0),totalPages));
  if(raw.length===0){
    if(legacyCurrent>0){
      const legacy={date:b.startDate||todayKey(),from:0,to:legacyCurrent,pages:legacyCurrent,type:'read',legacy:true};
      return {sessions:[legacy],readSessions:[legacy],totalRead:legacyCurrent,currentPage:legacyCurrent};
    }
    return {sessions:[],readSessions:[],totalRead:0,currentPage:0};
  }
  let cur=0;
  let out=[];
  raw.forEach(s=>{
    const date=s.date||todayKey();
    let to=Number(s.to);
    if(!Number.isFinite(to)) return;
    to=Math.max(0,Math.min(to,totalPages));
    if(s.type==='correction'){
      out=trimReadSessionsToPage(out,to);
      cur=to;
      return;
    }
    if(to>cur){
      out.push({date,from:cur,to,pages:to-cur,type:'read',corrected:!!s.corrected,legacy:!!s.legacy});
      cur=to;
    } else if(to<cur){
      // Legacy protection: older versions could store a downward update. Treat it as a correction.
      out=trimReadSessionsToPage(out,to);
      cur=to;
    }
  });
  const readSessions=out.filter(s=>s.type==='read'&&s.pages>0);
  const totalRead=readSessions.reduce((a,s)=>a+Number(s.pages||0),0);
  return {sessions:out,readSessions,totalRead,currentPage:cur};
}
function canonicalizeBookSessions(b){
  if(!b) return null;
  const model=getBookReadingModel(b);
  if(Array.isArray(b.sessions)&&JSON.stringify(b.sessions)!==JSON.stringify(model.sessions)){
    b.sessions=model.sessions;
  }
  b.currentPage=model.currentPage;
  return model;
}

function renderBookDetail(bookId){
  const b=(state.books||[]).find(x=>x.id===bookId);
  if(!b) return '<p>Buku tidak ditemukan.</p>';
  if(!Array.isArray(b.sessions)) b.sessions=[];
  const model=canonicalizeBookSessions(b);
  const pct=Math.round((Number(b.currentPage||0)/Number(b.totalPages||1))*100);
  const remaining=Math.max(0,Number(b.totalPages||0)-Number(b.currentPage||0));
  const sessions=model.sessions;
  const readSessions=model.readSessions;
  const totalRead=model.totalRead;
  const avgPerSession=readSessions.length>0?(totalRead/readSessions.length).toFixed(1):0;

  let html=`<div class="book-detail">
    <div class="book-detail-title">${escHtml(b.title)}</div>
    <div class="book-detail-meta">Total: ${b.totalPages} halaman • Dimulai: ${b.startDate||'-'}</div>
    <div class="water-track-wrap" style="margin:10px 0 6px"><div class="water-track-bar" style="width:${pct}%;background:linear-gradient(90deg,var(--primary),var(--purple))"></div></div>
    <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-2)">
      <span>Halaman ${b.currentPage}</span><span style="font-weight:700;color:var(--primary)">${pct}%</span><span>Sisa ${remaining} hal</span>
    </div>
  </div>
  <div class="page-input-row">
    <input class="input-field sm" id="pageUpdateInput" type="number" placeholder="Halaman sekarang..." min="0" max="${b.totalPages}" value="${b.currentPage}" style="flex:1">
    <button class="btn btn-primary btn-sm" onclick="updateBookPage('${b.id}')">Update</button>
    <button class="btn btn-ghost btn-sm" onclick="correctBookPage('${b.id}')">Koreksi</button>
  </div>
  <p style="font-size:11px;color:var(--text-3);line-height:1.5;margin:-2px 0 12px">Update normal hanya menerima halaman naik. Kalau angka turun karena benar-benar salah catat progress, pakai <strong>Koreksi</strong>.</p>
  <div style="display:flex;gap:8px;margin-bottom:16px">
    <button class="btn btn-ghost btn-sm" style="flex:1" onclick="finishBook('${b.id}')">✅ Tandai Selesai</button>
    <button class="btn btn-danger btn-sm" style="flex:1" onclick="deleteBook('${b.id}')">🗑️ Hapus</button>
  </div>
  <div style="font-size:13px;font-weight:700;margin-bottom:8px;color:var(--text-2)">Statistik Baca</div>
  <div class="prod-stat-row">
    <div class="prod-stat-card"><div class="prod-stat-val">${readSessions.length}</div><div class="prod-stat-label">Sesi Baca</div></div>
    <div class="prod-stat-card"><div class="prod-stat-val">${avgPerSession}</div><div class="prod-stat-label">Rata-rata Hal/Sesi</div></div>
  </div>`;

  if(sessions.length>0){
    html+=`<div class="card"><div class="card-body">`;
    sessions.slice(-10).reverse().forEach(s=>{
      html+=`<div class="history-row">
        <div class="history-date" style="font-size:11px">${s.date}</div>
        <div style="flex:1;margin:0 10px;font-size:13px;color:var(--text-2)">Hal ${s.from} → ${s.to}${s.corrected?'<br><span style="font-size:11px;color:var(--orange)">Sesi ini sudah dikoreksi</span>':''}</div>
        <div style="font-size:12px;font-weight:700;color:var(--primary)">+${s.pages} hal</div>
      </div>`;
    });
    html+=`</div></div>`;
  }

  html+=`<button class="btn btn-ghost" style="width:100%;margin-top:4px" onclick="openBookList()">← Kembali ke Daftar Buku</button>`;
  return html;
}


function renderBookStats(){
  const finished=(state.books||[]).filter(b=>b.finished);
  const active=(state.books||[]).filter(b=>!b.finished);
  const totalPagesRead=(state.books||[]).reduce((a,b)=>a+(b.finished?Number(b.totalPages||0):Number(b.currentPage||0)),0);

  let html=`<div class="prod-stat-row">
    <div class="prod-stat-card"><div class="prod-stat-val">${active.length}</div><div class="prod-stat-label">📖 Buku Aktif</div></div>
    <div class="prod-stat-card"><div class="prod-stat-val">${finished.length}</div><div class="prod-stat-label">✅ Buku Selesai</div></div>
  </div>
  <div class="prod-stat-row">
    <div class="prod-stat-card"><div class="prod-stat-val">${totalPagesRead}</div><div class="prod-stat-label">📄 Total Halaman Dibaca</div></div>
  </div>`;

  if(finished.length>0){
    html+=`<div style="font-size:13px;font-weight:700;margin-bottom:8px;color:var(--text-2)">📚 Buku Selesai</div>`;
    finished.forEach(b=>{
      html+=`<div class="book-stat-item">
        <div class="book-stat-cover" style="background:linear-gradient(135deg,var(--green-bg),var(--teal-bg))">✅</div>
        <div><div class="book-stat-title">${escHtml(b.title)}</div>
        <div class="book-stat-meta">${b.totalPages} hal • Selesai: ${b.finishedDate||'-'}</div></div>
      </div>`;
    });
  }

  if(active.length>0){
    html+=`<div style="font-size:13px;font-weight:700;margin:12px 0 8px;color:var(--text-2)">📖 Buku Aktif</div>`;
    active.forEach(b=>{
      const pct=Math.round((b.currentPage/b.totalPages)*100);
      html+=`<div class="book-stat-item">
        <div class="book-stat-cover" style="background:linear-gradient(135deg,var(--primary-bg),var(--purple-bg))">📖</div>
        <div style="flex:1"><div class="book-stat-title">${escHtml(b.title)}</div>
        <div class="book-stat-meta">Hal ${b.currentPage}/${b.totalPages} (${pct}%)</div>
        <div class="book-progress-wrap" style="margin-top:4px"><div class="book-progress-bar" style="width:${pct}%"></div></div></div>
      </div>`;
    });
  }
  return html;
}

// ============ EVENTS ============
function bindEvents(){
  document.querySelectorAll('.task-item[data-idx]').forEach(el=>{
    el.addEventListener('click',()=>{
      const idx=parseInt(el.dataset.idx);
      const today=todayKey();
      if(!state.checked[today]) state.checked[today]={};
      state.checked[today][idx]=!state.checked[today][idx];
      const task=SCHEDULE_TODAY[idx];
      if(task.water){
        if(!state.waterHistory) state.waterHistory={};
        if(state.checked[today][idx]) addScheduleWater(idx,task.water);
        else removeScheduleWater(idx);
      }
      state.history[today]=progressPct();
      recalcStreak();
      if(progressPct()===100) showToast('🎉 Semua task selesai! Luar biasa!');
      saveState();render();
    });
  });

  initProdDragDrop();

  // Enter key for inputs
  ['todayInput','tomorrowInput','ideaInput'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.addEventListener('keydown',e=>{
      if(e.key==='Enter'){
        if(id==='todayInput') addTodayTask();
        if(id==='tomorrowInput') addTomorrowTask();
        if(id==='ideaInput') addIdea();
      }
    });
  });
}

function toggleWaterGlass(idx){
  const cur=todayWater();
  const target=idx<cur?idx:idx+1;
  setWaterTotalGlasses(target);
}

// Rokok
function toggleRokokPopup(){
  if(window.__floatDragSuppress){window.__floatDragSuppress=false;return;}
  const o=document.getElementById('rokokOverlay');
  o.classList.toggle('open');
  if(o.classList.contains('open')) updateRokokPopupUI();
}
function updateRokokPopupUI(){
  const r=todayRokok();
  const color=r<=MAX_ROKOK?'var(--green)':r<=MAX_ROKOK+2?'var(--orange)':'var(--red)';
  document.getElementById('rokokNum').textContent=r;
  document.getElementById('rokokNum').style.color=color;
  const status=r===0?'Belum ada hari ini 😊':r<=MAX_ROKOK?`${r}/${MAX_ROKOK} batang — dalam batas ✅`:r<=MAX_ROKOK+2?`${r}/${MAX_ROKOK} batang — sedikit lebih ⚠️`:`${r}/${MAX_ROKOK} batang — melebihi batas ❌`;
  const se=document.getElementById('rokokStatus');se.textContent=status;se.style.color=color;
  let dots='';
  for(let i=0;i<Math.max(MAX_ROKOK,r);i++){
    const s=i<r,o=i>=MAX_ROKOK;
    dots+=`<div class="rokok-dot ${s?(o?'over':'smoked'):''}">${s?'🚬':'○'}</div>`;
  }
  document.getElementById('rokokDots').innerHTML=dots;
}
function changeRokok(delta){
  if(!state.rokokHistory) state.rokokHistory={};
  const today=todayKey();
  const nv=Math.max(0,(state.rokokHistory[today]||0)+delta);
  state.rokokHistory[today]=nv;
  if(nv>MAX_ROKOK) showToast('⚠️ Melebihi batas '+MAX_ROKOK+' batang!');
  else if(delta>0) showToast('🚬 Sisa: '+(MAX_ROKOK-nv)+' batang');
  else showToast('↩️ Dikoreksi: '+nv+' batang');
  recalcStreak();saveState();updateFloats();updateRokokPopupUI();
  if(state.tab==='stats') render();
}

// Book
function toggleBookPopup(){
  if(window.__floatDragSuppress){window.__floatDragSuppress=false;return;}
  const o=document.getElementById('bookOverlay');
  o.classList.toggle('open');
  if(o.classList.contains('open')){state.activeBookId=null;refreshBookPopup();}
}
function refreshBookPopup(){
  const body=document.getElementById('bookSheetBody');
  body.innerHTML=state.activeBookId?renderBookDetail(state.activeBookId):renderBookTracker();
}
function setBookTab(t){state.bookTab=t;state.activeBookId=null;refreshBookPopup();}
function openBookDetail(id){state.activeBookId=id;refreshBookPopup();}
function openBookList(){state.activeBookId=null;refreshBookPopup();}

function addBook(){
  const title=document.getElementById('bookTitleInput')?.value.trim();
  const pages=parseInt(document.getElementById('bookPagesInput')?.value);
  if(!title||!pages||pages<1){showToast('❌ Isi judul dan total halaman!');return;}
  if(!state.books) state.books=[];
  const id='book_'+Date.now();
  state.books.push({id,title,totalPages:pages,currentPage:0,startDate:todayKey(),sessions:[],finished:false});
  saveState();updateFloats();refreshBookPopup();showToast('📚 Buku ditambahkan!');
}
function updateBookPage(bookId){
  const b=(state.books||[]).find(x=>x.id===bookId);
  if(!b) return;
  if(!Array.isArray(b.sessions)) b.sessions=[];
  canonicalizeBookSessions(b);
  const newPage=parseInt(document.getElementById('pageUpdateInput')?.value);
  if(isNaN(newPage)||newPage<0||newPage>b.totalPages){showToast('❌ Halaman tidak valid!');return;}
  const oldPage=Number(b.currentPage||0);
  if(newPage===oldPage){showToast('Tidak ada perubahan halaman.');return;}
  if(newPage<oldPage){
    showToast(`Input ${newPage} lebih kecil dari progress ${oldPage}; tidak disimpan. Pakai Koreksi jika memang salah catat.`);
    const inp=document.getElementById('pageUpdateInput');
    if(inp) inp.value=oldPage;
    return;
  }
  const pages=newPage-oldPage;
  b.sessions.push({date:todayKey(),from:oldPage,to:newPage,pages,type:'read'});
  b.currentPage=newPage;
  showToast('📖 +'+pages+' halaman dibaca!');
  if(newPage>=b.totalPages){
    b.finished=true;b.finishedDate=todayKey();
    showToast('🎉 Buku selesai!');
    state.activeBookId=null;
  }
  saveState();updateFloats();refreshBookPopup();
}
function correctBookPage(bookId){
  const b=(state.books||[]).find(x=>x.id===bookId);
  if(!b) return;
  if(!Array.isArray(b.sessions)) b.sessions=[];
  canonicalizeBookSessions(b);
  const newPage=parseInt(document.getElementById('pageUpdateInput')?.value);
  if(isNaN(newPage)||newPage<0||newPage>b.totalPages){showToast('❌ Halaman tidak valid!');return;}
  const oldPage=Number(b.currentPage||0);
  if(newPage===oldPage){showToast('Tidak ada perubahan halaman.');return;}
  if(newPage>oldPage){showToast('Untuk halaman naik, pakai Update.');return;}
  const ok=confirm(`Koreksi progress buku dari halaman ${oldPage} ke ${newPage}?\n\nGunakan ini hanya kalau progress sebelumnya memang salah catat. Ini akan mengubah sesi baca terakhir dan tidak menambah sesi baru.`);
  if(!ok) return;
  const model=getBookReadingModel(b);
  b.sessions=trimReadSessionsToPage(model.sessions,newPage);
  b.currentPage=newPage;
  canonicalizeBookSessions(b);
  saveState();updateFloats();refreshBookPopup();showToast('↩️ Koreksi progress disimpan.');
}

function finishBook(bookId){
  const b=(state.books||[]).find(x=>x.id===bookId);
  if(!b) return;
  b.finished=true;b.finishedDate=todayKey();b.currentPage=b.totalPages;
  saveState();updateFloats();state.activeBookId=null;refreshBookPopup();showToast('🎉 Buku ditandai selesai!');
}
function deleteBook(bookId){
  if(!confirm('Hapus buku ini?')) return;
  state.books=(state.books||[]).filter(b=>b.id!==bookId);
  state.activeBookId=null;saveState();updateFloats();refreshBookPopup();showToast('🗑️ Buku dihapus');
}

// Overlay helper
function closeOverlayOnBg(e,id){if(e.target===document.getElementById(id)) document.getElementById(id).classList.remove('open');}

// Productivity actions
function escHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function setProdTab(t){state.prodTab=t;render();}

function addTodayTask(){
  const el=document.getElementById('todayInput');
  const text=el?.value.trim();
  if(!text){showToast('❌ Tulis task dulu!');return;}
  if(!state.todayTasks) state.todayTasks=[];
  state.todayTasks.push({id:'t_'+Date.now(),text,done:false,createdAt:todayKey(),detail:''});
  el.value='';saveState();render();
}
function toggleTodayTask(i){
  const t=state.todayTasks[i];
  if(t){
    t.done=!t.done;
    if(t.done) t.completedAt=todayKey();
    else delete t.completedAt;
  }
  saveState();render();
}
function deleteTodayTask(i){
  state.todayTasks.splice(i,1);saveState();render();
}
function moveTodayToTomorrow(i){
  moveProdTask('today',i,'tomorrow');
}

function moveTomorrowToToday(i){
  moveProdTask('tomorrow',i,'today');
}
function addTomorrowTask(){
  const el=document.getElementById('tomorrowInput');
  const text=el?.value.trim();if(!text){showToast('❌ Tulis rencana dulu!');return;}
  if(!state.tomorrowTasks) state.tomorrowTasks=[];
  state.tomorrowTasks.push({id:'tm_'+Date.now(),text,done:false,dueDate:'',detail:''});
  el.value='';saveState();render();
}
function deleteTomorrowTask(i){state.tomorrowTasks.splice(i,1);saveState();render();}
function addIdea(){
  const el=document.getElementById('ideaInput');
  const text=el?.value.trim();if(!text){showToast('❌ Tulis ide dulu!');return;}
  if(!state.ideas) state.ideas=[];
  state.ideas.push({id:'idea_'+Date.now(),text,detail:'',createdAt:todayKey()});
  el.value='';saveState();render();
}
function deleteIdea(i){state.ideas.splice(i,1);saveState();render();}
function moveIdeaToToday(i){
  moveProdTask('idea',i,'today');
}
function moveIdeaToTomorrow(i){
  moveProdTask('idea',i,'tomorrow');
}

function getProdList(type){
  if(type==='today') return state.todayTasks||[];
  if(type==='tomorrow') return state.tomorrowTasks||[];
  if(type==='idea') return state.ideas||[];
  if(type==='pending') return state.pendingTasks||[];
  return [];
}
function isProdDropAllowed(source,target,index){
  if(!source||!target||source===target) return false;
  if(target!=='today'&&target!=='tomorrow') return false;
  if(source==='today'&&target==='tomorrow'){
    const t=(state.todayTasks||[])[index];
    return !!t&&!t.done;
  }
  if(source==='tomorrow'&&target==='today') return true;
  if(source==='idea'&&(target==='today'||target==='tomorrow')) return true;
  if(source==='pending'&&(target==='today'||target==='tomorrow')) return true;
  return false;
}
function moveProdTask(source,index,target){
  index=parseInt(index,10);
  if(!isProdDropAllowed(source,target,index)){
    if(source==='today'&&target==='tomorrow') showToast('Task selesai tidak dipindahkan ke rencana.');
    else showToast('Arah pindah ini tidak aktif.');
    return;
  }
  const list=getProdList(source);
  const t=list[index];
  if(!t) return;
  if(target==='today'){
    if(!state.todayTasks) state.todayTasks=[];
    state.todayTasks.push({id:'t_'+Date.now(),text:t.text,detail:t.detail||'',done:false,createdAt:todayKey()});
  } else if(target==='tomorrow'){
    if(!state.tomorrowTasks) state.tomorrowTasks=[];
    state.tomorrowTasks.push({id:'tm_'+Date.now(),text:t.text,detail:t.detail||'',done:false,dueDate:t.dueDate||''});
  }
  list.splice(index,1);
  saveState();render();
  showToast(target==='today'?'📌 Dipindah ke Hari Ini!':'🗓️ Dipindah ke Akan Dilakukan!');
}

let prodDragState=null;
function initProdDragDrop(){
  document.querySelectorAll('.prod-drag-handle').forEach(handle=>{
    handle.addEventListener('pointerdown',startProdDrag);
  });
}
function startProdDrag(e){
  if(e.button!==undefined&&e.button!==0) return;
  const handle=e.currentTarget;
  const item=handle.closest('.prod-item');
  if(!item) return;
  e.preventDefault();
  e.stopPropagation();
  const rect=item.getBoundingClientRect();
  const ghost=item.cloneNode(true);
  ghost.classList.add('prod-drag-ghost');
  ghost.style.width=rect.width+'px';
  document.body.appendChild(ghost);
  prodDragState={
    source:handle.dataset.dragType,
    index:parseInt(handle.dataset.dragIndex,10),
    ghost,
    offsetX:e.clientX-rect.left,
    offsetY:e.clientY-rect.top,
    moved:false
  };
  moveProdGhost(e.clientX,e.clientY);
  document.body.classList.add('prod-dragging');
  document.addEventListener('pointermove',onProdDragMove,{passive:false});
  document.addEventListener('pointerup',endProdDrag,{passive:false});
  document.addEventListener('pointercancel',cancelProdDrag,{passive:false});
}
function moveProdGhost(x,y){
  if(!prodDragState?.ghost) return;
  prodDragState.ghost.style.left=(x-prodDragState.offsetX)+'px';
  prodDragState.ghost.style.top=(y-prodDragState.offsetY)+'px';
}
function clearProdDropMarks(){
  document.querySelectorAll('.prod-drop-zone').forEach(z=>z.classList.remove('drop-active','drop-blocked'));
}
function getDropZoneAt(x,y){
  const el=document.elementFromPoint(x,y);
  return el?el.closest('.prod-drop-zone'):null;
}
function onProdDragMove(e){
  if(!prodDragState) return;
  e.preventDefault();
  prodDragState.moved=true;
  moveProdGhost(e.clientX,e.clientY);
  // Mobile UX: allow scrolling while dragging near viewport edges.
  // Without this, moving items between far sections on iPhone can feel blocked.
  if(e.clientY<90) window.scrollBy({top:-14,left:0,behavior:'auto'});
  else if(e.clientY>window.innerHeight-90) window.scrollBy({top:14,left:0,behavior:'auto'});
  clearProdDropMarks();
  const zone=getDropZoneAt(e.clientX,e.clientY);
  if(zone){
    const target=zone.dataset.prodZone;
    zone.classList.add(isProdDropAllowed(prodDragState.source,target,prodDragState.index)?'drop-active':'drop-blocked');
  }
}
function endProdDrag(e){
  if(!prodDragState) return;
  e.preventDefault();
  const d=prodDragState;
  const zone=getDropZoneAt(e.clientX,e.clientY);
  cleanupProdDrag();
  if(zone){
    const target=zone.dataset.prodZone;
    if(isProdDropAllowed(d.source,target,d.index)) moveProdTask(d.source,d.index,target);
    else showToast('Arah drag ini tidak aktif.');
  }
}
function cancelProdDrag(e){
  cleanupProdDrag();
}
function cleanupProdDrag(){
  clearProdDropMarks();
  document.body.classList.remove('prod-dragging');
  if(prodDragState?.ghost) prodDragState.ghost.remove();
  prodDragState=null;
  document.removeEventListener('pointermove',onProdDragMove);
  document.removeEventListener('pointerup',endProdDrag);
  document.removeEventListener('pointercancel',cancelProdDrag);
}

function openPendingDetail(i){
  const t=state.pendingTasks[i];if(!t) return;
  document.getElementById('prodDetailTitle').textContent='⏳ Detail Task Tertunda';
  document.getElementById('prodDetailBody').innerHTML=`
    <p style="font-size:14px;font-weight:700;margin-bottom:10px">${escHtml(t.text)}</p>
    <p style="font-size:12px;color:var(--text-3);margin-bottom:8px">Tertunda dari: ${t.sourceDate||'-'}</p>
    <textarea class="input-field" id="detailTextarea" rows="4" placeholder="Catatan detail...">${escHtml(t.detail||'')}</textarea>
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary" style="flex:1" onclick="savePendingDetail(${i})">Simpan</button>
      <button class="btn btn-ghost" style="flex:1" onclick="closeDetailOverlay()">Tutup</button>
    </div>`;
  document.getElementById('prodDetailOverlay').classList.add('open');
}
function savePendingDetail(i){
  const val=document.getElementById('detailTextarea')?.value||'';
  if(state.pendingTasks[i]) state.pendingTasks[i].detail=val;
  saveState();closeDetailOverlay();render();showToast('✅ Detail disimpan!');
}
function movePendingToToday(i){
  moveProdTask('pending',i,'today');
}
function movePendingToTomorrow(i){
  moveProdTask('pending',i,'tomorrow');
}
function deletePendingTask(i){
  if(!confirm('Hapus task tertunda ini?')) return;
  state.pendingTasks.splice(i,1);saveState();render();showToast('🗑️ Task tertunda dihapus');
}

// Detail popups for productivity
function openTodayDetail(i){
  const t=state.todayTasks[i];if(!t) return;
  document.getElementById('prodDetailTitle').textContent='📌 Detail Task';
  document.getElementById('prodDetailBody').innerHTML=`
    <p style="font-size:14px;font-weight:700;margin-bottom:10px">${escHtml(t.text)}</p>
    <p style="font-size:12px;color:var(--text-3);margin-bottom:8px">Dibuat: ${t.createdAt||'-'}</p>
    <textarea class="input-field" id="detailTextarea" rows="4" placeholder="Tambah catatan detail...">${escHtml(t.detail||'')}</textarea>
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary" style="flex:1" onclick="saveTodayDetail(${i})">Simpan</button>
      <button class="btn btn-ghost" style="flex:1" onclick="closeDetailOverlay()">Tutup</button>
    </div>`;
  document.getElementById('prodDetailOverlay').classList.add('open');
}
function saveTodayDetail(i){
  const val=document.getElementById('detailTextarea')?.value||'';
  if(state.todayTasks[i]) state.todayTasks[i].detail=val;
  saveState();closeDetailOverlay();showToast('✅ Detail disimpan!');
}
function openTomorrowDetail(i){
  const t=state.tomorrowTasks[i];if(!t) return;
  document.getElementById('prodDetailTitle').textContent='🗓️ Detail Rencana';
  document.getElementById('prodDetailBody').innerHTML=`
    <p style="font-size:14px;font-weight:700;margin-bottom:10px">${escHtml(t.text)}</p>
    <label style="font-size:12px;font-weight:600;color:var(--text-2);display:block;margin-bottom:4px">Tanggal Pengerjaan</label>
    <input type="date" class="input-field" id="dueDateInput" value="${t.dueDate||''}" style="margin-bottom:8px">
    <textarea class="input-field" id="detailTextarea" rows="3" placeholder="Catatan detail...">${escHtml(t.detail||'')}</textarea>
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary" style="flex:1" onclick="saveTomorrowDetail(${i})">Simpan</button>
      <button class="btn btn-ghost" style="flex:1" onclick="closeDetailOverlay()">Tutup</button>
    </div>`;
  document.getElementById('prodDetailOverlay').classList.add('open');
}
function saveTomorrowDetail(i){
  const date=document.getElementById('dueDateInput')?.value||'';
  const detail=document.getElementById('detailTextarea')?.value||'';
  if(state.tomorrowTasks[i]){state.tomorrowTasks[i].dueDate=date;state.tomorrowTasks[i].detail=detail;}
  saveState();closeDetailOverlay();render();showToast('✅ Detail disimpan!');
}
function openIdeaDetail(i){
  const t=state.ideas[i];if(!t) return;
  document.getElementById('prodDetailTitle').textContent='💡 Detail Ide';
  document.getElementById('prodDetailBody').innerHTML=`
    <p style="font-size:14px;font-weight:700;margin-bottom:10px">${escHtml(t.text)}</p>
    <p style="font-size:12px;color:var(--text-3);margin-bottom:8px">Dicatat: ${t.createdAt||'-'}</p>
    <textarea class="input-field" id="detailTextarea" rows="5" placeholder="Kembangkan ide di sini...">${escHtml(t.detail||'')}</textarea>
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary" style="flex:1" onclick="saveIdeaDetail(${i})">Simpan</button>
      <button class="btn btn-ghost" style="flex:1" onclick="closeDetailOverlay()">Tutup</button>
    </div>`;
  document.getElementById('prodDetailOverlay').classList.add('open');
}
function saveIdeaDetail(i){
  const val=document.getElementById('detailTextarea')?.value||'';
  if(state.ideas[i]) state.ideas[i].detail=val;
  saveState();closeDetailOverlay();showToast('✅ Detail disimpan!');
}
function closeDetailOverlay(){document.getElementById('prodDetailOverlay').classList.remove('open');}

function openProdHistoryDetail(k){
  const rec=getProdRecordForDate(k);
  const pct=prodRecordPct(rec);
  const allTasks=(rec.tasks||[]).map((t,idx)=>({...t,__idx:idx}));
  const doneTasks=allTasks.filter(t=>t.done);
  const undoneTasks=allTasks.filter(t=>!t.done);
  let html=`<div style="background:var(--bg);border-radius:12px;padding:12px;margin-bottom:12px">
    <div style="font-size:15px;font-weight:800;margin-bottom:4px">${fmtDate(k).replace('\n',' · ')}</div>
    <div style="font-size:13px;color:var(--text-2)">${rec.done}/${rec.total} task selesai · ${pct}% completion</div>
  </div>`;
  if((rec.tasks||[]).length===0){
    html+=`<div class="warning-box">Histori lama ini hanya menyimpan angka, belum menyimpan detail nama task. Detail task akan tersedia untuk hari-hari setelah update ini dipakai.</div>`;
  } else {
    html+=`<div class="info-box" style="font-size:12px;margin-bottom:12px">Tap salah satu task untuk melihat detail/catatan task itu.</div>`;
    html+=`<div class="section-label" style="margin-top:0">✅ Task Selesai</div>`;
    if(doneTasks.length===0) html+=`<div class="no-items">Tidak ada task selesai pada hari ini.</div>`;
    doneTasks.forEach(t=>{
      html+=`<div class="prod-item"><div class="prod-item-main" onclick="openProdHistoryTaskDetail('${k}',${t.__idx})" style="cursor:pointer"><div class="prod-check done">✓</div><div style="flex:1"><div class="prod-text done" style="text-decoration:none;color:var(--text)">${escHtml(t.text)}</div>${t.detail?`<div class="task-detail">Ada catatan detail · tap untuk buka</div>`:`<div class="task-detail">Belum ada catatan detail</div>`}</div><span style="font-size:16px;color:var(--text-3)">›</span></div></div>`;
    });
    html+=`<div class="section-label">○ Belum Selesai</div>`;
    if(undoneTasks.length===0) html+=`<div class="no-items">Tidak ada task yang tertinggal.</div>`;
    undoneTasks.forEach(t=>{
      html+=`<div class="prod-item"><div class="prod-item-main" onclick="openProdHistoryTaskDetail('${k}',${t.__idx})" style="cursor:pointer"><div class="prod-check"></div><div style="flex:1"><div class="prod-text">${escHtml(t.text)}</div>${t.detail?`<div class="task-detail">Ada catatan detail · tap untuk buka</div>`:`<div class="task-detail">Belum ada catatan detail</div>`}</div><span style="font-size:16px;color:var(--text-3)">›</span></div></div>`;
    });
  }
  html+=`<button class="btn btn-ghost" style="width:100%;margin-top:6px" onclick="closeDetailOverlay()">Tutup</button>`;
  document.getElementById('prodDetailTitle').textContent='🎯 Detail Produktivitas';
  document.getElementById('prodDetailBody').innerHTML=html;
  document.getElementById('prodDetailOverlay').classList.add('open');
}

function openProdHistoryTaskDetail(k,idx){
  const rec=getProdRecordForDate(k);
  const t=(rec.tasks||[])[idx];
  if(!t) return;
  const status=t.done?'Selesai':'Belum selesai';
  const statusIcon=t.done?'✅':'○';
  const detail=(t.detail||'').trim();
  const meta=[];
  if(t.createdAt) meta.push('Dibuat: '+t.createdAt);
  if(t.completedAt) meta.push('Selesai: '+t.completedAt);
  if(t.sourceDate) meta.push('Tanggal histori: '+t.sourceDate);
  let html=`<div style="background:var(--bg);border-radius:12px;padding:12px;margin-bottom:12px">
    <div style="font-size:12px;color:var(--text-3);margin-bottom:4px">${fmtDate(k).replace('\n',' · ')} · ${statusIcon} ${status}</div>
    <div style="font-size:16px;font-weight:800;line-height:1.35">${escHtml(t.text||'-')}</div>
  </div>`;
  if(meta.length>0){
    html+=`<div style="font-size:12px;color:var(--text-3);line-height:1.7;margin-bottom:10px">${meta.map(escHtml).join('<br>')}</div>`;
  }
  html+=`<div class="section-label" style="margin-top:0">Catatan Detail</div>`;
  if(detail){
    html+=`<div class="card"><div class="card-body" style="font-size:14px;white-space:pre-wrap;line-height:1.6">${escHtml(detail)}</div></div>`;
  } else {
    html+=`<div class="no-items">Belum ada catatan detail untuk task ini.</div>`;
  }
  html+=`<div style="display:flex;gap:8px;margin-top:10px">
    <button class="btn btn-ghost" style="flex:1" onclick="openProdHistoryDetail('${k}')">Kembali</button>
    <button class="btn btn-primary" style="flex:1" onclick="closeDetailOverlay()">Tutup</button>
  </div>`;
  document.getElementById('prodDetailTitle').textContent='Detail Task';
  document.getElementById('prodDetailBody').innerHTML=html;
  document.getElementById('prodDetailOverlay').classList.add('open');
}

// ============ BACKUP / RESTORE ============
function formatBackupTime(iso){
  if(!iso) return 'Belum pernah backup';
  const d=new Date(iso);
  if(Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});
}
function cloneState(){return JSON.parse(JSON.stringify(state));}
function normalizeState(){
  if(!state.checked) state.checked={};
  if(!state.history) state.history={};
  if(!state.rokokHistory) state.rokokHistory={};
  if(!state.waterHistory) state.waterHistory={};
  if(!state.waterEvents) state.waterEvents={};
  if(!state.books) state.books=[];
  if(!state.ideas) state.ideas=[];
  if(!state.tomorrowTasks) state.tomorrowTasks=[];
  if(!state.todayTasks) state.todayTasks=[];
  if(!state.pendingTasks) state.pendingTasks=[];
  if(!state.prodHistory) state.prodHistory={};
  if(!state.prodStatsPeriod) state.prodStatsPeriod='7';
  if(!state.prodHistoryShown) state.prodHistoryShown=5;
  if(!state.userName) state.userName='Bos';
  if(!state.lastBackupAt) state.lastBackupAt='';
  if(!state.firstUseDate) state.firstUseDate=getFirstUseDate()||todayKey();
  if(!state.floatPos) state.floatPos=null;
  const today=todayKey();
  if(!state.checked[today]) state.checked[today]={};
  if(!state.rokokHistory[today]) state.rokokHistory[today]=0;
  if(!state.waterHistory[today]) state.waterHistory[today]=0;
  syncWaterHistory(today);
}
function exportBackup(){
  try{
    const exportedAt=new Date().toISOString();
    state.lastBackupAt=exportedAt;
    const payload={
      app:'boneeps',
      version:13,
      storageKey:STORAGE_KEY,
      exportedAt,
      data:cloneState()
    };
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=`boneeps-backup-${todayKey()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    saveState();
    render();
    showToast('✅ Backup berhasil diexport!');
  }catch(e){
    console.error(e);
    showToast('❌ Gagal export backup');
  }
}
function triggerImportBackup(){
  const input=document.getElementById('backupFileInput');
  if(!input){showToast('❌ Tombol import tidak siap');return;}
  input.value='';
  input.click();
}
async function handleBackupFileSelect(event){
  const file=event.target.files?.[0];
  if(!file) return;
  try{
    const text=await file.text();
    const payload=JSON.parse(text);
    if(!payload||!['Kos Produktif','boneeps'].includes(payload.app)||!payload.data||typeof payload.data!=='object'){
      showToast('❌ File backup tidak valid');
      return;
    }
    const exported=formatBackupTime(payload.exportedAt);
    const ok=confirm(`Restore backup dari ${exported}?\n\nData aplikasi saat ini akan diganti oleh isi backup.`);
    if(!ok) return;
    state={...state,...payload.data};
    state.lastBackupAt=payload.exportedAt||state.lastBackupAt||new Date().toISOString();
    normalizeState();
    autoMoveTasks();
    recalcStreak();
    saveState();
    render();
    showToast('✅ Backup berhasil direstore!');
  }catch(e){
    console.error(e);
    showToast('❌ Gagal import backup');
  }finally{
    event.target.value='';
  }
}

// General
function switchTab(t){state.tab=t;render();}
function setWorkoutDay(i){state.workoutDay=i;render();}
function setStatsPeriod(p){state.statsPeriod=p;state.historyShown=7;render();}
function setProdStatsPeriod(p){state.prodStatsPeriod=p;state.prodHistoryShown=5;render();}
function loadMoreProdHistory(){state.prodHistoryShown=(state.prodHistoryShown||5)+5;render();}
function resetProdHistoryShown(){state.prodHistoryShown=5;render();}
function loadMoreFinishedBooks(){state.bookFinishedShown=(state.bookFinishedShown||5)+5;render();}
function resetFinishedBooksShown(){state.bookFinishedShown=5;render();}
function toggleStatsAccordion(key){
  state.statsAccordion=state.statsAccordion===key?'':key;
  render();
}
function loadMoreHistory(){state.historyShown=(state.historyShown||7)+5;render();}
function resetHistoryShown(){state.historyShown=7;render();}
function loadMoreWaterHistory(){state.waterHistoryShown=(state.waterHistoryShown||5)+5;render();}
function resetWaterHistoryShown(){state.waterHistoryShown=5;render();}
function loadMoreRokokHistory(){state.rokokHistoryShown=(state.rokokHistoryShown||5)+5;render();}
function resetRokokHistoryShown(){state.rokokHistoryShown=5;render();}

function saveName(){
  const v=document.getElementById('nameInput')?.value.trim();
  if(v){state.userName=v;saveState();render();showToast('✅ Nama tersimpan!');}
}
function resetToday(){
  if(!confirm('Reset checklist & air hari ini?')) return;
  const t=todayKey();
  state.checked[t]={};state.history[t]=0;state.waterHistory[t]=0;if(state.waterEvents) state.waterEvents[t]=[];
  recalcStreak();saveState();render();showToast('🔄 Hari ini direset!');
}
function openConfirmDelete(){
  document.getElementById('confirmInput').value='';
  document.getElementById('confirmOverlay').classList.add('open');
}
function closeConfirm(){document.getElementById('confirmOverlay').classList.remove('open');}
function executeResetAll(){
  if(document.getElementById('confirmInput').value.trim()!=='HAPUS'){showToast('❌ Ketik HAPUS dengan huruf kapital!');return;}
  state.checked={};state.history={};state.streak=0;state.userName='Bos';
  state.rokokHistory={};state.waterHistory={};state.waterEvents={};state.books=[];
  state.todayTasks=[];state.pendingTasks=[];state.tomorrowTasks=[];state.ideas=[];state.prodHistory={};state.prodHistoryShown=5;state.prodStatsPeriod='7';state.bookFinishedShown=5;state.lastBackupAt='';state.firstUseDate=todayKey();state.floatPos=null;
  try{localStorage.removeItem(LEGACY_STORAGE_KEY);}catch(e){}
  saveState();closeConfirm();render();showToast('🗑️ Semua data dihapus');
}

function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}


// ============ FLOATING BUTTON DRAG ==========
let __floatDragReady=false;
window.__floatDragSuppress=false;
function applyFloatPosition(){
  const stack=document.querySelector('.float-stack');
  if(!stack) return;
  if(state.floatPos&&Number.isFinite(state.floatPos.left)&&Number.isFinite(state.floatPos.top)){
    stack.style.left=state.floatPos.left+'px';
    stack.style.top=state.floatPos.top+'px';
    stack.style.right='auto';
    stack.style.bottom='auto';
  } else {
    stack.style.left='';stack.style.top='';stack.style.right='';stack.style.bottom='';
  }
}
function resetFloatPosition(){
  state.floatPos=null;saveState();applyFloatPosition();showToast('Floating button dikembalikan ke posisi awal.');
}
function initFloatingDrag(){
  if(__floatDragReady) {applyFloatPosition();return;}
  const stack=document.querySelector('.float-stack');
  if(!stack) return;
  __floatDragReady=true;
  let startX=0,startY=0,startLeft=0,startTop=0,dragging=false,pid=null,tapAction='';
  stack.addEventListener('pointerdown',e=>{
    const btn=e.target.closest('.float-btn');
    if(!btn) return;
    pid=e.pointerId;dragging=false;tapAction=btn.dataset.floatAction||'';startX=e.clientX;startY=e.clientY;
    const rect=stack.getBoundingClientRect();startLeft=rect.left;startTop=rect.top;
    try{stack.setPointerCapture(pid);}catch(err){}
  });
  stack.addEventListener('pointermove',e=>{
    if(pid!==e.pointerId) return;
    const dx=e.clientX-startX,dy=e.clientY-startY;
    if(!dragging&&Math.hypot(dx,dy)>10){dragging=true;stack.classList.add('dragging');}
    if(!dragging) return;
    e.preventDefault();
    const rect=stack.getBoundingClientRect();
    const maxLeft=Math.max(8,window.innerWidth-rect.width-8);
    const maxTop=Math.max(8,window.innerHeight-rect.height-100);
    const left=Math.min(maxLeft,Math.max(8,startLeft+dx));
    const top=Math.min(maxTop,Math.max(8,startTop+dy));
    state.floatPos={left:Math.round(left),top:Math.round(top)};
    applyFloatPosition();
  },{passive:false});
  function finish(e){
    if(pid!==e.pointerId) return;
    try{stack.releasePointerCapture(pid);}catch(err){}
    const wasDragging=dragging;
    const action=tapAction;
    pid=null;tapAction='';dragging=false;
    if(wasDragging){
      window.__floatDragSuppress=true;
      setTimeout(()=>{window.__floatDragSuppress=false;},250);
      saveState();
      stack.classList.remove('dragging');
      return;
    }
    // iOS Safari can swallow the normal click after pointer-capture.
    // Treat a short pointer gesture as an explicit tap.
    if(action==='book') toggleBookPopup();
    else if(action==='rokok') toggleRokokPopup();
  }
  stack.addEventListener('pointerup',finish,{passive:false});
  stack.addEventListener('pointercancel',finish,{passive:false});
  applyFloatPosition();
}

// ============ SERVICE WORKER ============
if('serviceWorker' in navigator){
  const canUseSW=location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1';
  if(canUseSW){
    window.addEventListener('load',()=>{
      navigator.serviceWorker.register('./sw.js').catch(err=>console.warn('Service worker gagal:',err));
    });
  }
}

// ============ INIT ============
loadState();render();
