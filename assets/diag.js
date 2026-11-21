/* 小树 摸底测试 (diagnostic test) — 家长要求：给两个孩子的系统都加上“摸底测试” 比如测试是包含全部知识点， 每个知识点放两道题，
   一道难一些的，一道简单一些的。 测试完给出报告看孩子知识点薄弱在哪几项。
   - One test per subject: every knowledge point that has questions gets 2 questions from the existing original bank (no new questions):
     one easier, one harder. Difficulty: the bank's easy / medium / hard tag (d = 0 / 1 / 2); when a point's usable questions all carry the
     same tag, a documented score decides (marks + ½ per extra answer box + 1 for a long stem (150+ characters) + 1 if parent-marked +
     ½ for tap-to-order / pick-all; on equal scores the longer question counts as a little harder): easier = lowest third, harder = highest third. Same score everywhere → two random ones, flagged.
   - Auto-marked questions first; a point with fewer than 2 auto-marked questions uses parent-marked ones (flagged, the parent ticks them on the report).
   - Random question order and shuffled options every attempt; no answers or explanations during the test (they are on the report).
   - Answers are checked with the practice page's own checkers (window.XS_CHECK): numerically equal answers count as correct.
   - Results live only under DIAG_KEY on this device, with a history of attempts. They never touch the practice record (xiaoshu-mockup.progress.v1):
     a diagnostic is a snapshot, so it does not change pay, levels or review. 高级华文 pages stay Chinese. */
