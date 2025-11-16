const slider = document.getElementById("slider-song");

function updateFill() {
    const value = slider.value;
    slider.style.backgroundSize = `${value}% 100%`;
}

slider.addEventListener("input", updateFill);

// Initialize on load
updateFill();