const { log } = require("console");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function leeMenu(question) {
  return new Promise((resolve) => {
    rl.question(question, (respuesta) => {
      resolve(respuesta);
    });
  });
}

// lista clientes sql

async function listaClientesSQL() {
  try {
    const response = await fetch("http://localhost:5000/api/clientesql");
    console.log("isis sql lista clientes");

    const datos = await response.json();

    const clientes = datos.lista_clientes;

    for (let i = 0; i < clientes.length; i++) {
      console.log(`--- Cliente SQL ${i + 1} ---`);
      console.log(`Nombre: ${clientes[i].nombre}`);
      console.log(`Apellidos: ${clientes[i].apellidos}`);
      console.log(`Teléfono: ${clientes[i].telefono}`);
      console.log(`Dirección: ${clientes[i].direccion}`);
      console.log(`Correo: ${clientes[i].correo}`);
      console.log(`Codifo Usuario: ${clientes[i].code_user}`);

      console.log("--------------------\n");
    }
  } catch (error) {
    console.error("Error al conectar con la API:", error);
  }
}



async function crearUsuarioSQL() {
  //console.log("sisis");

  let nombre = await leeMenu("nombre usuario: ");
  let apellidos = await leeMenu("Apellidos usuario: ");
  let telefono = await leeMenu("Telefono usuario:  ");
  let direccion = await leeMenu("direccion usuario: ");
  let correo = await leeMenu("Correo usuario: ");
  


  //console.log(nombre, apellidos, telefono, direccion, correo);

  try {
    const response = await fetch("http://localhost:5000/api/crearclientsql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellidos,
        telefono,
        direccion,
        correo,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log(data.mensaje);
      
    }
  } catch (error) {
    console.error(error);
  }
}

//borrar usuaio sql 

async function borrarClienteSQL() {
  const response = await fetch("http://localhost:5000/api/clientesql");
  const datos = await response.json();
  const clientes = datos.lista_clientes;

  for (let i = 0; i < clientes.length; i++) {
    console.log(
      `${i + 1}. `,
      `Nombre: ${clientes[i].nombre}`,
      `Apellidos: ${clientes[i].apellidos}`,
      `Codigo Usuario: ${clientes[i].code_user}`,
    );
  }

  let clienteSelec = await leeMenu("Selecciona cliente para borrar: ");

  // ajustar la posicion
  let indice = clienteSelec - 1;

  let cliente = clientes[indice];

  console.log("cliente seleccionado:", cliente);

  let id_eliminar = cliente.code_user;

  console.log("id eliminar:", id_eliminar);

    try {
      const response = await fetch(`http://localhost:5000/api/deleteclientesql/${id_eliminar}`, {
         method:"DELETE"
      })
      const data = await response.json();
      console.log(data.mensaje);
      
      
   
    } catch (error) {
      return {
        success: false,
        error: error.response?.data.error || "Error eliminar",
      };
    }
}














async function listaClientes() {
  try {
    const response = await fetch("http://localhost:3000/api/clientes");
    console.log("hohohoho");

    const datos = await response.json();

    const clientes = datos.lista_clientes;

    for (let i = 0; i < clientes.length; i++) {
      console.log(`--- Cliente ${i + 1} ---`);
      console.log(`Nombre: ${clientes[i].nombre}`);
      console.log(`Apellidos: ${clientes[i].apellidos}`);
      console.log(`Teléfono: ${clientes[i].telefono}`);
      console.log(`Dirección: ${clientes[i].direccion}`);
      console.log(`Correo: ${clientes[i].correo}`);
      console.log(`Codifo Usuario: ${clientes[i].code_user}`);

      console.log("--------------------\n");
    }
  } catch (error) {
    console.error("Error al conectar con la API:", error);
  }
}

async function crearUsuario() {
  console.log("sisis");

  let nombre = await leeMenu("nombre usuario: ");
  let apellidos = await leeMenu("Apellidos usuario: ");
  let telefono = await leeMenu("Telefono usuario:  ");
  let direccion = await leeMenu("direccion usuario: ");
  let correo = await leeMenu("Correo usuario: ");
  //http://localhost:3000/api/crearcliente


  console.log(nombre, apellidos, telefono, direccion, correo);

  try {
    const response = await fetch("http://localhost:3000/api/crearcliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellidos,
        telefono,
        direccion,
        correo,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("susuisisis");
    }
  } catch (error) {
    console.error(error);
  }
}

async function filtroNomrbe() {

  let nombreBusqueda = await leeMenu("busca por nombre: ");
  console.log(nombreBusqueda);
  
  try {
     const response = await fetch(`http://localhost:3000/api/filtronombre/${nombreBusqueda}`, {
        method:"GET"
     })
     const data = await response.json();
     
     console.log(data.mensaje);
     console.log(data.datos);
     
   } catch (error) {
     return {
       success: false,
       error: error.response?.data.error || "Error BUSCAR",
     };
   }
}

