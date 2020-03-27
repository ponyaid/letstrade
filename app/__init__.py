from flask import Flask
from flask_security import SQLAlchemyUserDatastore, Security

from config import Config
from .database import db, migrate
from .admin import admin, ExtendedLoginForm
from .models import *


def create_app(config=Config):
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config.from_object(config)
    config.init_app(app)
    db.init_app(app)
    admin.init_app(app)
    migrate.init_app(app, db)
    user_datastore = SQLAlchemyUserDatastore(db, User, Role)
    Security(app, datastore=user_datastore, login_form=ExtendedLoginForm)

    with app.test_request_context():
        db.create_all()
        user_datastore.find_or_create_role(name='admin', description='Administrator')
        if not user_datastore.get_user(app.config['ADMIN_EMAIL']):
            user_datastore.create_user(email=app.config['ADMIN_EMAIL'], password=app.config['ADMIN_PASSWORD'])
        db.session.commit()
        user_datastore.add_role_to_user(app.config['ADMIN_EMAIL'], 'admin')
        db.session.commit()

    return app
