"use strict";
//require
const prompt = require('prompt-sync')();
const funcion = require('./funciones.js');
const Coleccion = require('./Coleccion.js');
const mysql = require('mysql2/promise');
const conectar = require('./db.js');
const Cartas = require('./Cartas.js');
const { MongoClient, ObjectId, client } = require('mongodb');
//variables
    let coleccion = new Coleccion();
    let nuevaCarta;

    /*const conexion=mysql.createConnection( {
        host: 'localhost',
        user: 'root',
        password: 'Overmysql1122',
        database: 'juegoCartas'
    });
    conexion.connect((err)=> {
        if(err){
            console.log("conexion Fallida");
            throw err;
        }
    });*/
    /*const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'juegoCartas',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
});*/

//menu
async function main(){
    let salir = false;
    while (!salir) {
        console.clear();
        console.log("1. Cargar datos json");
        console.log("2. Cargar datos txt");
        console.log("3. Conectar con Worckbench");
        console.log("4. Conectar MongoDB");
        console.log("5. Salir");
        let opcion = parseInt(prompt("Elije una opcion: "));
        switch (opcion){
            case 1:
                //cargar Json
                coleccion.cargarJson();
                let salir2 = false;
                while (!salir2){
                    funcion.menu2();
                    let opcion2= parseInt(prompt("Elije una opcion: "));
                    switch(opcion2){
                        case 1:
                            nuevaCarta = funcion.anhadirCarta();
                            coleccion.agregarCarta(nuevaCarta);
                            coleccion.guardarJson();
                            break;
                        case 2:
                            coleccion.modificarCarta();
                            coleccion.guardarJson();
                            break;
                        case 3:
                            funcion.mostrarColeccion(coleccion);
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
            funcion.menu2();
                //cargar el txt
                coleccion.cargarTxt();
                let salir5 = false;
                while (!salir5){
                    funcion.menu2();
                let opcion2= parseInt(prompt("Elije una opcion: "));
                switch(opcion2){
                    case 1:
                        nuevaCarta = funcion.anhadirCarta();
                        coleccion.agregarCarta(nuevaCarta);
                        coleccion.guardarTxt();
                        break;
                    case 2:
                        coleccion.modificarCarta();
                        coleccion.guardarTxt();
                        break;
                    case 3:
                        funcion.mostrarColeccion(coleccion);
                        break;
                    case 4:
                        coleccion.borrarCarta();
                        coleccion.guardarTxt();
                        break;
                    case 5:
                        salir5=true;
                        break;
                    default:
                        console.log("error")
                        prompt("Pulse ENTER para continuar");
                        break;
                    }
                }
                break;
            case 3:
                //cargar el mysql
                await coleccion.cargarBD();
                    let salir6 = false;
                    while (!salir6){
                        funcion.menu2();
                        let opcion6= parseInt(prompt("Elije una opcion: "));
                        switch(opcion6) {
                            case 1:
                                let nuevaCartaBD = funcion.anhadirCarta();
                                await coleccion.guardarBD(nuevaCartaBD);
                                break;
                            case 2:
                                let nombreAnterior= prompt("Escribe el nombre: ");
                                let nombreNuevo = prompt("Escribe el nuevo nombre: ");
                                let vidaNueva = parseInt(prompt("Escribe la vida nueva: "));
                                let fuerzaNueva = parseInt(prompt("Escribe la fuerza nueva: "));
                                await coleccion.modificarBD(nombreAnterior, nombreNuevo, vidaNueva, fuerzaNueva);
                                break;
                            case 3:
                                funcion.mostrarColeccion(coleccion);
                                break;
                            case 4:
                                let buscarNombreBD = prompt("Introduce el nombre: ");
                                await coleccion.borrarBD(buscarNombreBD);
                                break;
                            case 5:
                                const connection = await conectar;
                                await connection.end();
                                salir6=true;
                                break;
                            default:
                                console.log("error");
                                prompt("Pulsa ENTER para continuar");
                                break;
                        }
                    }
            case 4:
                // conectar a mongodb.
                let salir7 = false;
                while(!salir7){
                    funcion.menu2();
                    let opcion = parseInt(prompt("Elije una opcion: "));
                    switch(opcion) {
                        case 1:
                            let nuevaCartaBDM=funcion.anhadirCarta();
                            prompt("pausa");
                            await coleccion.guardarBDM(nuevaCartaBDM);
                            break;
                        case 2:
                            let nombreAnterior = prompt("Introduce el nombre para modificar: ");
                            let nuevoNombre = prompt("Introduce el nuevo nombre: ");
                            let vidaNueva = parseInt(prompt("Introduce la vida nueva: "));
                            let fuerzaNueva = parseInt(prompt("Introduce la fuerza nueva: "));
                            await coleccion.modificarBDM(nombreAnterior, nuevoNombre, vidaNueva, fuerzaNueva);
                            break;
                        case 3:
                            funcion.mostrarColeccion(coleccion);
                            break;
                        case 4:
                            let buscarNombreBDM = prompt("Introduce el nombre: ");
                            await coleccion.borrarBDM(buscarNombreBDM);
                            break;
                        case 5:
                            await client.close();
                            salir7 = true;
                            break;
                        default:
                            console.log("error");
                            prompt("Pulsa ENTER para continuar");
                            break;
                    }
                }
            case 5:
                salir =true;
                console.clear();
                console.log("Se ha cerrado el programa");
                break;
            default:
                console.log("Error");
                prompt("Pulse ENTER para continuar");
                break;
        }
    }
}
main();