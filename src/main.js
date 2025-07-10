
import * as CategoriaControlador from './views/categorias/CategoriaControlador.js'
import * as ProductosControlador from './views/productos/ProductosControlador.js'
import * as nuevaCategoriaControlador from './views/nuevaCategoria/NuevaCategoriaConreolador.js'

const cargarContenido=()=>{
       const hash=window.location.hash.substring(1);

        let routes=[
            {
                nombre:'productos',
                path:`./src/views/productos/index.html`,
                controlador:ProductosControlador.init
            },
            {
                nombre:'categorias',
                path:`./src/views/categorias/index.html`,
                controlador:CategoriaControlador.init
            },
            {
                nombre:'nuevaCategoria',
                path:'./src/views/nuevaCategoria/index.html',
                controlador:nuevaCategoriaControlador.init
            }   

        
        ]
    

    traerContenido(hash,routes);  
}
export const cargarFilas=(cuerrpoTabla, infoFila)=>{
    
    const fila=document.createElement('tr')
    infoFila.forEach(info => {
        const campo=document.createElement('th');
        campo.classList.add('tabla__campo')
        campo.textContent=info;
        fila.append(campo);
    });

    const campo=document.createElement('th');
    campo.classList.add('tabla__campo');

    const btnEditar=document.createElement('button');
    btnEditar.textContent="Editar"
    btnEditar.classList.add('tabla__boton')
    campo.append(btnEditar);

    const btnEliminar=document.createElement('button');
    btnEliminar.textContent="Eliminar";
    btnEliminar.classList.add('tabla__boton')
    campo.append(btnEliminar);

    fila.append(campo)

    cuerrpoTabla.append(fila);
}

export const contarCamposFormulario=(formulario)=>{
    const campos=[...formulario].filter((campo)=>campo.hasAttribute('required'));
    return campos.length
}

export const validarMinimo=(campo)=>{
    let min=0;

    if(campo.tagName=="TEXTAREA"){
        min=campo.getAttribute('minlength')
    }else{
        min=campo.getAttribute('min')
    }

    if(campo.value.length<min){
        if(campo.nextElementSibling)campo.nextElementSibling.remove();

        const mensaje=document.createElement('span');
        mensaje.textContent= `El campo ${campo.getAttribute('id')} debe tener minimo ${min} caracteres`;
        campo.classList.add('border--red');
        campo.insertAdjacentElement('afterend',mensaje)
        return false
    }
    else return true;
}

export const limpiar=(campo)=>{
    if(campo.nextElementSibling)campo.nextElementSibling.remove();
    campo.classList.remove('border--red');
}

export const validar=(event)=>{
    event.preventDefault();
    const campos=[...event.target].filter((campo)=>campo.hasAttribute('required'));

    const info={};
    campos.forEach(campo => {
        if(validarMinimo(campo)){
            info[campo.getAttribute('id')]=campo.value
        }
    });
    return info;
}


// const validarExiste=(routes,hash)=>{

//     for(let n=0;n<routes.length;n++){
//         if(routes[n].nombre==hash)return true;
//     }
//     return false
// }
const traerContenido=(hash,routes)=>{
    routes.forEach(objeto => {
        if(hash==objeto.nombre){
            fetch(objeto.path).then((response)=>{
                response.text().then(html=>{      
                    document.querySelector('.contenido').innerHTML=html;
                    objeto.controlador();
                })
            })
        }
    });
}

window.addEventListener('hashchange',cargarContenido)
window.addEventListener('DOMContentLoaded',cargarContenido)