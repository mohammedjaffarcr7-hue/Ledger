(function(){
const $ = id => document.getElementById(id);
const $$ = s => [...document.querySelectorAll(s)];

/* ---------- language ---------- */
const I18N = {
  en:{
    signInH:"Welcome back", signInSub:"Sign in to your ledger.", signUpH:"Create your account", signUpSub:"Your own private ledger, on any phone.",
    resetH:"Reset password", resetSub:"We'll email you a link to choose a new password.",
    signInBtn:"Sign in", signUpBtn:"Create account", resetBtn:"Send reset link", noAccount:"New here? Create an account", haveAccount:"Already have an account? Sign in",
    forgot:"Forgot password?", email:"Email", password:"Password", fullName:"Full name", tryDemo:"Try the demo",
    errEmail:"Enter a valid email address.", errPass:"Password must be at least 6 characters.", errFull:"Enter your name.",
    errLogin:"Wrong email or password.", errExists:"This email already has an account. Sign in instead.", errConfirm:"Confirm your email first. Check your inbox.",
    errDisabled:"This account has been disabled. Contact the administrator.", checkEmail:"Check your email to confirm your account, then sign in.",
    resetSent:"If that email has an account, a reset link is on its way.", noConfig:"The app isn't connected to its server yet. Add your Supabase keys in config.js.",
    myAccount:"My account", signOut:"Sign out", backOffice:"Open back office", language:"Language", saveName:"Save name",
    changePass:"Change password", newPass:"New password", setPass:"Set password", passChanged:"Password changed",
    dqToday:"Today", dqYest:"Yesterday", customCat:"Custom", customCatPh:"Type a category…",
    totalBalance:"Total balance", monthNet:"{v} this month", gm:"Good morning", ga:"Good afternoon", ge:"Good evening",
    debts:"Debts", debtsSub:"Who owes you, and whom you owe.", newDebtBtn:"+ New debt", people:"People", viewAll:"View all →",
    owedToYou:"Owed to you", youOweTotal:"You owe", owesYou:"Owes you", youOwe:"You owe", settled:"All settled",
    noPeople:"No one yet. Tap “+ New debt” to record money you lent or borrowed.", noDebts:"No debts recorded.",
    t_debt:"Debt", d_lent:"I lent", d_borrowed:"I borrowed", d_collected:"They paid me back", d_repaid:"I paid back",
    person:"Person", personNewPh:"Name, e.g. Ali…", newPersonOpt:"+ New person…", noCash:"None, just record the debt",
    paidFrom:"Paid from (optional)", receivedInto:"Received into (optional)", add_debt:"Save debt", save_debt:"Save debt",
    errPerson:"Choose a person or type a new name.",
    title_lent:"Lent to {n}", title_borrowed:"Borrowed from {n}", title_collected:"{n} paid you back", title_repaid:"Paid back {n}",
    backPeople:"← All people", theyPaid:"They paid me back", iPaid:"I paid them back", newDebt:"New debt", what:"What",
    noDebtTx:"Nothing recorded with this person yet.", debtBalHint:"Plus means they owe you. Minus means you owe them.",
    newPerson:"New person", editPerson:"Edit person", personName:"Name", addPerson:"Add person", savePerson:"Save",
    personAdded:"Person added", personSaved:"Saved", personDeleted:"Person deleted", deletedPerson:"Deleted person",
    errPersonHas:n=>`This person has ${n} ${n===1?"record":"records"}. Delete them first.`, editPersonBtn:"Rename",
    noCashShort:"No cash moved",
    sections:"Sections", overview:"Overview", ledger:"Ledger", accounts:"Accounts", switchLang:"Switch language", langName:"العربية",
    newEntryBtn:"+ New entry", newEntry:"New entry", editEntry:"Edit entry", ovSub:"Your money across every account",
    thisMonth:"This month", month:"Month", prevMonth:"Previous month", nextMonth:"Next month",
    recent:"Recent activity", openLedger:"Open ledger →", manage:"Manage →", byCategory:"Spending by category",
    ledgerTitle:"Account ledger", ledgerSub:"Every transaction per account, with a running balance. Debit is money in, credit is money out.",
    export:"Export CSV", account:"Account", from:"From", to:"To", voucherType:"Voucher type", all:"All", search:"Search", searchPh:"Note, category or account…",
    r_month:"This month", r_last:"Last month", r_3m:"Last 3 months", r_year:"This year", r_all:"All time",
    accSub:"Cash, cards and digital wallets. Tap a card to see its ledger.", addAccountBtn:"+ Add account", addAccount:"Add account",
    close:"Close", entryType:"Entry type", t_income:"Income", t_expense:"Expense", t_transfer:"Transfer", t_exchange:"Exchange",
    youPay:"You pay", youReceive:"You receive", amount:"Amount", fromAccount:"From account", intoAccount:"Into account", toAccount:"To account",
    category:"Category", date:"Date", note:"Note", notePh:"Lunch at the cafeteria…", rate:"Rate", delete:"Delete", tapAgain:"Tap again to delete",
    add_expense:"Add expense", add_income:"Add income", add_transfer:"Add transfer", add_exchange:"Add exchange",
    save_expense:"Save expense", save_income:"Save income", save_transfer:"Save transfer", save_exchange:"Save exchange",
    amountReceivedIn:"Amount received in {name} ({cur})", rateLbl:"Rate · <bdi dir=\"ltr\">1 {one} = ? {per}</bdi>",
    rateHintEmpty:"Type the rate or the amount you receive. The other fills in.", rateHint:"You pay <bdi dir=\"ltr\">{pay} {pc}</bdi> and receive <bdi dir=\"ltr\">{recv} {rc}</bdi>.",
    quickAdd:"Quick add", newAccount:"New account", editAccount:"Edit account", accName:"Account name", accNamePh:"e.g. Bank account…", type:"Type", currency:"Currency",
    openingBal:"Opening balance", openingHint:"What the account held before you started recording here.", createAccount:"Create account", saveAccount:"Save account", viewLedger:"View ledger",
    loading:"Loading…", loadingLedger:"Loading your ledger…", noAccounts:"No accounts yet", addFirst:"+ Add your first account", totalIn:"Total in {cur}",
    nAccounts:n=>n===1?"1 account":`${n} accounts`, colCurrency:"Currency", colIncome:"Income", colSpent:"Spent", colNet:"Net", addAcctToStart:"Add an account to start.",
    openLedgerTitle:"Open ledger", noExpenses:"No expenses in {month}.", nothingYet:"Nothing recorded yet. Tap “+ New entry” to add your first expense or income.",
    theStart:"the start", today:"today", rangeTxt:"{from} to {to}", editAcctBtn:"Edit account", opening:"Opening", closing:"Closing", debitIn:"Debit · in", creditOut:"Credit · out",
    postingDate:"Posting date", voucher:"Voucher", against:"Against", remarks:"Remarks", debit:"Debit", credit:"Credit", balance:"Balance",
    openingBalance:"Opening balance", closingBalance:"Closing balance", total:"Total", filtered:" (filtered)",
    noTx:"No transactions in this period.", noTxF:"No transactions in this period with these filters.", addAcctForLedger:"Add an account to see its ledger.",
    allAccounts:"All accounts, one by one", ledgerBtn:"Ledger", edit:"Edit", totalSuffix:"total",
    incomeDot:"Income · {c}", expenseDot:"Expense · {c}", deletedAccount:"Deleted account", exchangeTitle:"Exchange {a} → {b}", arrow:"→",
    errNoAcct:"Add an account first, then record entries into it.", errAmount:"Enter an amount greater than zero.", errChoose:"Choose an account.",
    errExAccts:"Pick the account you pay from and a different account you receive into.", errExAmt:"Enter how much {cur} you received, or the rate.",
    errTrAccts:"Pick two different accounts for a transfer.", errTrAmt:"Enter how much {cur} arrived in {name}.",
    entryAdded:"Entry added", entryUpdated:"Entry updated", entryDeleted:"Entry deleted",
    errName:"Give the account a name.", errOpening:"Opening balance must be a number.", errCur:"This account already has entries, so its currency can't change.",
    errHasEntries:n=>`This account has ${n} ${n===1?"entry":"entries"}. Delete or move them first.`,
    acctCreated:"Account created", acctSaved:"Account saved", acctDeleted:"Account deleted",
    errQuota:"Storage is full. Export your data and delete old entries to make room.", errPerm:"You don't have permission to change this ledger.", errNet:"Couldn't save. Check your connection and try again.",
    noExport:"Export isn't available in this view", exportFail:"Export didn't complete",
    demo:"Preview with example figures. Nothing you enter here is saved.", unavailable:"This ledger isn't available to you right now.", lost:"Lost the connection to your ledger. Reload the page to reconnect."
  },
  ar:{
    signInH:"أهلاً بعودتك", signInSub:"سجّل الدخول إلى دفترك.", signUpH:"أنشئ حسابك", signUpSub:"دفترك الخاص، على أي هاتف.",
    resetH:"إعادة تعيين كلمة المرور", resetSub:"سنرسل لك رابطاً لاختيار كلمة مرور جديدة.",
    signInBtn:"تسجيل الدخول", signUpBtn:"إنشاء الحساب", resetBtn:"إرسال الرابط", noAccount:"جديد هنا؟ أنشئ حساباً", haveAccount:"لديك حساب؟ سجّل الدخول",
    forgot:"نسيت كلمة المرور؟", email:"البريد الإلكتروني", password:"كلمة المرور", fullName:"الاسم الكامل", tryDemo:"جرّب النسخة التجريبية",
    errEmail:"أدخل بريداً إلكترونياً صحيحاً.", errPass:"يجب ألا تقل كلمة المرور عن 6 أحرف.", errFull:"اكتب اسمك.",
    errLogin:"البريد أو كلمة المرور غير صحيحة.", errExists:"لهذا البريد حساب مسبقاً. سجّل الدخول بدلاً من ذلك.", errConfirm:"أكّد بريدك الإلكتروني أولاً. تفقّد صندوق الوارد.",
    errDisabled:"تم إيقاف هذا الحساب. تواصل مع المسؤول.", checkEmail:"تفقّد بريدك لتأكيد الحساب، ثم سجّل الدخول.",
    resetSent:"إذا كان لهذا البريد حساب، فسيصلك رابط إعادة التعيين.", noConfig:"التطبيق غير متصل بالخادم بعد. أضف مفاتيح Supabase في config.js.",
    myAccount:"حسابي", signOut:"تسجيل الخروج", backOffice:"فتح لوحة الإدارة", language:"اللغة", saveName:"حفظ الاسم",
    changePass:"تغيير كلمة المرور", newPass:"كلمة المرور الجديدة", setPass:"تعيين", passChanged:"تم تغيير كلمة المرور",
    dqToday:"اليوم", dqYest:"أمس", customCat:"فئة أخرى", customCatPh:"اكتب اسم الفئة…",
    totalBalance:"الرصيد الكلي", monthNet:"{v} هذا الشهر", gm:"صباح الخير", ga:"مساء الخير", ge:"مساء الخير",
    debts:"الديون", debtsSub:"من يدين لك، ولمن أنت مدين.", newDebtBtn:"+ دين جديد", people:"الأشخاص", viewAll:"عرض الكل ←",
    owedToYou:"لك عند الآخرين", youOweTotal:"عليك للآخرين", owesYou:"يدين لك بـ", youOwe:"أنت مدين له بـ", settled:"لا ديون",
    noPeople:"لا يوجد أحد بعد. اضغط «+ دين جديد» لتسجيل مال أقرضته أو اقترضته.", noDebts:"لا توجد ديون مسجّلة.",
    t_debt:"دين", d_lent:"أقرضت", d_borrowed:"اقترضت", d_collected:"سدّد لي", d_repaid:"سدّدت له",
    person:"الشخص", personNewPh:"الاسم، مثلاً علي…", newPersonOpt:"+ شخص جديد…", noCash:"لا شيء، سجّل الدين فقط",
    paidFrom:"دُفع من (اختياري)", receivedInto:"استُلم في (اختياري)", add_debt:"حفظ الدين", save_debt:"حفظ الدين",
    errPerson:"اختر شخصاً أو اكتب اسماً جديداً.",
    title_lent:"إقراض {n}", title_borrowed:"اقتراض من {n}", title_collected:"{n} سدّد لك", title_repaid:"سداد لـ {n}",
    backPeople:"→ كل الأشخاص", theyPaid:"سدّد لي", iPaid:"سدّدت له", newDebt:"دين جديد", what:"الحركة",
    noDebtTx:"لا توجد حركات مع هذا الشخص بعد.", debtBalHint:"الموجب يعني أنه مدين لك، والسالب يعني أنك مدين له.",
    newPerson:"شخص جديد", editPerson:"تعديل الشخص", personName:"الاسم", addPerson:"إضافة الشخص", savePerson:"حفظ",
    personAdded:"تمت إضافة الشخص", personSaved:"تم الحفظ", personDeleted:"تم حذف الشخص", deletedPerson:"شخص محذوف",
    errPersonHas:n=>`لهذا الشخص ${n} ${n===1?"حركة":"حركات"}. احذفها أولاً.`, editPersonBtn:"تعديل الاسم",
    noCashShort:"بدون حركة نقدية",
    sections:"الأقسام", overview:"نظرة عامة", ledger:"دفتر الأستاذ", accounts:"الحسابات", switchLang:"تغيير اللغة", langName:"English",
    newEntryBtn:"+ قيد جديد", newEntry:"قيد جديد", editEntry:"تعديل القيد", ovSub:"أموالك في جميع الحسابات",
    thisMonth:"هذا الشهر", month:"الشهر", prevMonth:"الشهر السابق", nextMonth:"الشهر التالي",
    recent:"آخر الحركات", openLedger:"فتح دفتر الأستاذ ←", manage:"إدارة ←", byCategory:"المصروفات حسب الفئة",
    ledgerTitle:"دفتر أستاذ الحساب", ledgerSub:"كل حركة في كل حساب مع الرصيد الجاري. المدين هو المال الداخل، والدائن هو المال الخارج.",
    export:"تصدير CSV", account:"الحساب", from:"من", to:"إلى", voucherType:"نوع السند", all:"الكل", search:"بحث", searchPh:"ملاحظة أو فئة أو حساب…",
    r_month:"هذا الشهر", r_last:"الشهر الماضي", r_3m:"آخر 3 أشهر", r_year:"هذه السنة", r_all:"كل الفترات",
    accSub:"النقد والبطاقات والمحافظ الرقمية. اضغط على أي بطاقة لعرض دفترها.", addAccountBtn:"+ إضافة حساب", addAccount:"إضافة حساب",
    close:"إغلاق", entryType:"نوع القيد", t_income:"دخل", t_expense:"مصروف", t_transfer:"تحويل", t_exchange:"صرف عملة",
    youPay:"تدفع", youReceive:"تستلم", amount:"المبلغ", fromAccount:"من حساب", intoAccount:"إلى حساب", toAccount:"إلى حساب",
    category:"الفئة", date:"التاريخ", note:"ملاحظة", notePh:"غداء في كافتيريا الكلية…", rate:"السعر", delete:"حذف", tapAgain:"اضغط مرة أخرى للحذف",
    add_expense:"إضافة مصروف", add_income:"إضافة دخل", add_transfer:"إضافة تحويل", add_exchange:"إضافة صرف",
    save_expense:"حفظ المصروف", save_income:"حفظ الدخل", save_transfer:"حفظ التحويل", save_exchange:"حفظ الصرف",
    amountReceivedIn:"المبلغ المستلم في {name} ({cur})", rateLbl:"السعر · <bdi dir=\"ltr\">1 {one} = ? {per}</bdi>",
    rateHintEmpty:"اكتب السعر أو المبلغ الذي استلمته، والآخر يُحسب تلقائياً.", rateHint:"تدفع <bdi dir=\"ltr\">{pay} {pc}</bdi> وتستلم <bdi dir=\"ltr\">{recv} {rc}</bdi>.",
    quickAdd:"إضافة سريعة", newAccount:"حساب جديد", editAccount:"تعديل الحساب", accName:"اسم الحساب", accNamePh:"حساب مصرفي", type:"النوع", currency:"العملة",
    openingBal:"الرصيد الافتتاحي", openingHint:"المبلغ الموجود في الحساب قبل أن تبدأ التسجيل هنا.", createAccount:"إنشاء الحساب", saveAccount:"حفظ الحساب", viewLedger:"عرض دفتر الأستاذ",
    loading:"جارٍ التحميل…", loadingLedger:"جارٍ تحميل دفترك…", noAccounts:"لا توجد حسابات بعد", addFirst:"+ أضف أول حساب", totalIn:"المجموع بـ {cur}",
    nAccounts:n=>n===1?"حساب واحد":n===2?"حسابان":n<=10?`${n} حسابات`:`${n} حساباً`, colCurrency:"العملة", colIncome:"الدخل", colSpent:"المصروف", colNet:"الصافي", addAcctToStart:"أضف حساباً للبدء.",
    openLedgerTitle:"فتح دفتر الأستاذ", noExpenses:"لا توجد مصروفات في {month}.", nothingYet:"لم تُسجَّل أي حركة بعد. اضغط «+ قيد جديد» لإضافة أول مصروف أو دخل.",
    theStart:"البداية", today:"اليوم", rangeTxt:"من {from} إلى {to}", editAcctBtn:"تعديل الحساب", opening:"افتتاحي", closing:"ختامي", debitIn:"مدين · داخل", creditOut:"دائن · خارج",
    postingDate:"تاريخ القيد", voucher:"السند", against:"الحساب المقابل", remarks:"ملاحظات", debit:"مدين", credit:"دائن", balance:"الرصيد",
    openingBalance:"رصيد افتتاحي", closingBalance:"رصيد ختامي", total:"المجموع", filtered:" (مع التصفية)",
    noTx:"لا توجد حركات في هذه الفترة.", noTxF:"لا توجد حركات تطابق هذه التصفية.", addAcctForLedger:"أضف حساباً لعرض دفتره.",
    allAccounts:"جميع الحسابات، واحداً تلو الآخر", ledgerBtn:"الدفتر", edit:"تعديل", totalSuffix:"المجموع",
    incomeDot:"دخل · {c}", expenseDot:"مصروف · {c}", deletedAccount:"حساب محذوف", exchangeTitle:"صرف {a} إلى {b}", arrow:"←",
    errNoAcct:"أضف حساباً أولاً ثم سجّل القيود فيه.", errAmount:"أدخل مبلغاً أكبر من صفر.", errChoose:"اختر حساباً.",
    errExAccts:"اختر الحساب الذي تدفع منه وحساباً آخر تستلم فيه.", errExAmt:"أدخل كم {cur} استلمت، أو اكتب السعر.",
    errTrAccts:"اختر حسابين مختلفين للتحويل.", errTrAmt:"أدخل كم {cur} وصل إلى {name}.",
    entryAdded:"تمت إضافة القيد", entryUpdated:"تم تحديث القيد", entryDeleted:"تم حذف القيد",
    errName:"اكتب اسماً للحساب.", errOpening:"يجب أن يكون الرصيد الافتتاحي رقماً.", errCur:"لهذا الحساب قيود، لذلك لا يمكن تغيير عملته.",
    errHasEntries:n=>`لهذا الحساب ${n} ${n===1?"قيد":"قيود"}. احذفها أو انقلها أولاً.`,
    acctCreated:"تم إنشاء الحساب", acctSaved:"تم حفظ الحساب", acctDeleted:"تم حذف الحساب",
    errQuota:"المساحة ممتلئة. صدّر بياناتك واحذف القيود القديمة.", errPerm:"ليست لديك صلاحية لتعديل هذا الدفتر.", errNet:"تعذّر الحفظ. تحقق من الاتصال وحاول مرة أخرى.",
    noExport:"التصدير غير متاح هنا", exportFail:"لم يكتمل التصدير",
    demo:"معاينة بأرقام تجريبية. لن يُحفظ أي شيء تدخله هنا.", unavailable:"هذا الدفتر غير متاح لك حالياً.", lost:"انقطع الاتصال بدفترك. أعد تحميل الصفحة."
  }
};
const CAT_AR = {"Food":"طعام","Groceries":"بقالة","Transport":"مواصلات","Rent":"إيجار","Bills":"فواتير","Phone & Internet":"هاتف وإنترنت","University":"الجامعة","Books & Supplies":"كتب ومستلزمات","Health":"صحة","Gym":"نادي رياضي","Clothes":"ملابس","Shopping":"تسوق","Entertainment":"ترفيه","Family":"عائلة","Gifts":"هدايا","Subscriptions":"اشتراكات","Other":"أخرى","Salary":"راتب","Allowance":"مصروف شهري","Freelance":"عمل حر","Gift":"هدية","Refund":"استرداد","Scholarship":"منحة","Opening balance":"رصيد افتتاحي","Transfer":"تحويل","Exchange":"صرف عملة","Debt":"دين"};
const KIND_AR = {"Cash":"نقد","Bank card":"بطاقة مصرفية","Prepaid card":"بطاقة مسبقة الدفع","Digital wallet":"محفظة رقمية","Savings":"ادخار","Other":"أخرى"};
let LANG = "en";
try{ const s=localStorage.getItem("daftar.lang"); if(s==="ar"||s==="en") LANG=s; }catch(e){}
function t(k,vars){
  let v = I18N[LANG][k]; if(v===undefined) v=I18N.en[k]; if(v===undefined) return k;
  if(typeof v==="function") return v(vars);
  if(vars) v=v.replace(/\{(\w+)\}/g,(m,n)=>vars[n]??m);
  return v;
}
function catLabel(c){ c=c||"Other"; return LANG==="ar" ? (CAT_AR[c]||c) : c; }
function catKey(input){ const v=input.trim(); for(const [en,ar] of Object.entries(CAT_AR)) if(ar===v) return en; return v; }
function kindLabel(k){ return LANG==="ar" ? (KIND_AR[k]||k) : k; }
function typeLabel(ty){ return t("t_"+ty); }
function locale(){ return LANG==="ar" ? "ar-IQ-u-nu-latn" : "en-GB"; }
function bdi(s){ return `<bdi>${esc(s)}</bdi>`; }

const CATS = {
  expense:["Food","Groceries","Transport","Rent","Bills","Phone & Internet","University","Books & Supplies","Health","Gym","Clothes","Shopping","Entertainment","Family","Gifts","Subscriptions","Other"],
  income:["Salary","Allowance","Freelance","Gift","Refund","Scholarship","Opening balance","Other"]
};
const DEC = {IQD:0, USD:2, GBP:2, EUR:2, TRY:2, AED:2};
const CUR_ORDER = ["IQD","USD","GBP","EUR","TRY","AED"];
const PRESETS = [
  {en:"Cash wallet", ar:"محفظة نقدية", kind:"Cash", currency:"IQD"},
  {en:"Dollar cash", ar:"نقد بالدولار", kind:"Cash", currency:"USD"},
  {en:"Pound cash", ar:"نقد بالباوند", kind:"Cash", currency:"GBP"},
  {en:"Qi Card", ar:"Qi Card", kind:"Prepaid card", currency:"IQD"},
  {en:"RTB card", ar:"RTB card", kind:"Bank card", currency:"IQD"},
  {en:"Apple Account balance", ar:"رصيد حساب Apple", kind:"Digital wallet", currency:"USD"},
  {en:"Google Play balance", ar:"رصيد Google Play", kind:"Digital wallet", currency:"USD"},
  {en:"ZainCash", ar:"زين كاش", kind:"Digital wallet", currency:"IQD"},
  {en:"FIB", ar:"FIB", kind:"Bank card", currency:"IQD"},
  {en:"Savings box", ar:"حصالة التوفير", kind:"Savings", currency:"IQD"}
];
const ICONS = {
  "k-cash":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>',
  "k-bank":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/></svg>',
  "k-prepaid":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M7 9.5h3v3H7zM14 15h3.5"/></svg>',
  "k-wallet":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
  "k-savings":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M2.5 10 12 4l9.5 6M10 14h4"/></svg>',
  "k-other":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>'
};
const TYPE_EN = {income:"Income", expense:"Expense", transfer:"Transfer", exchange:"Exchange", debt:"Debt"};
const SHEETS = ["entrySheet","acctSheet","personSheet","meSheet"];
// Effect of a debt record on what a person owes you (+) or you owe them (−).
function debtDelta(e){ const a=+e.amount||0; return {lent:a, repaid:a, borrowed:-a, collected:-a}[e.dir]||0; }
// Cash effect on the account: lending and repaying take money out; borrowing and being repaid bring it in.
function debtCashIn(e){ return e.dir==="borrowed"||e.dir==="collected"; }

let authMode="in";
const S = {
  accounts:[], entries:[], view:"overview", month:ym(new Date()), type:"expense", editId:null, editAcct:null,
  accReady:false, entReady:false, demo:false, lastAcct:"", banner:"",
  people:[], pplReady:false, person:null, dir:"lent", editPerson:null,
  hcur:null,
  led:{acct:"", from:"", to:"", range:"month", type:"", q:""}
};

/* ---------- helpers ---------- */
function ym(d){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0"); }
function ymd(d){ return ym(d)+"-"+String(d.getDate()).padStart(2,"0"); }
function today(){ return ymd(new Date()); }
function uid(){ return Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,8); }
function esc(s){ return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function parseAmt(v){ const n=parseFloat(String(v).replace(/[,\s٬]/g,"").replace(/٫/g,".").replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d))); return isFinite(n)?n:NaN; }
function nfmt(n,cur){ const d=DEC[cur]??2; return new Intl.NumberFormat("en-US",{minimumFractionDigits:d,maximumFractionDigits:d}).format(Math.abs(n)); }
function fmt(n,cur,sign){
  const p = sign ? (n>0?"+":n<0?"−":"") : (n<0?"−":"");
  return `<span class="money" dir="ltr"><span class="num">${p}${nfmt(n,cur)}</span><small class="cur">${esc(cur)}</small></span>`;
}
function nnum(n,cur){ return `<span dir="ltr">${n<0?"−":""}${nfmt(n,cur)}</span>`; }
function monthName(m){ const [y,mo]=m.split("-").map(Number); return new Date(y,mo-1,1).toLocaleDateString(locale(),{month:"long",year:"numeric"}); }
function shiftMonth(m,k){ const [y,mo]=m.split("-").map(Number); return ym(new Date(y,mo-1+k,1)); }
function dshort(s){ return new Date(s+"T00:00:00").toLocaleDateString(locale(),{day:"numeric",month:"short",year:"numeric"}); }
function acctById(id){ return S.accounts.find(a=>a.id===id); }
function acctName(id){ return acctById(id)?.name || t("deletedAccount"); }
function sortedAccounts(){ return [...S.accounts].sort((a,b)=>(a.createdAt||0)-(b.createdAt||0)); }
function kindClass(k){
  k=(k||"").toLowerCase();
  if(k.startsWith("cash")) return "k-cash";
  if(k.includes("prepaid")) return "k-prepaid";
  if(k.includes("bank")||k==="card") return "k-bank";
  if(k.includes("wallet")) return "k-wallet";
  if(k.includes("saving")) return "k-savings";
  return "k-other";
}
const TX_ICONS={
  expense:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>',
  income:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 7 7 17M15 17H7V9"/></svg>',
  transfer:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h14l-3-3M20 16H6l3 3"/></svg>',
  exchange:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="4.5"/><circle cx="16" cy="16" r="4.5"/></svg>',
  debt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.6"/><path d="M5 20c1-3.6 3.6-5.4 7-5.4s6 1.8 7 5.4"/></svg>'
};
function txIcon(type){ return `<span class="txi txi-${type}" aria-hidden="true">${TX_ICONS[type]||TX_ICONS.expense}</span>`; }
// Wallet-style account card; a full-size button opens the ledger, the small one edits.
function walletCard(a,bal,mini){
  const c=kindClass(a.kind), b=bal[a.id]||0;
  return `<div class="wcard ${c}${mini?" mini":""}">
    <button class="wc-hit" type="button" data-ledger="${esc(a.id)}" aria-label="${esc(a.name)}"></button>
    <div class="wc-top"><span class="wc-kind">${esc(kindLabel(a.kind))}</span><span class="wc-cur">${esc(a.currency)}</span></div>
    ${c==="k-bank"||c==="k-prepaid"?'<span class="wc-chip" aria-hidden="true"></span>':""}
    <div class="wc-bot"><div class="wc-name">${bdi(a.name)}</div><div class="wc-bal ${b<0?"neg":""}">${fmt(b,a.currency)}</div></div>
    ${mini?"":`<button class="wc-edit" type="button" data-editacct="${esc(a.id)}" aria-label="${esc(t("edit"))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg></button>`}
  </div>`;
}
function icon(kind){ const c=kindClass(kind); return `<span class="ico ${c}" aria-hidden="true">${ICONS[c]}</span>`; }
let toastT;
function toast(msg){ const el=$("toast"); el.textContent=msg; el.classList.add("on"); clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove("on"),2200); }

/* ---------- storage (Supabase) ---------- */
const CFG = window.DAFTAR_CONFIG || {};
const sb = (window.supabase && CFG.supabaseUrl && CFG.supabaseAnonKey && !/YOUR-/.test(CFG.supabaseUrl))
  ? window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey, {auth:{persistSession:true, autoRefreshToken:true, detectSessionInUrl:true}})
  : null;
let ME = null;      // {id, email, full_name, role}
const ACC_MAP = {id:"id", name:"name", kind:"kind", currency:"currency", opening:"opening", createdAt:"created_ms"};
const PPL_MAP = {id:"id", name:"name", createdAt:"created_ms"};
const ENT_MAP = {id:"id", type:"type", amount:"amount", account:"account", toAccount:"to_account", toAmount:"to_amount", category:"category",
  note:"note", date:"date", person:"person", dir:"dir", currency:"currency", createdAt:"created_ms"};
const NUMERIC = new Set(["amount","toAmount","opening","createdAt"]);
function toRow(map,id,data){ const r={id, user_id:ME.id}; for(const [k,c] of Object.entries(map)) if(k!=="id" && k in data) r[c]=data[k]??null; return r; }
function fromRow(map,r){ const o={}; for(const [k,c] of Object.entries(map)){ let v=r[c]; if(v==null){ if(k==="note"||k==="account") v=""; else continue; } o[k]=NUMERIC.has(k)?+v:v; } return o; }
async function must(q){ const {data,error}=await q; if(error) throw error; return data; }
async function fetchAll(table){
  const out=[]; const page=1000;
  for(let from=0;;from+=page){
    const rows=await must(sb.from(table).select("*").eq("user_id",ME.id).order("id").range(from,from+page-1));
    out.push(...rows); if(rows.length<page) break;
  }
  return out;
}
async function loadAll(){
  const [a,p,e]=await Promise.all([fetchAll("accounts"),fetchAll("people"),fetchAll("entries")]);
  S.accounts=a.map(r=>fromRow(ACC_MAP,r)); S.people=p.map(r=>fromRow(PPL_MAP,r)); S.entries=e.map(r=>fromRow(ENT_MAP,r));
  sortEntries(); S.accReady=S.entReady=S.pplReady=true; renderAll();
}
function local(list,id,data){ const i=S[list].findIndex(x=>x.id===id), row={id,...data}; if(i>=0) S[list][i]=row; else S[list].push(row); }
async function remote(fn){
  if(S.demo) return;
  try{ await fn(); }
  catch(e){ loadAll().catch(()=>{}); throw e; }
}
const store = {
  async setAccount(id,data){ local("accounts",id,data); renderAll(); await remote(()=>must(sb.from("accounts").upsert(toRow(ACC_MAP,id,data)))); },
  async delAccount(id){ S.accounts=S.accounts.filter(a=>a.id!==id); renderAll(); await remote(()=>must(sb.from("accounts").delete().eq("id",id))); },
  async setEntry(id,data){ local("entries",id,data); sortEntries(); renderAll(); await remote(()=>must(sb.from("entries").upsert(toRow(ENT_MAP,id,data)))); },
  async delEntry(id){ S.entries=S.entries.filter(e=>e.id!==id); renderAll(); await remote(()=>must(sb.from("entries").delete().eq("id",id))); },
  async setPerson(id,data){ local("people",id,data); renderAll(); await remote(()=>must(sb.from("people").upsert(toRow(PPL_MAP,id,data)))); },
  async delPerson(id){ S.people=S.people.filter(p=>p.id!==id); renderAll(); await remote(()=>must(sb.from("people").delete().eq("id",id))); }
};
function downloadFile(name, data, type){
  const url=URL.createObjectURL(data instanceof Blob?data:new Blob([data],{type}));
  const a=document.createElement("a"); a.href=url; a.download=name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),4000);
}
function sortEntries(){ S.entries.sort((a,b)=>(b.date||"").localeCompare(a.date||"") || (b.createdAt||0)-(a.createdAt||0)); }
function saveError(e){
  if(e?.code==="42501" || /row-level security|permission/i.test(e?.message||"")) return t("errPerm");
  return t("errNet");
}

/* ---------- accounting ---------- */
// Income recorded with the "Opening balance" category is a starting balance, not earnings.
function isOpening(e){ return e.type==="income" && /^opening/i.test(e.category||""); }
// Each entry becomes one or two ledger lines. Debit = money into the account, credit = money out.
function linesFor(e){
  const amt=+e.amount||0, out=[];
  if(e.type==="income") out.push({acct:e.account, dr:amt, cr:0, against:isOpening(e)?t("openingBalance"):t("incomeDot",{c:catLabel(e.category)})});
  else if(e.type==="expense") out.push({acct:e.account, dr:0, cr:amt, against:t("expenseDot",{c:catLabel(e.category)})});
  else if(e.type==="debt"){
    if(e.account) out.push({acct:e.account, dr:debtCashIn(e)?amt:0, cr:debtCashIn(e)?0:amt, against:`${personName(e.person)} · ${t("d_"+e.dir)}`});
  }
  else if(e.type==="transfer"||e.type==="exchange"){
    const recv = e.toAmount!=null ? +e.toAmount : amt;
    out.push({acct:e.account, dr:0, cr:amt, against:acctName(e.toAccount)});
    out.push({acct:e.toAccount, dr:recv, cr:0, against:acctName(e.account)});
  }
  return out;
}
function balances(){
  const b={}; S.accounts.forEach(a=>b[a.id]=+a.opening||0);
  for(const e of S.entries) for(const l of linesFor(e)) if(l.acct in b) b[l.acct]+=l.dr-l.cr;
  return b;
}
function currencies(){
  const seen=[...new Set(S.accounts.map(a=>a.currency))];
  const rank=c=>{const i=CUR_ORDER.indexOf(c); return i<0?99:i;};
  return seen.sort((a,b)=>rank(a)-rank(b)||a.localeCompare(b));
}
function curOf(e){ return acctById(e.account)?.currency || e.currency || "IQD"; }
function personById(id){ return S.people.find(p=>p.id===id); }
function personName(id){ return personById(id)?.name || t("deletedPerson"); }
function monthEntries(){ return S.entries.filter(e=>(e.date||"").startsWith(S.month)); }
function rateBase(pc,rc){ if(!pc||!rc||pc===rc) return null; if(pc==="IQD") return {one:rc,per:pc,inv:true}; return {one:pc,per:rc,inv:false}; }
function fmtRate(r){ const d=r>=100?2:r>=1?4:6; return new Intl.NumberFormat("en-US",{maximumFractionDigits:d}).format(r); }
function rateText(pay,pc,recv,rc){ const b=rateBase(pc,rc); if(!b||!(pay>0&&recv>0)) return ""; return `1 ${b.one} = ${fmtRate(b.inv?pay/recv:recv/pay)} ${b.per}`; }
function roundTo(n,c){ const d=DEC[c]??2, f=10**d; return Math.round(n*f)/f; }
function entryAmountHTML(e){
  const c=curOf(e);
  if(e.type==="debt"){
    if(!e.account) return fmt(+e.amount,c);
    return debtCashIn(e) ? `<span class="pos">${fmt(+e.amount,c,true)}</span>` : `<span class="neg">${fmt(-e.amount,c,true)}</span>`;
  }
  if(e.type==="income") return `<span class="pos">${fmt(+e.amount,c,true)}</span>`;
  if(e.type==="expense") return `<span class="neg">${fmt(-e.amount,c,true)}</span>`;
  const tc=acctById(e.toAccount)?.currency||c, recv=e.toAmount!=null?+e.toAmount:+e.amount;
  if(e.type==="exchange" || tc!==c) return `<span class="two"><span class="neg">${fmt(-e.amount,c,true)}</span><span class="pos">${fmt(recv,tc,true)}</span></span>`;
  return fmt(+e.amount,c);
}
function entryTitleHTML(e){
  if(e.type==="debt") return t("title_"+e.dir,{n:bdi(personName(e.person))});
  if(e.type==="exchange") return esc(t("exchangeTitle",{a:curOf(e), b:acctById(e.toAccount)?.currency||""}));
  if(e.type==="transfer") return esc(t("t_transfer"));
  return esc(catLabel(e.category));
}
function entrySubHTML(e){
  const parts=[];
  if(e.type==="debt") parts.push(e.account?bdi(acctName(e.account)):esc(t("noCashShort")));
  else if(e.type==="transfer"||e.type==="exchange") parts.push(`${bdi(acctName(e.account))} ${t("arrow")} ${bdi(acctName(e.toAccount))}`);
  else parts.push(bdi(acctName(e.account)));
  if(e.note) parts.push(bdi(e.note));
  return parts.join(" · ");
}

/* ---------- static text + direction ---------- */
function applyLang(){
  const r=document.documentElement;
  r.lang = LANG; r.dir = LANG==="ar" ? "rtl" : "ltr";
  $$("[data-i18n]").forEach(el=>el.textContent=t(el.dataset.i18n));
  $$("[data-i18n-ph]").forEach(el=>el.placeholder=t(el.dataset.i18nPh));
  $$("[data-i18n-aria]").forEach(el=>el.setAttribute("aria-label",t(el.dataset.i18nAria)));
  $("langLbl").textContent = t("langName");
  $("brandMain").textContent = LANG==="ar" ? "دفتر" : "Daftar";
  $("brandAlt").textContent = LANG==="ar" ? "Daftar" : "دفتر";
  [...$("aKind").options].forEach(o=>o.textContent=kindLabel(o.value));
  $$("[data-banner]").forEach(b=>{ b.textContent=S.banner?t(S.banner):""; b.hidden=!S.banner; });
  // refresh open forms
  setType(S.type);
  if(!$("entrySheet").hidden) $("entryH").textContent = S.editId?t("editEntry"):t("newEntry");
  if(!$("acctSheet").hidden){ const a=S.editAcct?acctById(S.editAcct):null; $("acctH").textContent=a?t("editAccount"):t("newAccount"); $("aSave").textContent=a?t("saveAccount"):t("createAccount"); if(!a) renderChips(); }
  if(!$("personSheet").hidden){ const p=S.editPerson?personById(S.editPerson):null; $("personH").textContent=p?t("editPerson"):t("newPerson"); $("pSave").textContent=p?t("savePerson"):t("addPerson"); }
  if(!$("auth").hidden) setAuthMode(authMode);
  renderAll();
}
$("langBtn").addEventListener("click",()=>{
  LANG = LANG==="ar" ? "en" : "ar";
  try{ localStorage.setItem("daftar.lang",LANG); }catch(e){}
  applyLang();
});

/* ---------- views ---------- */
function setView(v){
  S.view=v;
  $$(".tab").forEach(el=>el.setAttribute("aria-current", el.dataset.view===v?"page":"false"));
  ["overview","ledger","accounts","people"].forEach(k=>$("v-"+k).hidden = k!==v);
  renderAll();
  window.scrollTo({top:0});
}
function renderAll(){
  $$("[data-monthlabel]").forEach(el=>el.textContent=monthName(S.month));
  renderSelects();
  if(S.view==="overview") renderOverview();
  if(S.view==="ledger") renderLedger();
  if(S.view==="accounts") renderAccountsPage();
  if(S.view==="people") renderPeople();
}

/* overview */
function renderOverview(){
  const bg=$("balGrid");
  if(!S.accReady){ bg.innerHTML=`<div class="card bal"><span class="hint">${t("loading")}</span></div>`; return; }
  renderOvDebts();
  const cs=currencies(), bal=balances();
  const hr=new Date().getHours();
  $("helloH").textContent=t(hr<12?"gm":hr<18?"ga":"ge");
  $("helloDate").textContent=new Date().toLocaleDateString(locale(),{weekday:"long",day:"numeric",month:"long"});
  if(!cs.length){ bg.innerHTML=`<div class="hero"><span class="hero-lbl">${t("noAccounts")}</span><button class="btn hero-btn" type="button" data-addacct>${t("addFirst")}</button></div>`; }
  else {
    if(!cs.includes(S.hcur)) S.hcur=cs[0];
    const c=S.hcur, acc=S.accounts.filter(a=>a.currency===c);
    const total=acc.reduce((s,a)=>s+(bal[a.id]||0),0);
    let mi=0,mo=0; monthEntries().forEach(e=>{ if(curOf(e)!==c) return; if(e.type==="income"&&!isOpening(e)) mi+=+e.amount; else if(e.type==="expense") mo+=+e.amount; });
    const net=mi-mo;
    const QA=[["expense","t_expense"],["income","t_income"],["transfer","t_transfer"],["exchange","t_exchange"],["debt","t_debt"]];
    bg.innerHTML=`<div class="hero">
      <div class="hero-top"><span class="hero-lbl">${t("totalBalance")}</span>
        ${cs.length>1?`<div class="curtabs" role="group" aria-label="${esc(t("currency"))}">${cs.map(x=>`<button type="button" data-hcur="${esc(x)}" aria-pressed="${x===c}">${esc(x)}</button>`).join("")}</div>`:""}</div>
      <div class="hero-num ${total<0?"neg":""}">${fmt(total,c)}</div>
      <div class="hero-sub"><span class="hero-net ${net>=0?"up":"down"}">${t("monthNet",{v:fmt(net,c,true)})}</span><span class="dotsep">·</span><span>${esc(t("nAccounts",acc.length))}</span></div>
      <div class="qa">${QA.map(([ty,k])=>`<button type="button" class="qa-b" data-qa="${ty}"><span class="qa-i" aria-hidden="true">${TX_ICONS[ty]}</span><span class="qa-t">${esc(t(k))}</span></button>`).join("")}</div>
    </div>`;
  }

  const me=monthEntries();
  const ms=cs.map(c=>{ let i=0,o=0; me.forEach(e=>{ if(curOf(e)!==c) return; if(e.type==="income" && !isOpening(e)) i+=+e.amount; else if(e.type==="expense") o+=+e.amount; }); return {c,i,o}; })
    .filter(r=>r.i||r.o || r.c===cs[0]);
  $("mStats").innerHTML = cs.length ? `<div style="overflow-x:auto"><table class="mstats"><thead><tr><th>${t("colCurrency")}</th><th>${t("colIncome")}</th><th>${t("colSpent")}</th><th>${t("colNet")}</th></tr></thead><tbody>${
    ms.map(r=>`<tr><td>${esc(r.c)}</td><td class="pos">${fmt(r.i,r.c)}</td><td class="neg">${fmt(r.o,r.c)}</td><td class="${r.i-r.o>=0?"pos":"neg"}">${fmt(r.i-r.o,r.c,true)}</td></tr>`).join("")
  }</tbody></table></div>` : `<div class="hint">${t("addAcctToStart")}</div>`;

  $("ovAccts").innerHTML = sortedAccounts().map(a=>walletCard(a,bal,true)).join("") || `<div class="hint">${t("noAccounts")}</div>`;

  const ex=me.filter(e=>e.type==="expense"), by={};
  ex.forEach(e=>{ const c=curOf(e); (by[c]??={}); const k=e.category||"Other"; by[c][k]=(by[c][k]||0)+(+e.amount); });
  const keys=Object.keys(by);
  $("breakdown").innerHTML = !ex.length ? `<div class="hint">${esc(t("noExpenses",{month:monthName(S.month)}))}</div>` :
    keys.map(c=>{
      const rows=Object.entries(by[c]).sort((a,b)=>b[1]-a[1]), max=rows[0][1], tot=rows.reduce((s,r)=>s+r[1],0);
      return (keys.length>1?`<div class="bd-cur">${esc(c)}</div>`:"")+rows.map(([k,v])=>`<div class="bar" role="button" tabindex="0" data-cat="${esc(k)}"><span>${esc(catLabel(k))} <span class="hint" dir="ltr">${Math.round(v/tot*100)}%</span></span><span class="track"><span class="fill" style="width:${Math.max(2,v/max*100)}%"></span></span><span class="v">${fmt(v,c)}</span></div>`).join("");
    }).join("");

  if(!S.entReady){ $("recent").innerHTML=`<div class="empty">${t("loading")}</div>`; return; }
  const rec=S.entries.slice(0,8);
  $("recent").innerHTML = rec.length ? rec.map(e=>`<div class="rrow" data-entry="${esc(e.id)}" tabindex="0" role="button">
      ${(e.type==="income"||e.type==="expense")&&!isOpening(e)?`<span class="txi txi-cat" style="--c:${catColor(e.category||"Other")}" aria-hidden="true">${CAT_ICON[e.category]||CAT_FALLBACK}</span>`:txIcon(e.type)}
      <span style="min-width:0"><div class="t">${entryTitleHTML(e)}</div><div class="s">${esc(typeLabel(e.type))} · ${esc(dshort(e.date))} · ${entrySubHTML(e)}</div></span>
      <span class="amt">${entryAmountHTML(e)}</span></div>`).join("") :
    `<div class="empty">${esc(t("nothingYet"))}</div>`;
}

/* ledger */
function rangeDates(r){
  const d=new Date(), y=d.getFullYear(), m=d.getMonth();
  if(r==="month") return [ymd(new Date(y,m,1)), ymd(new Date(y,m+1,0))];
  if(r==="last") return [ymd(new Date(y,m-1,1)), ymd(new Date(y,m,0))];
  if(r==="3m") return [ymd(new Date(y,m-2,1)), ymd(new Date(y,m+1,0))];
  if(r==="year") return [y+"-01-01", y+"-12-31"];
  return ["",""];
}
function setRange(r){
  S.led.range=r; const [f,to]=rangeDates(r); S.led.from=f; S.led.to=to;
  $("lFrom").value=f; $("lTo").value=to;
  $$("#ranges button").forEach(b=>b.setAttribute("aria-pressed", b.dataset.r===r?"true":"false"));
}
function ledgerFor(acct){
  const {from,to,type,q}=S.led, ql=q.trim().toLowerCase();
  const asc=[...S.entries].sort((a,b)=>(a.date||"").localeCompare(b.date||"")||(a.createdAt||0)-(b.createdAt||0));
  let opening=+acct.opening||0; const rows=[];
  for(const e of asc){
    for(const l of linesFor(e)){
      if(l.acct!==acct.id) continue;
      if(from && e.date<from){ opening+=l.dr-l.cr; continue; }
      if(to && e.date>to) continue;
      rows.push({e,l});
    }
  }
  let bal=opening, dr=0, cr=0;
  const all=rows.map(r=>{ bal+=r.l.dr-r.l.cr; return {...r, bal}; });
  const closing=bal;
  const shown=all.filter(({e,l})=> (!type||e.type===type) &&
    (!ql || (e.note||"").toLowerCase().includes(ql) || (e.category||"").toLowerCase().includes(ql) || catLabel(e.category).toLowerCase().includes(ql) || l.against.toLowerCase().includes(ql)));
  shown.forEach(r=>{dr+=r.l.dr; cr+=r.l.cr;});
  return {opening, closing, rows:shown, dr, cr, filtered: !!(type||ql)};
}
function ledgerSection(acct){
  const L=ledgerFor(acct), c=acct.currency;
  const fromTxt=S.led.from?dshort(S.led.from):t("theStart"), toTxt=S.led.to?dshort(S.led.to):t("today");
  const body = L.rows.map(({e,l,bal})=>`<tr class="tx" data-entry="${esc(e.id)}" tabindex="0">
      <td class="date">${esc(dshort(e.date))}</td>
      <td><span class="vt ${e.type}">${esc(typeLabel(e.type))}</span></td>
      <td class="against">${bdi(l.against)}${e.type==="exchange"?`<span class="sub" dir="ltr">${esc(rateText(+e.amount,curOf(e),e.toAmount!=null?+e.toAmount:+e.amount,acctById(e.toAccount)?.currency))}</span>`:""}</td>
      <td class="rem">${bdi(e.note||"")}</td>
      <td class="n dr">${l.dr?nnum(l.dr,c):""}</td>
      <td class="n cr">${l.cr?nnum(l.cr,c):""}</td>
      <td class="n bal ${bal<0?"neg":""}">${nnum(bal,c)}</td></tr>`).join("");
  return `<div class="ledger-sec">
    <div class="lh">${icon(acct.kind)}<div class="ttl"><h3>${bdi(acct.name)}</h3><div class="kd">${esc(kindLabel(acct.kind))} · ${esc(c)} · ${esc(t("rangeTxt",{from:fromTxt,to:toTxt}))}</div></div>
      <button class="btn small" type="button" data-editacct="${esc(acct.id)}">${t("editAcctBtn")}</button></div>
    <div class="lsum">
      <div><span class="lbl">${t("opening")}</span><span class="v">${fmt(L.opening,c)}</span></div>
      <div><span class="lbl">${t("debitIn")}</span><span class="v pos">${fmt(L.dr,c)}</span></div>
      <div><span class="lbl">${t("creditOut")}</span><span class="v neg">${fmt(L.cr,c)}</span></div>
      <div><span class="lbl">${t("closing")}</span><span class="v">${fmt(L.closing,c)}</span></div>
    </div>
    <div class="tbl-wrap"><table class="gl">
      <thead><tr><th>${t("postingDate")}</th><th>${t("voucher")}</th><th>${t("against")}</th><th>${t("remarks")}</th><th class="n">${t("debit")} (${esc(c)})</th><th class="n">${t("credit")} (${esc(c)})</th><th class="n">${t("balance")} (${esc(c)})</th></tr></thead>
      <tbody>
        <tr class="edge"><td>${esc(S.led.from?dshort(S.led.from):"—")}</td><td><span class="vt open">${t("opening")}</span></td><td colspan="4">${t("openingBalance")}</td><td class="n">${nnum(L.opening,c)}</td></tr>
        ${body || `<tr><td colspan="7" class="empty">${t(L.filtered?"noTxF":"noTx")}</td></tr>`}
        <tr class="total"><td colspan="4">${t("total")}${L.filtered?t("filtered"):""}</td><td class="n dr">${nnum(L.dr,c)}</td><td class="n cr">${nnum(L.cr,c)}</td><td></td></tr>
        <tr class="edge"><td>${esc(S.led.to?dshort(S.led.to):"—")}</td><td><span class="vt open">${t("closing")}</span></td><td colspan="4">${t("closingBalance")}</td><td class="n">${nnum(L.closing,c)}</td></tr>
      </tbody></table></div>
  </div>`;
}
function renderLedger(){
  const out=$("ledgerOut");
  if(!S.accReady||!S.entReady){ out.innerHTML=`<div class="empty">${t("loadingLedger")}</div>`; return; }
  if(!S.accounts.length){ out.innerHTML=`<div class="empty">${t("addAcctForLedger")}</div>`; return; }
  const list = S.led.acct==="*" ? sortedAccounts() : [acctById(S.led.acct)||sortedAccounts()[0]];
  out.innerHTML = list.map(ledgerSection).join("");
}

/* accounts page */
function renderAccountsPage(){
  const el=$("accPage");
  if(!S.accReady){ el.innerHTML=`<div class="empty">${t("loading")}</div>`; return; }
  const bal=balances(), cs=currencies();
  const card=a=>walletCard(a,bal,false);
  el.innerHTML = cs.map(c=>{
    const acc=sortedAccounts().filter(a=>a.currency===c);
    const tot=acc.reduce((s,a)=>s+(bal[a.id]||0),0);
    return `<div class="cur-h"><h3>${esc(c)}</h3><span class="hint">${fmt(tot,c)} ${t("totalSuffix")}</span></div>
      <div class="acc-grid" style="margin-top:10px">${acc.map(card).join("")}</div>`;
  }).join(`<div style="height:18px"></div>`) +
  `<div class="acc-grid" style="margin-top:22px"><button class="acc-add wadd" type="button" data-addacct><span style="font-size:26px;line-height:1">+</span>${t("addAccount")}</button></div>`;
}

/* selects */
function fillSelect(sel, list, keep){
  sel.innerHTML=list.map(a=>`<option value="${esc(a.id)}">${esc(a.name)} (${esc(a.currency)})</option>`).join("");
  if(keep && list.some(a=>a.id===keep)) sel.value=keep;
}
function renderSelects(){
  const list=sortedAccounts();
  fillEntryAccounts();
  fillPeople();
  fillSelect($("fTo"), list, $("fTo").value);
  const la=$("lAcct");
  la.innerHTML = list.map(a=>`<option value="${esc(a.id)}">${esc(a.name)} · ${esc(a.currency)}</option>`).join("") + (list.length>1?`<option value="*">${esc(t("allAccounts"))}</option>`:"");
  if(!S.led.acct || (S.led.acct!=="*" && !acctById(S.led.acct))) S.led.acct=list[0]?.id||"";
  la.value=S.led.acct;
}

/* ---------- sheets ---------- */
let lastFocus=null, closeT=null;
const mobileQ = window.matchMedia("(max-width:720px)");
const reduceQ = window.matchMedia("(prefers-reduced-motion: reduce)");
function openSheet(id){
  clearTimeout(closeT);
  lastFocus=document.activeElement;
  SHEETS.forEach(k=>{ if(k!==id){ $(k).hidden=true; $(k).classList.remove("in"); } });
  const sh=$(id), sc=$("scrim");
  sh.style.transform=""; sc.style.opacity="";
  sc.hidden=false; sh.hidden=false;
  refreshPickers();
  sh.querySelector(".sheet-b").scrollTop=0;
  requestAnimationFrame(()=>{ sc.classList.add("in"); sh.classList.add("in"); });
}
function closeSheets(){
  const sc=$("scrim"), open=SHEETS.map($).filter(s=>!s.hidden);
  S.editId=null; S.editAcct=null; S.editPerson=null;
  if(!open.length && sc.hidden) return;
  sc.classList.remove("in"); sc.style.opacity="";
  open.forEach(s=>{ s.classList.remove("in"); s.style.transform=""; });
  clearTimeout(closeT);
  closeT=setTimeout(()=>{ sc.hidden=true; open.forEach(s=>s.hidden=true); }, reduceQ.matches?0:200);
  lastFocus?.focus?.({preventScroll:true});
}
/* swipe to dismiss: down on phones; toward the screen edge on wider screens (right in English, left in Arabic) */
function enableSwipe(sheet){
  const body=sheet.querySelector(".sheet-b");
  let x0=0,y0=0,t0=0,axis=null,d=0,active=false;
  sheet.addEventListener("touchstart",e=>{
    if(e.touches.length!==1) return;
    const p=e.touches[0]; x0=p.clientX; y0=p.clientY; t0=performance.now(); axis=null; d=0; active=true;
  },{passive:true});
  sheet.addEventListener("touchmove",e=>{
    if(!active) return;
    const rtl=document.documentElement.dir==="rtl";
    const p=e.touches[0], dy=p.clientY-y0, dx=(p.clientX-x0)*(rtl?-1:1);
    if(!axis){
      if(Math.abs(dx)<8 && Math.abs(dy)<8) return;
      const vertical=Math.abs(dy)>Math.abs(dx);
      const inHeader=!!e.target.closest(".sheet-h,.grab");
      if(mobileQ.matches) axis = (vertical && dy>0 && (body.scrollTop<=0 || inHeader)) ? "y" : "none";
      else axis = (!vertical && dx>0 && !e.target.closest("input,select,.tbl-wrap")) ? "x" : "none";
      if(axis!=="none"){ sheet.classList.add("drag"); $("scrim").classList.add("drag"); }
    }
    if(axis==="none") return;
    d=Math.max(0, axis==="y"?dy:dx);
    e.preventDefault();
    sheet.style.transform = axis==="y" ? `translateY(${d}px)` : `translateX(${rtl?-d:d}px)`;
    const size = axis==="y" ? sheet.offsetHeight : sheet.offsetWidth;
    $("scrim").style.opacity = String(Math.max(0, 1 - d/size));
  },{passive:false});
  const end=()=>{
    if(!active) return; active=false;
    sheet.classList.remove("drag"); $("scrim").classList.remove("drag");
    if(!axis||axis==="none") return;
    const v=d/Math.max(1,performance.now()-t0);
    const size = axis==="y" ? sheet.offsetHeight : sheet.offsetWidth;
    if(d>size*0.28 || (v>0.5 && d>40)) closeSheets();
    else { sheet.style.transform=""; $("scrim").style.opacity=""; }
  };
  sheet.addEventListener("touchend",end);
  sheet.addEventListener("touchcancel",end);
}
SHEETS.forEach(k=>enableSwipe($(k)));
$("scrim").addEventListener("click",closeSheets);
$$("[data-close]").forEach(b=>b.addEventListener("click",closeSheets));
document.addEventListener("keydown",e=>{ if(e.key==="Escape" && !$("scrim").hidden) closeSheets(); });

/* ---------- entry form ---------- */
let lastEx="";
function setType(ty){
  S.type=ty;
  $$(".seg button").forEach(b=>b.setAttribute("aria-pressed", b.dataset.t===ty?"true":"false"));
  const two=ty==="transfer"||ty==="exchange", ex=ty==="exchange", debt=ty==="debt";
  fillEntryAccounts();
  $("toWrap").hidden=!two; $("catWrap").hidden=two||debt;
  $("dirWrap").hidden=!debt; $("personWrap").hidden=!debt;
  $("entryForm").classList.toggle("debt",debt);
  if(debt){ fillPeople(); setDir(S.dir); }
  $("entryForm").classList.toggle("ex",ex);
  $("payH").hidden=$("recvH").hidden=!ex;
  $("accLbl").textContent = ty==="income" ? t("intoAccount") : t("fromAccount");
  $("toLbl").textContent = ex ? t("intoAccount") : t("toAccount");
  $("catList").innerHTML=(CATS[ty]||[]).map(c=>`<option value="${esc(catLabel(c))}">`).join("");
  customCat=false; renderCatGrid();
  $("fCat").placeholder = catLabel(ty==="income" ? "Allowance" : "Food");
  $("saveBtn").textContent=t((S.editId?"save_":"add_")+ty);
  if(debt) $("accLbl").textContent = debtCashIn({dir:S.dir}) ? t("receivedInto") : t("paidFrom");
  if(ex && !S.editId){
    const fa=acctById($("fAccount").value), ft=acctById($("fTo").value);
    if(!fa||!ft||fa.currency===ft.currency){
      const foreign=S.accounts.find(a=>a.currency!=="IQD"), iqd=S.accounts.find(a=>a.currency==="IQD");
      if(foreign&&iqd){ $("fAccount").value=foreign.id; $("fTo").value=iqd.id; }
    }
  }
  if(two && $("fTo").value===$("fAccount").value){
    const o=S.accounts.find(a=>a.id!==$("fAccount").value); if(o) $("fTo").value=o.id;
  }
  updateToAmt();
}
function syncExchange(src){
  if(S.type!=="exchange") return;
  if(src && src!=="pay") lastEx=src;
  const a=acctById($("fAccount").value), to=acctById($("fTo").value), b=rateBase(a?.currency,to?.currency);
  if(!b){ $("rateHint").textContent=""; return; }
  const pay=parseAmt($("fAmount").value), recv=parseAmt($("fToAmt").value), rate=parseAmt($("fRate").value);
  if(lastEx==="rate" && pay>0 && rate>0) $("fToAmt").value=roundTo(b.inv?pay/rate:pay*rate, to.currency);
  else if(pay>0 && recv>0 && src!=="rate") $("fRate").value=+(b.inv?pay/recv:recv/pay).toFixed(6);
  const p2=parseAmt($("fAmount").value), r2=parseAmt($("fToAmt").value);
  $("rateHint").innerHTML=(p2>0&&r2>0) ? t("rateHint",{pay:fmtRate(p2),pc:a.currency,recv:fmtRate(r2),rc:to.currency}) : t("rateHintEmpty");
}
function updateToAmt(){
  queueMicrotask(()=>{ Object.keys(PICKS).forEach(renderPick); });
  const a=acctById($("fAccount").value), to=acctById($("fTo").value), ex=S.type==="exchange";
  $("curWrap").hidden = !(S.type==="debt" && !a);
  const show = ex || (S.type==="transfer" && a && to && a.currency!==to.currency);
  $("toAmtWrap").hidden=!show;
  const b=rateBase(a?.currency,to?.currency);
  $("rateWrap").hidden=!(ex&&b);
  if(ex){
    $("amountLbl").textContent=t("amount")+(a?` (${a.currency})`:"");
    $("toAmtLbl").textContent=t("amount")+(to?` (${to.currency})`:"");
    if(b) $("rateLbl").innerHTML=t("rateLbl",{one:b.one,per:b.per});
    syncExchange();
  } else {
    if(show) $("toAmtLbl").textContent=t("amountReceivedIn",{name:to.name,cur:to.currency});
    $("amountLbl").textContent=t("amount")+(a?` (${a.currency})`:(S.type==="debt"?` (${$("fCur").value})`:""));
  }
}
function setDir(d){
  S.dir=d;
  $$("#dirs button").forEach(b=>b.setAttribute("aria-pressed", b.dataset.dir===d?"true":"false"));
  if(S.type==="debt") $("accLbl").textContent = debtCashIn({dir:d}) ? t("receivedInto") : t("paidFrom");
}
let debtAcctPicked=false;   // debts move no cash unless the user picks an account
function fillEntryAccounts(){
  const sel=$("fAccount"), list=sortedAccounts(), debt=S.type==="debt";
  const keep = (debt && !debtAcctPicked) ? "" : sel.value;
  sel.innerHTML=(debt?`<option value="">${esc(t("noCash"))}</option>`:"")+list.map(a=>`<option value="${esc(a.id)}">${esc(a.name)} (${esc(a.currency)})</option>`).join("");
  if(debt && keep==="") sel.value="";
  else if(list.some(a=>a.id===keep)) sel.value=keep;
  else if(S.lastAcct && list.some(a=>a.id===S.lastAcct)) sel.value=S.lastAcct;
  else if(list[0]) sel.value=list[0].id;
}
function fillPeople(){
  const sel=$("fPerson"), keep=sel.value, list=[...S.people].sort((a,b)=>a.name.localeCompare(b.name));
  sel.innerHTML=list.map(p=>`<option value="${esc(p.id)}">${esc(p.name)}</option>`).join("")+`<option value="__new">${esc(t("newPersonOpt"))}</option>`;
  if(keep && [...sel.options].some(o=>o.value===keep)) sel.value=keep;
  else sel.value = list[0]?.id || "__new";
  $("fPersonNew").hidden = sel.value!=="__new";
}
function formErr(m){ const e=$("formErr"); e.textContent=m||""; e.hidden=!m; }
function openNewEntry(preAcct, o){
  o=o||{}; debtAcctPicked=false; customCat=false;
  S.editId=null; lastEx="";
  ["fAmount","fNote","fCat","fToAmt","fRate","fPersonNew"].forEach(i=>$(i).value="");
  $("fDate").value=today();
  if(o.type) S.type=o.type;
  if(o.dir) S.dir=o.dir;
  setType(S.type);
  if(preAcct && acctById(preAcct)) $("fAccount").value=preAcct;
  if(o.person){ fillPeople(); $("fPerson").value=o.person; $("fPersonNew").hidden=true; }
  if(o.cur){ $("fAccount").value=""; $("fCur").value=o.cur; }
  if(o.amount) $("fAmount").value=roundTo(o.amount,o.cur||"IQD");
  $("entryH").textContent=t("newEntry"); $("delEntry").hidden=true; formErr("");
  setType(S.type);
  openSheet("entrySheet");
  setTimeout(()=>$("fAmount").focus(),30);
}
function openEntry(id){
  const e=S.entries.find(x=>x.id===id); if(!e) return;
  S.editId=id; lastEx="recv"; formErr("");
  $("fAccount").value=e.account; if(e.toAccount) $("fTo").value=e.toAccount;
  $("fAmount").value=e.amount; $("fCat").value=catLabel(e.category||""); $("fDate").value=e.date; $("fNote").value=e.note||"";
  $("fToAmt").value=e.toAmount??""; $("fRate").value="";
  debtAcctPicked = e.type==="debt" && !!e.account;
  if(e.type==="debt"){ S.dir=e.dir; S.type="debt"; fillEntryAccounts(); fillPeople(); $("fAccount").value=e.account||""; $("fPerson").value=e.person; $("fPersonNew").hidden=true; if(e.currency) $("fCur").value=e.currency; $("fCat").value=""; }
  $("entryH").textContent=t("editEntry");
  const d=$("delEntry"); d.hidden=false; d.classList.remove("confirm"); d.textContent=t("delete");
  setType(e.type);
  openSheet("entrySheet");
}
$("entryForm").addEventListener("submit", async ev=>{
  ev.preventDefault(); formErr("");
  const isDebt=S.type==="debt";
  if(!S.accounts.length && !isDebt) return formErr(t("errNoAcct"));
  const amount=parseAmt($("fAmount").value);
  if(!(amount>0)) return formErr(t("errAmount"));
  const account=$("fAccount").value, date=$("fDate").value||today();
  if(!acctById(account) && !(isDebt && account==="")) return formErr(t("errChoose"));
  let newPerson=null;
  const prev=S.editId?S.entries.find(e=>e.id===S.editId):null;
  const data={type:S.type, amount, account, date, note:$("fNote").value.trim(), createdAt:prev?.createdAt||Date.now()};
  if(isDebt){
    let pid=$("fPerson").value;
    if(!pid || pid==="__new"){
      const nm=$("fPersonNew").value.trim(); if(!nm) return formErr(t("errPerson"));
      const same=S.people.find(p=>p.name.trim().toLowerCase()===nm.toLowerCase());
      if(same) pid=same.id; else { pid=uid(); newPerson={id:pid, data:{name:nm, createdAt:Date.now()}}; }
    }
    Object.assign(data,{person:pid, dir:S.dir, category:"Debt", currency: account?acctById(account).currency:$("fCur").value});
  } else if(S.type==="exchange"){
    const to=$("fTo").value;
    if(!acctById(to)||to===account) return formErr(t("errExAccts"));
    const ta=parseAmt($("fToAmt").value);
    if(!(ta>0)) return formErr(t("errExAmt",{cur:acctById(to).currency}));
    Object.assign(data,{toAccount:to, toAmount:ta, category:"Exchange"});
  } else if(S.type==="transfer"){
    const to=$("fTo").value;
    if(!acctById(to)||to===account) return formErr(t("errTrAccts"));
    data.toAccount=to; data.category="Transfer";
    if(acctById(account).currency!==acctById(to).currency){
      const ta=parseAmt($("fToAmt").value);
      if(!(ta>0)) return formErr(t("errTrAmt",{cur:acctById(to).currency,name:acctById(to).name}));
      data.toAmount=ta;
    }
  } else data.category=catKey($("fCat").value)||"Other";
  const id=S.editId||uid(), wasEdit=!!S.editId;
  if(account) S.lastAcct=account;
  if(!date.startsWith(S.month)) S.month=date.slice(0,7);
  closeSheets(); renderAll();
  { const c=data.account?acctById(data.account)?.currency:data.currency;
    toast(`${t(wasEdit?"entryUpdated":"entryAdded")} · ${nfmt(data.amount,c||"IQD")} ${c||""}${data.account?" · "+acctName(data.account):""}`);
    try{ navigator.vibrate?.(12); }catch(e){} }
  try{
    if(newPerson) await store.setPerson(newPerson.id,newPerson.data);
    await store.setEntry(id,data);
  }
  catch(e){ S.editId=wasEdit?id:null; setType(data.type); openSheet("entrySheet"); formErr(saveError(e)); }
});
$("delEntry").addEventListener("click", async ()=>{
  const b=$("delEntry");
  if(!b.classList.contains("confirm")){ b.classList.add("confirm"); b.textContent=t("tapAgain"); return; }
  const id=S.editId;
  closeSheets(); toast(t("entryDeleted"));
  try{ await store.delEntry(id); renderAll(); }
  catch(e){ toast(saveError(e)); }
});
$$(".seg button").forEach(b=>b.addEventListener("click",()=>setType(b.dataset.t)));
$("dirs").addEventListener("click",e=>{ const b=e.target.closest("[data-dir]"); if(b) setDir(b.dataset.dir); });
$("fPerson").addEventListener("change",()=>{ const n=$("fPerson").value==="__new"; $("fPersonNew").hidden=!n; if(n) $("fPersonNew").focus(); });
$("fCur").addEventListener("change",updateToAmt);
$("fAccount").addEventListener("change",()=>{ if(S.type==="debt") debtAcctPicked=true; if(S.type==="exchange"&&lastEx!=="rate") $("fRate").value=""; updateToAmt(); });
$("fTo").addEventListener("change",()=>{ if(S.type==="exchange"&&lastEx!=="rate") $("fRate").value=""; updateToAmt(); });
// IQD has no decimals: don't accept a decimal point for it
$("fAmount").addEventListener("beforeinput",e=>{
  const cur=acctById($("fAccount").value)?.currency||$("fCur").value||"IQD";
  if((DEC[cur]??2)===0 && e.data && /[.٫]/.test(e.data)) e.preventDefault();
});
// show thousands separators while typing (Arabic digits accepted); parseAmt ignores the commas
$("fAmount").addEventListener("input",e=>{ const el=e.target;
  let v=el.value.replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[٫,]/g,m=>m==="٫"?".":"").replace(/[^\d.]/g,"");
  const [i,...r]=v.split("."), f=(i||"").replace(/^0+(?=\d)/,"").replace(/\B(?=(\d{3})+(?!\d))/g,",");
  const cur=acctById($("fAccount").value)?.currency||$("fCur").value||"IQD", dp=DEC[cur]??2;   // IQD has no decimals
  const nv=(r.length&&dp)?f+"."+r.join("").slice(0,dp):f; if(nv!==el.value) el.value=nv; });
$("fAmount").addEventListener("input",()=>syncExchange("pay"));
$("fToAmt").addEventListener("input",()=>syncExchange("recv"));
$("fRate").addEventListener("input",()=>syncExchange("rate"));

/* ---------- account form ---------- */
function acctErr(m){ const e=$("acctErr"); e.textContent=m||""; e.hidden=!m; }
function renderChips(){
  const have=new Set(S.accounts.map(x=>x.name.toLowerCase()));
  const list=PRESETS.filter(p=>!have.has(p.en.toLowerCase()) && !have.has(p.ar.toLowerCase()));
  $("chips").innerHTML=list.map(p=>`<button type="button" class="chip" data-p="${PRESETS.indexOf(p)}" aria-pressed="false">${esc(p[LANG])}</button>`).join("");
  $("presets").hidden=!list.length;
}
function openAcct(id){
  S.editAcct=id||null; acctErr("");
  const a=id?acctById(id):null;
  $("acctH").textContent=a?t("editAccount"):t("newAccount");
  if(!a) renderChips(); else $("presets").hidden=true;
  $("aName").value=a?.name||""; $("aKind").value=a?.kind||"Cash"; $("aCur").value=a?.currency||"IQD";
  if(a && ![...$("aKind").options].some(o=>o.value===a.kind)) $("aKind").value="Other";
  $("aOpen").value=a?(a.opening||0):"";
  $("aSave").textContent=a?t("saveAccount"):t("createAccount");
  $("aDelete").hidden=!a; $("aLedger").hidden=!a;
  $("aDelete").classList.remove("confirm"); $("aDelete").textContent=t("delete");
  openSheet("acctSheet");
  if(!a) setTimeout(()=>$("aName").focus(),30);
}
$("chips").addEventListener("click",ev=>{
  const c=ev.target.closest("[data-p]"); if(!c) return;
  const p=PRESETS[+c.dataset.p];
  $$("#chips .chip").forEach(b=>b.setAttribute("aria-pressed", b===c?"true":"false"));
  $("aName").value=p[LANG]; $("aKind").value=p.kind; $("aCur").value=p.currency; renderPick("aKind"); renderPick("aCur");
  acctErr(""); $("aOpen").focus();
});
$("acctForm").addEventListener("submit", async ev=>{
  ev.preventDefault(); acctErr("");
  const name=$("aName").value.trim(); if(!name) return acctErr(t("errName"));
  const opening=$("aOpen").value.trim()===""?0:parseAmt($("aOpen").value);
  if(!isFinite(opening)) return acctErr(t("errOpening"));
  const prev=S.editAcct?acctById(S.editAcct):null, cur=$("aCur").value;
  if(prev && prev.currency!==cur && S.entries.some(e=>e.account===prev.id||e.toAccount===prev.id)) return acctErr(t("errCur"));
  const id=S.editAcct||uid();
  closeSheets(); toast(t(prev?"acctSaved":"acctCreated"));
  try{ await store.setAccount(id,{name, kind:$("aKind").value, currency:cur, opening, createdAt:prev?.createdAt||Date.now()}); renderAll(); }
  catch(e){ S.editAcct=prev?id:null; openSheet("acctSheet"); acctErr(saveError(e)); }
});
$("aDelete").addEventListener("click", async ()=>{
  const id=S.editAcct; if(!id) return;
  const n=S.entries.filter(e=>e.account===id||e.toAccount===id).length;
  if(n) return acctErr(t("errHasEntries",n));
  const b=$("aDelete");
  if(!b.classList.contains("confirm")){ b.classList.add("confirm"); b.textContent=t("tapAgain"); return; }
  closeSheets(); toast(t("acctDeleted"));
  try{ await store.delAccount(id); renderAll(); }
  catch(e){ toast(saveError(e)); }
});
$("aLedger").addEventListener("click",()=>{ const id=S.editAcct; closeSheets(); S.led.acct=id; setView("ledger"); });

/* ---------- global clicks ---------- */
document.addEventListener("click",ev=>{
  const el=ev.target;
  const tab=el.closest(".tab"); if(tab) return setView(tab.dataset.view);
  const go=el.closest("[data-go]"); if(go) return setView(go.dataset.go);
  const le=el.closest("[data-ledger]"); if(le){ S.led.acct=le.dataset.ledger; return setView("ledger"); }
  const ea=el.closest("[data-editacct]"); if(ea) return openAcct(ea.dataset.editacct);
  const aa=el.closest("[data-addacct]"); if(aa) return openAcct(null);
  const en=el.closest("[data-entry]"); if(en) return openEntry(en.dataset.entry);
  const bc=el.closest(".bar[data-cat]"); if(bc){ S.led.acct="*"; S.led.type="expense"; S.led.q=catLabel(bc.dataset.cat); $("lType").value="expense"; $("lQ").value=S.led.q;
    const [y,m]=S.month.split("-").map(Number); S.led.range=""; S.led.from=S.month+"-01"; S.led.to=ymd(new Date(y,m,0)); $("lFrom").value=S.led.from; $("lTo").value=S.led.to;
    $$("#ranges button").forEach(b=>b.setAttribute("aria-pressed","false")); return setView("ledger"); }
  const hc=el.closest("[data-hcur]"); if(hc){ S.hcur=hc.dataset.hcur; return renderOverview(); }
  const qa=el.closest("[data-qa]"); if(qa) return openNewEntry(null,{type:qa.dataset.qa});
  const mm=el.closest("[data-m]"); if(mm){ S.month=shiftMonth(S.month,+mm.dataset.m); return renderAll(); }
  const pr=el.closest("[data-person]"); if(pr){ S.person=pr.dataset.person; renderPeople(); return window.scrollTo({top:0}); }
  if(el.closest("[data-backppl]")){ S.person=null; return renderPeople(); }
  const ep=el.closest("[data-editperson]"); if(ep) return openPerson(ep.dataset.editperson);
  if(el.closest("[data-adddebt]")) return openNewEntry(null,{type:"debt", person:S.view==="people"?S.person:null});
  const df=el.closest("[data-debtfor]"); if(df) return openNewEntry(null,{type:"debt", person:df.dataset.debtfor});
  const st=el.closest("[data-settle]"); if(st) return openNewEntry(null,{type:"debt", dir:st.dataset.settle, person:S.person, cur:st.dataset.cur, amount:+st.dataset.amt});
});
document.addEventListener("keydown",ev=>{
  if((ev.key==="Enter"||ev.key===" ") && ev.target.matches?.(".bar[data-cat]")){ ev.preventDefault(); ev.target.click(); return; }
  if((ev.key==="Enter"||ev.key===" ") && ev.target.matches?.("[data-entry]")){ ev.preventDefault(); openEntry(ev.target.dataset.entry); }
});
$("newTop").addEventListener("click",()=>openNewEntry(S.view==="ledger"&&S.led.acct!=="*"?S.led.acct:null));
$("fab").addEventListener("click",()=>openNewEntry(S.view==="ledger"&&S.led.acct!=="*"?S.led.acct:null));

/* ledger filters */
$("lAcct").addEventListener("change",e=>{ S.led.acct=e.target.value; renderLedger(); });
$("lFrom").addEventListener("change",e=>{ S.led.from=e.target.value; S.led.range=""; $$("#ranges button").forEach(b=>b.setAttribute("aria-pressed","false")); renderLedger(); });
$("lTo").addEventListener("change",e=>{ S.led.to=e.target.value; S.led.range=""; $$("#ranges button").forEach(b=>b.setAttribute("aria-pressed","false")); renderLedger(); });
$("lType").addEventListener("change",e=>{ S.led.type=e.target.value; renderLedger(); });
$("lQ").addEventListener("input",e=>{ S.led.q=e.target.value; renderLedger(); });
$("ranges").addEventListener("click",e=>{ const b=e.target.closest("[data-r]"); if(!b) return; setRange(b.dataset.r); renderLedger(); });

/* export: the ledger as shown */
$("exportBtn").addEventListener("click", async ()=>{
  const q=v=>`"${String(v??"").replace(/"/g,'""')}"`;
  const list = S.led.acct==="*" ? sortedAccounts() : [acctById(S.led.acct)].filter(Boolean);
  const lines=[["Account","Currency","Posting date","Voucher","Against","Remarks","Debit","Credit","Balance"].join(",")];
  list.forEach(a=>{
    const L=ledgerFor(a);
    lines.push([a.name,a.currency,S.led.from,"Opening","","","","",L.opening].map(q).join(","));
    L.rows.forEach(({e,l,bal})=>lines.push([a.name,a.currency,e.date,TYPE_EN[e.type],l.against,e.note,l.dr||"",l.cr||"",roundTo(bal,a.currency)].map(q).join(",")));
    lines.push([a.name,a.currency,S.led.to,"Closing","","",L.dr,L.cr,L.closing].map(q).join(","));
  });
  try{ downloadFile(`daftar-ledger-${today()}.csv`, "\ufeff"+lines.join("\n"), "text/csv;charset=utf-8"); }
  catch(e){ toast(t("exportFail")); }
});


