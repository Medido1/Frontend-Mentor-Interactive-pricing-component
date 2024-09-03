const sliderContainer = document.querySelector('.slider_container');
const sliderBtn = document.querySelector(".slider_btn");
const slider = document.querySelector(".slider");
const pricingType = document.querySelector(".pricing_type");
const price = document.querySelector(".price");
const toggleBtn = document.querySelector(".btn_toggle");

const pricingTypes = ["10k", "50k", "100k", "500k", "1M"];
const widths = ["0%", "25%", "50%", "75%", "100%"];
const monthlyPrices = ["$8", "$12", "$16", "$24", "$36"];
let yearlyPrices = ["$6", "$9", "$12", "$18", "$25"];
let billing = "monthly";
let isDragging= false;
let positionRatio = 0;

function toggleBilling() {
  toggleBtn.classList.toggle("right");
  billing = (billing === "monthly") ? "yearly" : "monthly";
  updatePrice(positionRatio);
}

function updatePrice(positionRatio) {
  const stepIndex = Math.round(positionRatio * 4);
  pricingType.textContent = `${pricingTypes[stepIndex]} PAGEVIEWS`;
  slider.style.width = widths[stepIndex];
  if (billing === "monthly") {
    price.textContent = `${monthlyPrices[stepIndex]}.00`;
  } else if (billing === "yearly") {
    price.textContent = `${yearlyPrices[stepIndex]}.00`;
  }
}

function slideBtn(e) {
  if (isDragging) {
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const sliderContainerRect = sliderContainer.getBoundingClientRect();
    let newLeft = clientX - sliderContainerRect.left;

    // Keep the button within the slider bounds
    if (newLeft < 0) {
      newLeft = 0;
    }
    else if (newLeft > sliderContainerRect.width) {
      newLeft = sliderContainerRect.width;
    }

    const step = (sliderContainerRect.width) / 4;
    newLeft = Math.round(newLeft / step) * step;
    sliderBtn.style.left = `${newLeft}px`;

    positionRatio = newLeft / sliderContainerRect.width;
    updatePrice(positionRatio)
  }
}

sliderBtn.addEventListener("mousedown", () => {
  isDragging = true;
})
sliderBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  isDragging = true;
})

document.addEventListener("mousemove", slideBtn);
document.addEventListener("touchmove", slideBtn)
  
document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
  }
})
document.addEventListener("touchend", () => {
  if (isDragging) {
    isDragging = false;
  }
})
toggleBtn.addEventListener("click", toggleBilling);
