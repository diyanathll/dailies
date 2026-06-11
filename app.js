// ============ CONSTANTS ============
const MAX_ROKOK=5,WATER_TARGET=2.5,WATER_GLASS=0.25,WATER_GLASSES=10;
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
  if(isExfo) pmDetail='Malam EXFO ('+dn[dow]+'): Exfoliating Pad → Serum Brightening → Moisturizer → Night Lotion. Skip toner & retinol!';
  else if(isMaskerBright) pmDetail='Malam MASKER BRIGHT ('+dn[dow]+'): Toner → Masker Bright → Serum Brightening → Moisturizer → Night Lotion.';
  else if(isMaskerCharcoal) pmDetail='Malam MASKER CHARCOAL ('+dn[dow]+'): Toner → Masker Charcoal → Moisturizer → Night Lotion. Skip retinol.';
  else pmDetail='Malam normal ('+dn[dow]+'): Toner → Retinol Serum → Moisturizer → Night Lotion.';
  return[
    {time:"05:00",label:"Bangun Pagi",emoji:"⏰",cat:"routine",dur:"5 mnt",detail:"Langsung matiin alarm, jangan snooze! Duduk tegak 30 detik, tarik napas dalam 3x."},
    {time:"05:05",label:"Minum Air — 2 Gelas (0.5L)",emoji:"💧",cat:"air",dur:"5 mnt",detail:"Hidrasi pertama setelah bangun. Taruh botol air di samping kasur dari malem.",water:2},
    {time:"05:10",label:"Olahraga Pagi",emoji:"💪",cat:"exercise",dur:"30 mnt",detail:"Lihat tab Workout untuk program hari ini. Semua bisa di kamar kos tanpa alat!"},
    {time:"05:40",label:"Grounding & Udara Segar",emoji:"🌱",cat:"health",dur:"10 mnt",detail:"Keluar kos setelah olahraga. Injak tanah/rumput langsung (barefoot). Tarik napas udara pagi, cooling down post-workout. Belum cukup UV-B — murni untuk mood & recovery."},
    {time:"05:50",label:"Minum Whey Protein",emoji:"🥛",cat:"suplemen",dur:"5 mnt",detail:"1 scoop + 200ml air dingin. Minum dalam 30–45 menit setelah workout untuk recovery otot optimal."},
    {time:"05:55",label:"Mandi",emoji:"🚿",cat:"routine",dur:"15 mnt",detail:"Mandi air dingin — ngilangin sisa ngantuk. Berpakaian rapi meski di kos."},
    {time:"06:10",label:"AM Skincare Tahap 1 (Tanpa Sunscreen)",emoji:"🌿",cat:"skincare",dur:"5 mnt",detail:"Toner → Serum Brightening → Moisturizer → Day Lotion. Sunscreen dipake SETELAH berjemur jam 07:15!"},
    {time:"06:15",label:"Minum Air — 1 Gelas (0.25L)",emoji:"💧",cat:"air",dur:"2 mnt",detail:"Sebelum sarapan. Bantu pencernaan dan persiapan makan.",water:1},
    {time:"06:20",label:"Sarapan",emoji:"🍳",cat:"meal",dur:"20 mnt",detail:"Usahain ada protein tiap sarapan: telur, tahu, tempe, atau ikan."},
    {time:"06:40",label:"Minum Multivitamin + Omega-3",emoji:"💊",cat:"suplemen",dur:"2 mnt",detail:"Minum setelah makan agar tidak mual. Multivitamin = imun & energi. Omega-3 = otak, kulit & anti-inflamasi."},
    {time:"06:45",label:"Belajar / Kerja Fokus Sesi 1",emoji:"📚",cat:"productive",dur:"1 jam 15 mnt",detail:"Golden hour! HP jauh, notif off. Kerjain tugas paling penting & susah."},
    {time:"07:00",label:"Berjemur Vitamin D ☀️",emoji:"☀️",cat:"health",dur:"10–15 mnt",detail:"Keluar kos, kena sinar matahari langsung ke kulit 10–15 menit. Tanpa sunscreen dulu! Jam 07:00–08:00 = UV-B cukup untuk vitamin D, belum terlalu panas."},
    {time:"07:15",label:"AM Skincare Tahap 2 — Apply Sunscreen",emoji:"🌞",cat:"skincare",dur:"2 mnt",detail:"Setelah masuk dari berjemur, langsung apply Sunscreen SPF 30+. Kulit sekarang terlindungi penuh seharian!"},
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
  else if(isMaskerBright) specialLabel='✨ Malam Masker Brightening ('+dn[dow]+')';
  else if(isMaskerCharcoal) specialLabel='🖤 Malam Masker Charcoal ('+dn[dow]+')';
  else specialLabel='🌙 Malam Normal — Retinol ('+dn[dow]+')';
  const amSteps=[
    {num:1,name:"Toner",note:"Tepuk lembut ke wajah dengan kapas",color:"#0284c7",bg:"#e0f2fe"},
    {num:2,name:"Serum Brightening",note:"2–3 tetes, ratakan ke seluruh wajah",color:"#db2777",bg:"#fce7f3"},
    {num:3,name:"Moisturizer",note:"Tunggu serum 1–2 menit dulu",color:"#059669",bg:"#d1fae5"},
    {num:4,name:"Day Lotion",note:"Setelah moisturizer meresap",color:"#7c3aed",bg:"#ede9fe"},
    {num:5,name:"⏳ Keluar Berjemur dulu...",note:"Sunscreen SETELAH berjemur jam 07:00!",color:"#d97706",bg:"#fef3c7"},
    {num:6,name:"Sunscreen SPF 30+",note:"Apply setelah masuk dari berjemur (~07:15)",color:"#d97706",bg:"#fef3c7"},
  ];
  let pmSteps=[];
  if(isExfo) pmSteps=[
    {num:1,name:"Noure Exfoliating Pad",note:"Gantikan toner. Usap lembut ke wajah",color:"#7c3aed",bg:"#ede9fe"},
    {num:2,name:"Serum Brightening",note:"2–3 tetes setelah exfo pad meresap",color:"#db2777",bg:"#fce7f3"},
    {num:3,name:"Moisturizer",note:"Kulit butuh hidrasi ekstra setelah exfo",color:"#059669",bg:"#d1fae5"},
    {num:4,name:"Night Lotion",note:"Kunci kelembapan semalaman",color:"#4f46e5",bg:"#eef2ff"},
  ];
  else if(isMaskerBright) pmSteps=[
    {num:1,name:"Toner",note:"Balance kulit sebelum masker",color:"#0284c7",bg:"#e0f2fe"},
    {num:2,name:"Masker Brightening",note:"Diamkan 10–15 menit",color:"#db2777",bg:"#fce7f3"},
    {num:3,name:"Serum Brightening",note:"Setelah masker dibilas bersih",color:"#db2777",bg:"#fce7f3"},
    {num:4,name:"Moisturizer",note:"Kunci hidrasi",color:"#059669",bg:"#d1fae5"},
    {num:5,name:"Night Lotion",note:"Langkah terakhir",color:"#4f46e5",bg:"#eef2ff"},
  ];
  else if(isMaskerCharcoal) pmSteps=[
    {num:1,name:"Toner",note:"Prep kulit sebelum masker charcoal",color:"#0284c7",bg:"#e0f2fe"},
    {num:2,name:"Masker Charcoal",note:"Fokus T-zone. Diamkan 10–15 menit",color:"#374151",bg:"#f3f4f6"},
    {num:3,name:"Moisturizer",note:"Setelah masker dibilas bersih",color:"#059669",bg:"#d1fae5"},
    {num:4,name:"Night Lotion",note:"Kunci kelembapan",color:"#4f46e5",bg:"#eef2ff"},
  ];
  else pmSteps=[
    {num:1,name:"Toner",note:"Bersihkan & balance pH kulit",color:"#0284c7",bg:"#e0f2fe"},
    {num:2,name:"Retinol Serum",note:"2–3 tetes, hindari area bawah mata",color:"#d97706",bg:"#fef3c7"},
    {num:3,name:"Moisturizer",note:"WAJIB setelah retinol — cegah kekeringan",color:"#059669",bg:"#d1fae5"},
    {num:4,name:"Night Lotion",note:"Kunci kelembapan semalaman",color:"#4f46e5",bg:"#eef2ff"},
  ];
  return{amSteps,pmSteps,specialLabel,isExfo};
}
// ============ STATE ============
let SCHEDULE_TODAY=buildSchedule();
let state={
  tab:'schedule',userName:'Bos',
  checked:{},streak:0,history:{},
  workoutDay:0,
  rokokHistory:{},
  waterHistory:{},
  statsPeriod:'mingguan',
  historyShown:7,
  statsAccordion:'',
  // Books
  books:[],
  activeBookId:null,
  bookTab:'tracker',
  // Productivity
  prodTab:'tasks',
  todayTasks:[],        // {id,text,done,createdAt}
  tomorrowTasks:[],     // {id,text,detail,dueDate,done}
  ideas:[],             // {id,text,detail,createdAt}
  prodHistory:{},       // {YYYY-MM-DD: {done:n,total:n}}
  lastProdDate:'',
  lastBackupAt:'',
};