/* ---------- tap-to-choose pickers ----------
   Each <select> stays as the source of truth (all logic reads it); a row of chips is drawn after it. */
const PICKS={fAccount:"acct",fTo:"acct",fPerson:"person",fCur:"cur",aKind:"kind",aCur:"cur"};
const CI=(d)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const CAT_ICON={
  "Food":CI('<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-2 6 0 8v10"/>'),
  "Groceries":CI('<path d="M4 6h16l-2 9H6zM6 6 5 3H3M9 20a1 1 0 1 0 0 .01M17 20a1 1 0 1 0 0 .01"/>'),
  "Transport":CI('<path d="M5 16V9l2-4h10l2 4v7zM5 12h14M7 16v3M17 16v3"/><circle cx="8" cy="13.5" r=".6"/><circle cx="16" cy="13.5" r=".6"/>'),
  "Rent":CI('<path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6"/>'),
  "Bills":CI('<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>'),
  "Phone & Internet":CI('<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18h2"/>'),
  "University":CI('<path d="M2 9 12 4l10 5-10 5zM6 11v5c3 2 9 2 12 0v-5"/>'),
  "Books & Supplies":CI('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M9 7h6"/>'),
  "Health":CI('<path d="M12 21s-8-4.6-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.4-8 11-8 11z"/>'),
  "Gym":CI('<path d="M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12"/>'),
  "Clothes":CI('<path d="M8 3 4 6l2 4 2-1v12h8V9l2 1 2-4-4-3c0 2-2 3-4 3s-4-1-4-3z"/>'),
  "Shopping":CI('<path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2"/>'),
  "Entertainment":CI('<rect x="3" y="6" width="18" height="13" rx="2"/><path d="m10 10 5 2.5-5 2.5z"/>'),
  "Family":CI('<circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M2.5 20c.6-3.5 2.7-5.3 5.5-5.3s4.9 1.8 5.5 5.3M14 20c.4-2.6 1.6-4 3-4s2.6 1.4 3 4"/>'),
  "Gifts":CI('<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M12 9v12M3 13h18M12 9C9 9 7 4 9.5 4S12 9 12 9zM12 9c3 0 5-5 2.5-5S12 9 12 9z"/>'),
  "Gift":CI('<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M12 9v12M3 13h18M12 9C9 9 7 4 9.5 4S12 9 12 9zM12 9c3 0 5-5 2.5-5S12 9 12 9z"/>'),
  "Subscriptions":CI('<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4"/>'),
  "Salary":CI('<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/>'),
  "Allowance":CI('<path d="M12 3v18M16.5 6.5C15.5 5 13.8 4.5 12 4.5c-2.5 0-4.5 1.3-4.5 3.3 0 4.7 9 2.4 9 7 0 2-2 3.4-4.5 3.4-2 0-3.7-.7-4.6-2.2"/>'),
  "Freelance":CI('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 12h18"/>'),
  "Refund":CI('<path d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3"/>'),
  "Scholarship":CI('<path d="m12 3 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8L3.5 9.2l5.9-.8z"/>'),
  "Opening balance":CI('<path d="M4 20h16M6 20V10M10 20V10M14 20V10M18 20V10M3 10l9-6 9 6"/>'),
  "Other":CI('<circle cx="6" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/>')
};
const CAT_COLOR={"Food":"#EA580C","Groceries":"#16A34A","Transport":"#0284C7","Rent":"#2563EB","Bills":"#CA8A04","Phone & Internet":"#0891B2",
  "University":"#1D4ED8","Books & Supplies":"#B45309","Health":"#E11D48","Gym":"#DC2626","Clothes":"#DB2777","Shopping":"#F97316","Entertainment":"#0D9488",
  "Family":"#D97706","Gifts":"#BE123C","Gift":"#BE123C","Subscriptions":"#0F766E","Salary":"#059669","Allowance":"#16A34A","Freelance":"#0284C7",
  "Refund":"#2563EB","Scholarship":"#CA8A04","Opening balance":"#475467","Other":"#667085"};
