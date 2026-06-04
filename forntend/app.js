const deals = [
  {
    client: "Orbit Retail",
    owner: "Maya",
    value: "$72K",
    stage: "Proposal",
    note: "Website refresh and checkout optimization",
  },
  {
    client: "Northline Foods",
    owner: "Dev",
    value: "$48K",
    stage: "Negotiation",
    note: "Customer portal with inventory sync",
  },
  {
    client: "Aster Dental",
    owner: "Ravi",
    value: "$31K",
    stage: "Won",
    note: "Multi-location booking experience",
  },
  {
    client: "BluePeak Finance",
    owner: "Nina",
    value: "$86K",
    stage: "Proposal",
    note: "Internal analytics dashboard",
  },
];

const tasks = [
  {
    time: "09:30",
    title: "Send proposal update to Orbit Retail",
  },
  {
    time: "11:00",
    title: "Review launch checklist for Aster Dental",
  },
  {
    time: "15:45",
    title: "Confirm scope changes with BluePeak Finance",
  },
];

const accounts = [
  {
    client: "Orbit Retail",
    owner: "Maya Singh",
    plan: "Growth",
    health: "healthy",
    renewal: "Aug 18",
    arr: "$42K",
  },
  {
    client: "Northline Foods",
    owner: "Dev Patel",
    plan: "Scale",
    health: "risk",
    renewal: "Jul 02",
    arr: "$58K",
  },
  {
    client: "Aster Dental",
    owner: "Ravi Mehta",
    plan: "Growth",
    health: "healthy",
    renewal: "Sep 11",
    arr: "$36K",
  },
  {
    client: "BluePeak Finance",
    owner: "Nina Rao",
    plan: "Enterprise",
    health: "healthy",
    renewal: "Oct 05",
    arr: "$96K",
  },
  {
    client: "Canvas Studio",
    owner: "Maya Singh",
    plan: "Starter",
    health: "risk",
    renewal: "Jun 29",
    arr: "$18K",
  },
];

const pipelineBoard = document.querySelector("#pipelineBoard");
const taskList = document.querySelector("#taskList");
const accountTable = document.querySelector("#accountTable");
const stageFilter = document.querySelector("#stageFilter");
const searchInput = document.querySelector("#searchInput");
const toast = document.querySelector("#toast");

let accountFilter = "all";

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 2200);
}

function renderDeals() {
  const selectedStage = stageFilter.value;
  const visibleDeals =
    selectedStage === "all"
      ? deals
      : deals.filter((deal) => deal.stage === selectedStage);

  pipelineBoard.innerHTML = visibleDeals
    .map(
      (deal) => `
        <article class="deal-card">
          <div>
            <h3>${deal.client}</h3>
            <p>${deal.note}</p>
            <span class="pill ${deal.stage.toLowerCase()}">${deal.stage}</span>
          </div>
          <strong class="deal-value">${deal.value}</strong>
        </article>
      `
    )
    .join("");
}

function renderTasks() {
  taskList.innerHTML = tasks
    .map(
      (task) => `
        <article class="task-item">
          <span class="task-time">${task.time}</span>
          <strong>${task.title}</strong>
          <button type="button" data-task="${task.title}">Mark complete</button>
        </article>
      `
    )
    .join("");
}

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function renderAccounts() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleAccounts = accounts.filter((account) => {
    const matchesStatus =
      accountFilter === "all" || account.health === accountFilter;
    const matchesSearch = account.client.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  accountTable.innerHTML = visibleAccounts
    .map(
      (account) => `
        <tr>
          <td>
            <div class="client-cell">
              <span class="avatar">${getInitials(account.client)}</span>
              <strong>${account.client}</strong>
            </div>
          </td>
          <td>${account.owner}</td>
          <td>${account.plan}</td>
          <td><span class="health ${account.health}">${account.health === "risk" ? "At Risk" : "Healthy"}</span></td>
          <td>${account.renewal}</td>
          <td><strong>${account.arr}</strong></td>
        </tr>
      `
    )
    .join("");
}

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-item")
      .forEach((navItem) => navItem.classList.remove("active"));
    item.classList.add("active");
    showToast(`${item.textContent.trim()} view selected`);
  });
});

document.querySelectorAll(".segment").forEach((segment) => {
  segment.addEventListener("click", () => {
    document
      .querySelectorAll(".segment")
      .forEach((item) => item.classList.remove("active"));
    segment.classList.add("active");
    accountFilter = segment.dataset.filter;
    renderAccounts();
  });
});

document.querySelector("#newDealButton").addEventListener("click", () => {
  showToast("New deal action ready for integration");
});

taskList.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    showToast(`Completed: ${event.target.dataset.task}`);
  }
});

stageFilter.addEventListener("change", renderDeals);
searchInput.addEventListener("input", renderAccounts);

renderDeals();
renderTasks();
renderAccounts();
