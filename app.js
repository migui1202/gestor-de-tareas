const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

require('colors');
console.clear();

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        //Establecer las tareas.
        tareas.cargarTareasFromArray(tareasDB);
    }
    //await pausa();

    do {
        opt = await inquirerMenu();
        //console.log("opt ", opt);

        switch (opt) {
            case '1':
                const desc = await leerInput(' Descripcion: ');
                console.log('descripcion', desc);
                tareas.crearTarea(desc)
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarTareasCompletadas();
                break;
            case '4':
                tareas.listarTareasPendientes();
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletada(ids);
                console.log(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('Estas seguro ?');
                    console.log({ ok });
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada correctamente.");
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0')
};

main();