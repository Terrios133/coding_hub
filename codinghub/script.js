// 🔒 PROTECCIÓN CON MODAL
auth.onAuthStateChanged(user=>{
    const modal = document.getElementById("loginModal");

    if(!user){
        modal.style.display = "flex";
    }else{
        modal.style.display = "none";
        iniciarApp(); // arranca tu sistema
    }
});

function inicializarSnippets(){
    const input = document.getElementById("fileInput");
    const contenedor = document.getElementById("cardsContainer");
    const searchInput = document.getElementById("searchInput");
    const count = document.getElementById("count");
    const clearBtn = document.getElementById("clearAll");

    let total = 0;

    function detectarLenguaje(nombre){
        const ext = nombre.split('.').pop().toLowerCase();
        return ext;
    }

    function guardarEnLocalStorage(){
        const tarjetas = [];
        document.querySelectorAll(".card").forEach(card => {
            const nombre = card.querySelector("h3").textContent;
            const codigo = card.querySelector("code").textContent;
            tarjetas.push({nombre, codigo});
        });
        localStorage.setItem("snippets", JSON.stringify(tarjetas));
    }

    function crearCard(nombre, codigoTexto){
        total++;
        count.textContent = total + " items";

        const card = document.createElement("div");
        card.className = "card";

        const header = document.createElement("div");
        header.className = "card-header";

        const titulo = document.createElement("h3");
        titulo.textContent = nombre;
        titulo.style.cursor="pointer";

        titulo.onclick = function(){
            const inputTitulo = document.createElement("input");
            inputTitulo.value = titulo.textContent;
            header.replaceChild(inputTitulo, titulo);
            inputTitulo.focus();

            inputTitulo.onblur = guardarCambio;
            inputTitulo.onkeypress = function(e){
                if(e.key==="Enter") guardarCambio();
            };

            function guardarCambio(){
                titulo.textContent = inputTitulo.value;
                header.replaceChild(titulo, inputTitulo);
                guardarEnLocalStorage();
            }
        };

        const lenguaje = document.createElement("span");
        lenguaje.className = "lang";
        lenguaje.textContent = detectarLenguaje(nombre);

        const descargar = document.createElement("span");
        descargar.textContent = "📥";
        descargar.className = "download-btn";
        descargar.onclick = function(){
            const blob = new Blob([codigoTexto], {type:"text/plain"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href=url;
            a.download=titulo.textContent;
            a.click();
            URL.revokeObjectURL(url);
        };

        const copiar = document.createElement("span");
        copiar.textContent = "📋";
        copiar.className = "copy-btn";
        copiar.onclick = function(){
            navigator.clipboard.writeText(codigoTexto);
            copiar.textContent="✅";
            setTimeout(()=>copiar.textContent="📋",1000);
        };

        const eliminar = document.createElement("span");
        eliminar.textContent = "❌";
        eliminar.className = "delete-btn";
        eliminar.onclick = function(){
            card.remove();
            total--;
            count.textContent = total + " items";
            guardarEnLocalStorage();
        };

        header.appendChild(titulo);
        header.appendChild(lenguaje);
        header.appendChild(descargar);
        header.appendChild(copiar);
        header.appendChild(eliminar);

        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.className = "language-" + detectarLenguaje(nombre);
        code.textContent = codigoTexto;

        pre.appendChild(code);
        card.appendChild(header);
        card.appendChild(pre);
        contenedor.appendChild(card);

        Prism.highlightElement(code);
        guardarEnLocalStorage();
    }

    // Cargar snippets guardados
    const guardados = JSON.parse(localStorage.getItem("snippets")) || [];
    guardados.forEach(t => crearCard(t.nombre, t.codigo));

    // Subir archivo
    input.addEventListener("change", function(event){
        const archivo = event.target.files[0];
        const lector = new FileReader();
        lector.onload = function(e){
            crearCard(archivo.name, e.target.result);
        };
        lector.readAsText(archivo);
    });

    // Buscar
    searchInput.addEventListener("input", function(){
        const texto = this.value.toLowerCase();
        document.querySelectorAll(".card").forEach(card=>{
            const nombre = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = nombre.includes(texto) ? "block" : "none";
        });
    });

    // Limpiar todo
    clearBtn.onclick = function(){
        if(confirm("¿Seguro que quieres borrar todos los snippets?")){
            contenedor.innerHTML="";
            localStorage.removeItem("snippets");
            total=0;
            count.textContent="0 items";
        }
    };
}