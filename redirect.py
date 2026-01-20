from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

if os.path.exists('/etc/secrets/.env'):
    load_dotenv('/etc/secrets/.env')
else:
    load_dotenv()

app = Flask(__name__, 
            static_folder='static',
            static_url_path='/static')


'''try:
    app.config['SECRET_KEY'] = os.environ.get('MY_SECRET_KEY', 'default_fallback_key')
    app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')

    if not all([app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD']]):
        raise EnvironmentError("Faltan variables de entorno CRÍTICAS para el correo (MAIL_USERNAME, MAIL_PASSWORD, RECEIVING_EMAIL). Revisa tu archivo .env.")

except EnvironmentError as e:
    print(f"ERROR DE CONFIGURACIÓN: {e}")

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

RECEIVING_EMAIL = 'jimmymunozn@gmail.com' 

mail = Mail(app)'''


@app.route('/')
def inicio():
    return render_template('main.html', initial_content_template='start.html')

@app.route('/get-content/<page_name>')
def get_content(page_name):
    if page_name in ['start', 'home', 'about', 'projects', 'contact']:
        return render_template(f'{page_name}.html')
    return "Contenido no encontrado", 404


@app.route('/downloadCV')
def downloadCV():
    directory = app.root_path + '/static/downloads/'

    filename = 'JimmyMunoz_CV.pdf'
    
    download_name = 'CV_JimmyMuñoz_Junior-FullStack.pdf'

    return send_from_directory(
        directory,
        filename,
        as_attachment=True,
        download_name=download_name
    )


'''@app.route('/contacto', methods=['POST'])
def handle_contact_form():

    name = request.form.get('name')
    email = request.form.get('email')
    message_body = request.form.get('message')
    
    if not name or not email or not message_body:
        flash('Por favor, rellena todos los campos del formulario.', 'error')
    else:
        try:
            msg = Message(
                subject=f"Mensaje desde el portafolio - {name}",
                sender=app.config['MAIL_USERNAME'],
                recipients=[RECEIVING_EMAIL]
            )
            msg.body = f"""
            Nuevo mensaje desde el portafolio:
            
            De: {name}
            Email: {email}
            ------------------------------------------------
            Mensaje:
            {message_body}
            """
            mail.send(msg)
            flash('¡Gracias! Tu mensaje ha sido enviado correctamente. Te responderé pronto.', 'success')
            
        except Exception as e:
            print(f"Error al enviar correo: {e}")
            flash('Error al enviar tu mensaje. Verifica la configuración del servidor.', 'error')
            
    return render_template('contact.html')'''

app = app

if __name__ == '__main__':
    app.run(debug=True)