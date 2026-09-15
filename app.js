// 中秋賞月 Moon Watch HK · V1
// 目前只做前端展示；下一階段再接入真實 HKO / 天文資料。

const countdownEl = document.getElementById("countdown");
const countdownText = document.getElementById("countdownText");
const locationBtn = document.getElementById("locationBtn");
const toast = document.getElementById("toast");

let remaining = 18 * 60 + 42;

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map(v => String(v).padStart(2, "0")).join(":");
}

function tick() {
  countdownEl.textContent = formatTime(remaining);

  if (remaining > 0) {
    remaining--;
  } else {
    countdownText.textContent = "月亮已經升起，抬頭看看吧。";
    countdownEl.textContent = "🌕 已月出";
  }
}

tick();
setInterval(tick, 1000);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

locationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showToast("你的裝置不支援位置服務。");
    return;
  }

  locationBtn.disabled = true;
  locationBtn.textContent = "📍 正在取得位置…";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log("User location:", latitude, longitude);

      locationBtn.textContent = "✓ 已取得我的位置";
      showToast("已取得位置。下一階段可用它計算月亮方位。");
    },
    () => {
      locationBtn.disabled = false;
      locationBtn.textContent = "📍 使用我的位置";
      showToast("未能取得位置，請確認瀏覽器的位置權限。");
    },
    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000
    }
  );
});

document.querySelector(".menu-btn").addEventListener("click", () => {
  showToast("選單功能將於下一階段加入。");
});
