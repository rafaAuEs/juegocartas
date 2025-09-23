"use strict";
const prompt = require('prompt-sync')();
const fs = require('fs');
const conectar = require('./db.js');
const Cartas = require('./Cartas.js');
//clases
class Coleccion {
    constructor(){
        this.coleccion=[];
    }
    async cargarBD(){
        const conectando = await conectar;
        const [rows] = await conectando.execute('SELECT * FROM cartas');
        this.coleccion = rows.map(row => new Cartas (row.nombre, row.vida, row.fuerza));
    }
    async guardarBD(carta) {
        const connection = await conectar;
        const sql = 'INSERT INTO cartas (nombre, vida, fuerza) VALUES (?, ?, ?)';
        const [result] = await connection.execute(sql, [carta.nombre, carta.vida, carta.fuerza]);
        this.coleccion.push(carta);
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
        let modVida = parseInt(prompt("Introduce la nueva vida: "));
        let modFuerza = parseInt(prompt("Introdcue la nueva Fuerza: "));
        for (let i = 0; i<this.coleccion.length; i++){
            let objetoArray = this.coleccion[i];
            if(objetoArray.nombre===buscarNombre){
                console.log(`${objetoArray} modificado: `);
                objetoArray.nombre=modNombre;
                objetoArray.vida=modVida;
                objetoArray.fuerza=modFuerza;
                console.log(`La carta ${buscarNombre} ha sido modificada`);
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
    async modificarBD(nombreAnterior, nombreNuevo, nuevaVida, nuevaFuerza) {
        const connection = await conectar;
        const sql = 'UPDATE cartas SET nombre = ?, vida = ?, fuerza = ? WHERE nombre = ?';
        await connection.execute(sql, [nombreNuevo, nuevaVida, nuevaFuerza, nombreAnterior]);
        // Actualiza la colección en memoria
        const cartaEncontrada = this.coleccion.find(c => c.nombre === nombreAnterior);
        if (cartaEncontrada) {
            cartaEncontrada.nombre = nombreNuevo;
            cartaEncontrada.vida = nuevaVida;
            cartaEncontrada.fuerza = nuevaFuerza;
        }
    }
    
    async borrarBD(nombre) {
        const connection = await conectar;
        const sql = 'DELETE FROM cartas WHERE nombre = ?';
        await connection.execute(sql, [nombre]);
        // Actualiza la colección en memoria
        this.coleccion = this.coleccion.filter(carta => carta.nombre !== nombre);
    }
}
module.exports = Coleccion;