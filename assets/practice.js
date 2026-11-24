/* 小树 mockup — practice + 家长确认, carrying over every 安安花园 UI rule .
   Checklist (SKILLS.md): random order · shuffled options with relabelled (1)(2)… · one box per part · numeric equivalence ·
   no source info · chips = level / subject / type only · 部分对 = ½ · parent PIN + 我是家长 recovery · no countdown ·
   no listening without audio · sticky safe-area nav · zh / en (Chinese-subject pages Chinese only).
   Progress lives under its own key xiaoshu-mockup.progress.v1 (never the garden's keys). */
(function () {
  "use strict";
  const PROG_KEY = "xiaoshu-mockup.progress.v1", PARENT_KEY = "xiaoshu-mockup.parent.v1", PHRASE = "我是家长";
  Object.assign(XS_I18N.zh, {
    "xp.practice": "练习", "xp.count": "{n} 道题", "xp.back": "‹ 返回", "xp.of": "第 {i} / {n} 道", "xp.prev": "‹ 上一题", "xp.next": "下一题 ›", "xp.finish": "做完了",
    "xp.check": "对答案", "xp.typeHere": "在这里写答案", "xp.right": "对了 ✓", "xp.wrong": "不对，看看讲解", "xp.partial": "部分对（算半题）",
    "xp.answer": "答案", "xp.model": "参考答案", "xp.steps": "讲解", "xp.marking": "家长评分要点", "xp.submit": "交给家长看", "xp.pending": "已交，等家长确认",
    "xp.writeHere": "把你的想法写在这里", "xp.score": "已做 {d} / {n} · 得分 {s}", "xp.parent": "家长确认", "xp.parentN": "家长确认（{n}）",
    "xp.show": "直接看答案（这题不算分）", "xp.revealed": "看了答案，这题不算分", "xp.subj.Mathematics": "数学", "xp.subj.Science": "科学", "xp.subj.Geography": "地理", "xp.subj.History": "历史", "xp.subj.Higher Chinese": "高级华文", "xp.empty": "这个知识点还没有题。",
    "pc.h": "家长确认", "pc.setH": "先设一个 4 位数家长 PIN", "pc.pin": "PIN", "pc.again": "再输一次", "pc.set": "设好 PIN", "pc.enter": "输入家长 PIN",
    "pc.unlock": "打开", "pc.bad": "PIN 不对", "pc.mismatch": "两次输入不一样", "pc.need4": "PIN 要 4 位数字", "pc.forgot": "忘记 PIN？",
    "pc.phraseH": "输入「我是家长」，再设新 PIN", "pc.phrase": "确认语", "pc.reset": "重设 PIN", "pc.badPhrase": "确认语不对", "pc.none": "现在没有要确认的题。",
    "pc.child": "孩子写的", "pc.btn.right": "对", "pc.btn.partial": "部分对", "pc.btn.wrong": "不对", "pc.lock": "锁上", "pc.done": "已确认：{r}",
    "pc.wait": "试错太多次，请 {s} 秒后再试", "pc.rule": "部分对算半题",
    "rl.h": "进度", "rl.reset": "重置进度", "rl.import": "导入进度", "rl.export": "导出进度",
    "rl.needs": "「{label}」需要家长 PIN。", "rl.setH": "还没设过家长 PIN。要「{label}」，请爸爸妈妈先设一个 4 位数字 PIN。", "rl.enterH": "输入家长 PIN", "rl.ok": "确定",
    "rl.wrongLeft": "PIN 不对，还可以试 {n} 次。", "rl.locked": "输错 5 次，已锁定。请 {t} 后再试。", "rl.forgot": "忘记 PIN？", "rl.back": "← 我想起来了",
    "rl.forgotH": "输入「我是家长」，再设新 PIN。这只能重设 PIN，不能重置进度，进度不会丢。", "rl.newSetEnter": "新 PIN 设好了，请输入新 PIN 继续。「我是家长」不能用来重置进度。",
    "rl.cancel": "再想想", "reset.title": "要把进度清零吗？", "reset.body": "所有做题记录都会清掉。想留一份的话，先点「导出进度」。", "reset.yes": "确定清零",
    "import.title": "用这个文件覆盖现在的进度吗？", "import.body": "现在的进度会被文件里的替换，换了就找不回来。", "import.yes": "确定覆盖",
    "rl.done.reset": "进度已经清零", "rl.done.import": "进度已导入", "rl.badFile": "这个文件读不了，进度没有变。", "rl.close": "关闭",
    "xp.tapOrder": "按顺序点下面的选项", "xp.yourOrder": "你的顺序", "xp.clear": "重来", "xp.pickAll": "选出所有符合的（可多选）", "xp.exprHint": "x² 可以写成 x^2，乘号可以省略，例如 3x(2y − 1)"
  });
  Object.assign(XS_I18N.en, {
    "xp.practice": "Practise", "xp.count": "{n} questions", "xp.back": "‹ Back", "xp.of": "Question {i} of {n}", "xp.prev": "‹ Previous", "xp.next": "Next ›", "xp.finish": "Done",
    "xp.check": "Check", "xp.typeHere": "Type your answer here", "xp.right": "Correct ✓", "xp.wrong": "Not quite — see the explanation", "xp.partial": "Partly correct (counts as half)",
    "xp.answer": "Answer", "xp.model": "Model answer", "xp.steps": "Explanation", "xp.marking": "Marking points for parents", "xp.submit": "Send to a parent", "xp.pending": "Sent — waiting for a parent to check",
    "xp.writeHere": "Write your answer here", "xp.score": "Done {d} / {n} · score {s}", "xp.parent": "Parent check", "xp.parentN": "Parent check ({n})",
    "xp.show": "Show the answer (this one won't count)", "xp.revealed": "Answer shown — not counted", "xp.subj.Mathematics": "Mathematics", "xp.subj.Science": "Science", "xp.subj.Geography": "Geography", "xp.subj.History": "History", "xp.subj.Higher Chinese": "Higher Chinese", "xp.empty": "No questions for this point yet.",
    "pc.h": "Parent check", "pc.setH": "First set a 4-digit parent PIN", "pc.pin": "PIN", "pc.again": "Again", "pc.set": "Set PIN", "pc.enter": "Enter the parent PIN",
    "pc.unlock": "Open", "pc.bad": "Wrong PIN", "pc.mismatch": "The two PINs differ", "pc.need4": "The PIN must be 4 digits", "pc.forgot": "Forgot the PIN?",
    "pc.phraseH": "Type the parent phrase, then set a new PIN", "pc.phrase": "Phrase", "pc.reset": "Reset PIN", "pc.badPhrase": "That phrase is not right", "pc.none": "Nothing to check right now.",
    "pc.child": "Your child wrote", "pc.btn.right": "Correct", "pc.btn.partial": "Partly correct", "pc.btn.wrong": "Wrong", "pc.lock": "Lock", "pc.done": "Checked: {r}",
    "pc.wait": "Too many tries — wait {s} s", "pc.rule": "Partly correct counts as half",
    "rl.h": "Progress", "rl.reset": "Start over", "rl.import": "Load progress", "rl.export": "Download progress",
    "rl.needs": "\"{label}\" needs the parent PIN.", "rl.setH": "No parent PIN yet. To use \"{label}\", a parent must first set a 4-digit PIN.", "rl.enterH": "Enter the parent PIN", "rl.ok": "OK",
    "rl.wrongLeft": "Wrong PIN. {n} tries left.", "rl.locked": "5 wrong tries. Locked. Please try again in {t}.", "rl.forgot": "Forgot the PIN?", "rl.back": "← I remember it now",
    "rl.forgotH": "Type the parent phrase, then set a new PIN. This only changes the PIN. It can't start over, and progress is kept.", "rl.newSetEnter": "The new PIN is set. Enter it to continue. The parent phrase can't be used to start over.",
    "rl.cancel": "Not now", "reset.title": "Start over?", "reset.body": "All practice records will be cleared. To keep a copy, tap \"Download progress\" first.", "reset.yes": "Yes, start over",
    "import.title": "Replace your progress with this file?", "import.body": "Your current progress will be replaced by the file and can't be brought back.", "import.yes": "Yes, replace it",
    "rl.done.reset": "Progress cleared", "rl.done.import": "Progress loaded", "rl.badFile": "This file can't be read. Progress is unchanged.", "rl.close": "Close",
    "xp.tapOrder": "Tap the items in order", "xp.yourOrder": "Your order", "xp.clear": "Clear", "xp.pickAll": "Select all that apply", "xp.exprHint": "Type x² as x^2; you can leave out ×, e.g. 3x(2y − 1)"
  });
  const QTYPE_EN = { "选择题": "Multiple choice", "简答题": "Short answer", "分题作答": "Structured", "开放题": "Open-ended" };
  const B = window.XS_BANK || { questions: [], byKp: {} };
  const byId = {}; B.questions.forEach(q => { byId[q.id] = q; });
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const rich = s => esc(s).replace(/\n/g, "<br>");
  /* ---------- progress (own key) ---------- */
  function load() { try { const o = JSON.parse(localStorage.getItem(PROG_KEY) || "{}"); return { marks: o.marks || {}, open: o.open || {} }; } catch (e) { return { marks: {}, open: {} }; } }
  let store = load();
  const save = () => { try { localStorage.setItem(PROG_KEY, JSON.stringify(store)); } catch (e) {} };
  const credit = m => m === "right" ? 1 : m === "partial" ? 0.5 : 0;          // 对 = 1, 部分对 = ½, 不对 = 0
  function statusOf(id) { const o = store.open[id]; if (o) return o.status; return store.marks[id] || null; }
  function scoreFor(kp) { const ids = B.byKp[kp] || []; let d = 0, s = 0; ids.forEach(id => { const st = statusOf(id); if (st) { d++; s += credit(st); } }); return { d, s, n: ids.length }; }
  /* ---------- answer checking (same rules as the garden: numerically equal is right unless a form is named) ---------- */
  function valOf(input) {
    let m0;
    let s = String(input == null ? "" : input).normalize("NFKC").toLowerCase().replace(/[−–—]/g, "-").replace(/\s+/g, " ").trim().replace(/[。.]+$/, "");
    s = s.replace(/\s*(°\s*[cf]|℃|℉|°|%)$/, "");   // °C and °F (Ch14 conversion graph)
    s = s.replace(/^(?:\d+(?:st|nd|rd|th) )?[a-z\u4e00-\u9fff][a-z\u4e00-\u9fff' ]{0,40}?\s*=\s*/, "").replace(/^(about|approximately|约|≈|~)\s*/, "").replace(/^(us\$|s\$|rm|¥|£|€)\s*/, "").replace(/^(pattern|figure|row|diagram)\s+(?=\d)/, "").replace(/\$/g, "").trim();   // currency in front (S$, US$, RM, ¥) as in the Ch8 money items
    s = s.replace(/\s*虚拟币$/, "");   // virtual coins after the number (Maths v2, 2026-11-24)
    if ((m0 = s.match(/^(-?\d+(?: \d+)? ?\/ ?\d+)\s*[a-z]+(?:\/[a-z]+)?[23]?(?: [a-z]+){0,2}$/))) s = m0[1];   // a unit after a fraction or mixed number: 65/12 kg, 7 1/3 litres, 100/9 km/h
    let m;
    if ((m = s.match(/^(-?\d+) (\d+) ?\/ ?(\d+)$/))) { const w = +m[1], v = (Math.abs(w) * +m[3] + +m[2]) / +m[3]; return m[1].startsWith("-") ? -v : v; }   // −1 5/12 = −(1 + 5/12)
    if ((m = s.match(/^(-?\d+) ?\/ ?(\d+)$/))) return +m[2] ? +m[1] / +m[2] : null;
    if ((m = s.match(/^(-?(?:\d{1,3}(?:[ ,]\d{3})+|\d+)(?:\.\d+)?|-?\.\d+)\s*([a-z]+(?:\/[a-z]+)?[23]?(?: [a-z]+){0,2})?$/))) return Number(m[1].replace(/[ ,]/g, ""));   // a unit after the number: kwh, litres, km/h, m/s, cm² (NFKC → cm2)
    return null;
  }
  const numOk = (want, input, tol) => { const v = valOf(input); return v !== null && Math.abs(v - want) <= (tol ? tol + 1e-9 : 1e-9); };   // tol: measured answers (constructions), e.g. ±0.2 cm or ±1°
  function isPrime(n) { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; }
  // "2^4 × 3^3 × 5^2", "2⁴×3³×5²", "2x2x2x2x3x3x3x5x5", "10800 = 2^4*…": every base prime and the product right;
  // when the question names index notation, each prime must appear once with its index.
  function pfOk(n, index, input) {
    const sup = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };
    let s = String(input || "").replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, m => "^" + m.split("").map(c => sup[c]).join(""));
    s = s.normalize("NFKC").replace(/\s+/g, "").replace(/^[^=]*=/, "").replace(/[x*·•✕✖]/gi, "×");
    if (!s || /[^0-9^×]/.test(s)) return false;
    const seen = {}; let prod = 1;
    for (const tok of s.split("×")) {
      const m = tok.match(/^(\d+)(?:\^(\d+))?$/); if (!m) return false;
      const p = +m[1], e = m[2] ? +m[2] : 1; if (!isPrime(p) || e < 1) return false;
      if (index && seen[p]) return false; seen[p] = 1; prod *= Math.pow(p, e);
    }
    return prod === n;
  }
  // form named in the question (significant figures, decimal places, a time): the written form must match one accepted answer
  const normForm = x => String(x == null ? "" : x).normalize("NFKC").toLowerCase().replace(/[−–—]/g, "-").replace(/(\d),(?=\d{3}\b)/g, "$1").replace(/\s+/g, "")
    .replace(/^[a-z]=/, "").replace(/[。]+$/, "").replace(/(cm|mm|km\/h|m\/s|km|kg|g|m|°c|℃|°|s\$|\$)$/g, "").replace(/^(s\$|\$)/, "");
  const exactOk = (list, input) => list.some(a => normForm(a) === normForm(input) && normForm(input) !== "");
  // "express as a fraction (in its simplest form)": the value must match and, when named, the fraction must be in lowest terms
  function fracOk(n, d, simplest, input) {
    const s = String(input == null ? "" : input).normalize("NFKC").replace(/[−–—]/g, "-").replace(/\s+/g, " ").trim().replace(/^[a-z\u4e00-\u9fff][a-z\u4e00-\u9fff' ]{0,40}?\s*=\s*/i, "")
      .replace(/^(us\$|s\$|rm|\$)\s*/i, "").replace(/(\d)\s*(?:[a-z]+(?:\/[a-z]+)?[23]?|°)$/i, "$1").trim();
    const g = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
    let m, a, b, w = 0, neg = false;
    if ((m = s.match(/^(-)?(\d+) (\d+) ?\/ ?(\d+)$/))) { neg = !!m[1]; w = +m[2]; a = +m[3]; b = +m[4]; if (!b || a >= b) return false; }
    else if ((m = s.match(/^(-)?(\d+) ?\/ ?(\d+)$/))) { neg = !!m[1]; a = +m[2]; b = +m[3]; if (!b) return false; }
    else if ((m = s.match(/^(-)?(\d+)$/))) { neg = !!m[1]; a = +m[2]; b = 1; }
    else return false;
    if (simplest && g(a, b) !== 1) return false;
    if (simplest && b === 1 && d !== 1) return false;
    const num = (w * b + a) * (neg ? -1 : 1);
    return num * d === n * b;
  }
  function numsetOk(want, input) { const got = (String(input).normalize("NFKC").replace(/[−–—]/g, "-").match(/-?\d+(?:\.\d+)?/g) || []).map(Number).sort((a, b) => a - b); const w = want.slice().sort((a, b) => a - b); return got.length === w.length && got.every((x, i) => x === w[i]); }
  // algebra answers (Ch4–7): the typed expression must equal the answer at several test values; when the question names a form,
  // the form must match too — "expand and simplify" = like terms collected, no brackets; "factorise completely" = a product whose
  // brackets have integer coefficients with no common factor; "single fraction" = one division by a whole number. Mirrors scripts/orig_sec1/alg.py.
  const EX = (() => {
    const SUPX = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };
    const norm = s => String(s == null ? "" : s).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, m => "^" + m.split("").map(c => SUPX[c]).join("")).normalize("NFKC")
      .replace(/[−–—]/g, "-").replace(/[×✕·•]/g, "*").replace(/÷/g, "/").replace(/\s+/g, "");
    function toks(s) {
      const out = []; let i = 0;
      while (i < s.length) {
        const c = s[i];
        if (/[0-9.]/.test(c)) { let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++; const v = s.slice(i, j); if (!/^\d*\.?\d+$|^\d+\.$/.test(v)) return null; out.push(["n", parseFloat(v)]); i = j; continue; }
        if (/[a-zA-Z]/.test(c)) { out.push(["v", c]); i++; continue; }
        if ("+-*/^()".includes(c)) { out.push(["o", c]); i++; continue; }
        return null;
      }
      const res = [];
      for (const t of out) { const p = res[res.length - 1]; if (p && (t[0] !== "o" || t[1] === "(") && (p[0] !== "o" || p[1] === ")") && !(p[0] === "v" && t[0] === "n")) res.push(["o", "*"]); res.push(t); }
      return res;
    }
    function parse(s) {
      const t = toks(norm(s)); if (!t || !t.length) return null; let i = 0;
      const peek = () => t[i] || [null, null], is = (o) => peek()[0] === "o" && peek()[1] === o, take = () => t[i++];
      function expr() { const terms = []; let sg = 1; if (is("-") || is("+")) sg = take()[1] === "-" ? -1 : 1; terms.push([sg, term()]); while (is("+") || is("-")) { const g = take()[1] === "-" ? -1 : 1; terms.push([g, term()]); } return terms.length === 1 && terms[0][0] === 1 ? terms[0][1] : ["add", terms]; }
      function term() { const fs = [[false, power()]]; while (is("*") || is("/")) { const inv = take()[1] === "/"; fs.push([inv, power()]); } return fs.length === 1 ? fs[0][1] : ["mul", fs]; }
      function power() { const b = atom(); if (is("^")) { take(); let sg = 1; if (is("-")) { take(); sg = -1; } const k = take(); if (!k || k[0] !== "n" || !Number.isInteger(k[1])) throw 0; return ["pow", b, sg * k[1]]; } return b; }
      function atom() { const k = take(); if (!k) throw 0; if (k[0] === "n") return ["num", k[1]]; if (k[0] === "v") return ["var", k[1]]; if (k[1] === "(") { const e = expr(); const c = take(); if (!c || c[1] !== ")") throw 0; return ["par", e]; } if (k[1] === "-") return ["add", [[-1, power()]]]; throw 0; }
      try { const e = expr(); return i === t.length ? e : null; } catch (e) { return null; }
    }
    function ev(n, env) {
      switch (n[0]) { case "num": return n[1]; case "var": return n[1] in env ? env[n[1]] : NaN; case "par": return ev(n[1], env);
        case "add": return n[1].reduce((a, [g, x]) => a + g * ev(x, env), 0);
        case "mul": return n[1].reduce((a, [inv, x]) => inv ? a / ev(x, env) : a * ev(x, env), 1);
        case "pow": return Math.pow(ev(n[1], env), n[2]); }
    }
    const un = n => { while (n && n[0] === "par") n = n[1]; return n; };
    function mono(n) {
      let c = 1; const sig = {};
      function walk(x, inv) { x = un(x);
        if (x[0] === "num") { c = inv ? c / x[1] : c * x[1]; return true; }
        if (x[0] === "var") { if (inv) return false; sig[x[1]] = (sig[x[1]] || 0) + 1; return true; }
        if (x[0] === "pow" && un(x[1])[0] === "var" && !inv) { const v = un(x[1])[1]; sig[v] = (sig[v] || 0) + x[2]; return true; }
        if (x[0] === "pow" && un(x[1])[0] === "num") { const v = Math.pow(un(x[1])[1], x[2]); c = inv ? c / v : c * v; return true; }
        if (x[0] === "mul") return x[1].every(([i2, y]) => walk(y, inv !== i2));
        if (x[0] === "add" && x[1].length === 1) { c = -c; return walk(x[1][0][1], inv); }
        return false; }
      if (!walk(n, false)) return null;
      return [c, Object.keys(sig).sort().map(k => k + sig[k]).join(".")];
    }
    const terms = n => { n = un(n); return n[0] === "add" ? n[1] : [[1, n]]; };
    function expanded(n) { const seen = new Set(); for (const [, t] of terms(n)) { const m = mono(t); if (!m || Math.abs(m[0]) < 1e-12 || seen.has(m[1])) return false; seen.add(m[1]); } return true; }
    const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
    function polyOk(n) { const ts = terms(n); if (ts.length < 2) return false; const ms = ts.map(([, t]) => mono(t)); if (ms.some(m => !m || !Number.isInteger(Math.round(m[0] * 1e9) / 1e9))) return false;
      if (ms.reduce((g, m) => gcd(g, Math.round(m[0])), 0) !== 1) return false;
      const vs = ms.map(m => new Set(m[1] ? m[1].split(".").map(x => x[0]) : [])); return ![...vs[0]].some(v => vs.every(s => s.has(v))); }
    const isBr = x => { x = un(x); return x[0] === "add" && x[1].length > 1; };
    function factorised(n) { n = un(n); if (n[0] === "add" && n[1].length === 1) n = un(n[1][0][1]); if (n[0] !== "mul") return false;
      const br = n[1].filter(([, x]) => isBr(x)); if (!br.length || n[1].some(([inv]) => inv)) return false;
      return br.every(([, b]) => polyOk(un(b))) && n[1].filter(([, x]) => !isBr(x)).every(([, o]) => mono(o)); }
    function single(n) { n = un(n); if (n[0] === "add" && n[1].length === 1) n = un(n[1][0][1]); if (n[0] !== "mul") return false; const inv = n[1].filter(([i]) => i);
      return inv.length === 1 && un(inv[0][1])[0] === "num" && Number.isInteger(un(inv[0][1])[1]); }
    const vars = n => { const s = new Set(); (function w(x) { if (!x) return; if (x[0] === "var") s.add(x[1]); else if (x[0] === "par") w(x[1]); else if (x[0] === "pow") w(x[1]); else if (x[0] === "add" || x[0] === "mul") x[1].forEach(([, y]) => w(y)); })(n); return s; };
    const PTS = [1.5, -7 / 3, 5, 2 / 7, -11 / 4, 13 / 5, -1 / 6];
    const UNIT = /(?:^|[\s)\d])((?:cm|mm|km|m|kg|g|ml|l|litres?|years?|yrs?|days?|weeks?|hours?|h|minutes?|mins?|seconds?|s)(?:[²³23])?|°|%)\s*$/i;
    function strip(spec, input) {
      let s = String(input == null ? "" : input).replace(/＄/g, "$").trim().replace(/^(us\$|s\$|rm)\s*/i, "").replace(/\$/g, "").replace(/[。.]+$/, "").trim();
      const m = s.match(UNIT), b = m && parse(spec.expr);
      if (m && b) { const vb = vars(b), letters = m[1].replace(/[^a-z]/gi, ""); if (!letters || ![...letters].every(c => vb.has(c))) s = s.slice(0, m.index + (/^[)\d]/.test(m[0]) ? 1 : 0)).trim(); }
      return s;
    }
    function ok(spec, input) {   // spec: {expr, form, lhs}
      let s = norm(strip(spec, input)); if (!s) return false;
      const lhs = spec.lhs ? norm(spec.lhs).toLowerCase() : null;
      const m = s.match(/^([A-Za-z]+(?:_?[a-z0-9]+)?)=(.*)$/); if (m) { if (lhs && m[1].toLowerCase().replace("_", "") !== lhs.replace("_", "")) return false; if (!lhs && m[1].length > 1) return false; s = m[2]; }
      const a = parse(s), b = parse(spec.expr); if (!a || !b) return false;
      const va = vars(a), vb = vars(b); for (const v of va) if (!vb.has(v)) return false;
      const V = [...vb].sort();
      for (let k = 0; k < 6; k++) { const env = {}; V.forEach((v, j) => env[v] = PTS[(k + 2 * j) % PTS.length] + j); const x = ev(a, env), y = ev(b, env);
        if (!isFinite(y)) continue; if (!isFinite(x) || Math.abs(x - y) > 1e-9 * Math.max(1, Math.abs(y))) return false; }
      return spec.form === "expanded" ? expanded(a) : spec.form === "factorised" ? factorised(a) : spec.form === "single" ? single(a) : true;
    }
    return { ok, parse };
  })();
  const exprOk = (spec, input) => EX.ok(spec, input);
  /* ---------- sessions: fresh random order + shuffled options each time ---------- */
  function rnd(n) { if (window.crypto && crypto.getRandomValues) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; } return Math.floor(Math.random() * n); }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const S = { kp: null, order: [], perm: {}, sel: {}, i: 0, res: {} };
  function start(kp) {
    store = load(); const ids = (B.byKp[kp] || []).slice();
    const tiers = [[], [], []]; ids.forEach(id => { const st = statusOf(id); tiers[!st ? 0 : st === "right" ? 2 : 1].push(id); });   // not done first, then not right, then right
    store = load(); S.kp = kp; S.order = [].concat(...tiers.map(shuffle)); S.perm = {}; S.sel = {}; S.i = 0; S.res = {};
    S.order.forEach(id => { const q = byId[id]; if (q.mode === "choice" || q.mode === "pick") S.perm[id] = shuffle(q.options.map((_, k) => k)); if (q.mode === "order") S.perm[id] = shuffle(q.items.map((_, k) => k)); });
  }
  window.__xs = { S, pfOk, numOk, valOf, exactOk, fracOk, numsetOk, exprOk, spreadList, bestOrder, store: () => store, goTo: id => { S.i = S.order.indexOf(id); render(); } };          // read by test_parity.js only
  /* ---------- rendering ---------- */
  const chips = q => [q.level, t("xp.subj." + q.subject), uiLang() === "en" ? (QTYPE_EN[q.type_zh] || q.type) : q.type_zh].map(c => `<span class="chip">${esc(c)}</span>`).join("");
  function answerHTML(q) {
    let h = `<div class="xp-ans">`;
    if (q.mode === "multi") h += `<div class="k">${t(q.parts.some(p => p.kind === "parent") ? "xp.model" : "xp.answer")}</div><ul>${q.parts.map(p => `<li><b>${esc(p.label)}</b> <span class="content">${rich(p.answer)}</span>${p.marking ? `<div class="mp">${t("xp.marking")}: <span class="content">${p.marking.map(esc).join("; ")}</span></div>` : ""}</li>`).join("")}</ul>`;
    else if (q.mode === "choice") { const pos = S.perm[q.id].indexOf(q.answer_index); h += `<div class="k">${t("xp.answer")}</div><div class="content">(${pos + 1}) ${esc(q.options[q.answer_index])}</div>`; }
    else if (q.mode === "order") h += `<div class="k">${t("xp.answer")}</div><div class="content">${q.items.map(esc).join(", ")}</div>`;
    else if (q.mode === "pick") h += `<div class="k">${t("xp.answer")}</div><div class="content">${q.answer_set.map(k => esc(q.options[k])).join(", ")}</div>`;
    else h += `<div class="k">${t(q.mode === "parent" ? "xp.model" : "xp.answer")}</div><div class="content">${rich(q.answer)}</div>`;
    if (q.mode === "parent" && q.marking) h += `<div class="k">${t("xp.marking")}</div><div class="content">${q.marking.map(esc).join("<br>")}</div>`;
    const steps = String(q.explanation || "").split("\n").filter(x => x.trim());
    if (steps.length) h += `<div class="k">${t("xp.steps")}</div><div class="steps content">${steps.map(x => `<p${/^\s*\d* ?\| /.test(x) ? ' class="lad"' : ""}>${esc(x)}</p>`).join("")}</div>`;
    return h + `</div>`;
  }
  function resultHTML(r) { return r ? `<p class="xp-res ${r}">${t(r === "right" ? "xp.right" : r === "partial" ? "xp.partial" : r === "revealed" ? "xp.revealed" : r === "pending" ? "xp.pending" : "xp.wrong")}</p>` : ""; }
  function box(q, k, done, val) { return `<input class="xp-in" data-part="${k}" type="text" inputmode="text" autocomplete="off" autocapitalize="off" placeholder="${t("xp.typeHere")}" value="${esc(val || "")}"${done ? " disabled" : ""}>`; }
  function bodyHTML(q) {
    const r = S.res[q.id] || {}; const done = !!r.result; let h = "";
    if (q.mode === "choice") {
      h += `<ol class="xp-opts">${S.perm[q.id].map((k, pos) => `<li><button type="button" class="xp-opt${done && k === q.answer_index ? " ok" : ""}${done && k === r.pick && k !== q.answer_index ? " no" : ""}" data-pick="${k}"${done ? " disabled" : ""}><b>(${pos + 1})</b> <span class="content">${esc(q.options[k])}</span></button></li>`).join("")}</ol>`;
    } else if (q.mode === "multi") {
      h += `<div class="xp-parts">${q.parts.map((p, k) => `<div class="xp-part"><label><b>${esc(p.label)}</b></label>${p.kind === "parent" ? `<textarea class="xp-in" data-part="${k}" rows="3" placeholder="${t("xp.writeHere")}"${done ? " disabled" : ""}>${esc((r.typed || [])[k] || "")}</textarea>` : box(q, k, done, (r.typed || [])[k])}${done && r.parts ? `<span class="pr ${r.parts[k]}">${r.parts[k] === "right" ? "✓" : r.parts[k] === "pending" ? "…" : "✗"}</span>` : ""}</div>`).join("")}</div>`;
      if (!done && q.parts.some(p => p.kind === "expr")) h += `<p class="note xp-hint">${t("xp.exprHint")}</p>`;
      if (!done) h += `<button type="button" class="xp-btn" data-check="1">${t(q.parts.some(p => p.kind === "parent") ? "xp.submit" : "xp.check")}</button>`;
    } else if (q.mode === "order" || q.mode === "pick") {
      const sel = done ? (r.sel || []) : (S.sel[q.id] || []); const list = q.mode === "order" ? q.items : q.options;
      h += `<p class="note">${t(q.mode === "order" ? "xp.tapOrder" : "xp.pickAll")}</p><div class="xp-tap">${S.perm[q.id].map(k => `<button type="button" class="xp-chip${sel.includes(k) ? " on" : ""}${done && q.mode === "pick" && q.answer_set.includes(k) ? " ok" : ""}" data-tap="${k}"${done || (q.mode === "order" && sel.includes(k)) ? " disabled" : ""}><span class="content">${esc(list[k])}</span></button>`).join("")}</div>`;
      if (q.mode === "order") h += `<p class="xp-seq"><b>${t("xp.yourOrder")}:</b> <span class="content">${sel.map(k => esc(list[k])).join(", ") || "…"}</span></p>`;
      if (!done) h += `<div class="xp-row"><button type="button" class="xp-btn" data-check="1"${sel.length ? "" : " disabled"}>${t("xp.check")}</button>${q.mode === "order" ? `<button type="button" class="xp-link" data-clear="1">${t("xp.clear")}</button>` : ""}</div>`;
    } else if (q.mode === "parent") {
      const o = store.open[q.id];
      h += `<textarea class="xp-in" data-part="0" rows="4" placeholder="${t("xp.writeHere")}"${o ? " disabled" : ""}>${esc(o ? o.text : "")}</textarea>`;
      if (!o) h += `<button type="button" class="xp-btn" data-check="1">${t("xp.submit")}</button>`;
    } else {
      h += box(q, 0, done, (r.typed || [])[0]); if (q.mode === "expr" && !done) h += `<p class="note xp-hint">${t("xp.exprHint")}</p>`; if (!done) h += `<button type="button" class="xp-btn" data-check="1">${t("xp.check")}</button>`;
    }
    const o = store.open[q.id];
    const res = r.result || (o ? (o.status === "pending" ? "pending" : o.status) : null);
    h += resultHTML(res);
    if (!res) h += `<button type="button" class="xp-link" data-reveal="1">${t("xp.show")}</button>`;
    if (res) h += answerHTML(q);
    return h;
  }
  function pendingN() { return Object.values(store.open).filter(o => o.status === "pending" || (o.parts && o.parts.some(p => p === "pending"))).length; }
  function render() {
    const el = document.getElementById("practice"); const n = S.order.length;
    if (!n) { el.innerHTML = `<div class="top"><a class="back" href="#home">${t("xp.back")}</a>${TAGS()}</div><p class="note">${t("xp.empty")}</p>`; return; }
    const q = byId[S.order[S.i]], sc = scoreFor(S.kp);
    el.innerHTML = `<div class="top"><a class="back" href="#s=math">${t("xp.back")}</a>${TAGS()}</div>
      <div class="xp-head"><span>${t("xp.score", { d: sc.d, n: sc.n, s: sc.s })}</span><a class="xp-pc" href="#parent">${pendingN() ? t("xp.parentN", { n: pendingN() }) : t("xp.parent")}</a></div>
      <div class="xp-card"><div class="chips">${chips(q)}</div><p class="xp-stem content">${rich(q.stem)}</p>${bodyHTML(q)}
      <nav class="practice-nav"><button type="button" class="btn-nav" data-nav="-1"${S.i ? "" : " disabled"}>${t("xp.prev")}</button><span class="xp-pos">${t("xp.of", { i: S.i + 1, n })}</span><button type="button" class="btn-nav next" data-nav="1">${S.i < n - 1 ? t("xp.next") : t("xp.finish")}</button></nav></div>`;
  }
  function partOk(p, v) {
    return p.kind === "pf" ? pfOk(p.pf, p.index, v) : p.kind === "exact" ? exactOk(p.exact, v) : p.kind === "frac" ? fracOk(p.frac[0], p.frac[1], p.simplest, v) : p.kind === "expr" ? exprOk(p, v) : numOk(p.val, v, p.tol);
  }
  const LIST_SEP = /\s*(?:;|；|，|、|,(?!\d{3}(?!\d))|\band\b|和)\s*/i;
  function spreadList(ps, vals) {
    const g = vals.slice();
    for (let k = 0; k < ps.length; k++) {
      if (!String(g[k] || "").trim() || ps[k].kind === "parent") continue;
      const bits = String(g[k]).split(LIST_SEP).map(x => x.trim()).filter(Boolean);
      if (bits.length < 2 || k + bits.length > ps.length) continue;
      let free = true; for (let j = k + 1; j < k + bits.length; j++) if (String(g[j] || "").trim() || ps[j].kind === "parent") free = false;
      if (!free) continue;
      bits.forEach((b, j) => g[k + j] = b); k += bits.length - 1;
    }
    return g;
  }
  function bestOrder(ps, g) {   // any_order: the arrangement of the typed values with the most right boxes
    const idx = ps.map((p, k) => k).filter(k => ps[k].kind !== "parent"); if (idx.length > 6) return g;
    let best = g, bestN = -1;
    (function perm(a, l) { if (l === a.length) { const t = g.slice(); idx.forEach((k, i) => t[k] = g[a[i]]); const n = idx.filter(k => partOk(ps[k], t[k])).length; if (n > bestN) { bestN = n; best = t; } return; }
      for (let i = l; i < a.length; i++) { [a[l], a[i]] = [a[i], a[l]]; perm(a, l + 1); [a[l], a[i]] = [a[i], a[l]]; } })(idx.slice(), 0);
    return best;
  }
  function checkTap(q) {   // order / pick modes: tapped choices, no typing
    const sel = S.sel[q.id] || [];
    if (!sel.length) return;
    let ok;
    if (q.mode === "order") ok = sel.length === q.items.length && sel.every((k, i) => k === i);
    else { const want = q.answer_set.slice().sort((a, b) => a - b), got = sel.slice().sort((a, b) => a - b); ok = want.length === got.length && want.every((x, i) => x === got[i]); }
    const res = ok ? "right" : "wrong"; S.res[q.id] = { result: res, sel: sel.slice() }; store.marks[q.id] = res; save(); render();
  }
  function check(q) {
    if (q.mode === "order" || q.mode === "pick") return checkTap(q);
    const el = document.getElementById("practice"); const vals = [...el.querySelectorAll(".xp-in")].map(x => x.value);
    if (!vals.some(v => v.trim())) { const f = el.querySelector(".xp-in"); f && f.focus(); return; }
    if (q.mode === "parent") { store.open[q.id] = { kp: q.kp, text: vals[0].trim(), status: "pending" }; save(); render(); return; }
    let res, parts;
    if (q.mode === "multi") {
      const g = spreadList(q.parts, vals), ord = q.any_order ? bestOrder(q.parts, g) : g;
      parts = q.parts.map((p, k) => p.kind === "parent" ? "pending" : partOk(p, ord[k]) ? "right" : "wrong");
      const auto = parts.filter(x => x !== "pending"), sR = auto.filter(x => x === "right").length;
      if (parts.includes("pending")) { store.open[q.id] = { kp: q.kp, text: vals.join("\n"), parts, status: "pending" }; save(); S.res[q.id] = { typed: vals, result: "pending", parts }; render(); return; }
      res = sR === parts.length ? "right" : sR === 0 ? "wrong" : "partial";                // all = 对, none = 不对, otherwise 部分对 (½)
    } else if (q.mode === "pf") res = pfOk(q.pf, q.index, vals[0]) ? "right" : "wrong";
    else if (q.mode === "exact") res = exactOk(q.exact, vals[0]) ? "right" : "wrong";
    else if (q.mode === "frac") res = fracOk(q.frac[0], q.frac[1], q.simplest, vals[0]) ? "right" : "wrong";
    else if (q.mode === "numset") res = numsetOk(q.numset, vals[0]) ? "right" : "wrong";
    else if (q.mode === "expr") res = exprOk(q, vals[0]) ? "right" : "wrong";
    else res = numOk(q.val, vals[0], q.tol) ? "right" : "wrong";
    S.res[q.id] = { typed: vals, result: res, parts }; store.marks[q.id] = res; save(); render();
  }
  document.addEventListener("click", e => {
    const el = document.getElementById("practice"); if (!el || !el.classList.contains("on") || !el.contains(e.target)) return;
    const q = byId[S.order[S.i]]; const nav = e.target.closest("[data-nav]");
    if (nav && !nav.disabled) { const k = S.i + Number(nav.dataset.nav); if (k >= S.order.length) { location.hash = "#s=math"; return; } S.i = Math.max(0, k); render(); window.scrollTo(0, 0); return; }
    const pick = e.target.closest("[data-pick]");
    if (pick && !pick.disabled) { const k = Number(pick.dataset.pick), res = k === q.answer_index ? "right" : "wrong"; S.res[q.id] = { pick: k, result: res }; store.marks[q.id] = res; save(); render(); return; }
    const tap = e.target.closest("[data-tap]");
    if (tap && !tap.disabled) { const k = Number(tap.dataset.tap), sel = S.sel[q.id] = S.sel[q.id] || []; const at = sel.indexOf(k);
      if (q.mode === "pick" && at >= 0) sel.splice(at, 1); else if (at < 0) sel.push(k); render(); return; }
    if (e.target.closest("[data-clear]")) { S.sel[q.id] = []; render(); return; }
    if (e.target.closest("[data-check]")) { check(q); return; }
    if (e.target.closest("[data-reveal]")) { S.res[q.id] = { result: "revealed" }; render(); }
  });
  document.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.matches && e.target.matches("input.xp-in")) { e.preventDefault(); const q = byId[S.order[S.i]]; check(q); } });
  /* ---------- 家长确认: PIN (salted SHA-256, own key) + 我是家长 recovery ---------- */
  function sha256(ascii) {  // small pure-JS SHA-256 (works on file:// too)
    const r = (v, a) => (v >>> a) | (v << (32 - a)); const K = [], H = []; let p = 2, n = 0;
    const isP = c => { for (let d = 2; d * d <= c; d++) if (c % d === 0) return false; return true; };
    while (n < 64) { if (isP(p)) { if (n < 8) H[n] = (Math.pow(p, 1 / 2) * 4294967296) | 0; K[n++] = (Math.pow(p, 1 / 3) * 4294967296) | 0; } p++; }
    const bytes = unescape(encodeURIComponent(ascii)); const words = []; const L = bytes.length * 8;
    for (let i = 0; i < bytes.length; i++) words[i >> 2] |= bytes.charCodeAt(i) << ((3 - i % 4) * 8);
    words[L >> 5] |= 0x80 << (24 - L % 32); words[(((L + 64) >> 9) << 4) + 15] = L;
    let h = H.slice();
    for (let j = 0; j < words.length; j += 16) {
      const w = words.slice(j, j + 16); const o = h.slice();
      for (let i = 0; i < 64; i++) {
        if (i >= 16) { const a = w[i - 15], b = w[i - 2]; w[i] = (w[i - 16] + (r(a, 7) ^ r(a, 18) ^ (a >>> 3)) + w[i - 7] + (r(b, 17) ^ r(b, 19) ^ (b >>> 10))) | 0; }
        const t1 = (h[7] + (r(h[4], 6) ^ r(h[4], 11) ^ r(h[4], 25)) + ((h[4] & h[5]) ^ (~h[4] & h[6])) + K[i] + (w[i] | 0)) | 0;
        const t2 = ((r(h[0], 2) ^ r(h[0], 13) ^ r(h[0], 22)) + ((h[0] & h[1]) ^ (h[0] & h[2]) ^ (h[1] & h[2]))) | 0;
        h = [(t1 + t2) | 0].concat(h.slice(0, 7)); h[4] = (h[4] + t1) | 0;
      }
      for (let i = 0; i < 8; i++) h[i] = (h[i] + o[i]) | 0;
    }
    return h.map(x => ("00000000" + (x >>> 0).toString(16)).slice(-8)).join("");
  }
  const hashPin = (pin, salt) => { let x = salt + ":" + pin; for (let i = 0; i < 2000; i++) x = sha256(x); return x; };
  const readParent = () => { try { return JSON.parse(localStorage.getItem(PARENT_KEY) || "null"); } catch (e) { return null; } };
  function savePin(pin) { const salt = Array.from({ length: 4 }, () => rnd(1e9).toString(36)).join(""); localStorage.setItem(PARENT_KEY, JSON.stringify({ salt, hash: hashPin(pin, salt) })); }
  let unlocked = false, mode = "enter", msg = "";
  /* wrong-PIN counter + lockout (5 tries → 5 minutes), kept in localStorage so a reload doesn't clear it */
  const LOCK_KEY = "xiaoshu-mockup.pinlock.v1", MAX_FAILS = 5, LOCK_MS = 5 * 60 * 1000;
  const readLock = () => { try { const o = JSON.parse(localStorage.getItem(LOCK_KEY) || "null"); return { fails: +(o && o.fails) || 0, until: +(o && o.until) || 0 }; } catch (e) { return { fails: 0, until: 0 }; } };
  const writeLock = (fails, until) => { try { localStorage.setItem(LOCK_KEY, JSON.stringify({ fails, until })); } catch (e) {} };
  const waitSecs = () => Math.max(0, Math.ceil((readLock().until - Date.now()) / 1000));
  const mmss = n => Math.floor(n / 60) + ":" + ("0" + (n % 60)).slice(-2);
  /* tryPin: the one place a PIN is checked. Wrong → counter; 5th wrong → 5-minute lock (correct PIN refused while locked). */
  function tryPin(pin) {
    const P = readParent(); if (!P) return { ok: false, why: "nopin" };
    const w = waitSecs(); if (w > 0) return { ok: false, why: "wait", wait: w };
    if (valid(pin) && hashPin(pin, P.salt) === P.hash) { writeLock(0, 0); return { ok: true }; }
    const f = readLock().fails + 1;
    if (f >= MAX_FAILS) { writeLock(0, Date.now() + LOCK_MS); return { ok: false, why: "wait", wait: LOCK_MS / 1000 }; }
    writeLock(f, 0); return { ok: false, why: "wrong", left: MAX_FAILS - f };
  }
  /* ---- reset permission ----
     FUTURE (not built yet): registration + login. Then canResetProgress() will check the signed-in account (owner or parent),
     the PIN gate goes away, and password change will work by an email link to the registered address instead of the typed 我是家长.
     Every reset/import path asks only this function. */
  let resetGrantUntil = 0;
  function canResetProgress() { return !!readParent() && Date.now() < resetGrantUntil; }   // set only by a correct PIN / first PIN, never by 我是家长
  const valid = p => /^\d{4}$/.test(p);
  function parentView() {
    const el = document.getElementById("parent"); const P = readParent();
    let h = `<div class="top"><a class="back" href="#p=${esc(S.kp || "S1-MA-001")}">${t("xp.back")}</a>${TAGS()}</div><div class="xp-card"><h2 style="margin:0 0 8px">${t("pc.h")}</h2>`;
    if (!P) h += `<p>${t("pc.setH")}</p><input class="pin" id="pin1" type="password" inputmode="numeric" maxlength="4" placeholder="${t("pc.pin")}"><input class="pin" id="pin2" type="password" inputmode="numeric" maxlength="4" placeholder="${t("pc.again")}"><button class="xp-btn" data-pc="set">${t("pc.set")}</button>`;
    else if (!unlocked && mode === "reset") h += `<p>${t("pc.phraseH")}</p><input class="pin" id="phrase" type="text" placeholder="${t("pc.phrase")}"><input class="pin" id="pin1" type="password" inputmode="numeric" maxlength="4" placeholder="${t("pc.pin")}"><input class="pin" id="pin2" type="password" inputmode="numeric" maxlength="4" placeholder="${t("pc.again")}"><button class="xp-btn" data-pc="reset">${t("pc.reset")}</button>`;
    else if (!unlocked) h += `<p>${t("pc.enter")}</p><input class="pin" id="pin1" type="password" inputmode="numeric" maxlength="4" placeholder="${t("pc.pin")}"><button class="xp-btn" data-pc="unlock">${t("pc.unlock")}</button><button class="xp-link" data-pc="forgot">${t("pc.forgot")}</button>`;
    else {
      const list = Object.entries(store.open).filter(([, o]) => o.status === "pending");
      h += `<p class="note" style="margin:0 0 8px">${t("pc.rule")}</p>` + (list.length ? list.map(([id, o]) => { const q = byId[id]; if (!q) return "";
        return `<div class="pc-item" data-q="${id}"><div class="chips">${chips(q)}</div><p class="content">${rich(q.stem)}</p><div class="k">${t("pc.child")}</div><div class="child content">${rich(o.text)}</div>${answerHTML(q)}
          <div class="pc-row"><button data-judge="right">${t("pc.btn.right")}</button><button data-judge="partial">${t("pc.btn.partial")}</button><button data-judge="wrong">${t("pc.btn.wrong")}</button></div></div>`; }).join("") : `<p>${t("pc.none")}</p>`);
      h += `<button class="xp-link" data-pc="lock">${t("pc.lock")}</button>`;
    }
    el.innerHTML = h + (msg ? `<p class="xp-res wrong">${esc(msg)}</p>` : "") + `</div>`; msg = "";
  }
  document.addEventListener("click", e => {
    const el = document.getElementById("parent"); if (!el || !el.classList.contains("on") || !el.contains(e.target)) return;
    const v = id => (el.querySelector("#" + id) || {}).value || "";
    const b = e.target.closest("[data-pc]"), j = e.target.closest("[data-judge]");
    if (b) {
      const a = b.dataset.pc;
      if (a === "set") { if (!valid(v("pin1"))) msg = t("pc.need4"); else if (v("pin1") !== v("pin2")) msg = t("pc.mismatch"); else { savePin(v("pin1")); unlocked = true; } }
      else if (a === "unlock") { const r = tryPin(v("pin1")); if (r.ok) unlocked = true; else msg = r.why === "wait" ? t("rl.locked", { t: mmss(r.wait) }) : t("pc.bad"); }
      else if (a === "forgot") mode = "reset";
      else if (a === "reset") { if (v("phrase").trim() !== PHRASE) msg = t("pc.badPhrase"); else if (!valid(v("pin1"))) msg = t("pc.need4"); else if (v("pin1") !== v("pin2")) msg = t("pc.mismatch"); else { savePin(v("pin1")); unlocked = true; mode = "enter"; } }
      else if (a === "lock") unlocked = false;
      parentView(); return;
    }
    if (j && unlocked) {
      const id = j.closest("[data-q]").dataset.q, o = store.open[id], r = j.dataset.judge, q = byId[id];
      if (o.parts) {   // multi item: the parent judges the open part; the item rolls up with the auto-checked parts
        const parts = o.parts.map(p => p === "pending" ? r : p); const s = parts.reduce((n, p) => n + credit(p), 0);
        o.parts = parts; o.status = s === parts.length ? "right" : s === 0 ? "wrong" : "partial";
      } else o.status = r;
      store.marks[id] = o.status; save(); parentView();
    }
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) unlocked = false; });   // the reset grant is not tied to this (the phone file chooser hides the page); it expires after 3 min
  /* ---------- hooks into the mockup ---------- */
  /* ---------- 重置进度 / 导入进度 / 导出进度: PIN gate first, then a final confirm ---------- */
  const G = { open: false, action: "", step: "", msg: "", file: null };
  const labelKey = a => a === "import" ? "rl.import" : "rl.reset";
  function gateEl() { let el = document.getElementById("xs-gate"); if (!el) { el = document.createElement("div"); el.id = "xs-gate"; document.body.appendChild(el); } return el; }
  function closeGate() { G.open = false; G.file = null; resetGrantUntil = 0; const el = document.getElementById("xs-gate"); if (el) { el.innerHTML = ""; el.className = ""; } }
  function gateView() {
    const el = gateEl(); if (!G.open) { el.innerHTML = ""; el.className = ""; return; }
    el.className = "on";
    const pin = (id, ph) => `<input class="pin" id="${id}" type="password" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="${ph}">`;
    let h = `<div class="xs-gate-card" role="dialog" aria-modal="true"><h2 style="margin:0 0 8px">${t(G.step === "confirm" ? G.action + ".title" : G.step === "set" ? "pc.h" : "rl.enterH")}</h2>`;
    if (G.step === "set") h += `<p>${t("rl.setH", { label: t(labelKey(G.action)) })}</p>${pin("pin1", t("pc.pin"))}${pin("pin2", t("pc.again"))}<button class="xp-btn" data-rl="set">${t("pc.set")}</button>`;
    else if (G.step === "enter") { const w = waitSecs();
      h += `<p>${t("rl.needs", { label: t(labelKey(G.action)) })}</p>${pin("pin1", t("pc.pin"))}<button class="xp-btn" data-rl="ok">${t("rl.ok")}</button><button class="xp-link" data-rl="forgot">${t("rl.forgot")}</button>`;
      if (w > 0 && !G.msg) G.msg = t("rl.locked", { t: mmss(w) }); }
    else if (G.step === "forgot") h += `<p>${t("rl.forgotH")}</p><input class="pin" id="phrase" type="text" autocomplete="off" placeholder="${t("pc.phrase")}">${pin("pin1", t("pc.pin"))}${pin("pin2", t("pc.again"))}<button class="xp-btn" data-rl="reset-pin">${t("pc.reset")}</button><button class="xp-link" data-rl="back">${t("rl.back")}</button>`;
    else if (G.step === "confirm") h += `<p>${t(G.action + ".body")}</p><button class="xp-btn" data-rl="yes" style="background:#e0533d;color:#fff">${t(G.action + ".yes")}</button>`;
    h += (G.msg ? `<p class="xp-res wrong" role="alert">${esc(G.msg)}</p>` : "") + (G.step === "confirm" || true ? `<button class="xp-link" data-rl="cancel">${t("rl.cancel")}</button>` : "") + `</div>`;
    G.msg = ""; el.innerHTML = h;
    const f = el.querySelector("input"); if (f) setTimeout(() => f.focus(), 30);
  }
  function startGate(action) {
    resetGrantUntil = 0; G.open = true; G.action = action; G.msg = ""; G.file = null;
    G.step = readParent() ? "enter" : "set"; gateView();
  }
  function afterGrant() {                      // PIN accepted → import still needs a file, then both end in the final confirm
    if (G.action === "import") { const inp = document.getElementById("xs-import-file"); closeGateKeepGrant(); if (inp) inp.click(); }
    else { G.step = "confirm"; gateView(); }
  }
  function closeGateKeepGrant() { const g = resetGrantUntil; closeGate(); resetGrantUntil = g; }
  function applyReset() {
    if (!canResetProgress()) return false;                      // only an authorised reset may touch progress
    resetGrantUntil = 0; store = { marks: {}, open: {} }; save(); return true;
  }
  function applyImport(data) {
    if (!canResetProgress()) return false;
    resetGrantUntil = 0; store = { marks: data.marks || {}, open: data.open || {} }; save(); return true;
  }
  function refreshAfter(key) { closeGate(); if (typeof route === "function") route(); const n = document.createElement("div"); n.className = "xs-toast"; n.textContent = t(key); document.body.appendChild(n); setTimeout(() => n.remove(), 2200); }
  document.addEventListener("click", e => {
    const tb = e.target.closest("[data-tool]");
    if (tb) { const a = tb.dataset.tool;
      if (a === "export") { const blob = new Blob([JSON.stringify({ app: "xiaoshu-mockup", marks: store.marks, open: store.open }, null, 2)], { type: "application/json" }); const u = URL.createObjectURL(blob); const l = document.createElement("a"); l.href = u; l.download = "xiaoshu-progress.json"; document.body.appendChild(l); l.click(); l.remove(); setTimeout(() => URL.revokeObjectURL(u), 1500); }
      else startGate(a);
      return; }
    const el = document.getElementById("xs-gate"); const b = e.target.closest("[data-rl]"); if (!el || !b || !el.contains(b)) return;
    const v = id => (el.querySelector("#" + id) || {}).value || "", a = b.dataset.rl;
    if (a === "cancel") { closeGate(); return; }
    if (a === "set") { if (!valid(v("pin1"))) G.msg = t("pc.need4"); else if (v("pin1") !== v("pin2")) G.msg = t("pc.mismatch"); else { savePin(v("pin1")); writeLock(0, 0); resetGrantUntil = Date.now() + 180000; afterGrant(); return; } }
    else if (a === "ok") { const r = tryPin(v("pin1")); if (r.ok) { resetGrantUntil = Date.now() + 180000; afterGrant(); return; }
      G.msg = r.why === "wait" ? t("rl.locked", { t: mmss(r.wait) }) : t("rl.wrongLeft", { n: r.left }); }
    else if (a === "forgot") G.step = "forgot";
    else if (a === "back") G.step = "enter";
    else if (a === "reset-pin") { resetGrantUntil = 0;   // 我是家长: changes the PIN only; no grant, progress untouched
      if (v("phrase").replace(/\s+/g, "") !== PHRASE) G.msg = t("pc.badPhrase"); else if (!valid(v("pin1"))) G.msg = t("pc.need4"); else if (v("pin1") !== v("pin2")) G.msg = t("pc.mismatch");
      else { savePin(v("pin1")); writeLock(0, 0); G.step = "enter"; G.msg = t("rl.newSetEnter"); } }
    else if (a === "yes") { if (G.action === "reset") { if (applyReset()) refreshAfter("rl.done.reset"); else closeGate(); } else if (G.file && applyImport(G.file)) refreshAfter("rl.done.import"); else closeGate(); return; }
    gateView();
  });
  document.addEventListener("change", e => {
    if (e.target.id !== "xs-import-file") return;
    const f = e.target.files && e.target.files[0]; e.target.value = ""; if (!f) { resetGrantUntil = 0; return; }
    const r = new FileReader();
    r.onload = () => { try { const d = JSON.parse(String(r.result || "")); if (!d || typeof d !== "object" || d.app !== "xiaoshu-mockup") throw 0;
        G.open = true; G.action = "import"; G.step = "confirm"; G.file = { marks: d.marks && typeof d.marks === "object" ? d.marks : {}, open: d.open && typeof d.open === "object" ? d.open : {} }; gateView(); }
      catch (er) { resetGrantUntil = 0; const n = document.createElement("div"); n.className = "xs-toast"; n.textContent = t("rl.badFile"); document.body.appendChild(n); setTimeout(() => n.remove(), 2600); } };
    r.readAsText(f);
  });
  document.addEventListener("click", e => { if (e.target.closest("[data-lang]")) setTimeout(gateView, 0); });
  const tools = () => `<div class="sec"><h2>${t("rl.h")}</h2></div><div class="box xs-tools"><button class="xp-link" data-tool="export">${t("rl.export")}</button><button class="xp-link" data-tool="import">${t("rl.import")}</button><button class="xp-link" data-tool="reset" style="color:#c0392b">${t("rl.reset")}</button><input id="xs-import-file" type="file" accept="application/json,.json" hidden></div>`;
  /* shared with the 摸底测试 (xs_diag.js): the same answer checkers (numeric equality etc.), the same chips and the same parent PIN check.
     The test never writes the practice record (PROG_KEY); it keeps its own key. */
  window.XS_CHECK = { partOk, numOk, exactOk, fracOk, numsetOk, pfOk, exprOk, spreadList, bestOrder, chips, rich, verifyPin: pin => tryPin(pin), hasPin: () => !!readParent() };
  window.XS_PRACTICE = {
    tools, canResetProgress, gateState: () => ({ open: G.open, step: G.step }),
    has: kp => (B.byKp[kp] || []).length,
    button(kp) { const n = (B.byKp[kp] || []).length; if (!n) return ""; return `<a class="xp-go" href="#p=${esc(kp)}">${t("xp.practice")}<small>${t("xp.count", { n })}</small></a>`; },
    open(kp) { start(kp); render(); },
    parent() { unlocked = false; mode = "enter"; parentView(); }
  };
})();
