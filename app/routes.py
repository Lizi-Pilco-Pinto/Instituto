import json
import os
from flask import Blueprint, render_template, request, redirect, url_for, flash

main = Blueprint("main", __name__)

# Directorio donde están los archivos JSON
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

def load_all_data():
    """Lee todos los archivos .json en DATA_DIR y los combina en un solo dict."""
    combined = {}
    for filename in os.listdir(DATA_DIR):
        if filename.endswith('.json'):
            filepath = os.path.join(DATA_DIR, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
                # Fusiona el contenido (se espera que cada archivo sea un dict con claves)
                combined.update(data)
    return combined

DATA = load_all_data()

@main.app_context_processor
def inject_global_data():
    # inyecta 'instituto' en todos los templates (como antes)
    return {"instituto": DATA.get('instituto', {})}

@main.route("/")
def home():
    # Ordenar noticias por fecha (más recientes primero)
    from datetime import datetime
    def parse_fecha(f):
        try:
            return datetime.strptime(f["fecha"], "%d de %B de %Y")
        except Exception:
            return datetime.min
    news_sorted = sorted(DATA['news'], key=parse_fecha, reverse=True)
    return render_template(
        "index.html",
        events=DATA['events'],
        news=news_sorted,
        faq_items=DATA['faq'],
    )

# ==================== INSTITUTO ====================
@main.route("/acerca")
def acerca():
    return render_template("acerca/acerca.html", about=DATA['about'])

@main.route("/historia")
def historia():
    return render_template("acerca/historia.html", about=DATA['about'])

@main.route("/organigrama")
def organigrama():
    return render_template("acerca/organigrama.html", about=DATA['about'])

@main.route("/mision-vision")
def mision_vision():
    return render_template("acerca/mision-vision.html", about=DATA['about'])

# ==================== UNIDADES ====================
@main.route("/unidades")
def unidades():
    return render_template("unidades/unidades.html", units=DATA['units'])

@main.route("/genetica-medica")
def genetica_medica():
    unidad = next((u for u in DATA['units'] if "Genética Médica" in u["name"]), None)
    # Filtrar miembros que pertenecen a esta unidad
    all_members = []
    for cat in DATA['staff_members'].values():
        if isinstance(cat, list):
            all_members.extend(cat)
    members = [m for m in all_members if m.get("unidad") == "Genética Médica"]
    return render_template("unidades/genetica-medica.html", unit=unidad, members=members)

@main.route("/citogenetica")
def citogenetica():
    unidad = next((u for u in DATA['units'] if "Citogenética" in u["name"]), None)
    all_members = []
    for cat in DATA['staff_members'].values():
        if isinstance(cat, list):
            all_members.extend(cat)
    members = [m for m in all_members if m.get("unidad") == "Citogenética"]
    return render_template("unidades/citogenetica.html", unit=unidad, members=members)

@main.route("/toxicologica")
def toxicologica():
    unidad = next((u for u in DATA['units'] if "Toxicológica" in u["name"]), None)
    all_members = []
    for cat in DATA['staff_members'].values():
        if isinstance(cat, list):
            all_members.extend(cat)
    members = [m for m in all_members if m.get("unidad") == "Genética Toxicológica"]
    return render_template("unidades/toxicologica.html", unit=unidad, members=members)

# ==================== SERVICIOS ====================
@main.route("/servicios")
def servicios():
    return render_template("servicios/servicios.html", services=DATA['services'])

@main.route("/servicio/consulta")
def consulta():
    return render_template("servicios/consulta.html", services=DATA['services_by_category'].get("consulta", []))

@main.route("/servicio/interconsulta")
def interconsulta():
    return render_template("servicios/interconsulta.html", services=DATA['services_by_category'].get("interconsulta", []))


@main.route("/servicio/asesoramiento")
def asesoramiento():
    return render_template("servicios/asesoramiento.html", services=DATA['services_by_category'].get("asesoramiento", []))

@main.route("/servicio/certificados")
def certificados():
    return render_template("servicios/certificados.html", services=DATA['services_by_category'].get("certificados", []))

@main.route("/servicio/cariotipo-sangre")
def cariotipo_sangre():
    return render_template("servicios/cariotipo_sangre.html", services=DATA['services_by_category'].get("cariotipo-sangre", []))

@main.route("/servicio/cariotipo-prenatal")
def cariotipo_prenatal():
    return render_template("servicios/cariotipo_prenatal.html", services=DATA['services_by_category'].get("cariotipo-prenatal", []))

@main.route("/servicio/analisis-tumores")
def analisis_tumores():
    return render_template("servicios/analisis_tumores.html", services=DATA['services_by_category'].get("analisis-tumores", []))

@main.route("/servicio/mthfr")
def mthfr():
    return render_template("servicios/mthfr.html", services=DATA['services_by_category'].get("mthfr", []))

@main.route("/servicio/fish")
def fish():
    return render_template("servicios/fish.html", services=DATA['services_by_category'].get("fish", []))

@main.route("/servicio/extraccion-adn")
def extraccion_adn():
    return render_template("servicios/extraccion_adn.html", services=DATA['services_by_category'].get("extraccion-adn", []))

@main.route("/servicio/genotoxicidad-sangre")
def genotoxicidad_sangre():
    return render_template("servicios/genotoxicidad_sangre.html", services=DATA['services_by_category'].get("genotoxicidad-sangre", []))

@main.route("/servicio/genotoxicidad-bucal")
def genotoxicidad_bucal():
    return render_template("servicios/genotoxicidad_bucal.html", services=DATA['services_by_category'].get("genotoxicidad-bucal", []))

@main.route("/servicio/biodosimetria")
def biodosimetria():
    return render_template("servicios/biodosimetria.html", services=DATA['services_by_category'].get("biodosimetria", []))

@main.route("/servicio/apoyo-psicologico")
def apoyo_psicologico():
    return render_template("servicios/apoyo_psicologico.html", services=DATA['services_by_category'].get("apoyo-psicologico", []))

# ==================== PERSONAL ====================
@main.route("/personal")
def personal():
    return render_template("personal/personal.html", categories=DATA['staff_categories'], members=None)

@main.route("/personal/direccion")
def direccion():
    return render_template("personal/direccion.html", members=DATA['staff_members'].get("direccion", []))

@main.route("/personal/investigadores")
def investigadores():
    return render_template("personal/investigadores.html", members=DATA['staff_members'].get("investigadores", []))

@main.route("/personal/medicos")
def medicos():
    return render_template("personal/medicos.html", members=DATA['staff_members'].get("medicos", []))

@main.route("/personal/tecnicos")
def tecnicos():
    return render_template("personal/tecnicos.html", members=DATA['staff_members'].get("tecnicos", []))

@main.route("/personal/administrativos")
def administrativos():
    return render_template("personal/administrativos.html", members=DATA['staff_members'].get("administrativos", []))

# ==================== INVESTIGACIÓN ====================
@main.route("/investigacion")
def investigacion():
    return render_template("investigacion.html", 
                           projects=DATA['projects'], 
                           research_areas=DATA['research_areas'], 
                           research_lines=DATA['research_lines'])

@main.route("/publicaciones")
def publicaciones():
    return render_template("publicaciones.html", publications=DATA['publications'])

@main.route("/noticias")
def noticias():
    return render_template("noticias.html", news_items=DATA['news'])

@main.route("/eventos")
def eventos():
    return render_template("eventos.html", events_items=DATA['events'])

@main.route("/galeria")
def galeria():
    return render_template("galeria.html")

@main.route("/preguntas")
def preguntas():
    return render_template("preguntas.html", faq_items=DATA['faq'])

@main.route("/enlaces")
def enlaces():
    return render_template("enlaces.html", links=DATA['links'])

@main.route("/contacto", methods=["GET", "POST"])
def contacto():
    if request.method == "POST":
        nombre = request.form.get("nombre", "").strip()
        email = request.form.get("email", "").strip()
        mensaje = request.form.get("mensaje", "").strip()

        if not nombre or not email or not mensaje:
            flash("Completa todos los campos del formulario.", "error")
        else:
            flash("Mensaje recibido. La funcionalidad de envío se configurará posteriormente.", "success")
            return redirect(url_for("main.contacto"))

    return render_template("contacto.html")