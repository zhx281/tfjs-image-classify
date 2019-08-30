from __future__ import division, print_function
# coding=utf-8
from flask import Flask, redirect, url_for, request, render_template

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    # Landing Page
    return render_template('demo1.html')

@app.route('/demo2', methods=['GET'])
def demo2():
    return render_template('demo2.html')

if __name__ in '__main__':
    app.run()