let listadoProductos = [];

const productos = {
    id: '',
    nombre: '',
    precio: 0
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombreProducto');
const precioInput = document.querySelector('#precioProducto');
const btnAgregar = document.querySelector('#btnAgregar');

const validarFormulario = (e) => {
    e.preventDefault(); //para que no se ejecute por defecto

    if (editando) {
        editarProducto();
        editando = false;
    } else {
        productos.id = Date.now();
        productos.nombre = nombreInput.value;
        productos.precio = precioInput.value;

        agregarProducto();
    }
}

const agregarProducto = () => {
    listadoProductos.push({ ...productos });

    mostrarProducto();

    formulario.reset();
    limpiarObjeto();
}

const limpiarObjeto = () => {
    productos.id = '';
    productos.nombre = '';
    productos.precio = 0;
}

const editarProducto = () => {
    productos.nombre = nombreInput.value;
    productos.precio = precioInput.value;

    listadoProductos.map(producto => {
        if (producto.id === productos.id) {
            producto.id = productos.id;
            producto.nombre = productos.nombre;
            producto.precio = productos.precio;
        }
    });

    limpiarHTML();
    mostrarProducto();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar Producto';
}

const eliminarProducto = (id) => {
    listadoProductos = listadoProductos.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarProducto();
}

const mostrarProducto = () => {

    limpiarHTML();

    const divProductos = document.querySelector('.div-productos');

    listadoProductos.forEach(producto => {
        const { id, nombre, precio } = producto;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${precio} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarProducto(producto);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-primary');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarProducto(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-danger');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divProductos.appendChild(parrafo);
        divProductos.appendChild(hr);
    });
}

const cargarProducto = (producto) => {
    const { id, nombre, precio } = producto;

    nombreInput.value = nombre;
    precioInput.value = precio;

    productos.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar Producto';

    editando = true;
}

const limpiarHTML = () => {
    const divProductos = document.querySelector('.div-productos');
    while (divProductos.firstChild) {
        divProductos.removeChild(divProductos.firstChild);
    }
}

formulario.addEventListener('submit', validarFormulario);