function todayChecked(){return state.checked[todayKey()]||{};}
function completedCount(){return Object.values(todayChecked()).filter(Boolean).length;}
function progressPct(){return Math.round((completedCount()/SCHEDULE_TODAY.length)*100);}
function todayWater(){return state.waterHistory?.[todayKey()]||0;}
function todayRokok(){return state.rokokHistory?.[todayKey()]||0;}

function saveState(){try{localStorage.setItem('kosProduktif5',JSON.stringify(state));}catch(e){}}

function loadState(){
  try{
    const raw=localStorage.getItem('kosProduktif5');
    if(raw){const s=JSON.parse(raw);state={...state,...s};}
  }catch(e){}
  state.mealWeek=((getWeekOfMonth()-1)%4)+1;
  const today=todayKey();
  if(!state.checked[today]) state.checked[today]={};
  if(!state.rokokHistory) state.rokokHistory={};
  if(!state.rokokHistory[today]) state.rokokHistory[today]=0;
  if(!state.waterHistory) state.waterHistory={};
  if(!state.waterHistory[today]) state.waterHistory[today]=0;
  if(!state.books) state.books=[];
  if(!state.ideas) state.ideas=[];
  if(!state.tomorrowTasks) state.tomorrowTasks=[];
  if(!state.todayTasks) state.todayTasks=[];
  if(!state.prodHistory) state.prodHistory={};
  if(!state.lastBackupAt) state.lastBackupAt='';
  // Auto move tomorrow -> today on date change
  autoMoveTasks();
  recalcStreak();
}

