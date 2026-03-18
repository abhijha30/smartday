const SUPABASE_URL = "https://umryashhwokftkxvkozq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtcnlhc2hod29rZnRreHZrb3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MDkyNTgsImV4cCI6MjA4OTM4NTI1OH0.wUepcoz1kbyoOgILhRD1iLZDbRpbT-igTXWJu0NSmwY";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function signUp() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let { error } = await supabase.auth.signUp({ email, password });

  if (error) alert(error.message);
  else alert("Registered! Now login.");
}

async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) alert(error.message);
  else window.location.href = "dashboard.html";
}