function catColor(k){ return CAT_COLOR[k]||"#475467"; }
const CAT_FALLBACK=CI('<path d="M4 7l8-4 8 4-8 4zM4 12l8 4 8-4M4 17l8 4 8-4"/>');
let customCat=false;
function renderCatGrid(){
  const ty=S.type, el=$("catGrid"); if(!el) return;
  if(ty!=="expense" && ty!=="income"){ el.innerHTML=""; return; }
  const base=CATS[ty].filter(c=>c!=="Other");
  // the user's own categories, most used first, then the built-in ones
  const counts={}; S.entries.forEach(e=>{ if(e.type===ty && e.category) counts[e.category]=(counts[e.category]||0)+1; });
  const own=Object.keys(counts).filter(c=>!CATS[ty].includes(c)).sort((a,b)=>counts[b]-counts[a]);
  const list=[...base,...own].sort((a,b)=>(counts[b]||0)-(counts[a]||0)).concat("Other");  // most used first, yours included
  const cur=catKey($("fCat").value||"");
  const isCustom=customCat || (cur && !list.includes(cur));
  el.innerHTML=list.map(k=>{ const on=!isCustom && cur===k;
    return `<button type="button" class="ct${on?" on":""}" style="--c:${catColor(k)}" role="radio" aria-checked="${on}" data-catpick="${esc(k)}"><span class="ct-i">${CAT_ICON[k]||CAT_FALLBACK}</span><span class="ct-t">${esc(catLabel(k))}</span></button>`; }).join("")
    + `<button type="button" class="ct ct-new${isCustom?" on":""}" role="radio" aria-checked="${isCustom}" data-catcustom><span class="ct-i">${CI('<path d="M12 5v14M5 12h14"/>')}</span><span class="ct-t">${esc(t("customCat"))}</span></button>`;
  $("fCat").hidden=!isCustom; $("fCat").placeholder=t("customCatPh");
}
$("catGrid").addEventListener("click",e=>{
  const b=e.target.closest("[data-catpick]"), c=e.target.closest("[data-catcustom]");
  if(b){ customCat=false; $("fCat").value=catLabel(b.dataset.catpick); renderCatGrid(); }
  if(c){ customCat=true; $("fCat").value=""; renderCatGrid(); $("fCat").focus(); }
});
function pickInner(kind,o,bal){
  if(kind==="acct"){ const a=acctById(o.value);
    if(!a) return `<span class="pk-tx"><span class="pk-t">${esc(o.textContent)}</span></span>`;
    return `${icon(a.kind)}<span class="pk-tx"><span class="pk-t">${esc(a.name)}</span><span class="pk-s">${fmt(bal[a.id]||0,a.currency)}</span></span>`; }
  if(kind==="person"){ if(o.value==="__new") return `<span class="ico avatar">+</span><span class="pk-t">${esc(t("newPersonOpt").replace(/^\+\s*/,""))}</span>`;
    return `${avatar(o.textContent)}<span class="pk-t">${esc(o.textContent)}</span>`; }
  if(kind==="kind") return `<span class="ico" aria-hidden="true">${ICONS[kindClass(o.value)]}</span><span class="pk-t">${esc(o.textContent)}</span>`;
  return `<span class="pk-t">${esc(o.textContent)}</span>`;
}
function renderPick(id){
  const sel=$(id); if(!sel) return;
  let box=sel.nextElementSibling;
  if(!box || !box.classList.contains("pick")){
    box=document.createElement("div"); box.className="pick pick-"+PICKS[id]; box.setAttribute("role","radiogroup");
    sel.after(box); sel.classList.add("sr-select"); sel.tabIndex=-1;
    box.addEventListener("click",e=>{ const b=e.target.closest("[data-v]"); if(!b) return;
      if(sel.value!==b.dataset.v){ sel.value=b.dataset.v; sel.dispatchEvent(new Event("change",{bubbles:true})); }
      renderPick(id); });
    new MutationObserver(()=>renderPick(id)).observe(sel,{childList:true});
  }
  const lab=sel.labels?.[0]?.textContent||""; if(lab) box.setAttribute("aria-label",lab);
  const bal=PICKS[id]==="acct"?balances():null;
  box.innerHTML=[...sel.options].map(o=>{ const on=o.value===sel.value;
    return `<button type="button" class="pk${on?" on":""}" role="radio" aria-checked="${on}" data-v="${esc(o.value)}">${pickInner(PICKS[id],o,bal)}</button>`; }).join("");
  const on=box.querySelector(".pk.on"); if(on && box.scrollWidth>box.clientWidth) on.scrollIntoView({block:"nearest",inline:"nearest"});
}
function refreshPickers(){ Object.keys(PICKS).forEach(renderPick); renderCatGrid(); markDate(); }
function markDate(){
  const v=$("fDate").value, d0=today(), y=new Date(); y.setDate(y.getDate()-1); const d1=ymd(y);
  $$("#dateQuick [data-dq]").forEach(b=>{ const on=(b.dataset.dq==="0"&&v===d0)||(b.dataset.dq==="1"&&v===d1); b.classList.toggle("on",on); b.setAttribute("aria-pressed",on); });
}
$("dateQuick").addEventListener("click",e=>{ const b=e.target.closest("[data-dq]"); if(!b) return; const d=new Date(); d.setDate(d.getDate()-(+b.dataset.dq)); $("fDate").value=ymd(d); markDate(); });
$("fDate").addEventListener("change",markDate);

