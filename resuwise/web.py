from flask import Flask, request, jsonify, render_template
import mysql.connector

app = Flask(__name__)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Yashodh@N245",
        database="resuwise"
    )

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/features')
def features():
    return render_template('features.html')

@app.route('/faqs')
def faqs():
    return render_template('faqs.html')

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute("INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)",
                   (data['username'], data['email'], data['password']))
    db.commit()
    cursor.close()
    db.close()

    return jsonify({"message": "User  added successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
