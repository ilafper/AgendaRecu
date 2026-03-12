const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function leeMenu(question) {
    return new Promise((resolve) => {
        rl.question(question, (respuesta) => {
            resolve(respuesta);
        });
    });
}


async function listaClientes() {
   
    try {
    const response = await fetch('http://localhost:3000/api/clientes');
    console.log("hohohoho");
    
   
    const datos= await response.json();
    
    const clientes= datos.lista_clientes;
    
    for (let i=0; i<clientes.length; i++) {
        
        console.log(`--- Cliente ${i + 1} ---`);
        console.log(`Nombre: ${clientes[i].nombre}`);
        console.log(`Apellidos: ${clientes[i].apellidos}`);
        console.log(`Teléfono: ${clientes[i].telefono}`);
        console.log(`Dirección: ${clientes[i].direccion}`);
        console.log(`Correo: ${clientes[i].correo}`);
        console.log(`Codifo Usuario: ${clientes[i].code_user}`);
        
        console.log('--------------------\n');
    }
    
  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }
}

async function crearUsuario() {

    let nombre = await leeMenu("nombre usuario: ");
    let apellidos = await leeMenu("Apellidos usuario: ");
    let telefono = await leeMenu("Telefono usuario:  ");
    let direccion = await leeMenu("direccion usuario: ");
    let correo = await leeMenu("Correo usuario: ");

    console.log(nombre, apellidos, telefono, direccion, correo);
    try {
        const response = await fetch('http://localhost:3000//api/crearcliente', nombre, apellidos, telefono,direccion, correo);
        
        if (response.sucess) {
            console.log("susuisisis");
            
        }



    } catch (error) {
        
    }
}






async function menuAtlas() {
    
    let opcion=0;
    
    while (opcion !=5) {
        console.log("\nBienvenido ");
        console.log("1. Crear cliente");
        console.log("2. Borrar cliente");
        console.log("3. Listar clientes");
        console.log("4. Buscar clientes (filtros)");
        console.log("5. Salir");
        opcion = parseInt(await leeMenu("Seleccione opción: "));
        switch (opcion) {
            case 1:
                await crearUsuario();
                break;
            case 2:
                
                break;
            case 3:
                await listaClientes();
                break;
            case 4:
                
                break;
            case 5:
            console.log("saliendo...");

            process.exit();

            default:
                break;
        }
    }
}

async function menuPrincipal() {
    
    let opcion=0;
    
    while (opcion !=3) {
        console.log("\n menu principal");
        console.log("1. Agenda Mongo Atlas");
        console.log("2. Agenda SQL");
        console.log("3. Salir");
        opcion = parseInt(await leeMenu("Seleccione opción: "));
        switch (opcion) {
            case 1:
                await menuAtlas();
                break;
            case 2:
                await menuSQL();
                break;
            case 3:
            console.log("saliendo...");
            process.exit();
            default:
                break;
        }
    }
}


async function menuSQL() {
    
    let opcion=0;
    
    while (opcion !=5) {
        console.log("\n Menu SQL ");
        console.log("1. Crear cliente");
        console.log("2. Borrar cliente");
        console.log("3. Listar clientes");
        console.log("4. Buscar clientes (filtros)");
        console.log("5. Salir");
        opcion = parseInt(await leeMenu("Seleccione opción: "));
        switch (opcion) {
            case 1:
                
                break;
            case 2:
                
                break;
            case 3:
                
                break;
            case 4:
                
                break;
            case 5:
            console.log("saliendo...");

            process.exit();

            default:
                break;
        }
    }
}



async function iniciarPrograma() {
    await menuPrincipal();
}

iniciarPrograma();