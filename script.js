const SUPABASE_URL = "https://umryashhwokftkxvkozq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtcnlhc2hod29rZnRreHZrb3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MDkyNTgsImV4cCI6MjA4OTM4NTI1OH0.wUepcoz1kbyoOgILhRD1iLZDbRpbT-igTXWJu0NSmwY";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let user = null;
let tasks = [];

async function getUser() {
  let { data } = await supabase.auth.getUser();
  user = data.user;

  if (!user) window.location.href = "index.html";
}

function calculateUrgency(deadline) {
  let today = new Date();
  let due = new Date(deadline);
  let diff = (due - today) / (1000 * 60 * 60);

  if (diff < 6) return 5;
  if (diff < 24) return 4;
  if (diff < 72) return 3;
  if (diff < 168) return 2;
  return 1;
}

function getQuadrant(u, i) {
  if (u >= 4 && i >= 4) return "q1";
  if (u < 4 && i >= 4) return "q2";
  if (u >= 4 && i < 4) return "q3";
  return "q4";
}

async function addTask() {
  let title = document.getElementById("taskTitle").value;
  let deadline = document.getElementById("deadline").value;
  let importance = parseInt(document.getElementById("importance").value);

  let urgency = calculateUrgency(deadline);
  let score = (importance * 2) + urgency;

  await supabase.from("tasks").insert([
    {
      user_id: user.id,
      title,
      deadline,
      importance,
      urgency,
      score
    }
  ]);

  fetchTasks();
}

async function fetchTasks() {
  let { data } = await supabase
    .from("tasks")
    .select("*")
    .order("score", { ascending: false });

  tasks = data;
  renderTasks();
}

async function deleteTask(id) {
  await supabase.from("tasks").delete().eq("id", id);
  fetchTasks();
}

function renderTasks() {
  document.querySelectorAll(".column").forEach(col => col.innerHTML = col.innerHTML.split("</h3>")[0] + "</h3>");

  tasks.forEach(task => {
    let q = getQuadrant(task.urgency, task.importance);

    let div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
      ${task.title}<br>
      Score: ${task.score}<br>
      <button onclick="deleteTask('${task.id}')">❌</button>
    `;

    document.getElementById(q).appendChild(div);
  });

  updateSuggestion();
}

function updateSuggestion() {
  if (tasks.length === 0) {
    document.getElementById("suggestion").innerText = "None";
    return;
  }

  let best = tasks[0];
  document.getElementById("suggestion").innerText = best.title;
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}

getUser().then(fetchTasks);
