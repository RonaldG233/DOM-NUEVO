import Swal from 'sweetalert2'

import { post } from "../../helpers/api.js";
import { contarCamposFormulario, limpiar, validar, validarMinimo } from "../../main.js";

export function init(){

    const nombre=document.querySelector('#nombre');
    const descripcion=document.querySelector('#descripcion');


    const formulario=document.querySelector('form');
    
    const cantCampos=contarCamposFormulario(formulario);

    formulario.addEventListener('submit',async(event)=>{
        const info=validar(event);
        if(Object.keys(info).length==cantCampos){
            const respues= await post('categorias',info);

            if(respues.ok){
                Swal.fire({
                title: 'EXITO!',
                text: 'La categoria se creo correctamente',
                icon: 'success',
                confirmButtonText: 'Acpetar'
            })
            }
            
        }
        
    })
    nombre.addEventListener('keydown',(event)=>{if(validarMinimo(event.target))limpiar(event.target)});
    nombre.addEventListener('blur',(event)=>{if(validarMinimo(event.target))limpiar(event.target)});
    
    descripcion.addEventListener('keydown',(event)=>{if(validarMinimo(event.target))limpiar(event.target)});
    descripcion.addEventListener('blur',(event)=>{if(validarMinimo(event.target))limpiar(event.target)});

}