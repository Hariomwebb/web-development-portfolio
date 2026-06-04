const canvas = document.querySelector("#workshopCanvas");
const context = canvas.getContext("2d");

function drawWorkshop() {
  const width = canvas.width;
  const height = canvas.height;

  context.fillStyle = "#2b3139";
  context.fillRect(0, 0, width, height);

  context.fillStyle = "#f4d35e";
  context.fillRect(42, 44, 310, 76);
  context.fillStyle = "#1f2933";
  context.font = "bold 30px Arial";
  context.fillText("DINESH BIKE POINT", 62, 92);

  context.fillStyle = "#48515d";
  context.fillRect(52, 180, 656, 260);
  context.fillStyle = "#343c46";
  context.fillRect(92, 224, 576, 176);

  context.fillStyle = "#d7dee8";
  context.fillRect(112, 238, 126, 16);
  context.fillRect(112, 274, 190, 16);
  context.fillRect(112, 310, 152, 16);

  context.strokeStyle = "#f7b955";
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(430, 282);
  context.lineTo(486, 220);
  context.lineTo(552, 282);
  context.lineTo(610, 282);
  context.stroke();

  context.strokeStyle = "#ffffff";
  context.lineWidth = 12;
  context.beginPath();
  context.arc(438, 336, 54, 0, Math.PI * 2);
  context.arc(604, 336, 54, 0, Math.PI * 2);
  context.stroke();

  context.strokeStyle = "#f4d35e";
  context.lineWidth = 14;
  context.beginPath();
  context.moveTo(438, 336);
  context.lineTo(500, 336);
  context.lineTo(542, 280);
  context.lineTo(604, 336);
  context.moveTo(500, 336);
  context.lineTo(564, 336);
  context.stroke();

  context.fillStyle = "#b83227";
  context.fillRect(500, 250, 88, 28);
  context.fillStyle = "#111827";
  context.fillRect(572, 224, 54, 12);

  context.fillStyle = "#f5f3ef";
  context.fillRect(0, 438, width, 102);
  context.fillStyle = "#d8d2c8";
  context.fillRect(0, 438, width, 10);

  context.fillStyle = "#17202a";
  context.font = "bold 20px Arial";
  context.fillText("Oil Change  •  Brake Work  •  Electrical Check  •  Spares", 74, 492);
}

drawWorkshop();

const bookingForm = document.querySelector("#bookingForm");
const bookingHint = document.querySelector("#bookingHint");
const toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 2400);
}

function updateBookingHint() {
  const service = document.querySelector("#serviceType").value;
  const estimates = {
    "General Service": "Estimated time: 2 to 3 hours after inspection.",
    "Oil Change": "Estimated time: 30 to 45 minutes.",
    "Brake Repair": "Estimated time: 1 to 2 hours depending on parts.",
    "Electrical Check": "Estimated time: 45 minutes to 2 hours.",
    "Puncture Repair": "Estimated time: 20 to 40 minutes.",
  };

  bookingHint.textContent = estimates[service];
}

document.querySelector("#serviceType").addEventListener("change", updateBookingHint);

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const name = formData.get("customerName").trim();
  const phone = formData.get("phoneNumber").trim();
  const bike = formData.get("bikeModel").trim();
  const issue = formData.get("issueDetails").trim();

  if (!name || !phone || !bike || !issue) {
    showToast("Please fill all booking details.");
    return;
  }

  showToast(`Thanks ${name}. The shop will call you for ${bike}.`);
  bookingForm.reset();
  updateBookingHint();
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".main-nav a").forEach((navLink) => {
      navLink.removeAttribute("aria-current");
    });
    link.setAttribute("aria-current", "page");
  });
});

updateBookingHint();
