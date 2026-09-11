from flask import Flask

def create_app():
    app = Flask(__name__)
    app.secret_key = 'clave-secreta-para-desarrollo'
    
    from . import routes
    app.register_blueprint(routes.main)
    
    return app