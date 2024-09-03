const sliderContainer = document.querySelector('.slider_container');
const sliderBtn = document.querySelector(".slider_btn");
const slider = document.querySelector(".slider");
const pricingType = document.querySelector(".pricing_type");
const price = document.querySelector(".price");
let isDragging= false;

function updatePrice(positionRatio) {
  const pricingTypes = ["10k", "50k", "100k", "500k", "1M"];
  const widths = ["0%", "25%", "50%", "75%", "100%"];
  const prices = ["$8", "$12", "$16", "$24", "$36"];
  const stepIndex = Math.round(positionRatio * 4);
  pricingType.textContent = `${pricingTypes[stepIndex]} PAGEVIEWS`;
  slider.style.width = widths[stepIndex];
  price.textContent = `${prices[stepIndex]}.00`;
}

sliderBtn.addEventListener("mousedown", () => {
  isDragging = true;
})

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const sliderContainerRect = sliderContainer.getBoundingClientRect();
    let newLeft = e.clientX - sliderContainerRect.left;

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

    updatePrice(newLeft / (sliderContainerRect.width - sliderBtn.offsetWidth))
  }
})
  
document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
  }
})
