import os
from flask import Flask
from app import routes as routes_module

BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app')

app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, 'templates'),
    static_folder=os.path.join(BASE_DIR, 'static'),
    static_url_path='/static'
)

app.secret_key = "cambia-esto-por-algo-secreto"

# 👇 Accedemos a DATA a través del módulo routes
@app.context_processor
def inject_global_data():
    return {"instituto": routes_module.DATA.get('instituto', {})}

# Registrar el blueprint
app.register_blueprint(routes_module.main)

if __name__ == "__main__":
    app.run(debug=True)