/* ---------- debts ---------- */
function peopleBalances(){
  const m={}; S.people.forEach(p=>m[p.id]={});
  for(const e of S.entries){
    if(e.type!=="debt" || !(e.person in m)) continue;
    const c=curOf(e); m[e.person][c]=(m[e.person][c]||0)+debtDelta(e);
  }
  return m;
}
function debtTotals(){
  const owed={}, owe={};
  Object.values(peopleBalances()).forEach(b=>Object.entries(b).forEach(([c,v])=>{
    if(v>1e-9) owed[c]=(owed[c]||0)+v; else if(v<-1e-9) owe[c]=(owe[c]||0)-v;
  }));
  return {owed,owe};
}
function avatar(name){ const ch=[...String(name||"?").trim()][0]||"?"; return `<span class="ico avatar" aria-hidden="true">${esc(ch.toUpperCase())}</span>`; }
function statusHTML(bal){
  const parts=Object.entries(bal||{}).filter(([c,v])=>Math.abs(v)>1e-9);
  if(!parts.length) return `<span class="hint">${esc(t("settled"))}</span>`;
  return parts.map(([c,v])=> v>0
    ? `<span class="pos"><span class="lab">${esc(t("owesYou"))}</span> ${fmt(v,c)}</span>`
    : `<span class="neg"><span class="lab">${esc(t("youOwe"))}</span> ${fmt(-v,c)}</span>`).join("");
}
function sumBlock(o,cls){
  const k=Object.keys(o);
  return k.length ? k.map(c=>`<span class="big ${cls}">${fmt(o[c],c)}</span>`).join("") : `<span class="big muted">—</span>`;
}
function renderOvDebts(){
  const el=$("ovDebts"); if(!S.pplReady||!S.entReady){ el.innerHTML=`<div class="hint">${t("loading")}</div>`; return; }
  const {owed,owe}=debtTotals(), k1=Object.keys(owed), k2=Object.keys(owe);
  el.innerHTML = (!k1.length && !k2.length) ? `<div class="hint">${esc(t("noDebts"))}</div>` :
    `<div class="debt-sum"><div><span class="lbl">${t("owedToYou")}</span>${k1.length?k1.map(c=>`<span class="v pos">${fmt(owed[c],c)}</span>`).join(""):`<span class="hint">—</span>`}</div>
     <div><span class="lbl">${t("youOweTotal")}</span>${k2.length?k2.map(c=>`<span class="v neg">${fmt(owe[c],c)}</span>`).join(""):`<span class="hint">—</span>`}</div></div>`;
}
function renderPeople(){
  const el=$("pplOut");
  if(!S.pplReady||!S.entReady){ el.innerHTML=`<div class="empty">${t("loading")}</div>`; return; }
  const {owed,owe}=debtTotals();
  const top=`<div class="bal-grid"><div class="card bal"><span class="lbl">${t("owedToYou")}</span>${sumBlock(owed,"pos")}</div><div class="card bal"><span class="lbl">${t("youOweTotal")}</span>${sumBlock(owe,"neg")}</div></div>`;
  if(S.person && personById(S.person)){ el.innerHTML=top+personDetail(S.person); return; }
  S.person=null;
  const pb=peopleBalances();
  const list=[...S.people].sort((a,b)=>a.name.localeCompare(b.name));
  el.innerHTML = top + `<div class="card"><div class="card-h"><h3>${t("people")}</h3></div><div class="card-b"><div class="alist">${
    list.length ? list.map(p=>`<button class="arow" type="button" data-person="${esc(p.id)}">${avatar(p.name)}<span><div class="nm">${bdi(p.name)}</div></span><span class="pstat">${statusHTML(pb[p.id])}</span></button>`).join("")
                : `<div class="empty">${esc(t("noPeople"))}</div>`
  }</div></div></div>`;
}
function personDetail(pid){
  const p=personById(pid), pb=peopleBalances()[pid]||{};
  const rows=S.entries.filter(e=>e.type==="debt"&&e.person===pid)
    .sort((a,b)=>(a.date||"").localeCompare(b.date||"")||(a.createdAt||0)-(b.createdAt||0));
  const run={};
  const trs=rows.map(e=>{
    const c=curOf(e), d=debtDelta(e); run[c]=(run[c]||0)+d; const v=run[c];
    return `<tr class="tx" data-entry="${esc(e.id)}" tabindex="0"><td class="date">${esc(dshort(e.date))}</td><td>${esc(t("d_"+e.dir))}</td>
      <td>${e.account?bdi(acctName(e.account)):`<span class="hint">${esc(t("noCashShort"))}</span>`}</td><td class="rem">${bdi(e.note||"")}</td>
      <td class="n ${d>0?"dr":"cr"}">${fmt(d,c,true)}</td><td class="n bal ${v<-1e-9?"neg":v>1e-9?"pos":""}">${fmt(v,c,true)}</td></tr>`;
  }).reverse().join("");
  const owesMe=Object.entries(pb).find(([c,v])=>v>1e-9), iOwe=Object.entries(pb).find(([c,v])=>v<-1e-9);
  return `<div class="card">
    <div class="lh"><button class="btn small" type="button" data-backppl>${t("backPeople")}</button></div>
    <div class="lh" style="border-top:0;padding-top:0">${avatar(p.name)}<div class="ttl"><h3>${bdi(p.name)}</h3><div class="kd pstat" style="align-items:flex-start;text-align:start">${statusHTML(pb)}</div></div>
      <div class="actions">
        ${owesMe?`<button class="btn small primary" type="button" data-settle="collected" data-cur="${esc(owesMe[0])}" data-amt="${owesMe[1]}">${t("theyPaid")}</button>`:""}
        ${iOwe?`<button class="btn small primary" type="button" data-settle="repaid" data-cur="${esc(iOwe[0])}" data-amt="${-iOwe[1]}">${t("iPaid")}</button>`:""}
        <button class="btn small" type="button" data-debtfor="${esc(pid)}">${t("newDebt")}</button>
        <button class="btn small ghost" type="button" data-editperson="${esc(pid)}">${t("editPersonBtn")}</button>
      </div></div>
    <div class="tbl-wrap"><table class="gl" style="min-width:680px"><thead><tr><th>${t("date")}</th><th>${t("what")}</th><th>${t("account")}</th><th>${t("note")}</th><th class="n">${t("amount")}</th><th class="n">${t("balance")}</th></tr></thead>
      <tbody>${trs||`<tr><td colspan="6" class="empty">${esc(t("noDebtTx"))}</td></tr>`}</tbody></table></div>
    <div class="hint" style="padding:12px 18px">${esc(t("debtBalHint"))}</div>
  </div>`;
}
function personErr(m){ const e=$("personErr"); e.textContent=m||""; e.hidden=!m; }
function openPerson(id){
  const p=id?personById(id):null; S.editPerson=p?id:null; personErr("");
  $("personH").textContent=p?t("editPerson"):t("newPerson");
  $("pName").value=p?.name||"";
  $("pSave").textContent=p?t("savePerson"):t("addPerson");
  const d=$("pDelete"); d.hidden=!p; d.classList.remove("confirm"); d.textContent=t("delete");
  openSheet("personSheet"); setTimeout(()=>$("pName").focus(),30);
}
$("personForm").addEventListener("submit", async ev=>{
  ev.preventDefault(); personErr("");
  const name=$("pName").value.trim(); if(!name) return personErr(t("errPerson"));
  const id=S.editPerson||uid(), prev=S.editPerson?personById(id):null;
  closeSheets(); toast(t(prev?"personSaved":"personAdded"));
  try{ await store.setPerson(id,{name, createdAt:prev?.createdAt||Date.now()}); renderAll(); }
  catch(e){ toast(saveError(e)); }
});
$("pDelete").addEventListener("click", async ()=>{
  const id=S.editPerson; if(!id) return;
  const n=S.entries.filter(e=>e.type==="debt"&&e.person===id).length;
  if(n) return personErr(t("errPersonHas",n));
  const b=$("pDelete");
  if(!b.classList.contains("confirm")){ b.classList.add("confirm"); b.textContent=t("tapAgain"); return; }
  closeSheets(); if(S.person===id) S.person=null; toast(t("personDeleted"));
  try{ await store.delPerson(id); renderAll(); } catch(e){ toast(saveError(e)); }
});

