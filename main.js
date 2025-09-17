const prompt = require('prompt-sync')();
const fs = require('fs');
//clases
class Coleccion {
    constructor(){
        this.coleccion=[];
    }
    cargarJson(){
        let jsonData = fs.readFileSync('datos.json');
        let datosParseados=JSON.parse(jsonData);
        this.coleccion=datosParseados;
    }
    guardarJson(){
        let jsonString = JSON.stringify(this.coleccion, null, 2);
        fs.writeFileSync('datos.json', jsonString);

    }
    cargarTxt(){
        const convertirArray = fs.readFileSync('datos.txt', 'utf8');
        this.coleccion = JSON.parse(convertirArray);
    }
    guardarTxt(){
        const datosString = JSON.stringify(this.coleccion);
        fs.writeFileSync('datos.txt', datosString);
    }
    agregarCarta (nuevaCarta){
        this.coleccion.push(nuevaCarta);
    }
    modificarCarta (){
        console.clear();
        let buscarNombre = prompt("Introduce el nombre de la carta para modificar: ");
        let modNombre = prompt('Introduce el nuevo nombre: ');
        let modVida = prompt("Introduce la nueva vida: ");
        let modFuerza = prompt("Introdcue la nueva Fuerza: ");
        for (let i = 0; i<this.coleccion.length; i++){
            let objetoArray = this.coleccion[i];
            if(objetoArray.nombre===buscarNombre){
                console.log(`${objetoArray} modificado: `);
                objetoArray.nombre=modNombre;
                objetoArray.vida=modVida;
                objetoArray.fuerza=modFuerza;
                console.log(`La carta ${buscarNombre} ha sido modificada`)
                prompt("Pulse ENTER para continuar: ");
                break;
            }
            else if(i === (this.coleccion.length-1) && objetoArray.nombre!=buscarNombre){
                console.log("ERROR no existe ese nombre: ");
                prompt("Pulse ENTER para continuar: ");
            }
        }
    }
    devolverColeccion(){
        return this.coleccion;
    }
    borrarCarta(){
        console.clear();
        let borrarNombre = prompt("Introduce el nombre de la carta que quiere borrar: ");
        for (let i = 0; i<this.coleccion.length; i++){
            let objetoBorrar = this.coleccion[i];
            if (objetoBorrar.nombre === borrarNombre){
                console.log(`La carta ${borrarNombre} ha sido borrada`);
                this.coleccion.splice(i, 1);
                prompt("Pulse ENTER para continuar: ");
                break;
            }
            else if(i === (this.coleccion.length-1) && objetoBorrar.nombre!=borrarNombre){
                console.log("ERROR no existe ese nombre: ");
                prompt("Pulse ENTER para continuar: ");
            }
        }
    }
}
class Cartas {
    constructor (nombre, vida, fuerza) {
        this.nombre=nombre;
        this.vida=vida;
        this.fuerza=fuerza;
    }
}
//variables
    let coleccion=new Coleccion();
    let nuevaCarta;
    let salir2;
//funciones
function anhadirCarta (){
        let salir3 = false;
        while (!salir3){
            let nuevoNombre = prompt("Introduce nombre: ");
            let nuevaVida = parseInt(prompt("Introduce vida: "));
            let nuevaFuerza = parseInt(prompt("Introduce fuerza: "));
            if (typeof nuevoNombre==="string" && typeof nuevaVida === "number" && typeof nuevaFuerza === "number"){
                nuevaCarta = new Cartas(nuevoNombre,nuevaVida,nuevaFuerza);
                salir3 = true;
            }
            else{
                console.clear();
                console.log("Error nombre solo puede contener letras, vida solo puede contener numeros enteros, fuerza solo puede contener numeros enteros:" );
                prompt("Pulsa ENTER para continuar");
            }
        }

}
function mostrarColeccion(){
    console.clear();
    let arrayColeccion=coleccion.devolverColeccion();
    arrayColeccion.forEach(carta => {
        console.log(`Nombre: ${carta.nombre} \nVida: ${carta.vida} \nFuerza: ${carta.fuerza}`);
        console.log();
    });
    prompt("Pulsa ENTER para continuar");
}
function menu2 (){
    console.clear();
    console.log("1. Registrar carta");
    console.log("2. Modificar");
    console.log("3. Mostrar tu colección");
    console.log("4. Borrar");
    console.log("5. Salir");
}
//menu
let salir = false;
    while (!salir) {
        console.clear();
        console.log("1. Cargar datos json");
        console.log("2. Cargar datos txt");
        console.log("3. Salir");
        let opcion = parseInt(prompt("Elije una opcion: "));
        switch (opcion){
            case 1:
                //cargar Json
                coleccion.cargarJson();
                salir2 = false;
                while (!salir2){
                    menu2();
                    let opcion2= parseInt(prompt("Elije una opcion: "));
                    switch(opcion2){
                        case 1:
                            anhadirCarta();
                            coleccion.agregarCarta(nuevaCarta);
                            coleccion.guardarJson();
                            break;
                        case 2:
                            coleccion.modificarCarta();
                            coleccion.guardarJson();
                            break;
                        case 3:
                            mostrarColeccion();
                            break;
                        case 4:
                            coleccion.borrarCarta();
                            coleccion.guardarJson();
                            break;
                        case 5:
                            salir2=true;
                            break;
                        default:
                            console.log("error")
                            prompt("Pulse ENTER para continuar");
                            break;
                    }
                }
                break;
            case 2:
            menu2();
                //cargar el txt
                coleccion.cargarTxt();
                salir2 = false;
                while (!salir2){
                    menu2();
                let opcion2= parseInt(prompt("Elije una opcion: "));
                switch(opcion2){
                    case 1:
                        anhadirCarta();
                        coleccion.agregarCarta(nuevaCarta);
                        coleccion.guardarTxt();
                        break;
                    case 2:
                        coleccion.modificarCarta();
                        coleccion.guardarTxt();
                        break;
                    case 3:
                        mostrarColeccion();
                        break;
                    case 4:
                        coleccion.borrarCarta();
                        coleccion.guardarTxt();
                        break;
                    case 5:
                        salir2=true;
                        break;
                    default:
                        console.log("error")
                        prompt("Pulse ENTER para continuar");
                        break;
                    }
                }
                break;
            case 3:
                salir = true;
                console.clear();
                console.log("Se ha cerrado el programa");
                break;
            default:
                console.log("Error");
                prompt("Pulse ENTER para continuar");
                break;
        }
    }