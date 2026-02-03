// ================= LOGIN =================
const btnLogin = document.getElementById("btnLogin");
if (btnLogin) {
  btnLogin.addEventListener("click", () => {
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPass").value;

    auth.signInWithEmailAndPassword(email, pass)
      .then(() => {
        location.href = "index.html";
      })
      .catch(err => alert(err.message));
  });
}

// ============== LOGIN GOOGLE =============
const btnLoginGoogle = document.getElementById("btnLoginGoogle");
if (btnLoginGoogle) {
  btnLoginGoogle.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(() => {
        location.href = "index.html";
      });
  });
}

// ================= REGISTER =================
const btnRegister = document.getElementById("btnRegister");
if (btnRegister) {
  btnRegister.addEventListener("click", () => {
    const email = document.getElementById("regEmail").value;
    const pass = document.getElementById("regPass").value;
    const confirm = document.getElementById("regPassConfirm").value;

    if (pass !== confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    auth.createUserWithEmailAndPassword(email, pass)
      .then(() => {
        location.href = "index.html";
      })
      .catch(err => alert(err.message));
  });
}

// ============== REGISTER GOOGLE =============
const btnRegisterGoogle = document.getElementById("btnRegisterGoogle");
if (btnRegisterGoogle) {
  btnRegisterGoogle.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(() => {
        location.href = "index.html";
      });
  });
}