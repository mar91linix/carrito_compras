// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

// Carga de Eventos
function cargarEventListeners() {

    // Agregar un curso por medio del boton
    listaCursos.addEventListener('click', agregarCurso );

    // Eliminar un curso por medio del boton
    carrito.addEventListener('click', eliminarCurso );

    // Vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = []; // Resetear el arreglo
        limpiarHtml();  // Limpiamos el carrito en HTML   
    });

}


// Funciones

// Agregar curso al carrito
function agregarCurso(e) {

    e.preventDefault();

    if ( e.target.classList.contains('agregar-carrito') ) {
        const contenido = e.target.parentElement.parentElement;
        obtenerDatosCurso(contenido);
    }
}

// Eliminar un curso
function eliminarCurso(e) {
    if( e.target.classList.contains('borrar-curso') ) {
        const cursoId = e.target.getAttribute('data-id');

        const actualCurso = articulosCarrito.find( curso => curso.id === cursoId);

        if ( actualCurso.cantidad > 1) {
            actualCurso.cantidad--;
        } else {
            articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        }

        pintarCarritoHtml();
    }
}


// Obtener Contenido del card
function obtenerDatosCurso(curso) {

    let imagen = curso.querySelector('img').src;
    let titulo = curso.querySelector('h4').textContent;
    let precio = curso.querySelector('.precio span').textContent;
    let id = curso.querySelector('a').getAttribute('data-id');
    let cantidad = 1;
    
    // Crear un objeto a partir de la información del curso
    const cursoActual = {
        imagen,
        titulo,
        precio,
        id,
        cantidad
    }

    // Comprobar que el curso a agregar no exista en el carrito
    const existe = articulosCarrito.some( curso => curso.id === cursoActual.id);

    if ( existe ) {
        // Actualizamos la cantidad del curso existente
        const cursosActuales = articulosCarrito.map( curso => {
            if ( curso.id === cursoActual.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });

        articulosCarrito = [...cursosActuales];
    } else {
        // Agregando articulos al carrito
        articulosCarrito = [...articulosCarrito, cursoActual];
    }

    pintarCarritoHtml();
}

// Contruir HTML en el carrito
function pintarCarritoHtml() {

    // Limpiar el HTML carrito
    limpiarHtml();

    articulosCarrito.forEach( curso => {
        const fila = document.createElement('tr');
        // console.log(curso);
        fila.innerHTML = `
            <td> <img src="${ curso.imagen }" width="100"> </td>
            <td> ${ curso.titulo } </td>
            <td> <b> ${ curso.precio } </b> </td>
            <td> ${ curso.cantidad } </td>
            <td> <a href="#" class="borrar-curso" data-id="${ curso.id }"> X </a> </td>
        `;

        contenedorCarrito.appendChild(fila);
    });
}

// Limpiar carrito HTMl
function limpiarHtml() {
    // Manera lenta
    // contenedorCarrito.innerHTML = '';

    // Manera optimizada
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
