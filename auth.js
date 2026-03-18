const SUPABASE_URL = "YOUR_URL";
const SUPABASE_KEY = "YOUR_ANON_KEY";

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
