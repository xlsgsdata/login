//en pagina principal (index.html) donde se muestra el nombre del usuario
if (requireLogin()) {
    document.getElementById("welcome").innerText = getUser();
}

//en otras paginas (dentro de funcion)
//if (!requireLogin()) {
    //return;
//}