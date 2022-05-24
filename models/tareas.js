const Tarea = require("./tarea");
require('colors');

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(elem => {
            const tarea = this._listado[elem];
            listado.push(tarea);
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
        //console.log('funcion cargarTareasFromArray');
    }

    listadoCompleto() {
        console.log(" Completada en Verde y Pendiente en rojo\n".white);
        this.listadoArr.forEach((elem, indice) => {
            const idx = `${indice + 1}.`.green;
            if (elem.completadoEn === null) {
                console.log(`${idx} ${elem.desc} :: ${'Pendiente'.red}`);
            } else {
                console.log(`${idx} ${elem.desc} :: ${'Completada'.green}`);
            }
        });
    }

    listarTareasPendientes() {
        let indiceA = 0;
        this.listadoArr.forEach((tarea) => {
            if (tarea.completadoEn === null) {
                indiceA++;
                let resultado = `${indiceA}.`.green;
                console.log(` ${resultado} ${tarea.desc} :: ${'Pendiente'.red}`);
            }
        });
    }

    listarTareasCompletadas() {
        let indiceA = 0;
        this.listadoArr.forEach((tarea) => {
            if (tarea.completadoEn !== null) {
                indiceA++;
                let resultado = `${indiceA}.`.green;
                console.log(` ${resultado} ${tarea.desc} :: ${tarea.completadoEn.green}`);
            }
        });
    }

    borrarTarea(id = '') {
        console.log('listado del array id', id);
        console.log('listado del this._listado[id]', this._listado[id]);
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletada(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }

        })

    }

}

module.exports = Tareas;