class ServiciosCuentas {

    constructor(DB) {
        this.DB = DB;
    }


    async addCuentas(Saldo, Ncuenta, Descripcion, FApertura) {
        try {
            const Disponible = "SI";

            
    
            // Asegúrate de que el número de parámetros coincida con la cantidad de ' ? ' en la consulta
            const sql = "INSERT INTO Cuentas(Codigo, Saldo, Ncuenta, Descripcion, FApertura, Disponible) VALUES (NEXTVAL('secuenciacuentas'), ?, ?, ?, ?, ?)";
    
            // Aquí estamos pasando 5 parámetros (Saldo, Ncuenta, Descripcion, FApertura, Disponible)
            await this.DB.Open(sql, [Saldo, Ncuenta, Descripcion, FApertura, Disponible]);
    
            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }
    
    

    async getCuentas() {
        try {
            const sql = "select * from Cuentas where Disponible = 'SI'";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Saldo": propiedad.saldo,
                
                }));
            } else {
                
                return [];
            }
        } catch (err) {
            
            console.error(err);
            return 'Error de consulta';
        }
    }
    


    async UpdateUsuarios(Id_Usuario,Email,Clave) {

        try { 
            
            
            
            const sql = "update Usuarios set Email=?,Clave=? where Id_Usuario=?";

            await this.DB.Open(sql, [Email,Clave,Id_Usuario]);

            return ('Actualizado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al actualizar');
        }

    }


    async DeleteUsuarios(Id_Usuario) {

        try {
           //no se actualizaras aqui !! //
            const sql = "update Usuarios set Disponible='NO' where Id_Usuario=?";

            await this.DB.Open(sql, [Id_Usuario], true);

            return ('Eliminado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al Eliminar');
        }

    }

    async  VerificarCorreoExistente(Email,Clave) {
        try {
            
            
            const sql = "SELECT * FROM usuarios WHERE Email = ? and  Clave = ?";
            const result = await this.DB.Open(sql, [Email,Clave]);
    
            if (result && result.length > 0) {
                
                return true;
            } else {
                return false; 
            }
        } catch (err) {
            
            throw new Error('Error al verificar el correo en la base de datos');
        }
    }

    async getUsuarioConId(Email, Clave) {
        try {
            const sql = "SELECT * FROM usuarios WHERE Email = ? and Clave = ?";
            let result = await this.DB.Open(sql, [Email, Clave]);
    
            if (result && result.length > 0) {
                return {
                    "Id_Usuario": result[0].id_usuario,
                    "Email": result[0].email,
                    "Clave": result[0].clave,
                    "Id_rol": result[0].id_rol
                };
            } else {
                return null; // No se encontraron registros
            }
        } catch (err) {
            console.error(err);
            return 'Error de consulta';
        }
    }

    
    async getUsuariosPorProyectos(Id_Proyecto) {
        try {
            const sql = "SELECT DISTINCT u.* FROM usuarios u LEFT JOIN detalleproyectousuarios t ON u.id_usuario = t.id_usuario where t.id_proyecto = ? AND u.Disponible= 'SI' AND t.Disponible= 'SI'";
            let result = await this.DB.Open(sql, [Id_Proyecto]);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Id_Usuario": propiedad.id_usuario,
                    "Email": propiedad.email,
                    "Clave": propiedad.clave,
                    "Id_rol": propiedad.id_rol
                
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

module.exports = ServiciosCuentas;