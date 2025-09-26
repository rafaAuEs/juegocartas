"use strict";
const Cartas = require('./Cartas.js');
const prompt = require('prompt-sync')();
const sql = require('mysql2/promise');
//funciones
function anhadirCarta (){
        let salir3 = false;
        while (!salir3){
            let nuevoNombre = prompt("Introduce nombre: ");
            let nuevaVida = parseInt(prompt("Introduce vida: "));
            let nuevaFuerza = parseInt(prompt("Introduce fuerza: "));
            if (typeof nuevoNombre==="string" && !isNaN(nuevaVida) && !isNaN(nuevaFuerza)){
                console.log("console");
                return new Cartas(nuevoNombre,nuevaVida,nuevaFuerza);
            }
            else{
                console.clear();
                console.log("Error nombre solo puede contener letras, vida solo puede contener numeros enteros, fuerza solo puede contener numeros enteros:" );
                prompt("Pulsa ENTER para continuar");
            }
        }
        return nuevaCarta;
}
function mostrarColeccion(coleccion){
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

module.exports = {anhadirCarta, mostrarColeccion, menu2};