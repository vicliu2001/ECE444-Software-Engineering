from flask import Flask, render_template, session, redirect, url_for, flash
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'

bootstrap = Bootstrap(app)
moment = Moment(app)
class NameForm(FlaskForm):
    name = StringField('What is your name?', validators=[DataRequired()])
    email = StringField('What is your email?', validators=[DataRequired(), Email()])
    submit = SubmitField('Submit')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500


@app.route('/', methods=['GET', 'POST'])
def index():
    form = NameForm()

    if form.validate_on_submit():

        # deal with name
        old_name = session.get('name')

        if old_name is not None and old_name != form.name.data:
            flash('Looks like you have changed your name!')
        
        # deal with email
        if session.get('email') is not None:
            old_email = session.get('email').split()[-1] # only retrieve email
        else:
            old_email = session.get('email')

        if old_email is not None and old_email != form.email.data:
            flash('Looks like you have changed your email!')

        # update email accordingly
        if form.email.data.endswith('utoronto.ca'):
            session['email'] = f'Your UofT email is {form.email.data}'
        else:
            session['email'] = 'Please use your UofT email.'
        
        # update name, no checks
        session['name'] = form.name.data

        return redirect(url_for('index'))

    return render_template('index.html', form=form, name=session.get('name'), email=session.get('email'))