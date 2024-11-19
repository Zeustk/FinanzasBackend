const obtenerFechaHoraDesdePython = require('../Global/dateService');
class ServicioVentas {

    constructor(DB) {
        this.DB = DB;
    }


    async addVentas(Monto, Razon) {
        try {


            const { fecha: Fecha, hora: Hora } = await obtenerFechaHoraDesdePython();


            const Disponible="SI";


            const sql = "INSERT INTO Ventas(Fecha,Hora,Monto,Razon,Disponible) VALUES (?, ?, ?, ?,?)";

            await this.DB.Open(sql, [Fecha, Hora, Monto, Razon, Disponible]);

            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }


    async getVentas() {
        try {
            const sql = "select * from Ventas Where Disponible='SI'";
            let result = await this.DB.Open(sql, []);


            if (result && result.length > 0) {

               

                return result.map(propiedad => ({
                    
                    "Fecha": propiedad.fecha,
                    "Hora": propiedad.hora,
                    "Monto": propiedad.monto,
                    "Razon": propiedad.razon,
                   
                }));
            } else {

                return [];
            }
        } catch (err) {

            console.error(err);
            return 'Error de consulta';
        }
    }



    async UpdatePerfiles(Id_Perfil, Nombre_Completo) {

        try {



            const sql = "update Perfiles set Nombre_Completo=? WHERE Id_Perfil=? AND disponible='SI'";

            await this.DB.Open(sql, [Nombre_Completo, Id_Perfil]);

            return ('Actualizado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al actualizar');
        }

    }


    async DeletePerfiles(Id_Perfil) {

        try {

            const sql = "update Perfile set Disponible='NO' where Id_Rol=?";

            await this.DB.Open(sql, [Id_Perfil], true);

            return ('Eliminado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al Eliminar');
        }

    }

    async getPerfilConUsuarioId(Id_Usuario) {
        try {
            console.log(Id_Usuario);
            const sql = "SELECT *FROM perfiles WHERE Id_Usuario = ?";
            let perfil = await this.DB.Open(sql, [Id_Usuario]);

            if (perfil && perfil.length > 0) {
                return {
                    "Id_Perfil": perfil[0].id_perfil,
                    "Nombre_Completo": perfil[0].nombre_completo,
                    "Numero_De_Proyecto": perfil[0].numero_proyectos,
                    "Estado": perfil[0].estado,
                    "Id_Usuario": perfil[0].id_usuario,
                    "Disponible": perfil[0].disponible,


                };
            } else {
                return null; // No se encontraron registros
            }
        } catch (err) {
            console.log(err);
            return 'Error de consulta';
        }
    }


    async getPerfiles() {
        try {
            const sql = "select * from Perfiles";
            let result = await this.DB.Open(sql, []);

            if (result && result.length > 0) {

                return result.map(propiedad => ({
                    "Id_Perfil": propiedad.Id_Perfil,
                    "Nombre_Completo": propiedad.Nombre_Completo,
                    "Email": propiedad.Email,
                    "Numero_De_Proyecto": propiedad.Numero_De_Proyecto,
                    "Estado": propiedad.Estado,
                    "Id_Usuario": propiedad.Id_Usuario
                }));
            } else {

                return [];
            }
        } catch (err) {

            console.error(err);
            return 'Error de consulta';
        }
    }


    async getPerfilesByProyecto(IdProyecto) {
        try {

            const sql = `
                SELECT 
                    DISTINCT t.Id_Tarea, 
                    p.Nombre_Completo,
                    u.Email 
                FROM 
                    Tareas t
                JOIN 
                    DetalleProyectoUsuarios dpu ON t.Id_Proyecto = dpu.Id_Proyecto AND t.Id_Usuario = dpu.Id_Usuario
                JOIN 
                    Perfiles p ON dpu.Id_Usuario = p.Id_Usuario
                JOIN
                    Usuarios u ON u.Id_Usuario = p.Id_Usuario
                WHERE 
                    t.Id_Proyecto = ? AND t.Disponible = 'SI';
            `;

            // Asegúrate de que IdProyecto se pase correctamente como un elemento de un array
            let result = await this.DB.Open(sql, [IdProyecto]);

            if (result && result.length > 0) {
                return result.map(propiedad => ({
                    "Id_Tarea": propiedad.id_tarea,
                    "Nombre_Completo": propiedad.nombre_completo,
                    "Email": propiedad.email
                }));
            } else {
                return [];
            }
        } catch (err) {
            console.error(err);
            return 'Error de consulta';
        }
    }




}

module.exports = ServicioVentas;