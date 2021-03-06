from datetime import datetime
from flask_security import UserMixin, RoleMixin

from .database import db


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    create = db.Column(db.DateTime, default=datetime.utcnow)
    title = db.Column(db.String())
    body = db.Column(db.String())


class Grow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer)
    signals = db.Column(db.Integer)
    rate = db.Column(db.Float)
    profit = db.Column(db.Float)
    profit_min = db.Column(db.Float)
    profit_max = db.Column(db.Float)
    yld = db.Column(db.Float, name='yield')


class Lead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True)

    def __repr__(self):
        return '%s' % self.email


# NEW MODELS 18.04.2021 #


class Short(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    number = db.Column(db.Integer, nullable=False)
    n_btc = db.Column(db.Integer, nullable=False)
    n_eth = db.Column(db.Integer, nullable=False)
    n_xrp = db.Column(db.Integer, nullable=False)
    average = db.Column(db.Float, nullable=False)
    a_btc = db.Column(db.Float, nullable=False)
    a_eth = db.Column(db.Float, nullable=False)
    a_xrp = db.Column(db.Float, nullable=False)
    yld = db.Column(db.Float, name='yield', nullable=False)
    y_btc = db.Column(db.Float, nullable=False)
    y_eth = db.Column(db.Float, nullable=False)
    y_xrp = db.Column(db.Float, nullable=False)


class Medium(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    number = db.Column(db.Integer, nullable=False)
    n_btc = db.Column(db.Integer, nullable=False)
    n_eth = db.Column(db.Integer, nullable=False)
    n_xrp = db.Column(db.Integer, nullable=False)
    average = db.Column(db.Float, nullable=False)
    a_btc = db.Column(db.Float, nullable=False)
    a_eth = db.Column(db.Float, nullable=False)
    a_xrp = db.Column(db.Float, nullable=False)
    yld = db.Column(db.Float, name='yield', nullable=False)
    y_btc = db.Column(db.Float, nullable=False)
    y_eth = db.Column(db.Float, nullable=False)
    y_xrp = db.Column(db.Float, nullable=False)


class Long(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    number = db.Column(db.Integer, nullable=False)
    n_btc = db.Column(db.Integer, nullable=False)
    n_eth = db.Column(db.Integer, nullable=False)
    n_xrp = db.Column(db.Integer, nullable=False)
    average = db.Column(db.Float, nullable=False)
    a_btc = db.Column(db.Float, nullable=False)
    a_eth = db.Column(db.Float, nullable=False)
    a_xrp = db.Column(db.Float, nullable=False)
    yld = db.Column(db.Float, name='yield', nullable=False)
    y_btc = db.Column(db.Float, nullable=False)
    y_eth = db.Column(db.Float, nullable=False)
    y_xrp = db.Column(db.Float, nullable=False)


# Flask Security #
roles_users = db.Table('role_users',
                       db.Column('user_id', db.Integer,
                                 db.ForeignKey('user.id')),
                       db.Column('role_id', db.Integer,
                                 db.ForeignKey('role.id'))
                       )


class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

    def __repr__(self):
        return '%s' % self.name


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    roles = db.relationship(
        'Role',
        secondary=roles_users,
        backref=db.backref('users', lazy='dynamic')
    )
