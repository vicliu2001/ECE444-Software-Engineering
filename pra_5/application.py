from flask import Flask, request, render_template
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.csrf import CSRFProtect
import os
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'
csrf = CSRFProtect(app)

class InputForm(FlaskForm):
    name = StringField('Enter news snippet', validators=[DataRequired()])
    submit = SubmitField('Predict')


# @app.before_request
# def start_timer():
#     request.start_time = time.time()

# @app.after_request
# def log_response_time(response):
#     if hasattr(request, 'start_time'):
#         duration = time.time() - request.start_time
#         app.logger.info(f'Request to {request.url} took {duration:.4f} seconds')
#     return response

@app.route("/", methods=['GET','POST'])
def index():

    form = InputForm()
    if form.validate_on_submit():
        if form.name.data.isdigit():
            return "Please input a string of text."
        
        text = form.name.data
        model = pickle.load(open('basic_classifier.pkl', 'rb'))
        count_vectorizer = pickle.load(open('count_vectorizer.pkl', 'rb'))
        text = count_vectorizer.transform([text])
        prediction = model.predict(text)
        return str(prediction[0])
    return render_template('index.html', form=form)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 4000))
    app.run(host='0.0.0.0', port=port)
    # app.run(port=4000, debug=True)

