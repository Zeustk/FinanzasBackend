const express = require("express");
const axios = require("axios"); // Importa axios para realizar solicitudes HTTP
const router = express.Router();


module.exports = function (servicio) {

   /* router.post('/api/addVentas', async (req, res) => {
      try {
         // Consumir la API externa para obtener el Monto y la Razon
         const apiUrl = "https://api.externa.com/datos"; // URL de la API externa
         const response = await axios.get(apiUrl); // Realiza una solicitud GET a la API externa

         // Extraer Monto y Razon de los datos obtenidos
         const { Monto, Razon,Fecha,Hora } = response.data;

         console.log("Datos obtenidos de la API externa:", { Monto, Razon,Fecha,Hora });

         // Verificar si los datos son válidos
         if (!Monto || !Razon || !Fecha || !Hora) {
            return res.status(400).json({ message: "Faltan datos necesarios (Monto o Razon)" });
         }

         // Llama a tu método `addVentas` con los datos obtenidos de la API externa
         const Ventas = await servicio.addVentas(Monto, Razon,Fecha,Hora);

         // Responder con los datos registrados
         res.status(200).json(Ventas);

      } catch (error) {
         console.error("Error al registrar la venta:", error.message);
         res.status(500).json({ message: "Error al registrar la venta", error: error.message });
      }
   });
   */

   async function consumirApiYRegistrar() {
      try {
         const apiUrl = "https://api.externa.com/datos"; // URL de la API externa
         const response = await axios.get(apiUrl); // Realiza una solicitud GET a la API externa

         const listaVentas = response.data; // Suponemos que la API devuelve una lista
         
         if (!Array.isArray(listaVentas) || listaVentas.length === 0) {
            console.log("No hay datos para registrar.");
            return;
         }

         // Recorrer la lista y registrar cada elemento
         for (const venta of listaVentas) {
            const { Monto, Razon,Fecha,Hora } = venta;

            // Validar que los datos sean correctos
            if (!Monto || !Razon || !Fecha || !Hora ) {
               console.log("Registro omitido: faltan datos necesarios (Monto o Razon).", venta);
               continue;
            }

            // Registrar la venta
            try {
               const resultado = await servicio.addVentas(Monto, Razon,Fecha,Hora);
               
               console.log("Venta registrada:", resultado);

            } catch (error) {
               console.error("Error al registrar venta:", venta, error.message);
            }
         }
      } catch (error) {
         console.error("Error al consumir la API externa:", error.message);
      }
   }

   // Configurar el intervalo de 15 segundos
   setInterval(() => {
      console.log("Consumiendo la API externa...");
      consumirApiYRegistrar();
   }, 15000); // 15000 milisegundos = 15 segundos

   // Ruta de prueba para verificar el funcionamiento
   router.get('/api/testAddVentas', async (req, res) => {
      try {
         await consumirApiYRegistrar();
         res.status(200).json({ message: "Se consumió la API externa y se registraron los datos (si los había)." });
      } catch (error) {
         res.status(500).json({ message: "Error al realizar la operación", error: error.message });
      }
   });

   router.get('/api/getVentas', async (req, res) => {

      const Perfiles = await servicio.getVentas();

      res.json(Perfiles);
   })


   router.put('/api/UpdatePerfiles', async (req, res) => {

      const { Id_Perfil, Nombre_Completo } = req.body

      const updatePerfil = await servicio.UpdatePerfiles(Id_Perfil, Nombre_Completo);


      res.json(updatePerfil);
   })


   router.delete('/api/DeletePerfiles/:Id_Perfil', async (req, res) => {

      const { Id_Perfil } = req.params

      const DelPerfil = await servicio.DeletePerfiles(Id_Perfil);

      res.json(DelPerfil);
   })


   router.post('/api/getPerfilPorIdUsuario/:Id_Usuario', async (req, res) => {


      try {

         const { Id_Usuario } = req.params;


         const perfil = await servicio.getPerfilConUsuarioId(Id_Usuario);

         res.status(200).json(perfil);

      } catch (error) {
         res.status(404).json(error);
      }
   });


   router.get('/api/getPerfilesByProyecto/:id_proyecto', async (req, res) => {

      const id_proyecto = req.params.id_proyecto;


      const Perfiles = await servicio.getPerfilesByProyecto(id_proyecto);

      res.json(Perfiles);
   })


   return router;
}
