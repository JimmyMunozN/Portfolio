from flask import Flask, request, make_response, redirect, render_template, session, flash

app = Flask(__name__)

@app.route('/')
def inicio():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)