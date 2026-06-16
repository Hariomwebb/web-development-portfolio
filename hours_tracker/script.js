const SK = "hours_tracker_v4";
      let tasks = [],
        logs = [],
        expanded = {},
        selectedTaskId = null;

      function esc(s) {
        return String(s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      function fmt(iso) {
        return new Date(iso).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "2-digit",
        });
      }
      function expiry() {
        const d = new Date();
        d.setDate(d.getDate() + 30);
        return d.toISOString();
      }
      function getSpent(id) {
        return logs
          .filter((l) => l.taskId === id)
          .reduce((s, l) => s + l.hrs, 0);
      }

      function showToast(m, warn = false) {
        const t = document.getElementById("toast");
        t.textContent = m;
        t.className = "toast" + (warn ? " toast-warn" : "");
        t.classList.add("show");
        setTimeout(() => t.classList.remove("show"), 3000);
      }

      async function load() {
        try {
          const r = await window.storage.get(SK);
          if (r && r.value) {
            const d = JSON.parse(r.value);
            const now = new Date();
            tasks = (d.tasks || []).filter((t) => new Date(t.expiry) > now);
            logs = (d.logs || []).filter((l) => new Date(l.expiry) > now);
          }
        } catch (e) {}
        render();
      }

      async function save() {
        try {
          await window.storage.set(SK, JSON.stringify({ tasks, logs }));
        } catch (e) {}
      }

      function updateInfoStrip(taskId, totalOverride) {
        const task = tasks.find((t) => t.id === taskId);
        const total = totalOverride || (task ? task.total : 0);
        const spent = taskId ? getSpent(taskId) : 0;
        const left = total - spent;
        const pct =
          total > 0 ? Math.min(200, Math.round((spent / total) * 100)) : 0;
        const isOver = left < 0;
        const barPct = Math.min(100, pct);
        const barCls = pct >= 100 ? "over" : pct >= 75 ? "warn" : "";

        document.getElementById("is-total").textContent = total + " hrs";
        document.getElementById("is-spent").textContent = spent + " hrs";

        const leftEl = document.getElementById("is-left");
        const overChip = document.getElementById("is-over-chip");
        if (isOver) {
          leftEl.textContent = "0 hrs";
          leftEl.className = "val";
          overChip.style.display = "";
          document.getElementById("is-over-val").textContent =
            Math.abs(left) + " hrs";
        } else {
          leftEl.textContent = left + " hrs";
          leftEl.className = "green";
          overChip.style.display = "none";
        }

        document.getElementById("is-pct-label").textContent =
          pct + "% complete" + (isOver ? " (over budget!)" : "");
        const bar = document.getElementById("is-bar");
        bar.style.width = barPct + "%";
        bar.className = "mini-bar-fill " + barCls;

        const strip = document.getElementById("info-strip");
        strip.style.display = "flex";
        strip.className = "info-strip" + (isOver ? " is-over" : "");
        previewOvercheck();
      }

      function previewOvercheck() {
        const addHrs =
          parseFloat(document.getElementById("f-spend").value) || 0;
        const previewEl = document.getElementById("is-preview-over");
        if (!addHrs || !selectedTaskId) {
          previewEl.style.display = "none";
          return;
        }
        const task = tasks.find((t) => t.id === selectedTaskId);
        if (!task) {
          previewEl.style.display = "none";
          return;
        }
        const spent = getSpent(selectedTaskId);
        const afterSpent = spent + addHrs;
        const left = task.total - afterSpent;
        if (left < 0) {
          document.getElementById("is-preview-text").textContent =
            `Yeh entry ke baad ${Math.abs(left)} hrs over ho jayega!`;
          previewEl.style.display = "flex";
        } else {
          previewEl.style.display = "none";
        }
      }

      function onNameInput() {
        const val = document
          .getElementById("f-name")
          .value.trim()
          .toLowerCase();
        selectedTaskId = null;
        document.getElementById("f-total").readOnly = false;
        document.getElementById("f-total").value = "";
        document.getElementById("info-strip").style.display = "none";
        document.getElementById("mode-label").textContent = "";
        document.getElementById("mode-label").className = "mode-label";
        document.getElementById("is-preview-over").style.display = "none";

        if (!val) {
          hideDropdown();
          return;
        }
        const matches = tasks.filter((t) => t.name.toLowerCase().includes(val));
        const dd = document.getElementById("dropdown");
        let html = "";
        matches.forEach((t) => {
          const spent = getSpent(t.id);
          const left = t.total - spent;
          const isOver = left < 0;
          const pct = Math.round((spent / t.total) * 100);
          const metaCls = isOver
            ? "dropdown-item-meta red"
            : "dropdown-item-meta";
          const metaText = isOver
            ? `${spent}/${t.total} hrs &nbsp; <b>âš  ${Math.abs(left)} hrs over</b>`
            : `${spent}/${t.total} hrs &nbsp; <b>${left} left</b>`;
          html += `<div class="dropdown-item" onmousedown="selectTask('${t.id}')">
      <span class="dropdown-item-name">${esc(t.name)}</span>
      <span class="${metaCls}">${metaText}</span>
    </div>`;
        });
        const exactMatch = tasks.find((t) => t.name.toLowerCase() === val);
        if (!exactMatch) {
          html += `<div class="dropdown-new" onmousedown="selectNew()"><i class="ti ti-plus" style="font-size:12px" aria-hidden="true"></i> Naya task: "<b>${esc(document.getElementById("f-name").value.trim())}</b>"</div>`;
        }
        dd.innerHTML = html;
        dd.style.display = html ? "block" : "none";
      }

      function selectTask(id) {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;
        selectedTaskId = id;
        document.getElementById("f-name").value = task.name;
        document.getElementById("f-total").value = task.total;
        document.getElementById("f-total").readOnly = true;
        document.getElementById("mode-label").textContent = "- existing task";
        document.getElementById("mode-label").className = "mode-label existing";
        hideDropdown();
        updateInfoStrip(id);
        document.getElementById("f-spend").focus();
      }

      function selectNew() {
        selectedTaskId = null;
        document.getElementById("f-total").readOnly = false;
        document.getElementById("mode-label").textContent = "- new task";
        document.getElementById("mode-label").className = "mode-label";
        hideDropdown();
        document.getElementById("f-total").focus();
      }

      function onTotalChange() {
        if (selectedTaskId) return;
        const total = parseFloat(document.getElementById("f-total").value) || 0;
        if (total > 0) {
          document.getElementById("is-total").textContent = total + " hrs";
          document.getElementById("is-spent").textContent = "0 hrs";
          document.getElementById("is-left").textContent = total + " hrs";
          document.getElementById("is-left").className = "green";
          document.getElementById("is-over-chip").style.display = "none";
          document.getElementById("is-pct-label").textContent = "0% complete";
          document.getElementById("is-bar").style.width = "0%";
          document.getElementById("is-bar").className = "mini-bar-fill";
          document.getElementById("info-strip").style.display = "flex";
          document.getElementById("info-strip").className = "info-strip";
        }
      }

      function hideDropdown() {
        setTimeout(() => {
          document.getElementById("dropdown").style.display = "none";
        }, 150);
      }

      async function submitEntry() {
        const name = document.getElementById("f-name").value.trim();
        const total = parseFloat(document.getElementById("f-total").value) || 0;
        const spendVal =
          parseFloat(document.getElementById("f-spend").value) || 0;
        const note = document.getElementById("f-note").value.trim();

        if (!name) {
          document.getElementById("f-name").focus();
          showToast("Task name likho!");
          return;
        }
        if (total <= 0) {
          document.getElementById("f-total").focus();
          showToast("Total hours likho!");
          return;
        }
        if (spendVal <= 0) {
          document.getElementById("f-spend").focus();
          showToast("Aaj kitne hours spend kiye?");
          return;
        }

        let taskId = selectedTaskId;
        if (!taskId) {
          const existing = tasks.find(
            (t) => t.name.toLowerCase() === name.toLowerCase(),
          );
          if (existing) {
            taskId = existing.id;
          } else {
            taskId = Date.now().toString();
            tasks.push({
              id: taskId,
              name,
              total,
              added: new Date().toISOString(),
              expiry: expiry(),
            });
          }
        }
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
          task.expiry = expiry();
          task.total = total;
        }

        logs.push({
          id: (Date.now() + 1).toString(),
          taskId,
          hrs: spendVal,
          note,
          date: new Date().toISOString(),
          expiry: expiry(),
        });
        expanded[taskId] = true;
        await save();

        const newSpent = getSpent(taskId);
        const over = newSpent - total;
        if (over > 0) {
          showToast(
            `âš  "${task ? task.name : name}" ab ${over} hrs over budget hai!`,
            true,
          );
        } else {
          showToast(
            `${spendVal} hrs log ho gaye - "${task ? task.name : name}"`,
          );
        }

        document.getElementById("f-name").value = "";
        document.getElementById("f-total").value = "";
        document.getElementById("f-total").readOnly = false;
        document.getElementById("f-spend").value = "";
        document.getElementById("f-note").value = "";
        document.getElementById("info-strip").style.display = "none";
        document.getElementById("is-preview-over").style.display = "none";
        document.getElementById("mode-label").textContent = "";
        selectedTaskId = null;
        render();
      }

      function render() {
        renderSummary();
        renderTasks();
        renderHistory();
      }

      function renderSummary() {
        let total = 0,
          spent = 0,
          overTotal = 0;
        tasks.forEach((t) => {
          total += t.total;
          const s = getSpent(t.id);
          spent += s;
          if (s > t.total) overTotal += s - t.total;
        });
        document.getElementById("s-total").textContent = total;
        document.getElementById("s-spent").textContent = spent;
        document.getElementById("s-left").textContent = Math.max(
          0,
          total - spent,
        );
        document.getElementById("s-over").textContent =
          overTotal > 0 ? overTotal + " hrs" : 0;
        const cardOver = document.getElementById("card-over");
        cardOver.className = overTotal > 0 ? "card card-over" : "card";
      }

      function renderTasks() {
        const body = document.getElementById("task-body");
        if (!tasks.length) {
          body.innerHTML =
            '<tr><td colspan="6" class="empty"><i class="ti ti-clipboard" style="font-size:20px;margin-bottom:8px;display:block" aria-hidden="true"></i>Koi task nahi. Upar se entry karo!</td></tr>';
          return;
        }
        let html = "";
        tasks.forEach((t) => {
          const spent = getSpent(t.id);
          const left = t.total - spent;
          const isOver = left < 0;
          const pct = t.total > 0 ? Math.round((spent / t.total) * 100) : 0;
          const barPct = Math.min(100, pct);
          const barCls = pct >= 100 ? "over" : pct >= 75 ? "warn" : "";
          const taskLogs = logs
            .filter((l) => l.taskId === t.id)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
          const isExp = expanded[t.id];

          let leftCell = "";
          if (isOver) {
            leftCell = `<span class="left-over">0 hrs</span><br><span class="over-badge"><i class="ti ti-alert-triangle" style="font-size:11px" aria-hidden="true"></i> ${Math.abs(left)} hrs over</span>`;
          } else {
            leftCell = `<span class="left-ok">${left} hrs</span>`;
          }

          let badgeHtml = "";
          if (isOver)
            badgeHtml = `<span class="badge badge-red">Over budget</span>`;
          else if (pct >= 75)
            badgeHtml = `<span class="badge badge-amber">Near limit</span>`;
          else badgeHtml = `<span class="badge badge-green">On track</span>`;

          html += `<tr class="${isOver ? "over-row" : ""}">
      <td>
        <div class="task-name-cell">${esc(t.name)}</div>
        <div class="sub-date">Added: ${fmt(t.added)}</div>
        ${taskLogs.length ? `<button class="expand-btn" onclick="toggleExpand('${t.id}')"><i class="ti ti-${isExp ? "chevron-up" : "chevron-down"}" aria-hidden="true"></i> ${taskLogs.length} entries</button>` : ""}
      </td>
      <td>${t.total} hrs</td>
      <td><span class="spent-cell">${spent} hrs</span></td>
      <td>${leftCell}</td>
      <td>
        <div class="prog-bar-bg"><div class="prog-bar-fill ${barCls}" style="width:${barPct}%"></div></div>
        <div style="font-size:11px;color:var(--color-text-secondary);margin-top:3px">${pct}% ${badgeHtml}</div>
      </td>
      <td><button class="del-btn" onclick="deleteTask('${t.id}')"><i class="ti ti-trash" aria-hidden="true"></i></button></td>
    </tr>`;

          if (isExp && taskLogs.length) {
            taskLogs.forEach((l) => {
              html += `<tr class="log-row">
          <td><span class="log-dot"></span>${fmt(l.date)}</td>
          <td class="spent-cell">+${l.hrs} hrs</td>
          <td colspan="3">${l.note ? `<span class="note-text">${esc(l.note)}</span>` : ""}</td>
          <td><button class="del-btn" onclick="deleteLog('${l.id}')"><i class="ti ti-x" aria-hidden="true"></i></button></td>
        </tr>`;
            });
          }
        });
        body.innerHTML = html;
      }

      function renderHistory() {
        const body = document.getElementById("history-body");
        const sorted = [...logs].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        if (!sorted.length) {
          body.innerHTML =
            '<tr><td colspan="5" class="empty">Abhi koi log nahi.</td></tr>';
          return;
        }
        body.innerHTML = sorted
          .map((l) => {
            const task = tasks.find((t) => t.id === l.taskId);
            return `<tr><td>${fmt(l.date)}</td><td class="spent-cell">+${l.hrs} hrs</td><td>${task ? `<span class="task-name-cell">${esc(task.name)}</span>` : '<span style="color:var(--color-text-secondary)">Deleted</span>'}</td><td>${l.note ? `<span class="note-text">${esc(l.note)}</span>` : "-"}</td><td><button class="del-btn" onclick="deleteLog('${l.id}')"><i class="ti ti-trash" aria-hidden="true"></i></button></td></tr>`;
          })
          .join("");
      }

      function toggleExpand(id) {
        expanded[id] = !expanded[id];
        renderTasks();
      }

      async function deleteTask(id) {
        const t = tasks.find((x) => x.id === id);
        if (
          !confirm(
            `"${t ? t.name : "task"}" aur iske saare logs delete karna chahte ho?`,
          )
        )
          return;
        tasks = tasks.filter((x) => x.id !== id);
        logs = logs.filter((l) => l.taskId !== id);
        delete expanded[id];
        await save();
        render();
        showToast("Task delete ho gaya!");
      }

      async function deleteLog(id) {
        logs = logs.filter((l) => l.id !== id);
        await save();
        render();
        showToast("Entry delete ho gayi!");
      }

      function switchTab(name, el) {
        document
          .querySelectorAll(".tab")
          .forEach((t) => t.classList.remove("active"));
        el.classList.add("active");
        document.getElementById("view-tasks").style.display =
          name === "tasks" ? "" : "none";
        document.getElementById("view-history").style.display =
          name === "history" ? "" : "none";
      }

      document.getElementById("f-name").addEventListener("keydown", (e) => {
        if (e.key === "Enter")
          document
            .getElementById(selectedTaskId ? "f-spend" : "f-total")
            .focus();
      });
      document.getElementById("f-total").addEventListener("keydown", (e) => {
        if (e.key === "Enter") document.getElementById("f-spend").focus();
      });
      document.getElementById("f-spend").addEventListener("keydown", (e) => {
        if (e.key === "Enter") document.getElementById("f-note").focus();
      });
      document.getElementById("f-note").addEventListener("keydown", (e) => {
        if (e.key === "Enter") submitEntry();
      });

      load();
