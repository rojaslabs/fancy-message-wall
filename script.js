function postIt(){
    // Se crea objeto fecha
    let date = new Date;
    
    // Se utilizan métodos para retornar valores y formatear la fecha
    let formattedDate = '<span>' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '</span>';
    
    // Se crea un 'li' y se almacena en una variable
    let post = document.createElement('li');
    
    // Se inserta en el 'li' la fecha formateada y valor del 'textarea'
    post.innerHTML = formattedDate + '<span>' + document.querySelector('#text').value + '</span>' + '<button onclick = "deletePost(this)"><i aria-hidden="true" class="far fa-trash-alt" title="Delete post"></i></button>' + '<div></div>';
    
    // Se visibiliza el 'div' que contendrá la lista de posts
    document.querySelector('#post').style = 'display: block';
    
    // Se añade el 'li' a la lista de posts, desde el más reciente al más antiguo
    document.querySelector('#post ul').prepend(post);
    
    // Se habilita la edición de contenido
    let postContent = document.querySelector('li span:nth-child(2)');
    postContent.addEventListener('click', editContent);

    // Se vacía el 'textarea'
    document.querySelector('#text').value = '';
    
    // Se muestra alerta
    alert('success', '¡Mensaje posteado!');
    
    // Se pone foco nuevamente en el 'textarea'
    document.querySelector('#text').focus();
}

function editContent(){
    this.setAttribute('contentEditable', 'true');
    let lastModifiedDate = new Date;
    let lastModifiedDateFormatted = '<span>' + lastModifiedDate.getHours() + ':' + lastModifiedDate.getMinutes() + ':' + lastModifiedDate.getSeconds() + '</span>';
    let edited = this.parentElement.querySelector('div');
    edited.style = 'display: block'
    edited.innerHTML = '<i class="far fa-clock"></i> EDITED ' + lastModifiedDateFormatted;
    this.focus();
}

function reset(){
    // Se genera colección a partir de lista
    list = document.querySelectorAll('#post ul li');
    // Si la lista es > 0, se eliminan los mensajes
    if (list.length > 0) {
        for (var i = list.length - 1; i >= 0; i--){
            list[i].remove();
        }
        alert('danger', '¡Todos los posts se han eliminado!');
    } else {
        alert('warning', 'No hay posts para eliminar.');
    }
    // Se pone foco nuevamente en el 'textarea'
    document.querySelector('#text').focus();
}

function deletePost(element) {
    element.parentElement.remove();
    alert('danger', '¡Post eliminado!');
}

function switchOrder() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
    list = document.querySelector('#post ul');
    switching = true;
    // Set the sorting direction to ascending:
    dir = 'asc'; 
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName('li');
        // Loop through all list-items:
        for (i = 0; i < (b.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /* check if the next item should switch place with the current item,
            based on the sorting direction (asc or desc): */
            if (dir == 'asc') {
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    /* if next item is alphabetically lower than current item,
                    mark as a switch and break the loop: */
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == 'desc') {
                if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
                    /* if next item is alphabetically higher than current item,
                    mark as a switch and break the loop: */
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            // Each time a switch is done, increase switchcount by 1:
            switchcount ++;
        } else {
            /* If no switching has been done AND the direction is 'asc',
            set the direction to 'desc' and run the while loop again. */
            if (switchcount == 0 && dir == 'asc') {
                dir = 'desc';
                switching = true;
            }
        }
    }
    if (b.length < 2) {
        alert('warning', 'Debes tener 2 o más posts, para ordenarlos.');
    }
}

function darkMode() {
    // Fondo
    var body = document.body;
    body.classList.toggle('body-dm');
    // Contenedor
    var container = document.querySelector('.container');
    container.classList.toggle('container-dm');
    // Textarea
    var textarea = document.querySelector('textarea');
    textarea.classList.toggle('textarea-dm');
    // Post
    var post = document.querySelector('#post ul');
    post.classList.toggle('post-li-dm');
    // Se pone foco nuevamente en el 'textarea'
    document.querySelector('#text').focus();
}

function alert(type, message) {
    // Se selecciona el div #alerta
    let alert = document.querySelector('#alert');
    // Se asigna la variable que representa el tipo de alerta
    alert.className = type;
    // Se inserta el mensaje definido en el parámetro de la función
    alert.innerHTML = message;
    // Se establece el estilo que tendrá al aparecer
    alert.style.top = '0';
    alert.style.opacity = '1';
    // Se establace el estilo que tendrá al desaparecer
    setTimeout(function() { 
        alert.style.opacity = '0';
        alert.style.top = '-40px'
    }, 1500);
}