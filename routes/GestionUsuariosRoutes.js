const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/addUsuarios', async (req, res) => {


      try {

         const { Email ,Contrasena } = req.body;



         const Usuarios = await servicio.addUsuarios(Email ,Contrasena);



         res.status(200).json(Usuarios)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getUsuarios', async (req,res) => {


      try {

         const Usuarios = await servicio.getUsuarios();

         res.status(200).json(Usuarios);

      }catch(error){

         res.status(404).json(error);

      }



      
   });

   router.post('/api/getUsuarioBase', async (req, res) => {


      try {

         const { Email, Clave } = req.body;

         console.log(Clave);
         const UsuarioVerificar = await servicio.VerificarCorreoExistente(Email, Clave);

         res.status(200).json(UsuarioVerificar);

      } catch (error) {
         res.status(404).json(error);
      }
   });


   router.put('/api/UpdateUsuarios', async (req, res) => {

      const { Id_Usuario, Email, Clave } = req.body

      console.log(Email);

      const updateUsuarios = await servicio.UpdateUsuarios(Id_Usuario, Email, Clave);


      res.json(updateUsuarios);
   })


   router.delete('/api/DeleteUsuarios/:Id_Usuario', async (req, res) => {

      const { Id_Usuario } = req.params

      const DelUsuario = await servicio.DeleteUsuarios(Id_Usuario);

      res.json(DelUsuario);
   })

   router.post('/api/getUsuarioConId', async (req, res) => {


      try {

       

         const { Email ,Contrasena } = req.body;

      
         const UsuarioVerificar = await servicio.getUsuarioConId(Email, Contrasena);

         res.status(200).json(UsuarioVerificar);

      } catch (error) {
         res.status(404).json(error);
      }
   });



   return router;
}