(function () {
  "use strict";
  const DIAG_KEY = "xiaoshu-mockup.diag.v1", MAX_HIST = 30;
  Object.assign(XS_I18N.zh, {
    "dg.card.h": "🧭 摸底测试", "dg.card.s": "每个知识点 2 题（一易一难），测完告诉你哪里薄弱。", "dg.card.btn": "开始摸底", "dg.card.last": "上次：{s} {p}%（{d}）",
    "dg.h": "摸底测试", "dg.lead": "选一个科目。每个知识点出 2 道题：一道简单一些，一道难一些。测试中不显示对错，做完看报告。测试结果不会改动练习进度和月薪。",
    "dg.subj.meta": "{k} 个知识点 · {n} 道题 · 约 {m} 分钟", "dg.start": "开始", "dg.resume": "继续上次没做完的（{s}，已做 {a}/{n}）", "dg.discard": "放弃上次没做完的",
    "dg.hist": "测试记录", "dg.hist.none": "还没有测试记录。", "dg.hist.row": "{d} · {s} · {p}%", "dg.hist.pending": "（{n} 题等家长批改）", "dg.overview": "各科总览（每科最近一次）",
    "dg.q.of": "摸底测试 · 第 {i} / {n} 题", "dg.q.saved": "已记下 ✓（做完再看对错）", "dg.q.write": "写下你的答案（这题由家长批改）", "dg.q.skip": "跳过", "dg.q.finish": "交卷",
    "dg.q.left": "还有 {n} 题没有作答。没作答的算错，确定交卷吗？", "dg.q.sure": "确定交卷", "dg.q.back": "回去做", "dg.q.quit": "‹ 暂停（下次可以继续）",
    "dg.r.h": "摸底报告 · {s}", "dg.r.when": "{d} · {k} 个知识点 · {n} 道题", "dg.r.overall": "总得分", "dg.r.pending": "还有 {n} 题等家长批改，批改后报告会更新。",
    "dg.cat.both": "两题都对", "dg.cat.easy": "只对简单题", "dg.cat.hard": "只对难题", "dg.cat.none": "两题都错", "dg.cat.pending": "等家长批改", "dg.cat.single": "（这个知识点只有 1 道可用的题）",
    "dg.r.weak": "需要加强的知识点", "dg.r.weakNone": "没有薄弱的知识点，太棒了！", "dg.r.all": "每个知识点的结果", "dg.r.easyQ": "简单题", "dg.r.hardQ": "难题", "dg.r.onlyQ": "唯一一题",
    "dg.r.right": "对", "dg.r.partial": "部分对", "dg.r.wrong": "不对", "dg.r.blank": "没作答", "dg.r.waiting": "等家长", "dg.r.mine": "孩子的答案", "dg.r.show": "看答案和讲解",
    "dg.r.parentFlag": "家长批改题", "dg.r.sameFlag": "两题难度相近", "dg.r.print": "打印 / 存成 PDF", "dg.r.save": "下载报告文件", "dg.r.back": "‹ 摸底测试",
    "dg.r.rule": "怎么选题：每个知识点从题库里选 2 题。先看题库的难度标记（简单 / 中等 / 难）；标记都一样时，按分数、答题框数量、题目长度和是否家长批改算出难度分（同分时字数多的算难一些），取最低的三分之一当简单题、最高的三分之一当难题。测试结果和练习进度分开保存，不会改动月薪。",
    "dg.pm.h": "家长批改", "dg.pm.need": "输入家长 PIN 才能批改。", "dg.pm.nopin": "还没设家长 PIN，请先到「家长确认」设一个。", "dg.pm.open": "打开", "dg.pm.bad": "PIN 不对，还可以试 {n} 次。", "dg.pm.wait": "试错太多次，请 {s} 秒后再试。",
    "dg.ov.h": "各科总览", "dg.ov.none": "还没有做过摸底测试。", "dg.ov.row": "{s}：{p}%（{d}）", "dg.lv": "{s} 摸底测试"
  });
  Object.assign(XS_I18N.en, {
    "dg.card.h": "🧭 Diagnostic test", "dg.card.s": "2 questions per topic (one easier, one harder). The report shows the weak spots.", "dg.card.btn": "Start", "dg.card.last": "Last: {s} {p}% ({d})",
    "dg.h": "Diagnostic test", "dg.lead": "Pick a subject. Every topic gets 2 questions: one easier and one harder. You won't see right or wrong during the test; the report comes at the end. The test does not change practice progress or pay.",
    "dg.subj.meta": "{k} topics · {n} questions · about {m} min", "dg.start": "Start", "dg.resume": "Carry on with the unfinished test ({s}, {a}/{n} done)", "dg.discard": "Drop the unfinished test",
    "dg.hist": "Past tests", "dg.hist.none": "No tests yet.", "dg.hist.row": "{d} · {s} · {p}%", "dg.hist.pending": " ({n} waiting for a parent)", "dg.overview": "All subjects (latest test each)",
    "dg.q.of": "Diagnostic · question {i} of {n}", "dg.q.saved": "Saved ✓ (results at the end)", "dg.q.write": "Write your answer (a parent marks this one)", "dg.q.skip": "Skip", "dg.q.finish": "Hand in",
    "dg.q.left": "{n} questions have no answer. They will count as wrong. Hand in now?", "dg.q.sure": "Hand in", "dg.q.back": "Go back", "dg.q.quit": "‹ Pause (carry on later)",
    "dg.r.h": "Diagnostic report · {s}", "dg.r.when": "{d} · {k} topics · {n} questions", "dg.r.overall": "Overall", "dg.r.pending": "{n} questions are waiting for a parent to mark; the report updates after that.",
    "dg.cat.both": "Both right", "dg.cat.easy": "Easier one only", "dg.cat.hard": "Harder one only", "dg.cat.none": "Both wrong", "dg.cat.pending": "Waiting for a parent", "dg.cat.single": " (only 1 usable question for this topic)",
    "dg.r.weak": "Topics to work on", "dg.r.weakNone": "No weak topics. Great job!", "dg.r.all": "Result for every topic", "dg.r.easyQ": "Easier", "dg.r.hardQ": "Harder", "dg.r.onlyQ": "Only one",
    "dg.r.right": "Right", "dg.r.partial": "Partly right", "dg.r.wrong": "Wrong", "dg.r.blank": "No answer", "dg.r.waiting": "Parent to mark", "dg.r.mine": "Answer given", "dg.r.show": "Answer and explanation",
    "dg.r.parentFlag": "Parent-marked", "dg.r.sameFlag": "Similar difficulty", "dg.r.print": "Print / save as PDF", "dg.r.save": "Download the report", "dg.r.back": "‹ Diagnostic test",
    "dg.r.rule": "How questions are chosen: 2 per topic from the question bank. The bank's difficulty tag (easy / medium / hard) comes first; when the tags are the same, a score from marks, answer boxes, question length and parent marking decides (on a tie, the longer question counts as harder): the lowest third gives the easier question, the highest third the harder one. Results are kept apart from practice progress and do not change pay.",
    "dg.pm.h": "Parent marking", "dg.pm.need": "Enter the parent PIN to mark.", "dg.pm.nopin": "No parent PIN yet. Set one under Parent check first.", "dg.pm.open": "Open", "dg.pm.bad": "Wrong PIN. {n} tries left.", "dg.pm.wait": "Too many tries. Wait {s} s.",
    "dg.ov.h": "All subjects", "dg.ov.none": "No diagnostic tests yet.", "dg.ov.row": "{s}: {p}% ({d})", "dg.lv": "{s} diagnostic"
  });
  const B = window.XS_BANK || { questions: [], byKp: {} }; const byId = {}; B.questions.forEach(q => { byId[q.id] = q; });
  const C = () => window.XS_CHECK;
  const h = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const br = s => h(s).replace(/\n/g, "<br>");
  const subjects = () => D.subjects.filter(s => !s.pending && pts(s).some(p => (B.byKp[p.id] || []).length));
  const subjOf = id => D.subjects.find(s => s.id === id);
  const kpInfo = {}; D.subjects.forEach(s => s.groups.forEach(g => g.points.forEach(p => { kpInfo[p.id] = { s: s.id, g: g.name, n: p.name }; })));
  /* ---------- storage (own key; never the practice record) ---------- */
  function load() { try { const o = JSON.parse(localStorage.getItem(DIAG_KEY) || "{}"); return { attempts: Array.isArray(o.attempts) ? o.attempts : [], current: o.current || null }; } catch (e) { return { attempts: [], current: null }; } }
  let st = load();
  function save() { try { localStorage.setItem(DIAG_KEY, JSON.stringify(st)); } catch (e) {} }
  /* ---------- choosing the two questions ---------- */
  function rnd(n) { if (window.crypto && crypto.getRandomValues) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; } return Math.floor(Math.random() * n); }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const isAuto = q => q.mode !== "parent" && !(q.mode === "multi" && q.parts.some(p => p.kind === "parent"));
  const base = q => (Number(q.marks) || 1) + 0.5 * Math.max(0, (q.parts || []).length - 1) + (String(q.stem || "").length >= 150 ? 1 : 0) + (isAuto(q) ? 0 : 1) + (q.mode === "order" || q.mode === "pick" ? 0.5 : 0);
  // equal base scores: the longer question (stem + options / items + part labels) counts as a little harder; it never outweighs the base score
  const textLen = q => String(q.stem || "").length + (q.options || q.items || []).join("").length + (q.parts || []).map(p => p.label || "").join("").length;
  const score = q => base(q) + Math.min(9999, textLen(q)) / 1e5;
  const splitOf = (lo, hi) => base(lo) < base(hi) ? "score" : score(lo) < score(hi) ? "length" : "same";
  const tag = q => (typeof q.d === "number" ? q.d : null);
  function pickTwo(ids) {
    const all = ids.map(id => byId[id]).filter(Boolean), auto = all.filter(isAuto);
    const pool = auto.length >= 2 ? auto : all, parentUsed = auto.length < 2 && pool.some(q => !isAuto(q));
    if (!pool.length) return [];
    if (pool.length === 1) return [{ q: pool[0].id, lv: "only", split: "single", flag: parentUsed }];
    if (auto.length === 1) {   // one auto-marked question: keep it and add one parent-marked question (flagged), preferably of another difficulty tag
      const a1 = auto[0], par = all.filter(q => !isAuto(q)), other = par.filter(q => tag(q) !== tag(a1)), p1 = (other.length ? other : par)[rnd((other.length ? other : par).length)];
      const lo = (tag(a1) !== tag(p1) ? tag(a1) < tag(p1) : score(a1) <= score(p1)) ? [a1, p1] : [p1, a1];
      const split = tag(a1) !== tag(p1) ? "tag" : splitOf(lo[0], lo[1]);
      return [{ q: lo[0].id, lv: "easy", split, flag: !isAuto(lo[0]) }, { q: lo[1].id, lv: "hard", split, flag: !isAuto(lo[1]) }];
    }
    const tags = [...new Set(pool.map(tag))].sort();
    let E, H, split;
    if (tags.length > 1 && tags[0] !== null) { E = pool.filter(q => tag(q) === tags[0]); H = pool.filter(q => tag(q) === tags[tags.length - 1]); split = "tag"; }
    else {
      const s = pool.slice().sort((a, b) => score(a) - score(b)), k = Math.max(1, Math.floor(s.length / 3));
      E = s.slice(0, k); H = s.slice(s.length - k); split = "byscore";
      if (score(s[0]) < score(s[s.length - 1])) { const lo = score(E[E.length - 1]), hi = score(H[0]); if (lo >= hi) { E = s.filter(q => score(q) === score(s[0])); H = s.filter(q => score(q) === score(s[s.length - 1])); } }
    }
    const e = E[rnd(E.length)]; let Hs = H.filter(q => q !== e); if (!Hs.length) Hs = pool.filter(q => q !== e);
    const hq = Hs[rnd(Hs.length)]; if (split === "byscore") split = splitOf(e, hq);
    return [{ q: e.id, lv: "easy", split, flag: parentUsed && !isAuto(e) }, { q: hq.id, lv: "hard", split, flag: parentUsed && !isAuto(hq) }];
  }
  function build(sid) {
    const s = subjOf(sid); const items = [], few = [];
    pts(s).forEach(p => { const two = pickTwo(B.byKp[p.id] || []); if (!two.length) return; if (two.length < 2 || two.some(x => x.flag)) few.push(p.id); two.forEach(x => items.push(Object.assign({ kp: p.id }, x))); });
    shuffle(items);
    items.forEach(it => { const q = byId[it.q]; if (q.mode === "choice" || q.mode === "pick") it.perm = shuffle(q.options.map((_, k) => k)); if (q.mode === "order") it.perm = shuffle(q.items.map((_, k) => k)); });
    return { id: "d" + Date.now().toString(36) + rnd(1e6).toString(36), subj: sid, started: Date.now(), finished: null, i: 0, items, few };
  }
  /* ---------- grading (practice checkers; nothing written to the practice record) ---------- */
  function autoResult(q, r) {
    if (!r) return "blank";
    if (q.mode === "choice") return typeof r.pick === "number" ? (r.pick === q.answer_index ? "right" : "wrong") : "blank";
    if (q.mode === "order" || q.mode === "pick") {
      const sel = r.sel || []; if (!sel.length) return "blank";
      if (q.mode === "order") return sel.length === q.items.length && sel.every((k, i) => k === i) ? "right" : "wrong";
      const w = q.answer_set.slice().sort((a, b) => a - b), g = sel.slice().sort((a, b) => a - b); return w.length === g.length && w.every((x, i) => x === g[i]) ? "right" : "wrong";
    }
    const vals = r.vals || []; if (!vals.some(v => String(v || "").trim())) return "blank";
    const X = C();
    if (q.mode === "multi") {
      const g = X.spreadList(q.parts, vals), ord = q.any_order ? X.bestOrder(q.parts, g) : g;
      const ps = q.parts.map((p, k) => X.partOk(p, ord[k]) ? "right" : "wrong"), n = ps.filter(x => x === "right").length;
      return n === ps.length ? "right" : n ? "partial" : "wrong";
    }
    const v = vals[0];
    const ok = q.mode === "pf" ? X.pfOk(q.pf, q.index, v) : q.mode === "exact" ? X.exactOk(q.exact, v) : q.mode === "frac" ? X.fracOk(q.frac[0], q.frac[1], q.simplest, v)
      : q.mode === "numset" ? X.numsetOk(q.numset, v) : q.mode === "expr" ? X.exprOk(q, v) : X.numOk(q.val, v, q.tol);
    return ok ? "right" : "wrong";
  }
  function resultOf(it) {
    const q = byId[it.q]; if (!q) return "blank";
    if (!isAuto(q)) { const has = it.resp && (it.resp.vals || []).some(v => String(v || "").trim()); return !has ? "blank" : (it.pm || "pending"); }
    return autoResult(q, it.resp);
  }
  const credit = r => r === "right" ? 1 : r === "partial" ? 0.5 : r === "pending" ? null : 0;
  function summary(a) {
    const byKp = {}; a.items.forEach(it => { (byKp[it.kp] = byKp[it.kp] || []).push(it); });
    const kps = Object.keys(byKp).map(kp => {
      const its = byKp[kp], rs = its.map(resultOf); let cat;
      if (rs.includes("pending")) cat = "pending";
      else if (its.length === 1) cat = rs[0] === "right" ? "both" : "none";
      else { const e = rs[its.findIndex(x => x.lv === "easy")] === "right", hh = rs[its.findIndex(x => x.lv === "hard")] === "right"; cat = e && hh ? "both" : e ? "easy" : hh ? "hard" : "none"; }
      return { kp, cat, single: its.length === 1, items: its, rs };
    });
    let got = 0, n = 0, pend = 0; a.items.forEach(it => { const c = credit(resultOf(it)); if (c === null) pend++; else { got += c; n++; } });
    return { kps, pct: n ? Math.round(100 * got / n) : 0, pend, got, n };
  }
  /* ---------- views ---------- */
  const el = () => document.getElementById("diag");
  const sName = sid => { const s = subjOf(sid); return s ? (skill(s.id) ? skill(s.id) + " · " : "") + subjName(s) : sid; };
  const dateOf = ms => { const d = new Date(ms); const p = n => ("0" + n).slice(-2); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; };
  const top = (back) => `<div class="top"><a class="back" href="${back}">${t("xp.back")}</a>${TAGS()}</div>`;
  function plan(sid) { const s = subjOf(sid); let k = 0, n = 0; pts(s).forEach(p => { const c = Math.min(2, (B.byKp[p.id] || []).length); if (c) { k++; n += c; } }); return { k, n }; }
  function homeView() {
    st = load(); const cur = st.current;
    let x = top("#home") + `<div class="dg-card"><h2>${t("dg.h")}</h2><p class="note">${t("dg.lead")}</p>`;
    if (cur && !cur.finished) { const a = cur.items.filter(it => it.resp).length; x += `<a class="xp-btn dg-res" href="#diag-q">${t("dg.resume", { s: h(sName(cur.subj)), a, n: cur.items.length })}</a><button class="xp-link" data-dg="discard">${t("dg.discard")}</button>`; }
    x += subjects().map(s => { const p = plan(s.id); return `<button class="skill dg-subj" data-dg-start="${s.id}"><div class="ic" style="background:${s.color}">${s.icon}</div><div class="mid"><div class="nm"><span>${h(skill(s.id))} <small>${h(subjName(s))}</small></span><em>${t("dg.start")} ›</em></div><div class="meta"><span>${t("dg.subj.meta", { k: p.k, n: p.n, m: Math.ceil(p.n * 1.2) })}</span></div></div></button>`; }).join("");
    x += `</div><div class="sec"><h2>${t("dg.hist")}</h2><a href="#diag-all">${t("dg.overview")} ›</a></div><div class="box">`;
    const hs = st.attempts.slice().reverse();
    x += hs.length ? hs.map(a => { const m = summary(a); return `<a class="dg-hrow" href="#diag-r=${h(a.id)}">${t("dg.hist.row", { d: dateOf(a.finished), s: h(sName(a.subj)), p: m.pct })}${m.pend ? t("dg.hist.pending", { n: m.pend }) : ""} ›</a>`; }).join("") : `<p class="note">${t("dg.hist.none")}</p>`;
    el().innerHTML = x + "</div>";
  }
  function respHTML(it, q) {
    const r = it.resp || {};
    if (q.mode === "choice") return `<ol class="xp-opts">${it.perm.map((k, pos) => `<li><button type="button" class="xp-opt${r.pick === k ? " dg-on" : ""}" data-dg-pick="${k}"><b>(${pos + 1})</b> <span class="content">${h(q.options[k])}</span></button></li>`).join("")}</ol>`;
    if (q.mode === "order" || q.mode === "pick") {
      const sel = r.sel || [], list = q.mode === "order" ? q.items : q.options;
      return `<p class="note">${t(q.mode === "order" ? "xp.tapOrder" : "xp.pickAll")}</p><div class="xp-tap">${it.perm.map(k => `<button type="button" class="xp-chip${sel.includes(k) ? " on" : ""}" data-dg-tap="${k}"${q.mode === "order" && sel.includes(k) ? " disabled" : ""}><span class="content">${h(list[k])}</span></button>`).join("")}</div>` +
        (q.mode === "order" ? `<p class="xp-seq"><b>${t("xp.yourOrder")}:</b> <span class="content">${sel.map(k => h(list[k])).join(", ") || "…"}</span></p><button type="button" class="xp-link" data-dg="clear">${t("xp.clear")}</button>` : "");
    }
    const v = r.vals || [];
    if (q.mode === "multi") return `<div class="xp-parts">${q.parts.map((p, k) => `<div class="xp-part"><label><b>${h(p.label)}</b></label>${p.kind === "parent" ? `<textarea class="xp-in dg-in" data-k="${k}" rows="3" placeholder="${t("xp.writeHere")}">${h(v[k] || "")}</textarea>` : `<input class="xp-in dg-in" data-k="${k}" type="text" autocomplete="off" autocapitalize="off" placeholder="${t("xp.typeHere")}" value="${h(v[k] || "")}">`}</div>`).join("")}</div>` + (q.parts.some(p => p.kind === "expr") ? `<p class="note xp-hint">${t("xp.exprHint")}</p>` : "") + (q.parts.some(p => p.kind === "parent") ? `<p class="note">${t("dg.q.write")}</p>` : "");
    if (q.mode === "parent") return `<textarea class="xp-in dg-in" data-k="0" rows="5" placeholder="${t("xp.writeHere")}">${h(v[0] || "")}</textarea><p class="note">${t("dg.q.write")}</p>`;
    return `<input class="xp-in dg-in" data-k="0" type="text" autocomplete="off" autocapitalize="off" placeholder="${t("xp.typeHere")}" value="${h(v[0] || "")}">` + (q.mode === "expr" ? `<p class="note xp-hint">${t("xp.exprHint")}</p>` : "");
  }
  function qView(confirmLeft) {
    st = load(); const a = st.current; if (!a || a.finished) { location.hash = "#diag"; return; }
    a.i = Math.max(0, Math.min(a.i || 0, a.items.length - 1));
    const it = a.items[a.i], q = byId[it.q], n = a.items.length, last = a.i === n - 1;
    let x = `<div class="top"><a class="back" href="#diag">${t("dg.q.quit")}</a>${TAGS()}</div><div class="xp-head"><span>${t("dg.q.of", { i: a.i + 1, n })}</span><span class="dg-bar"><i style="width:${Math.round(100 * a.items.filter(z => z.resp).length / n)}%"></i></span></div>`;
    x += `<div class="xp-card"><div class="chips">${C().chips(q)}</div><p class="xp-stem content">${br(q.stem)}</p>${respHTML(it, q)}`;
    if (it.resp) x += `<p class="dg-saved">${t("dg.q.saved")}</p>`;
    if (confirmLeft) x += `<div class="dg-confirm"><p>${t("dg.q.left", { n: confirmLeft })}</p><div class="xp-row"><button class="xp-btn" data-dg="finish-sure">${t("dg.q.sure")}</button><button class="xp-link" data-dg="finish-no">${t("dg.q.back")}</button></div></div>`;
    x += `<nav class="practice-nav"><button type="button" class="btn-nav" data-dg-nav="-1"${a.i ? "" : " disabled"}>${t("xp.prev")}</button><span class="xp-pos">${a.i + 1} / ${n}</span><button type="button" class="btn-nav next" data-dg-nav="1">${last ? t("dg.q.finish") : (it.resp ? t("xp.next") : t("dg.q.skip"))}</button></nav></div>`;
    el().innerHTML = x;
  }
  function itemRow(it, a) {
    const q = byId[it.q], r = resultOf(it), lvK = it.lv === "easy" ? "dg.r.easyQ" : it.lv === "hard" ? "dg.r.hardQ" : "dg.r.onlyQ";
    const rk = { right: "dg.r.right", partial: "dg.r.partial", wrong: "dg.r.wrong", blank: "dg.r.blank", pending: "dg.r.waiting" }[r];
    const resp = it.resp || {}; let mine = "";
    if (q.mode === "choice") mine = typeof resp.pick === "number" ? `(${it.perm.indexOf(resp.pick) + 1}) ${h(q.options[resp.pick])}` : "";
    else if (q.mode === "order" || q.mode === "pick") mine = (resp.sel || []).map(k => h((q.mode === "order" ? q.items : q.options)[k])).join(", ");
    else mine = (resp.vals || []).map((v, k) => (q.parts ? h(q.parts[k].label) + " " : "") + br(v || "")).filter(s => s.trim()).join("<br>");
    let ans = "";
    if (q.mode === "choice") ans = `(${it.perm.indexOf(q.answer_index) + 1}) ${h(q.options[q.answer_index])}`;
    else if (q.mode === "order") ans = q.items.map(h).join(", ");
    else if (q.mode === "pick") ans = q.answer_set.map(k => h(q.options[k])).join(", ");
    else if (q.mode === "multi") ans = q.parts.map(p => `<b>${h(p.label)}</b> ${C().rich(p.answer)}${p.marking ? `<div class="mp">${t("xp.marking")}: ${p.marking.map(h).join("; ")}</div>` : ""}`).join("<br>");
    else ans = C().rich(q.answer);
    const marking = q.mode === "parent" && q.marking ? `<div class="k">${t("xp.marking")}</div><div class="content">${q.marking.map(h).join("<br>")}</div>` : "";
    const steps = String(q.explanation || "").split("\n").filter(s => s.trim()).map(s => `<p>${h(s)}</p>`).join("");
    const pm = !isAuto(q) && (resp.vals || []).some(v => String(v || "").trim())
      ? `<div class="dg-pm"><b>${t("dg.pm.h")}:</b> ${["right", "partial", "wrong"].map(m => `<button type="button" class="${it.pm === m ? "on" : ""}" data-dg-pm="${a.items.indexOf(it)}:${m}">${t("pc.btn." + m)}</button>`).join("")}</div>` : "";
    return `<details class="dg-item r-${r}"${r === "pending" ? " open" : ""}><summary><span class="dg-lv">${t(lvK)}</span><span class="dg-st st-${r}">${t(rk)}</span>${it.flag ? `<span class="dg-flag">${t("dg.r.parentFlag")}</span>` : ""}${it.split === "same" ? `<span class="dg-flag">${t("dg.r.sameFlag")}</span>` : ""}</summary>
      <div class="xp-ans"><div class="chips">${C().chips(q)}</div><p class="content">${br(q.stem)}</p>${mine ? `<div class="k">${t("dg.r.mine")}</div><div class="content">${mine}</div>` : ""}<div class="k">${t(isAuto(q) ? "xp.answer" : "xp.model")}</div><div class="content">${ans}</div>${marking}${steps ? `<div class="k">${t("xp.steps")}</div><div class="steps content">${steps}</div>` : ""}${pm}</div></details>`;
  }
  const CAT_ICON = { both: "✅", easy: "🟡", hard: "🟠", none: "🔴", pending: "⏳" };
  let pmUnlocked = false, pmMsg = "";
  function reportView(id) {
    st = load(); const a = st.attempts.find(x => x.id === id); if (!a) { location.hash = "#diag"; return; }
    const m = summary(a), s = subjOf(a.subj);
    const order = { none: 0, hard: 1, easy: 2 };
    const weak = m.kps.filter(k => k.cat in order).sort((x, y) => order[x.cat] - order[y.cat]);
    const byG = {}; weak.forEach(k => { const g = kpInfo[k.kp].g; (byG[g] = byG[g] || []).push(k); });
    const cnt = c => m.kps.filter(k => k.cat === c).length;
    let x = `<div class="top"><a class="back" href="#diag">${t("dg.r.back")}</a>${TAGS()}</div><div class="dg-card dg-report">
      <h2>${t("dg.r.h", { s: h(sName(a.subj)) })}</h2><p class="note">${t("dg.r.when", { d: dateOf(a.finished), k: m.kps.length, n: a.items.length })}</p>
      <div class="dg-score"><div class="dg-ring" style="--p:${m.pct}"><b>${m.pct}%</b><i>${t("dg.r.overall")}</i></div><div class="dg-cats">${["both", "easy", "hard", "none", "pending"].filter(c => c !== "pending" || cnt(c)).map(c => `<div class="dg-c c-${c}"><span>${CAT_ICON[c]} ${t("dg.cat." + c)}</span><b>${cnt(c)}</b></div>`).join("")}</div></div>
      ${m.pend ? `<p class="dg-pendnote">${t("dg.r.pending", { n: m.pend })}</p>` : ""}
      <h3>${t("dg.r.weak")}</h3>` + (weak.length ? Object.keys(byG).map(g => `<div class="dg-g"><div class="dg-gh content">${h(g)}</div>${byG[g].map(k => `<div class="dg-w c-${k.cat}">${CAT_ICON[k.cat]} <span class="content">${h(kpInfo[k.kp].n)}</span> <small>${t("dg.cat." + k.cat)}</small></div>`).join("")}</div>`).join("") : `<p>${t("dg.r.weakNone")}</p>`);
    if (!pmUnlocked && m.kps.some(k => k.items.some(it => !isAuto(byId[it.q]) && it.resp))) {
      x += `<div class="dg-pin"><b>${t("dg.pm.h")}</b> · ${C().hasPin() ? t("dg.pm.need") : t("dg.pm.nopin")}${C().hasPin() ? `<div class="xp-row"><input class="pin" id="dg-pin" type="password" inputmode="numeric" maxlength="4" placeholder="${t("pc.pin")}"><button class="xp-btn" data-dg="pin">${t("dg.pm.open")}</button></div><p class="dg-err">${pmMsg}</p>` : ` <a href="#parent">${t("xp.parent")} ›</a>`}</div>`;
    }
    x += `<h3>${t("dg.r.all")}</h3>` + s.groups.map(g => { const ks = m.kps.filter(k => kpInfo[k.kp].g === g.name); if (!ks.length) return "";
      return `<div class="dg-g"><div class="dg-gh content">${h(g.name)}</div>${ks.map(k => `<div class="dg-kp c-${k.cat}"><div class="dg-kh">${CAT_ICON[k.cat]} <span class="content">${h(kpInfo[k.kp].n)}</span> <small>${t("dg.cat." + k.cat)}${k.single ? t("dg.cat.single") : ""}</small></div>${k.items.slice().sort((p, q2) => (p.lv === "easy" ? 0 : 1) - (q2.lv === "easy" ? 0 : 1)).map(it => itemRow(it, a)).join("")}</div>`).join("")}</div>`; }).join("");
    x += `<p class="note dg-rule">${t("dg.r.rule")}</p><div class="xp-row dg-actions"><button class="xp-btn" data-dg="print">${t("dg.r.print")}</button><button class="xp-link" data-dg="download" data-id="${h(a.id)}">${t("dg.r.save")}</button></div></div>`;
    el().innerHTML = x; el().classList.toggle("pm-on", pmUnlocked);
  }
  function overviewView() {
    st = load(); const latest = {}; st.attempts.forEach(a => { latest[a.subj] = a; });
    let x = top("#diag") + `<div class="dg-card"><h2>${t("dg.ov.h")}</h2>`;
    const ss = Object.keys(latest); if (!ss.length) { el().innerHTML = x + `<p class="note">${t("dg.ov.none")}</p></div>`; return; }
    x += ss.map(sid => { const a = latest[sid], m = summary(a); const weak = m.kps.filter(k => k.cat === "none" || k.cat === "easy" || k.cat === "hard");
      return `<div class="dg-g"><div class="dg-gh"><a href="#diag-r=${h(a.id)}">${t("dg.ov.row", { s: h(sName(sid)), p: m.pct, d: dateOf(a.finished) })} ›</a></div>${weak.length ? weak.map(k => `<div class="dg-w c-${k.cat}">${CAT_ICON[k.cat]} <span class="content">${h(kpInfo[k.kp].n)}</span> <small>${t("dg.cat." + k.cat)}</small></div>`).join("") : `<p class="note">${t("dg.r.weakNone")}</p>`}</div>`; }).join("");
    el().innerHTML = x + "</div>";
  }
  /* ---------- events ---------- */
  function cur() { return st.current; }
  function grabInputs() { const a = cur(); if (!a || a.finished) return; const it = a.items[a.i]; const ins = [...el().querySelectorAll(".dg-in")]; if (!ins.length) return;
    const vals = ins.map(x => x.value); it.resp = vals.some(v => v.trim()) ? { vals } : null; save(); }
  function finish() {
    const a = cur(); a.finished = Date.now(); delete a.i; st.attempts.push(a); st.attempts = st.attempts.slice(-MAX_HIST); st.current = null; save();
    location.hash = "#diag-r=" + a.id;
  }
  document.addEventListener("input", e => { if (e.target.classList && e.target.classList.contains("dg-in")) { st = load(); grabInputs(); } });
  document.addEventListener("click", e => {
    const root = el(); if (!root || !root.classList.contains("on") || !root.contains(e.target)) return;
    const go = e.target.closest("[data-dg-start]"); if (go) { st = load(); st.current = build(go.dataset.dgStart); save(); location.hash = "#diag-q"; route(); return; }
    st = load(); const a = cur(); const it = a && !a.finished ? a.items[a.i] : null; const q = it ? byId[it.q] : null;
    const pk = e.target.closest("[data-dg-pick]"); if (pk && it) { it.resp = { pick: Number(pk.dataset.dgPick) }; save(); qView(); return; }
    const tp = e.target.closest("[data-dg-tap]"); if (tp && it && !tp.disabled) { const k = Number(tp.dataset.dgTap), sel = (it.resp && it.resp.sel) ? it.resp.sel.slice() : []; const at = sel.indexOf(k);
      if (q.mode === "pick" && at >= 0) sel.splice(at, 1); else if (at < 0) sel.push(k); it.resp = sel.length ? { sel } : null; save(); qView(); return; }
    const nv = e.target.closest("[data-dg-nav]"); if (nv && a && !nv.disabled) { grabInputs(); const d = Number(nv.dataset.dgNav);
      if (d > 0 && a.i === a.items.length - 1) { const left = a.items.filter(z => !z.resp).length; if (left) { qView(left); return; } finish(); return; }
      a.i = Math.max(0, a.i + d); save(); route(); window.scrollTo(0, 0); return; }
    const pm = e.target.closest("[data-dg-pm]"); if (pm) { if (!pmUnlocked) return; const [i, mk] = pm.dataset.dgPm.split(":"); const id = location.hash.slice(8); const at = st.attempts.find(x => x.id === id); if (!at) return;
      at.items[Number(i)].pm = mk; save(); reportView(id); return; }
    const b = e.target.closest("[data-dg]"); if (!b) return;
    const k = b.dataset.dg;
    if (k === "discard") { st.current = null; save(); homeView(); }
    else if (k === "clear" && it) { it.resp = null; save(); qView(); }
    else if (k === "finish-sure") finish();
    else if (k === "finish-no") { const j = a.items.findIndex(z => !z.resp); a.i = j >= 0 ? j : a.i; save(); qView(); }
    else if (k === "print") window.print();
    else if (k === "pin") { const r = C().verifyPin((document.getElementById("dg-pin") || {}).value || ""); if (r.ok) { pmUnlocked = true; pmMsg = ""; } else pmMsg = r.why === "wait" ? t("dg.pm.wait", { s: r.wait }) : t("dg.pm.bad", { n: r.left }); reportView(location.hash.slice(8)); }
    else if (k === "download") { const at = st.attempts.find(x => x.id === b.dataset.id); if (!at) return; const m = summary(at);
      const out = { app: "xiaoshu-mockup", kind: "diagnostic-report", subject: at.subj, finished: dateOf(at.finished), overall_pct: m.pct, waiting_for_parent: m.pend,
        topics: m.kps.map(k => ({ id: k.kp, chapter: kpInfo[k.kp].g, name: kpInfo[k.kp].n, result: k.cat, questions: k.items.map((it, j) => ({ id: it.q, level: it.lv, result: k.rs[j] })) })) };
      const url = URL.createObjectURL(new Blob([JSON.stringify(out, null, 1)], { type: "application/json" })); const l = document.createElement("a"); l.href = url; l.download = `xiaoshu-diagnostic-${at.subj}-${dateOf(at.finished).replace(/[^0-9]/g, "")}.json`; document.body.appendChild(l); l.click(); l.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
  });
  document.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.matches && e.target.matches("input.dg-in")) { e.preventDefault(); const n = el().querySelector("[data-dg-nav='1']"); n && n.click(); } });
  addEventListener("hashchange", () => { if (!location.hash.startsWith("#diag-r=")) { pmUnlocked = false; pmMsg = ""; } });
  /* ---------- styles (inside the site's look; print shows the report only) ---------- */
  const css = document.createElement("style");
  css.textContent = `.dg-card{background:#fff;border-radius:18px;padding:14px;border:1px solid var(--line);margin:8px 0 12px}.dg-card h2{margin:0 0 6px;font-size:18px}.dg-card h3{margin:16px 0 6px;font-size:15px}
.dg-home{display:flex;gap:12px;align-items:center;background:linear-gradient(135deg,#13274a,#284a86);color:#fff;border-radius:18px;padding:14px;margin:12px 0}.dg-home b{font-size:16px}.dg-home p{margin:3px 0 0;font-size:12.5px;opacity:.85}.dg-home .go{margin-left:auto;background:var(--gold);color:#3b2a00;font-weight:800;border-radius:12px;padding:9px 12px;white-space:nowrap}.dg-home small{display:block;font-size:11.5px;opacity:.8;margin-top:3px}
button.skill.dg-subj{width:100%;text-align:left;font:inherit;color:inherit;cursor:pointer}
.dg-hrow{display:block;padding:10px 4px;border-bottom:1px solid var(--line);font-size:14px}.dg-bar{flex:0 0 40%;height:8px;background:#eef0f5;border-radius:6px;overflow:hidden}.dg-bar i{display:block;height:100%;background:var(--gold)}
.xp-opt.dg-on,.xp-chip.on{border-color:#284a86;background:#e8eefb}.dg-saved{color:#284a86;font-weight:700;margin:4px 0 8px}.dg-confirm{background:#fff6e0;border-radius:12px;padding:10px 12px;margin:8px 0}
.dg-score{display:flex;gap:14px;align-items:center;margin:10px 0}.dg-ring{--p:0;flex:0 0 108px;height:108px;border-radius:50%;display:grid;place-content:center;text-align:center;background:radial-gradient(closest-side,#fff 78%,transparent 79%),conic-gradient(#15a066 calc(var(--p)*1%),#eef0f5 0)}.dg-ring b{font-size:24px}.dg-ring i{font-style:normal;font-size:11px;color:var(--muted)}
.dg-cats{flex:1;display:grid;gap:5px}.dg-c{display:flex;justify-content:space-between;border-radius:10px;padding:6px 10px;font-size:13px;background:#f6f8fb}.dg-c.c-both{background:#e7f6ee}.dg-c.c-easy{background:#fff6d6}.dg-c.c-hard{background:#ffecd9}.dg-c.c-none{background:#fdeee8}.dg-c.c-pending{background:#eef0ff}
.dg-pendnote{background:#eef0ff;border-radius:10px;padding:8px 10px;font-size:13px}.dg-g{margin:8px 0}.dg-gh{font-weight:800;font-size:13px;color:#2b3550;margin:6px 0}.dg-w{padding:6px 10px;border-radius:10px;margin:4px 0;font-size:14px;background:#fdeee8}.dg-w.c-easy{background:#fff6d6}.dg-w.c-hard{background:#ffecd9}.dg-w small,.dg-kh small{color:var(--muted)}
.dg-kp{border:1px solid var(--line);border-radius:12px;padding:8px 10px;margin:6px 0}.dg-kh{font-weight:700;font-size:14px;margin-bottom:4px}.dg-item summary{cursor:pointer;display:flex;gap:6px;align-items:center;flex-wrap:wrap;padding:4px 0;font-size:13px}.dg-lv{background:#eef0f5;border-radius:8px;padding:1px 7px}.dg-st{font-weight:800}.st-right{color:#15a066}.st-partial{color:#c48a00}.st-wrong,.st-blank{color:#c2502a}.st-pending{color:#4a5bd8}.dg-flag{font-size:11px;background:#fff1c9;border-radius:8px;padding:1px 6px}
.dg-pm{margin-top:8px;display:flex;gap:6px;align-items:center;flex-wrap:wrap}.dg-pm button{min-height:40px;padding:0 12px;border-radius:10px;border:1.5px solid var(--line);background:#fff;font-weight:700}.dg-pm button.on{background:var(--navy);color:#fff}#diag:not(.pm-on) .dg-pm button{opacity:.45;pointer-events:none}
.dg-pin{background:#f6f8fb;border-radius:12px;padding:10px 12px;margin:10px 0;font-size:13px}.dg-pin .pin{max-width:140px;margin:6px 0}.dg-err{color:#c2502a;margin:2px 0}.dg-rule{margin-top:14px}
@media print{body{background:#fff}.top,.tags,.dg-actions,.dg-pin,.dg-pm,nav,.practice-nav,#ov,.xs-tools{display:none!important}.view{display:none!important}#diag.on{display:block!important}.dg-item .xp-ans{display:block}.dg-card{border:0}details.dg-item>*{display:block}}`;
  document.head.appendChild(css);
  /* ---------- public ---------- */
  window.XS_DIAG = {
    card() { st = load(); const last = st.attempts[st.attempts.length - 1]; const m = last ? summary(last) : null;
      return `<a class="dg-home" href="#diag"><span style="font-size:28px">🧭</span><span><b>${t("dg.card.h").replace("🧭 ", "")}</b><p>${t("dg.card.s")}</p>${m ? `<small>${t("dg.card.last", { s: h(subjName(subjOf(last.subj))), p: m.pct, d: dateOf(last.finished).slice(5, 10) })}</small>` : ""}</span><span class="go">${t("dg.card.btn")} ›</span></a>`; },
    subj(hash) { st = load(); if (hash === "diag-q" && st.current) { const it = st.current.items[st.current.i || 0]; return it ? kpInfo[it.kp].s : st.current.subj; }
      if (hash.startsWith("diag-r=")) { const a = st.attempts.find(x => x.id === hash.slice(7)); return a ? a.subj : null; } return null; },
    route(hash) { if (hash === "diag-q") qView(); else if (hash.startsWith("diag-r=")) reportView(hash.slice(7)); else if (hash === "diag-all") overviewView(); else homeView(); },
    // read by the headless tests only
    _pickTwo: pickTwo, _build: build, _summary: summary, _result: resultOf, _load: load, _score: score, _base: base, _isAuto: isAuto
  };
})();