// filtro apellidos
async function filtroApellidos() {

  let apeBusqueda = await leeMenu("busca por apellidos: ");
  console.log(apeBusqueda);
  
  try {
     const response = await fetch(`http://localhost:3000/api/filtroapellidos/${apeBusqueda}`, {
        method:"GET"
     })
     const data = await response.json();
     
     console.log(data.mensaje);
     console.log(data.datos);
     
   } catch (error) {
     return {
       success: false,
       error: error.response?.data.error || "Error BUSCAR",
     };
   }
}

// filtro telefono
async function filtroTelefono() {

  let tlfBusqueda = await leeMenu("Busca por telefono: ");
  console.log(tlfBusqueda);
  
  try {
     const response = await fetch(`http://localhost:3000/api/filtrotelefono/${tlfBusqueda}`, {
        method:"GET"
     })
     const data = await response.json();
     
     console.log(data.mensaje);
     console.log(data.datos);
     
   } catch (error) {
     return {
       success: false,
       error: error.response?.data.error || "Error BUSCAR",
     };
   }
}


// filtro correo
async function filtroCorreo() {

  let correoBusqueda = await leeMenu("Busca por correo: ");
  console.log(correoBusqueda);
  
  try {
     const response = await fetch(`http://localhost:3000/api/filtrocorreo/${correoBusqueda}`, {
        method:"GET"
     })
     const data = await response.json();
     
     console.log(data.mensaje);
     console.log(data.datos);
     
   } catch (error) {
     return {
       success: false,
       error: error.response?.data.error || "Error BUSCAR",
     };
   }
}


//BORRAR CLIENTE

async function borrarCliente() {
  const response = await fetch("http://localhost:3000/api/clientes");
  const datos = await response.json();
  const clientes = datos.lista_clientes;

  for (let i = 0; i < clientes.length; i++) {
    console.log(
      `${i + 1}. `,
      `Nombre: ${clientes[i].nombre}`,
      `Apellidos: ${clientes[i].apellidos}`,
      `Codigo Usuario: ${clientes[i].code_user}`,
    );
  }

  let clienteSelec = await leeMenu("Selecciona cliente para borrar: ");

  // ajustar la posicion
  let indice = clienteSelec - 1;

  let cliente = clientes[indice];

  console.log("Cliente seleccionado:", cliente);

  let id_eliminar = cliente.code_user;

  console.log("id eliminar:", id_eliminar);

   try {
     const response = await fetch(`http://localhost:3000/api/eliminarcliente/${id_eliminar}`, {
        method:"DELETE"
     })
     const data = await response.json();
     
     console.log(data.mensaje);
     
   } catch (error) {
     return {
       success: false,
       error: error.response?.data.error || "Error eliminar",
     };
   }
}






async function menuAtlas() {
  let opcion = 0;

  while (opcion != 5) {
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
        await borrarCliente();
        break;
      case 3:
        await listaClientes();
        break;
      case 4:
        await menuFiltros();
        break;
      case 5:
        console.log("saliendo...");

        process.exit();

      default:
        break;
    }
  }
}

//menu filtros 

async function menuFiltros() {
  let opcion = 0;

  while (opcion != 6) {
    console.log("\n Filtros Busqueda");
    console.log("1. Busqueda por nombre");
    console.log("2. Busqueda por apellidos");
    console.log("3. Busqueda por telefono");
    console.log("4. Busqueda por direccion");
    console.log("5. Busqueda por correo");
    console.log("6. Salir");
    opcion = parseInt(await leeMenu("Seleccione opción: "));
    switch (opcion) {
      case 1:
        await filtroNomrbe();
        break;
      case 2:
        await filtroApellidos();
        break;
      case 3:
        await filtroTelefono();
        break;
      case 4:
        break;
      case 5:
        await filtroCorreo();
        break;
      case 6:
        console.log("saliendo...");

        process.exit();

      default:
        break;
    }
  }
}





async function menuPrincipal() {
  let opcion = 0;

  while (opcion != 3) {
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
  let opcion = 0;

  while (opcion != 5) {
    console.log("\n Menu SQL ");
    console.log("1. Crear cliente");
    console.log("2. Borrar cliente");
    console.log("3. Listar clientes");
    console.log("4. Buscar clientes (filtros)");
    console.log("5. Salir");
    opcion = parseInt(await leeMenu("Seleccione opción: "));
    switch (opcion) {
      case 1:
        await crearUsuarioSQL();
        break;
      case 2:
        await borrarClienteSQL();
        break;
      case 3:
        await listaClientesSQL();
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
