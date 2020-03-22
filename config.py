import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()


class Config:
    DEBUG = False
    CSRF_ENABLED = True
    SECRET_KEY = os.urandom(24)
    PERMANENT_SESSION_LIFETIME = timedelta(days=365)
    SQLALCHEMY_DATABASE_URI = 'postgresql://%s:%s@localhost/%s' % (
        os.environ.get('DATABASE_USER'),
        os.environ.get('DATABASE_PASS'),
        os.environ.get('DATABASE_NAME'),
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECURITY_PASSWORD_HASH = 'sha512_crypt'
    SECURITY_PASSWORD_SALT = 'salt'
    ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'example@example.com')
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'password')

    @staticmethod
    def init_app(app):
        pass