/* ---------- boot ---------- */
function loadSample(){
  const m=S.month, now=Date.now();
  S.accounts=[
    {id:"s-cash",name:"Cash wallet",kind:"Cash",currency:"IQD",opening:250000,createdAt:1},
    {id:"s-qi",name:"Qi Card",kind:"Prepaid card",currency:"IQD",opening:900000,createdAt:2},
    {id:"s-usd",name:"Dollar cash",kind:"Cash",currency:"USD",opening:300,createdAt:3},
    {id:"s-gbp",name:"Pound cash",kind:"Cash",currency:"GBP",opening:200,createdAt:4},
    {id:"s-apple",name:"Apple Account balance",kind:"Digital wallet",currency:"USD",opening:0,createdAt:5}
  ];
  S.entries=[
    {id:"e1",type:"income",amount:400000,account:"s-qi",category:"Allowance",note:"Monthly allowance",date:m+"-01",createdAt:now-9},
    {id:"e2",type:"transfer",amount:100000,account:"s-qi",toAccount:"s-cash",category:"Transfer",note:"ATM withdrawal",date:m+"-02",createdAt:now-8},
    {id:"e3",type:"expense",amount:6000,account:"s-cash",category:"Food",note:"Lunch at the cafeteria",date:m+"-03",createdAt:now-7},
    {id:"e4",type:"exchange",amount:100,account:"s-gbp",toAccount:"s-cash",toAmount:190000,category:"Exchange",note:"Exchange shop",date:m+"-04",createdAt:now-6},
    {id:"e5",type:"expense",amount:15000,account:"s-cash",category:"Books & Supplies",note:"Lab notebook",date:m+"-05",createdAt:now-5},
    {id:"e6",type:"expense",amount:35000,account:"s-qi",category:"Gym",note:"Monthly membership",date:m+"-06",createdAt:now-4},
    {id:"e7",type:"transfer",amount:10,account:"s-usd",toAccount:"s-apple",category:"Transfer",note:"Gift card top-up",date:m+"-07",createdAt:now-3},
    {id:"e8",type:"expense",amount:2.99,account:"s-apple",category:"Subscriptions",note:"iCloud storage",date:m+"-08",createdAt:now-2},
    {id:"e9",type:"debt",dir:"lent",person:"p-ali",amount:25000,account:"s-cash",currency:"IQD",category:"Debt",note:"For his phone top-up",date:m+"-09",createdAt:now-1},
    {id:"e10",type:"debt",dir:"borrowed",person:"p-hassan",amount:8000,account:"",currency:"IQD",category:"Debt",note:"He paid for my lunch",date:m+"-10",createdAt:now},
    {id:"e11",type:"debt",dir:"collected",person:"p-ali",amount:10000,account:"s-cash",currency:"IQD",category:"Debt",note:"",date:m+"-11",createdAt:now+1}
  ];
  S.people=[{id:"p-ali",name:"Ali",createdAt:1},{id:"p-hassan",name:"Hassan",createdAt:2}];
  sortEntries();
}
function showBanner(key){ S.banner=key||""; $$("[data-banner]").forEach(b=>{ b.textContent=key?t(key):""; b.hidden=!key; }); }

