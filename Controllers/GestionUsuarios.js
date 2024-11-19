


class ServicioUsuarios {

    constructor(DB) {
        this.DB = DB;
    }


    async addGastos(Monto,Categoria,Proveedor) {
        try {

            const { fecha: Fecha, hora: Hora } = await obtenerFechaHoraDesdePython();
          
           
            const Disponible="SI";

            const sql = "INSERT INTO Gastos(Fecha,Hora,Monto,Categoria,Proveedor,Disponible) VALUES (?,?, ?, ?, ?,?)";
    
            await this.DB.Open(sql, [Fecha,Hora,Monto,Categoria,Proveedor,Disponible]);
    
            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }
    

    async getUsuarios() {
        try {
            const sql = "select * from usuarios Where Disponible='SI'";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Email": propiedad.email,
                    "Clave": propiedad.contrasena,

                }));
            } else {
                
                return [];
            }
        } catch (err) {
            
            console.error(err);
            return 'Error de consulta';
        }
    }
    


    async UpdateRoles(Id_Rol,Nombre,Prioridad) {

        try { 
            
            
            
            const sql = "update roles set Nombre=?,Prioridad=? where Id_Rol=?";

            await this.DB.Open(sql, [Id_Rol,Nombre,Prioridad]);

            return ('Actualizado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al actualizar');
        }

    }


    async DeleteRoles(Id_Rol) {

        try {

            const sql = "update roles set Disponible='NO' where Id_Rol=?";

            await this.DB.Open(sql, [Id_Rol], true);

            return ('Eliminado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al Eliminar');
        }

    }


}

module.exports = ServicioUsuarios;