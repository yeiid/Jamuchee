# Proyecto Jamuche

## Descripción
Este proyecto es una página web diseñada para administrar y mostrar información sobre productos, especies y servicios, incluyendo un panel de administración para la gestión de datos. Utiliza **Next.js** como framework principal, junto con **Tailwind CSS** para los estilos y **Prisma** para la gestión de la base de datos.

## Estructura del Proyecto
```
└── 📁Jamuche
    └── 📁public
    └── 📁src
        └── 📁app
        └── 📁components
        └── 📁context
        └── 📁store
    └── .eslintrc.json
    └── .gitignore
    └── next.config.js
    └── package.json
    └── README.md
    └── tailwind.config.ts
```

### Carpetas Principales
- **public/**: Contiene imágenes y archivos estáticos.
- **src/**: Incluye toda la lógica del proyecto.
  - **app/**: Maneja las páginas, rutas y funcionalidad principal.
  - **components/**: Componentes reutilizables para la interfaz de usuario.
  - **context/**: Maneja los contextos globales del proyecto.
  - **store/**: Almacena y gestiona estados globales específicos.

## Funcionalidades
1. **Frontend:**
   - Páginas de productos con detalles.
   - Sección informativa sobre especies.
   - Contacto y formulario para pedidos personalizados.

2. **Backend:**
   - API para CRUD de productos, usuarios y especies.
   - Gestión de usuarios con autenticación.
   - Actualización dinámica del contenido desde el panel administrativo.

3. **Admin Dashboard:**
   - Gestión de ventas, usuarios y estadísticas.
   - Configuración global y control de datos específicos como especies y productos.

## Tecnologías Utilizadas
- **Next.js**: Framework para React.
- **Tailwind CSS**: Diseño responsivo y estilos personalizados.
- **Prisma**: ORM para la base de datos.
- **TypeScript**: Tipado estático.
- **Zod**: Validación de datos.
- **bcryptjs**: Seguridad y hash de contraseñas.

## Instalación
1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd Jamuche
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno:
   Crear un archivo `.env` con los siguientes valores:
   ```env
   DATABASE_URL="<URL_DE_LA_BASE_DE_DATOS>"
   NEXTAUTH_SECRET="<CLAVE_SECRETA>"
   ```
4. Ejecutar el proyecto:
   ```bash
   npm run dev
   ```

## Comandos
- **`npm run dev`**: Inicia el servidor de desarrollo.
- **`npm run build`**: Genera una versión optimizada para producción.
- **`npm run start`**: Inicia el servidor en modo producción.

## Contribuciones
Si deseas contribuir al proyecto:
1. Haz un fork del repositorio.
2. Crea una rama con tu funcionalidad:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Haz los cambios y realiza un commit:
   ```bash
   git commit -m "Descripción de los cambios"
   ```
4. Haz push a tu rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un pull request en GitHub.

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más información.