function autoMoveTasks(){
  const today=todayKey();
  if(state.lastProdDate===today) return;

  // 1) Simpan histori produktivitas dari hari terakhir sebelum task hari ini di-reset.
  if(state.lastProdDate&&state.lastProdDate!==today){
    const doneCnt=(state.todayTasks||[]).filter(t=>t.done).length;
    const totalCnt=(state.todayTasks||[]).length;
    if(totalCnt>0) state.prodHistory[state.lastProdDate]={done:doneCnt,total:totalCnt};
    state.todayTasks=[];
  }

  // 2) Setelah reset, baru pindahkan rencana yang punya dueDate hari ini/terlewat.
  // Task tanpa dueDate tetap di "Akan Dilakukan" agar tidak hilang/masuk otomatis.
  const carry=[];
  const moved=[];
  (state.tomorrowTasks||[]).forEach(t=>{
    if(t.dueDate&&t.dueDate<=today){
      moved.push({...t,done:false,movedAt:today});
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
    if(pct===undefined&&i===0){s=0;break;}
    if(pct>=80&&rokok<=MAX_ROKOK)s++;
    else if(i>0)break;
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
  const wg=todayWater();
  const wl=(wg*WATER_GLASS).toFixed(2);
  document.getElementById('waterHeaderBar').style.width=Math.min(100,(wg/WATER_GLASSES)*100)+'%';
  document.getElementById('waterHeaderVal').textContent=wl+'L / '+WATER_TARGET+'L';
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
}

// ============ SCHEDULE ============
function renderSchedule(){
  const ch=todayChecked();
  const midx=new Date().getDate()%MOTIVASI.length;
  const wg=todayWater();
  const wl=(wg*WATER_GLASS).toFixed(2);
  const wpct=Math.min(100,(wg/WATER_GLASSES)*100);
  let html=`<div class="motivasi-banner"><span style="font-size:22px">💬</span><p class="motivasi-text"><strong>Quote hari ini:</strong><br>${MOTIVASI[midx]}</p></div>`;
  html+=`<div class="water-card">
    <div class="water-card-top">
      <div class="water-card-title">💧 Minum Air Harian</div>
      <div class="water-card-val">${wl}L <span style="font-size:13px;color:var(--text-3);font-weight:400">/ ${WATER_TARGET}L</span></div>
    </div>
    <div class="water-track-wrap"><div class="water-track-bar" style="width:${wpct}%"></div></div>
    <div class="water-glasses">`;
  for(let i=0;i<WATER_GLASSES;i++){
    html+=`<div class="water-glass ${i<wg?'filled':''}" onclick="toggleWaterGlass(${i})">${i<wg?'💧':'○'}</div>`;
  }
  html+=`</div><p style="font-size:11px;color:var(--text-3);margin-top:8px;text-align:center">Tap gelas untuk tandai minum • 1 gelas = 0.25L</p></div>`;

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
    <p>🌿 <strong>Senin, Rabu, Jumat:</strong> Toner → Retinol → Moisturizer → Night Lotion</p>
    <p>🧴 <strong>Selasa & Sabtu:</strong> Exfoliating Pad → Serum Brightening → Moisturizer → Night Lotion</p>
    <p>✨ <strong>Kamis:</strong> Toner → Masker Bright → Serum Brightening → Moisturizer → Night Lotion</p>
    <p>🖤 <strong>Minggu:</strong> Toner → Masker Charcoal → Moisturizer → Night Lotion</p>
  </div></div>`;
  html+=`<div class="section-label">🌅 AM Routine — Tiap Pagi</div>
  <div class="info-box">☀️ Step 1–4 dilakukan jam 06:10 <strong>sebelum</strong> berjemur. Step 6 (Sunscreen) dilakukan jam 07:15 <strong>setelah</strong> masuk dari berjemur!</div>
  <div class="card"><div class="card-body">`;
  sc.amSteps.forEach(s=>{
    html+=`<div class="skincare-step">
      <div class="skincare-num" style="background:${s.bg};color:${s.color}">${s.num}</div>
      <div style="flex:1"><div class="skincare-name">${s.name}</div><div class="skincare-note">${s.note}</div></div>
    </div>`;
  });
  html+=`</div></div>`;
  html+=`<div class="section-label">${sc.specialLabel}</div>`;
  if(sc.isExfo) html+=`<div class="info-box">🧴 Malam exfoliating: skip toner & retinol. Kombinasi exfo + retinol = over-exfoliate & iritasi!</div>`;
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
    <p>☀️ <strong>Sunscreen WAJIB</strong> tiap pagi — tanpa ini serum brightening sia-sia</p>
    <p>🌱 Berjemur jam 07:00 tanpa sunscreen → masuk → baru apply sunscreen</p>
    <p>⚠️ Retinol + Exfo jangan di malam yang sama</p>
    <p>🚬 Rokok mempercepat penuaan kulit — sunscreen & retinol bantu counter efeknya</p>
    <p>💧 Minum 2.5L/hari = kulit lebih lembap dari dalam</p>
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

  // TODAY
  html+=`<div class="section-label">📌 Harus Dilakukan Hari Ini</div>`;
  html+=`<div class="add-item-row">
    <input class="input-field sm" id="todayInput" placeholder="Tambah task hari ini..." style="flex:1">
    <button class="btn btn-primary btn-sm" onclick="addTodayTask()">+</button>
  </div>`;
  if(!state.todayTasks||state.todayTasks.length===0){
    html+=`<div class="no-items">Belum ada task hari ini.<br>Tambah di atas! 🎯</div>`;
  } else {
    state.todayTasks.forEach((t,i)=>{
      html+=`<div class="prod-item">
        <div class="prod-item-main" onclick="toggleTodayTask(${i})">
          <div class="prod-check ${t.done?'done':''}">${t.done?'✓':''}</div>
          <div class="prod-text ${t.done?'done':''}">${escHtml(t.text)}</div>
        </div>
        <div class="prod-actions">
          <button class="prod-action-btn primary" onclick="openTodayDetail(${i})">Detail</button>
          <button class="prod-action-btn primary" onclick="moveToIdea(${i},'today')">→ Ide</button>
          <button class="prod-action-btn danger" onclick="deleteTodayTask(${i})">Hapus</button>
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
  if(!state.tomorrowTasks||state.tomorrowTasks.length===0){
    html+=`<div class="no-items">Belum ada rencana.<br>Isi sebelum tidur untuk besok! 🌙</div>`;
  } else {
    state.tomorrowTasks.forEach((t,i)=>{
      const noDate=!t.dueDate;
      const isPast=t.dueDate&&t.dueDate<todayKey();
      let badge='';
      if(noDate) badge=`<span class="prod-badge prod-badge-nodate">❗ Tanpa tanggal</span>`;
      else if(isPast) badge=`<span class="prod-badge prod-badge-nodate">⚠️ Terlambat</span>`;
      else badge=`<span class="prod-badge prod-badge-date">📅 ${t.dueDate}</span>`;
      html+=`<div class="prod-item">
        <div class="prod-item-main" onclick="openTomorrowDetail(${i})">
          <div style="width:22px;height:22px;border-radius:6px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px">🗓</div>
          <div class="prod-text" style="flex:1">${escHtml(t.text)}</div>
          ${badge}
        </div>
        <div class="prod-actions">
          <button class="prod-action-btn primary" onclick="moveTomorrowToToday(${i})">→ Hari Ini</button>
          <button class="prod-action-btn primary" onclick="moveToIdea(${i},'tomorrow')">→ Ide</button>
          <button class="prod-action-btn danger" onclick="deleteTomorrowTask(${i})">Hapus</button>
        </div>
      </div>`;
    });
  }

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
      html+=`<div class="prod-item">
        <div class="prod-item-main" onclick="openIdeaDetail(${i})">
          <div style="font-size:18px;flex-shrink:0">💡</div>
          <div class="prod-text">${escHtml(t.text)}</div>
          <span style="font-size:10px;color:var(--text-3);flex-shrink:0">${t.createdAt?t.createdAt.slice(5):''}</span>
        </div>
        <div class="prod-actions">
          <button class="prod-action-btn primary" onclick="moveIdeaToToday(${i})">→ Hari Ini</button>
          <button class="prod-action-btn primary" onclick="moveIdeaToTomorrow(${i})">→ Rencana</button>
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

  function getKeys(p){
    const allCheckKeys=Object.keys(state.history||{});
    const allRokokKeys=Object.keys(state.rokokHistory||{});
    const allKeys=[...new Set([...allCheckKeys,...allRokokKeys,today])].sort();
    if(p==='mingguan') return allKeys.filter(k=>k>=addDaysKey(today,-6));
    if(p==='bulanan') return allKeys.filter(k=>k>=addDaysKey(today,-29));
    return allKeys;
  }
  const keys=getKeys(period);
  const checkVals=keys.map(k=>({k,pct:state.history[k]??(k===today?progressPct():null)})).filter(x=>x.pct!==null);
  const rokokVals=keys.map(k=>({k,r:state.rokokHistory?.[k]??null})).filter(x=>x.r!==null);

  const avgCheck=checkVals.length>0?Math.round(checkVals.reduce((a,b)=>a+b.pct,0)/checkVals.length):0;
  const streakDays=checkVals.filter(x=>x.pct>=80&&(state.rokokHistory?.[x.k]??0)<=MAX_ROKOK).length;
  const avgRokok=rokokVals.length>0?(rokokVals.reduce((a,b)=>a+b.r,0)/rokokVals.length).toFixed(1):'-';
  const totalRokok=rokokVals.reduce((a,b)=>a+b.r,0);
  const idealRokok=MAX_ROKOK*keys.length;
  const rCol=parseFloat(avgRokok)<=MAX_ROKOK?'var(--green)':parseFloat(avgRokok)<=MAX_ROKOK+1?'var(--orange)':'var(--red)';
  const pLabel={mingguan:'7 Hari',bulanan:'30 Hari',lifetime:'Semua Waktu'};

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
    <div class="stat-card"><div class="stat-val">${streakDays}</div><div class="stat-label">⭐ Hari Produktif</div></div>
    <div class="stat-card"><div class="stat-val">${progressPct()}%</div><div class="stat-label">📅 Hari Ini</div></div>
  </div>`;

  html+=`<div class="section-label">🚬 Rokok — ${pLabel[period]}</div>
  <div class="stats-grid">
    <div class="stat-card"><div class="stat-val" style="color:${todayRokok()<=MAX_ROKOK?'var(--green)':'var(--red)'}">${todayRokok()}</div><div class="stat-label">Hari Ini (max ${MAX_ROKOK})</div></div>
    <div class="stat-card"><div class="stat-val" style="color:${rCol}">${avgRokok}</div><div class="stat-label">Rata-rata / Hari</div></div>
    <div class="stat-card"><div class="stat-val" style="color:var(--orange)">${totalRokok}</div><div class="stat-label">Total Batang</div></div>
    <div class="stat-card"><div class="stat-val" style="color:${totalRokok<=idealRokok?'var(--green)':'var(--red)'}">${idealRokok}</div><div class="stat-label">Batas Ideal Periode</div></div>
  </div>`;

  // History with pagination
  const allHistDates=[...new Set([...Object.keys(state.history||{}),...Object.keys(state.rokokHistory||{}),today])].sort().reverse();
  const shown=state.historyShown||7;
  const displayDates=allHistDates.slice(0,shown);

  html+=`<div class="section-label">📋 Riwayat Harian</div><div class="card"><div class="card-body">`;
  displayDates.forEach(k=>{
    const p=state.history[k]??(k===today?progressPct():0);
    const r=state.rokokHistory?.[k]??'-';
    const pColor=p>=80?'var(--green)':p>=50?'var(--orange)':'var(--text-3)';
    const rColor=r!=='-'&&r<=MAX_ROKOK?'var(--green)':r!=='-'&&r<=MAX_ROKOK+1?'var(--orange)':'var(--red)';
    html+=`<div class="history-row">
      <div class="history-date" style="white-space:pre;font-size:11px">${fmtDate(k)}</div>
      <div class="history-bars">
        <div class="history-bar-wrap"><div class="history-bar" style="width:${p}%;background:${pColor}"></div></div>
        <div class="history-bar-wrap"><div class="history-bar" style="width:${r!=='-'?Math.min(100,(r/MAX_ROKOK)*100):0}%;background:${rColor}"></div></div>
      </div>
      <div class="history-vals">
        <div class="history-pct" style="color:${pColor}">${p}%</div>
        <div class="history-rokok-val" style="color:${rColor}">🚬${r}</div>
      </div>
    </div>`;
  });
  html+=`</div></div>`;
  if(allHistDates.length>shown){
    html+=`<button class="load-more-btn" onclick="loadMoreHistory()">Tampilkan 5 lagi (sisa ${allHistDates.length-shown}) ↓</button>`;
  }
  if(shown>7){
    html+=`<button class="load-more-btn" style="margin-top:6px" onclick="resetHistoryShown()">Sembunyikan ↑</button>`;
  }

  // Accordion: Productivity & Reading Stats
  html+=`<div class="section-label">📊 Statistik Lainnya</div>`;

  // Productivity accordion
  const pa=state.statsAccordion==='prod';
  html+=`<button class="accordion-btn ${pa?'open':''}" onclick="toggleStatsAccordion('prod')">
    <span>🎯 Produktif</span><span>${pa?'▲':'▼'}</span>
  </button>`;
  if(pa){
    const ph=state.prodHistory||{};
    const td2=todayKey();
    const todayDone2=(state.todayTasks||[]).filter(t=>t.done).length;
    const todayTotal2=(state.todayTasks||[]).length;
    const week7=[td2,...Array.from({length:6},(_,i)=>addDaysKey(td2,-i-1))];
    const w7Done=week7.reduce((a,k)=>a+(k===td2?todayDone2:(ph[k]?.done||0)),0);
    const w7Total=week7.reduce((a,k)=>a+(k===td2?todayTotal2:(ph[k]?.total||0)),0);
    const lifeDone2=Object.values(ph).reduce((a,b)=>a+(b.done||0),0)+todayDone2;
    const lifeTotal2=Object.values(ph).reduce((a,b)=>a+(b.total||0),0)+todayTotal2;
    html+=`<div class="accordion-body">
      <div class="prod-stat-row">
        <div class="prod-stat-card"><div class="prod-stat-val">${todayDone2}/${todayTotal2}</div><div class="prod-stat-label">Selesai Hari Ini</div></div>
        <div class="prod-stat-card"><div class="prod-stat-val">${w7Done}</div><div class="prod-stat-label">Selesai 7 Hari</div></div>
      </div>
      <div class="prod-stat-row">
        <div class="prod-stat-card"><div class="prod-stat-val">${lifeDone2}</div><div class="prod-stat-label">Total Lifetime</div></div>
        <div class="prod-stat-card"><div class="prod-stat-val">${w7Total>0?Math.round((w7Done/w7Total)*100):0}%</div><div class="prod-stat-label">Completion 7 Hari</div></div>
      </div>`;
    const allProdKeys=[td2,...Object.keys(ph).sort().reverse()].filter((v,i,a)=>a.indexOf(v)===i).slice(0,7);
    allProdKeys.forEach(k=>{
      const done=k===td2?todayDone2:(ph[k]?.done||0);
      const total=k===td2?todayTotal2:(ph[k]?.total||0);
      const pct=total>0?Math.round((done/total)*100):0;
      const col=pct>=80?'var(--green)':pct>=50?'var(--orange)':'var(--text-3)';
      html+=`<div class="history-row">
        <div class="history-date" style="white-space:pre;font-size:11px">${fmtDate(k)}</div>
        <div class="history-bars"><div class="history-bar-wrap"><div class="history-bar" style="width:${pct}%;background:${col}"></div></div></div>
        <div class="history-vals"><div class="history-pct" style="color:${col}">${done}/${total}</div></div>
      </div>`;
    });
    html+=`</div>`;
  }

  // Reading accordion
  const ra=state.statsAccordion==='reading';
  html+=`<button class="accordion-btn ${ra?'open':''}" onclick="toggleStatsAccordion('reading')">
    <span>📚 Reading</span><span>${ra?'▲':'▼'}</span>
  </button>`;
  if(ra){
    const books2=state.books||[];
    const finished2=books2.filter(b=>b.finished);
    const active2=books2.filter(b=>!b.finished);
    const totalPagesRead2=books2.reduce((a,b)=>a+(b.sessions||[]).reduce((x,s)=>x+s.pages,0),0);
    html+=`<div class="accordion-body">
      <div class="prod-stat-row">
        <div class="prod-stat-card"><div class="prod-stat-val">${active2.length}</div><div class="prod-stat-label">📖 Buku Aktif</div></div>
        <div class="prod-stat-card"><div class="prod-stat-val">${finished2.length}</div><div class="prod-stat-label">✅ Buku Selesai</div></div>
      </div>
      <div class="prod-stat-row">
        <div class="prod-stat-card"><div class="prod-stat-val">${totalPagesRead2}</div><div class="prod-stat-label">📄 Total Halaman</div></div>
      </div>`;
    if(finished2.length>0){
      html+=`<div style="font-size:12px;font-weight:700;color:var(--text-2);margin:8px 0 6px">📚 Buku Selesai</div>`;
      finished2.forEach(b=>{
        html+=`<div class="book-stat-item">
          <div class="book-stat-cover" style="background:var(--green-bg)">✅</div>
          <div><div class="book-stat-title">${escHtml(b.title)}</div>
          <div class="book-stat-meta">${b.totalPages} hal • ${b.finishedDate||'-'}</div></div>
        </div>`;
      });
    }
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
    if(books2.length===0) html+=`<div style="text-align:center;padding:20px;color:var(--text-3);font-size:13px">Belum ada buku. Tambah via tombol 📚!</div>`;
    html+=`</div>`;
  }

    // Suplemen
  html+=`<div class="section-label">💊 Suplemen</div>`;
  SUPLEMEN.forEach(s=>{
    html+=`<div class="suplemen-item">
      <div class="suplemen-icon" style="background:${s.bg}">${s.icon}</div>
      <div style="flex:1"><div class="suplemen-name">${s.name}</div><div class="suplemen-when">⏰ ${s.when}</div>
      <div class="suplemen-desc" style="margin-top:3px">${s.desc}</div>
      <div style="margin-top:4px;font-size:11px;color:var(--primary);font-weight:600">💡 ${s.tips}</div></div>
    </div>`;
  });

  html+=`<div class="section-label">⚙️ Pengaturan</div>
  <div class="card"><div class="card-body">
    <p style="font-size:13px;font-weight:600;margin-bottom:8px">Nama kamu</p>
    <input class="input-field" id="nameInput" type="text" placeholder="Nama kamu..." value="${state.userName}" maxlength="20">
    <div style="display:flex;gap:8px">
      <button class="btn btn-primary" onclick="saveName()" style="flex:1">Simpan</button>
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

  html+=`<div class="install-hint">
    <strong>📱 Install di iPhone</strong>
    1. Upload folder ini ke hosting HTTPS seperti GitHub Pages, Netlify, Vercel, atau Cloudflare Pages<br>
    2. Buka link dari <strong>Safari</strong> → tap ikon <strong>Share</strong><br>
    3. Pilih <strong>"Add to Home Screen"</strong> → tap <strong>Add</strong><br>
    4. Untuk offline mode, jangan buka sebagai file lokal <code>file://</code>; gunakan HTTPS.
  </div>`;
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

function renderBookDetail(bookId){
  const b=(state.books||[]).find(x=>x.id===bookId);
  if(!b) return '<p>Buku tidak ditemukan.</p>';
  const pct=Math.round((b.currentPage/b.totalPages)*100);
  const remaining=b.totalPages-b.currentPage;
  // Pages read per session history
  const sessions=b.sessions||[];
  const totalRead=sessions.reduce((a,s)=>a+s.pages,0);
  const avgPerSession=sessions.length>0?(totalRead/sessions.length).toFixed(1):0;

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
  </div>
  <div style="display:flex;gap:8px;margin-bottom:16px">
    <button class="btn btn-ghost btn-sm" style="flex:1" onclick="finishBook('${b.id}')">✅ Tandai Selesai</button>
    <button class="btn btn-danger btn-sm" style="flex:1" onclick="deleteBook('${b.id}')">🗑️ Hapus</button>
  </div>
  <div style="font-size:13px;font-weight:700;margin-bottom:8px;color:var(--text-2)">Statistik Baca</div>
  <div class="prod-stat-row">
    <div class="prod-stat-card"><div class="prod-stat-val">${sessions.length}</div><div class="prod-stat-label">Sesi Baca</div></div>
    <div class="prod-stat-card"><div class="prod-stat-val">${avgPerSession}</div><div class="prod-stat-label">Rata-rata Hal/Sesi</div></div>
  </div>`;

  if(sessions.length>0){
    html+=`<div class="card"><div class="card-body">`;
    sessions.slice(-7).reverse().forEach(s=>{
      html+=`<div class="history-row">
        <div class="history-date" style="font-size:11px">${s.date}</div>
        <div style="flex:1;margin:0 10px;font-size:13px;color:var(--text-2)">Hal ${s.from} → ${s.to}</div>
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
  const totalPagesRead=(state.books||[]).reduce((a,b)=>{
    const sessions=b.sessions||[];
    return a+sessions.reduce((x,s)=>x+s.pages,0);
  },0);

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
        if(state.checked[today][idx]) state.waterHistory[today]=Math.min(WATER_GLASSES,(state.waterHistory[today]||0)+task.water);
        else state.waterHistory[today]=Math.max(0,(state.waterHistory[today]||0)-task.water);
      }
      state.history[today]=progressPct();
      recalcStreak();
      if(progressPct()===100) showToast('🎉 Semua task selesai! Luar biasa!');
      saveState();render();
    });
  });

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
  const today=todayKey();
  if(!state.waterHistory) state.waterHistory={};
  const cur=state.waterHistory[today]||0;
  state.waterHistory[today]=idx<cur?idx:idx+1;
  const liters=(state.waterHistory[today]*WATER_GLASS).toFixed(2);
  if(state.waterHistory[today]>=WATER_GLASSES) showToast('🎉 Target 2.5L tercapai!');
  else showToast('💧 '+liters+'L / '+WATER_TARGET+'L');
  saveState();render();
}

// Rokok
function toggleRokokPopup(){
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
  const newPage=parseInt(document.getElementById('pageUpdateInput')?.value);
  if(isNaN(newPage)||newPage<0||newPage>b.totalPages){showToast('❌ Halaman tidak valid!');return;}
  if(newPage>b.currentPage){
    const pages=newPage-b.currentPage;
    b.sessions.push({date:todayKey(),from:b.currentPage,to:newPage,pages});
    showToast('📖 +'+pages+' halaman dibaca!');
  }
  b.currentPage=newPage;
  if(newPage>=b.totalPages){
    b.finished=true;b.finishedDate=todayKey();
    showToast('🎉 Buku selesai! Keren banget!');
    state.activeBookId=null;
  }
  saveState();updateFloats();refreshBookPopup();
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
  if(state.todayTasks[i]) state.todayTasks[i].done=!state.todayTasks[i].done;
  saveState();render();
}
function deleteTodayTask(i){
  state.todayTasks.splice(i,1);saveState();render();
}
function moveToIdea(i,from){
  const t=from==='today'?state.todayTasks[i]:state.tomorrowTasks[i];
  if(!t) return;
  if(!state.ideas) state.ideas=[];
  state.ideas.push({id:'idea_'+Date.now(),text:t.text,detail:t.detail||'',createdAt:todayKey()});
  if(from==='today') state.todayTasks.splice(i,1);
  else state.tomorrowTasks.splice(i,1);
  saveState();render();showToast('💡 Dipindah ke Ide!');
}
function moveTomorrowToToday(i){
  const t=state.tomorrowTasks[i];if(!t) return;
  if(!state.todayTasks) state.todayTasks=[];
  state.todayTasks.push({...t,done:false});
  state.tomorrowTasks.splice(i,1);saveState();render();showToast('📌 Dipindah ke Hari Ini!');
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
  const t=state.ideas[i];if(!t) return;
  if(!state.todayTasks) state.todayTasks=[];
  state.todayTasks.push({id:'t_'+Date.now(),text:t.text,done:false,detail:t.detail||'',createdAt:todayKey()});
  state.ideas.splice(i,1);saveState();render();showToast('📌 Dipindah ke Hari Ini!');
}
function moveIdeaToTomorrow(i){
  const t=state.ideas[i];if(!t) return;
  if(!state.tomorrowTasks) state.tomorrowTasks=[];
  state.tomorrowTasks.push({id:'tm_'+Date.now(),text:t.text,done:false,dueDate:'',detail:t.detail||''});
  state.ideas.splice(i,1);saveState();render();showToast('🗓️ Dipindah ke Rencana!');
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
  if(!state.books) state.books=[];
  if(!state.ideas) state.ideas=[];
  if(!state.tomorrowTasks) state.tomorrowTasks=[];
  if(!state.todayTasks) state.todayTasks=[];
  if(!state.prodHistory) state.prodHistory={};
  if(!state.userName) state.userName='Bos';
  if(!state.lastBackupAt) state.lastBackupAt='';
  const today=todayKey();
  if(!state.checked[today]) state.checked[today]={};
  if(!state.rokokHistory[today]) state.rokokHistory[today]=0;
  if(!state.waterHistory[today]) state.waterHistory[today]=0;
}
function exportBackup(){
  try{
    const exportedAt=new Date().toISOString();
    state.lastBackupAt=exportedAt;
    const payload={
      app:'Kos Produktif',
      version:6,
      storageKey:'kosProduktif5',
      exportedAt,
      data:cloneState()
    };
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=`kos-produktif-backup-${todayKey()}.json`;
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
    if(!payload||payload.app!=='Kos Produktif'||!payload.data||typeof payload.data!=='object'){
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
function toggleStatsAccordion(key){
  state.statsAccordion=state.statsAccordion===key?'':key;
  render();
}
function loadMoreHistory(){state.historyShown=(state.historyShown||7)+5;render();}
function resetHistoryShown(){state.historyShown=7;render();}

function saveName(){
  const v=document.getElementById('nameInput')?.value.trim();
  if(v){state.userName=v;saveState();render();showToast('✅ Nama tersimpan!');}
}
function resetToday(){
  if(!confirm('Reset checklist & air hari ini?')) return;
  const t=todayKey();
  state.checked[t]={};state.history[t]=0;state.waterHistory[t]=0;
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
  state.rokokHistory={};state.waterHistory={};state.books=[];
  state.todayTasks=[];state.tomorrowTasks=[];state.ideas=[];state.prodHistory={};state.lastBackupAt='';
  saveState();closeConfirm();render();showToast('🗑️ Semua data dihapus');
}

function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
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