$("fDate").value=today();
setRange("month");
applyLang();

/* ---------- sign in / profile ---------- */
function authMsg(m,ok){ const e=$("authErr"); e.textContent=m||""; e.hidden=!m; e.classList.toggle("ok-msg",!!ok); }
function setAuthMode(m){
  authMode=m; authMsg("");
  $("authNameWrap").hidden = m!=="up";
  $("authPassWrap").hidden = m==="reset";
  $("authH").textContent = t(m==="up"?"signUpH":m==="reset"?"resetH":"signInH");
  $("authSub").textContent = t(m==="up"?"signUpSub":m==="reset"?"resetSub":"signInSub");
  $("authGo").textContent = t(m==="up"?"signUpBtn":m==="reset"?"resetBtn":"signInBtn");
  $("authSwap").textContent = t(m==="up"?"haveAccount":"noAccount");
  $("authForgot").hidden = m!=="in";
  $("aPass").autocomplete = m==="up" ? "new-password" : "current-password";
}
function showAuth(on){ $("auth").hidden=!on; $("app").hidden=on; document.body.classList.toggle("authing",on); }
$("authSwap").addEventListener("click",()=>setAuthMode(authMode==="in"?"up":"in"));
$("authForgot").addEventListener("click",()=>setAuthMode("reset"));
$("authLang").addEventListener("click",()=>$("langBtn").click());
$("authForm").addEventListener("submit", async ev=>{
  ev.preventDefault(); authMsg("");
  if(!sb) return authMsg(t("noConfig"));
  const email=$("aEmail").value.trim(), pass=$("aPass").value, name=$("aFull").value.trim();
  if(!/^\S+@\S+\.\S+$/.test(email)) return authMsg(t("errEmail"));
  if(authMode!=="reset" && pass.length<6) return authMsg(t("errPass"));
  if(authMode==="up" && !name) return authMsg(t("errFull"));
  const btn=$("authGo"); btn.disabled=true;
  try{
    if(authMode==="in"){
      const {error}=await sb.auth.signInWithPassword({email,password:pass}); if(error) throw error;
    } else if(authMode==="up"){
      const {data,error}=await sb.auth.signUp({email,password:pass,options:{data:{full_name:name}, emailRedirectTo:location.href.split("#")[0]}}); if(error) throw error;
      if(!data.session){ setAuthMode("in"); authMsg(t("checkEmail"),true); }
    } else {
      const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:location.href.split("#")[0]}); if(error) throw error;
      setAuthMode("in"); authMsg(t("resetSent"),true);
    }
  }catch(e){
    const m=e?.message||"";
    authMsg(/invalid login/i.test(m)?t("errLogin"):/already registered/i.test(m)?t("errExists"):/confirm/i.test(m)?t("errConfirm"):(m||t("errNet")));
  } finally { btn.disabled=false; }
});
function openMe(){
  if(!ME) return;
  $("meName").textContent=ME.full_name||ME.email; $("meEmail").textContent=ME.email;
  $("meAvatar").textContent=[...(ME.full_name||ME.email||"?").trim()][0].toUpperCase();
  $("meFull").value=ME.full_name||""; $("meAdmin").hidden=ME.role!=="admin";
  $("meLang").textContent=t("langName");
  openSheet("meSheet");
}
$("meBtn").addEventListener("click",openMe);
$("meLang").addEventListener("click",()=>{ $("langBtn").click(); $("meLang").textContent=t("langName"); });
$("meSave").addEventListener("click",async ()=>{
  const n=$("meFull").value.trim(); if(!n||S.demo) return;
  try{ await must(sb.from("profiles").update({full_name:n}).eq("id",ME.id)); ME.full_name=n; paintMe(); toast(t("personSaved")); }
  catch(e){ toast(saveError(e)); }
});
$("meOut").addEventListener("click",async ()=>{ closeSheets(); if(sb) await sb.auth.signOut(); else location.reload(); });
function paintMe(){ const c=[...(ME?.full_name||ME?.email||"?").trim()][0]?.toUpperCase()||"?"; $("meBtn").textContent=c; $("meBtn").setAttribute("aria-label",ME?.full_name||ME?.email||""); }

