# Arquitectura

El proyecto tiene la sigiente estructura de carpetas

- **config**: La cual tiene el script de inicialización en dev de la base de datos y algo de data para hacer pruebas localmente
- **controllers**: Tendrá los archivos que sirven de interfaz entre las _routes_ y los _services_
- **docs**: Tiene la información relevante sobre el proyecto, conexion a DB, arquitectura, etc.
- **models**: Tiene las clases `moongose` para ejecutar el CURD a la DB.
- **routes**: Tiene las rutas definidas por feature del proyecto
- **services**: Tiene los metodos separados por feature para ejecutar el CRUD a la DB.
- **types**: Tiene las interfaces genericas de typescript usadas en el proyecto
- **utils**: Tiene los utilitarios comunes para el proyecto tales como funciones de formateo (fechas o timers), constantes, etc.
