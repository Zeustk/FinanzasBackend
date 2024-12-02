


class ServicioUsuarios {

    constructor(DB) {
        this.DB = DB;
    }

    


    async addUsuarios(Email ,Contrasena) {
        try {

          
           
            const Disponible="SI";

            const sql = "INSERT INTO Usuarios(Email,Contrasena,Disponible) VALUES (?,?, ?)";
    
            await this.DB.Open(sql, [Email ,Contrasena,Disponible]);
    
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
    
    async getUsuarioConId(Email, Contrasena) {
        try {
            const sql = "SELECT * FROM usuarios WHERE Email = ? and Contrasena = ?";
            let result = await this.DB.Open(sql, [Email, Contrasena]);
    
            if (result && result.length > 0) {
                return {
        
                    "Email": result[0].email,
                    "Contrasena": result[0].clave,
          
                };
            } else {
                return null; // No se encontraron registros
            }
        } catch (err) {
            console.error(err);
            return 'Error de consulta';
        }
    }


  


}

module.exports = ServicioUsuarios;