let bootedFor=null, pendingMsg="";
async function startSession(session){
  if(!session){ bootedFor=null; ME=null; S.accounts=[]; S.entries=[]; S.people=[]; S.accReady=S.entReady=S.pplReady=false; showAuth(true); setAuthMode(authMode==="reset"?"in":authMode); if(pendingMsg){ authMsg(pendingMsg); pendingMsg=""; } return; }
  if(bootedFor===session.user.id) return;
  bootedFor=session.user.id;
  let prof=null, profErr=false;
  try{ prof=(await must(sb.from("profiles").select("*").eq("id",session.user.id).limit(1)))[0]; }catch(e){ profErr=true; }
  if(!profErr && (!prof || prof.disabled)){ pendingMsg=t("errDisabled"); bootedFor=null; await sb.auth.signOut(); return; }
  ME={id:session.user.id, email:session.user.email, full_name:prof?.full_name||session.user.user_metadata?.full_name||"", role:prof?.role||"user"};
  paintMe(); showAuth(false); showBanner("");
  try{ await loadAll(); }catch(e){ showBanner("lost"); }
}
document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible" && ME && !S.demo) loadAll().catch(()=>{}); });

(async()=>{
  if(!sb){
    // no server configured yet: show the sign-in page with a setup note, plus a demo
    showAuth(true); setAuthMode("in"); authMsg(t("noConfig"));
    $("authDemo").hidden=false;
    $("authDemo").addEventListener("click",()=>{ S.demo=true; ME={id:"demo",email:"demo@daftar.app",full_name:"Demo",role:"user"}; paintMe(); loadSample(); S.accReady=S.entReady=S.pplReady=true; showAuth(false); showBanner("demo"); renderAll(); });
    return;
  }
  sb.auth.onAuthStateChange((ev,session)=>{
    if(ev==="PASSWORD_RECOVERY"){ showAuth(false); openMe(); $("meNewPassWrap").hidden=false; return; }
    setTimeout(()=>startSession(session),0);
  });
  const {data}=await sb.auth.getSession(); startSession(data.session);
})();
$("meNewPassBtn").addEventListener("click",async ()=>{
  const p=$("meNewPass").value; if(p.length<6) return toast(t("errPass"));
  const {error}=await sb.auth.updateUser({password:p}); toast(error?(error.message||t("errNet")):t("passChanged"));
  if(!error){ $("meNewPass").value=""; $("meNewPassWrap").hidden=true; }
});
$("meChangePass").addEventListener("click",()=>{ $("meNewPassWrap").hidden=!$("meNewPassWrap").hidden; });
})();
