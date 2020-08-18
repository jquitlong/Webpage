# exam-api

This README outlines the details of collaborating on this Python-Django application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.
* MySql community [https://dev.mysql.com/downloads/]
* Python 3.7.1 [https://www.python.org/downloads/]
* Virtual Environment [https://pypi.org/project/virtualenv/]
* All items in requirements.txt

## Database Configuration

* Create new schema with any name
* In `cd exam-api/exam_api/settings.py` [later on installation], update `DATABASES` configuration

## Installation

* `git clone <repository-url>` this repository
* `cd exam-api`
* `virtualenv venv` [Create virtual environment]
* `venv\Scripts\active` [Activate virtual environment]
* `pip install -r requirements.txt` [Install required python modules]

## Running 

* `cd exam-api` [Enter into manage.py level]
* `python manage.py migrate` [Generate tables in database]
* `python manage.py runserver` [Run the server]

