import csv
import os.path
from gettext import gettext, ngettext
from flask import redirect, url_for, request, flash, send_file
from flask_admin import Admin, AdminIndexView
from flask_admin.actions import action
from flask_admin.contrib.sqla import ModelView
from flask_security import utils, current_user
from flask_security.forms import LoginForm, StringField, Required, BooleanField
from wtforms.fields import PasswordField, TextAreaField

from .database import db
from .models import *


class ExtendedLoginForm(LoginForm):
    email = StringField('Enter your Email', [Required()])
    password = PasswordField('Enter your password', [Required()])
    remember = BooleanField('Remember me')


class ModelViewMixin(ModelView):
    def is_accessible(self):
        return current_user.has_role('admin') and current_user.is_active

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('security.login', next=request.url))


class TermsAdmin(ModelViewMixin):
    column_list = [
        'year',
        'number',
        'n_btc',
        'n_eth',
        'n_xrp',
        'average',
        'a_btc',
        'a_eth',
        'a_xrp',
        'yld',
        'y_btc',
        'y_eth',
        'y_xrp'
    ]

    form_columns = column_list


class QuestionAdmin(ModelViewMixin):
    column_default_sort = 'create'
    column_descriptions = dict(
        body='<a href="https://daringfireball.net/projects/markdown/syntax" target="_blank">Markdown Syntax</a>'
    )

    def scaffold_form(self):
        form_class = super(QuestionAdmin, self).scaffold_form()
        form_class.body = TextAreaField('Quistion body')
        return form_class


class LeadAdmin(ModelViewMixin):
    @action('download', 'Download', 'Are you sure you want to download selected leads?')
    def action_download(self, ids):
        try:
            query = Lead.query.filter(Lead.id.in_(ids))
            path = os.path.join(os.path.dirname(
                __file__), 'download/Leads.csv')

            with open(path, 'w', newline='') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow(['id', 'email'])
                writer.writerows([[lead.id, lead.email]
                                  for lead in query.all()])

            return send_file(path, as_attachment=True)

        except Exception as ex:
            if not self.handle_view_exception(ex):
                raise

            flash(gettext('Failed to downloaded leads. %s' % str(ex)))


class UserAdmin(ModelViewMixin):
    column_exclude_list = list = 'password',
    form_excluded_columns = 'password',
    column_auto_select_related = True

    def scaffold_form(self):
        form_class = super(UserAdmin, self).scaffold_form()
        form_class.password2 = PasswordField('New password')
        return form_class

    def on_model_change(self, form, model, is_created):
        if len(model.password2):
            model.password = utils.hash_password(model.password2)


class HomeAdminView(AdminIndexView):
    def is_accessible(self):
        return current_user.has_role('admin') and current_user.is_active

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('security.login', next=request.url))


admin = Admin(url='/', index_view=HomeAdminView(), template_mode='bootstrap3')
admin.add_view(UserAdmin(User, db.session, name='Users'))
admin.add_view(LeadAdmin(Lead, db.session, name='Leads'))
# admin.add_view(ModelViewMixin(Grow, db.session, name='Grows'))
admin.add_view(TermsAdmin(Short, db.session, name='Short'))
admin.add_view(TermsAdmin(Medium, db.session, name='Medium'))
admin.add_view(TermsAdmin(Long, db.session, name='Long'))
admin.add_view(QuestionAdmin(Question, db.session, name='FAQ'))
