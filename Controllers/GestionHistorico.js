const fs = require('fs');
class ServicioEntregas {

    constructor(DB) {
        this.DB = DB;
    }




    async addHistorico(Informe, UrlPdfEntrega, Id_Tarea) {
        try {

            const Disponible = "SI";



            const sql = "INSERT INTO Entregas(Id_Entrega, Informe, UrlPdfEntrega, Id_Tarea,Disponible) VALUES (NEXTVAL('secuenciaentregas'), ?,?, ?, ?)";

           

            await this.DB.Open(sql, [Informe, UrlPdfEntrega, Id_Tarea,Disponible]);

            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }

    async getHistorico() {

        try {

            const sql = "select * from historico Where Disponible='SI'";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Mes": propiedad.mes,
                    "Gastos Del Mes": propiedad.gastos_del_mes,
                    "Ingresos Del Mes": propiedad.ingresos_del_mes,
                    "Monto a Favor":propiedad.monto_a_favor,
    
                }));

            } else {
                
                return [];
            }
        } catch (err) {
            
            console.error(err);
            return 'Error de consulta';
        }
    }



    async UpdateTareas(Id_Tarea, Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, Porcentajetarea) {

        try {



            const sql = "update Tareas set Nombre=?,Fecha_Inicio=?,Fecha_Finalizacion=?,Descripcion=?,Porcentajetarea=? where Id_Tarea=?";

            await this.DB.Open(sql, [Id_Tarea, Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, Porcentajetarea]);

            return ('Actualizado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al actualizar');
        }

    }


    async DeleteTareas(Id_Tarea) {

        try {

            const sql = "update Tareas set Disponible='NO' where Id_Tarea=?";

            await this.DB.Open(sql, [Id_Tarea], true);

            return ('Eliminado Correctamente')
        }

        catch (err) {
            console.error(err);
            return ('Error al Eliminar');
        }

    }
    

}

module.exports = ServicioEntregas;