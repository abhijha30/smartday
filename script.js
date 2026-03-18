// 🌙 Dark / Light Mode Toggle
function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

// ✨ Animate tasks on load
function animateTasks() {
  const tasks = document.querySelectorAll(".task");

  tasks.forEach((task, index) => {
    task.style.opacity = 0;
    task.style.transform = "translateY(20px)";

    setTimeout(() => {
      task.style.transition = "all 0.4s ease";
      task.style.opacity = 1;
      task.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// 🔥 Highlight top priority task
function highlightTopTask() {
  const firstTask = document.querySelector(".task");

  if (firstTask) {
    firstTask.style.border = "2px solid #38bdf8";
    firstTask.style.boxShadow = "0 0 10px #38bdf8";
  }
}

// 🎯 Button click animation
document.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    e.target.style.transform = "scale(0.9)";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 100);
  }
});

// 🚀 Run after tasks render
function runUIEnhancements() {
  animateTasks();
  highlightTopTask();
}
