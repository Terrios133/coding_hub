// Variables
const btnLogin = document.getElementById("btnLogin");
const btnLoginGoogle = document.getElementById("btnLoginGoogle");
const btnRegister = document.getElementById("btnRegister");
const btnRegisterGoogle = document.getElementById("btnRegisterGoogle");

const loginEmail = document.getElementById("loginEmail");
const loginPass = document.getElementById("loginPass");
const regEmail = document.getElementById("regEmail");
const regPass = document.getElementById("regPass");
const regPassConfirm = document.getElementById("regPassConfirm");

const btnGoRegister = document.getElementById("btnGoRegister");
const btnGoLogin = document.getElementById("btnGoLogin");

// Navegación entre login y registro
if(btnGoRegister) btnGoRegister.onclick = ()=> location.href="register.html";
if(btnGoLogin) btnGoLogin.onclick = ()=> location.href="login.html";

// Login con correo
if(btnLogin){
  btnLogin.onclick = ()=>{
    auth.signInWithEmailAndPassword(loginEmail.value, loginPass.value)
      .then(()=> location.href="index.html")
      .catch(err=> alert(err.message));
  }
}

// Registro con correo
if(btnRegister){
  btnRegister.onclick = ()=>{
    if(!regEmail.value || !regPass.value || !regPassConfirm.value){
      alert("Completa todos los campos");
      return;
    }
    if(regPass.value !== regPassConfirm.value){
      alert("Las contraseñas no coinciden");
      return;
    }
    auth.createUserWithEmailAndPassword(regEmail.value, regPass.value)
      .then(()=> location.href="index.html")
      .catch(err => alert(err.message));
  }
}

// Login/Registro con Google
const provider = new firebase.auth.GoogleAuthProvider();
if(btnLoginGoogle) btnLoginGoogle.onclick = ()=> auth.signInWithPopup(provider)
  .then(()=> location.href="index.html")
  .catch(err=> alert(err.message));
if(btnRegisterGoogle) btnRegisterGoogle.onclick = ()=> auth.signInWithPopup(provider)
  .then(()=> location.href="index.html")
  .catch(err=> alert(err.message));