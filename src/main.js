
import * as CategoriaControlador from './views/categorias/CategoriaControlador.js'
import * as ProductosControlador from './views/productos/ProductosControlador.js'

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
            }

        
        ]
    console.log(routes);

    traerContenido(hash,routes);  
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