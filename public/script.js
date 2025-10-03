// script.js - simple client logic to call /api/register and /api/login
async function postJSON(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json().catch(() => ({ error: "invalid response" }));
}

const msg = document.getElementById("msg");
const useridEl = document.getElementById("userid");
const passwordEl = document.getElementById("password");

document.getElementById("btnRegister").addEventListener("click", async () => {
  const userid = useridEl.value.trim();
  const password = passwordEl.value;
  if (!userid || !password) {
    msg.textContent = "Please enter userid & password";
    return;
  }
  msg.textContent = "Registering...";
  const result = await postJSON("/api/register", { userid, password });
  if (result.ok) {
    msg.textContent = "Registered! You can now login.";
  } else {
    msg.textContent = result.error || result.message || "Registration failed";
  }
});

document.getElementById("btnLogin").addEventListener("click", async () => {
  const userid = useridEl.value.trim();
  const password = passwordEl.value;
  if (!userid || !password) {
    msg.textContent = "Please enter userid & password";
    return;
  }
  msg.textContent = "Logging in...";
  const result = await postJSON("/api/login", { userid, password });
  if (result.ok) {
    msg.textContent = "Login successful — welcome to Minecraft Rewards!";
  } else {
    msg.textContent = result.error || result.message || "Login failed";
  }
});
