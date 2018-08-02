const fs = require('fs');


let listadorToDo = [];


const guardarDB = () => {
    let data = JSON.stringify(listadorToDo);

    fs.writeFile('db/data.json', data, (err) => {
        if (err)
            throw new Error(err)
    });

}

const cargarDB = () => {

    try {
        listadorToDo = require('../db/data.json');
    } catch (error) {
        listadorToDo = [];
    }

}


const crear = (desc) => {

    cargarDB();

    let porHacer = {
        desc,
        completado: false
    };

    listadorToDo.push(porHacer);

    guardarDB();

    return porHacer;
}


const getListado = (completado) => {
    cargarDB();
    return listadorToDo.filter((tarea) => tarea.completado === completado);
}

const actualizar = (desc, completado) => {
    cargarDB();

    let index = listadorToDo.findIndex((tarea) => tarea.desc === desc)

    if (index >= 0) {
        listadorToDo[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (desc) => {
    cargarDB();
    let index = listadorToDo.findIndex((tarea) => tarea.desc === desc)

    if (index >= 0) {
        listadorToDo.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }

}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}