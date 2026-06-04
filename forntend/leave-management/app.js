const leaveRequests = [
  {
    employee: "Ananya Rao",
    type: "Annual Leave",
    dates: "17 Jun - 20 Jun",
    days: 4,
    manager: "Neha Kapoor",
    status: "Pending",
  },
  {
    employee: "Rohan Mehta",
    type: "Sick Leave",
    dates: "05 Jun",
    days: 1,
    manager: "Vikram Shah",
    status: "Approved",
  },
  {
    employee: "Kavya Nair",
    type: "Work From Home",
    dates: "10 Jun - 11 Jun",
    days: 2,
    manager: "Neha Kapoor",
    status: "Pending",
  },
  {
    employee: "Arjun Sethi",
    type: "Personal Leave",
    dates: "14 Jun",
    days: 1,
    manager: "Ritu Sharma",
    status: "Rejected",
  },
  {
    employee: "Mira Thomas",
    type: "Annual Leave",
    dates: "24 Jun - 28 Jun",
    days: 5,
    manager: "Vikram Shah",
    status: "Approved",
  },
];

const calendarItems = [
  {
    date: "05 Jun",
    title: "Rohan Mehta",
    detail: "Sick Leave",
  },
  {
    date: "10 Jun - 11 Jun",
    title: "Kavya Nair",
    detail: "Work From Home",
  },
  {
    date: "24 Jun - 28 Jun",
    title: "Mira Thomas",
    detail: "Annual Leave",
  },
];

const requestTable = document.querySelector("#requestTable");
const calendarList = document.querySelector("#calendarList");
const statusFilter = document.querySelector("#statusFilter");
const searchInput = document.querySelector("#searchInput");
const leaveForm = document.querySelector("#leaveForm");
const formHint = document.querySelector("#formHint");
const toast = document.querySelector("#toast");
const pendingCount = document.querySelector("#pendingCount");

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 2200);
}

function renderRequests() {
  const selectedStatus = statusFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  const visibleRequests = leaveRequests.filter((request) => {
    const matchesStatus =
      selectedStatus === "all" || request.status === selectedStatus;
    const matchesSearch = `${request.employee} ${request.type}`
      .toLowerCase()
      .includes(query);
    return matchesStatus && matchesSearch;
  });

  requestTable.innerHTML = visibleRequests
    .map(
      (request) => `
        <tr>
          <td>
            <div class="employee-cell">
              <span class="avatar" aria-hidden="true">${getInitials(request.employee)}</span>
              <strong>${request.employee}</strong>
            </div>
          </td>
          <td>${request.type}</td>
          <td>${request.dates}</td>
          <td>${request.days}</td>
          <td>${request.manager}</td>
          <td><span class="badge ${request.status.toLowerCase()}">${request.status}</span></td>
          <td><button class="action-button" type="button" data-employee="${request.employee}">View</button></td>
        </tr>
      `
    )
    .join("");

  pendingCount.textContent = leaveRequests.filter(
    (request) => request.status === "Pending"
  ).length;
}

function renderCalendar() {
  calendarList.innerHTML = calendarItems
    .map(
      (item) => `
        <article class="calendar-item">
          <time>${item.date}</time>
          <strong>${item.title}</strong>
          <span>${item.detail}</span>
        </article>
      `
    )
    .join("");
}

function calculateDays() {
  const startDate = document.querySelector("#startDate").value;
  const endDate = document.querySelector("#endDate").value;

  if (!startDate || !endDate) {
    formHint.textContent = "Leave duration is calculated after both dates are selected.";
    return;
  }

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const difference = Math.floor((end - start) / 86400000) + 1;

  if (difference <= 0) {
    formHint.textContent = "End date should be the same as or after the start date.";
    return;
  }

  formHint.textContent = `${difference} day${difference === 1 ? "" : "s"} selected.`;
}

leaveForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(leaveForm);
  const employee = formData.get("employeeName").trim();
  const leaveType = formData.get("leaveType");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const reason = formData.get("reason").trim();

  if (!employee || !leaveType || !startDate || !endDate || !reason) {
    showToast("Please complete all required fields.");
    return;
  }

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  if (end < start) {
    showToast("End date cannot be before start date.");
    return;
  }

  const days = Math.floor((end - start) / 86400000) + 1;
  leaveRequests.unshift({
    employee,
    type: leaveType,
    dates: `${startDate} - ${endDate}`,
    days,
    manager: "Neha Kapoor",
    status: "Pending",
  });

  leaveForm.reset();
  document.querySelector("#employeeName").value = employee;
  formHint.textContent = "Leave duration is calculated after both dates are selected.";
  renderRequests();
  showToast("Leave request submitted for approval.");
});

requestTable.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    showToast(`Opened request for ${event.target.dataset.employee}.`);
  }
});

document.querySelector("#openRequestButton").addEventListener("click", () => {
  document.querySelector("#employeeName").focus();
});

document.querySelector("#downloadButton").addEventListener("click", () => {
  showToast("Report export is ready for payroll review.");
});

document.querySelector("#startDate").addEventListener("change", calculateDays);
document.querySelector("#endDate").addEventListener("change", calculateDays);
statusFilter.addEventListener("change", renderRequests);
searchInput.addEventListener("input", renderRequests);

renderCalendar();
renderRequests();
