//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const  listaCusrsos = document.querySelector('#lista-cursos');
let articulosCarrito =[];

cargarEventListener();
// carga de eventos

function cargarEventListener() {

    //Agregar un curso por medio de boton
    listaCusrsos.addEventListener('click', agregarCurso);

    //Eliminar un curso por medio del boton.
    carrito.addEventListener( 'click', eliminarCurso);

    // vaciar carrito

vaciarCarrito.addEventListener('click', () => {
   articulosCarrito = []; //resetear el arreglo
   limpiarHtml();
})
}


//funciones

function agregarCurso(e) {

    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const contenido = e.target.parentElement.parentElement;
        obtenerDatosCurso( contenido);
        }
   }

   //eliminar cursoo
   function eliminarCurso(e){
       if ( e.target.classList.contains( 'borrar-curso') ) {
           const cursoId = e.target.getAttributte( 'data-id');

           const actualCurso = articulosCarrito.find( curso.id === cursoId);
            if ( actualCurso.cantidad > 1) {
                actualCurso.cantidad--;
            }else {
                  articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

            }


        
           pintarcarritoHtml();
       }

   }
  
//Obtener contenido del card
function obtenerDatosCurso(curso) {

    let imagen = curso.querySelector('img').src;
    let titulo = curso.querySelector('h4').textContent;
    let precio = curso.querySelector('.precio span').textContent;
    let id = curso.querySelector('a').getAttributte('data-id');
    let cantidad = 1;
 
    // crear un objeto a partir de la informacion del curso
    const cursoActual = {
        imagen,
        titulo,
        precio,
        id,
        cantidad

    }
}

    // Comprobar el curso agregar no exista en el carrito
     const existe = articulosCarrito.some( curso => curso.id === cursoActual.id);
  if  ( existe ) {
      //Actualiza la cantidad del curso existente
      const cursosActuales = articulosCarrito.map( curso => {
          if (curso.id === cursoActual.id) {
              curso.cantidad++;
              return curso;
          } else {
              return curso;
          }
      });
      articulosCarrito = [...articulosCarrito, cursoActual]
  }else{
     
    
// Agregar articulo al carrito

}

pintarcarritoHtml();



//construrir HTML carrito
function pintarcarritoHtml() {

    //limpiar el Html

    articulosCarrito.forEach( curso => {
       const fila = document.createElement('tr');

       fila.innerHTML = `

       <td> <img src="${ curso.imagen }"width=100"> </td>
       <td> ${ curso.titulo } </td>
       <td> ${ curso.precio }" </b>" </td>
       <td> ${ curso.cantidad } </td>
       <td>  href="#" class="boarar-curso" data-id="${ curso.id } "> </a> </td>

       `;

       contenedorCarrito.appendChild(fila);
    });
}

// limpiar HTml

function limpiarHtml() {
    //manera lenta
    // contenedorCarrito.innerHTML = '';

    //Manera optimizada

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);

    }
}
