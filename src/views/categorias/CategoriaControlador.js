import { get } from "../../helpers/api.js";
import { cargarFilas } from "../../main.js";

export async function  init (){

    const boton=document.querySelector('.boton');
    
    // const contendor=document.querySelector('.contenido');
    // console.log(contendor); 

    // const posts=await obtener();
    // console.log(posts);
    
    
    // posts.forEach(post => {
    //     const h1=document.createElement('h1');
    //     h1.textContent=post.title;
    //     contendor.append(h1)

    // });

    

    const cuerpoTabla=document.querySelector('.cuerpoTabla');
    let categorias=await get('categorias');
    categorias=categorias.data;

    categorias.forEach(categoria => {
        cargarFilas(cuerpoTabla,[categoria.id,categoria.nombre,categoria.descripcion])
    });

    
}