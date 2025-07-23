from flask import Flask, request, render_template


# Flask by default expects a folder named "static" in the same directory as
# this file. In this project the static assets live inside ``templates/static``
# so we need to explicitly point the Flask application to that folder.
app = Flask(__name__, template_folder='templates', static_folder='templates/static')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 60


@app.route('/')
def entry_page():
    return render_template('index.html')


@app.route('/calculate/', methods=['GET', 'POST'])
def calculate():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
