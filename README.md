# Portal Web - Instituto de Genética

Proyecto inicial de práctica profesional para el desarrollo del Portal Web del Instituto de Genética de la Facultad de Medicina de la UMSA.

## Tecnologías
- HTML5
- CSS3
- JavaScript
- Python
- Flask
- Git / GitHub

## Estructura
- `run.py`: punto de entrada.
- `app/__init__.py`: creación de la aplicación Flask.
- `app/routes.py`: rutas.
- `app/data.py`: contenido inicial editable.
- `app/templates/`: páginas HTML con Jinja2.
- `app/static/css/`: estilos.
- `app/static/js/`: JavaScript.
- `app/static/img/`: imágenes institucionales.

## Ejecutar en Windows

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

Abrir: http://127.0.0.1:5000

## Próxima etapa
El contenido marcado como pendiente debe ser validado por el Instituto antes de publicarse. Posteriormente se puede incorporar una base de datos y un panel administrativo si el Instituto lo requiere.

## Fase 3 — Contenido y recursos de demostración

Esta versión incorpora contenido de prueba basado en información pública de la UMSA y del Instituto de Genética, además de imágenes externas utilizadas exclusivamente como material visual provisional.

**Antes de publicar el sitio:** sustituir las imágenes de demostración por fotografías institucionales autorizadas y validar misión, visión, objetivos, organigrama, personal, requisitos, horarios, costos, noticias y eventos con el Instituto.
