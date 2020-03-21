# lets.trade

Flask application deployed by [link](https://lets.trade)

## Installation 

[pip](https://packaging.python.org/key_projects/#pip) is already installed if you are using Python.
You must also install [virtualenv](https://packaging.python.org/key_projects/#virtualenv).

```
git clone https://github.com/ponyaid/letstrade.git
cd letstrade
virtualenv venv && source venv/bin/activate
pip -r requirements.txt
```

## Database

You must have postgres installed. You must also create a database and add the environment variables

## Environment variables
For the application to work, you must add the following environment variables:

```
ADMIN_EMAIL
ADMIN_PASSWORD
DATABASE_NAME
DATABASE_USER
DATABASE_PASS
X_CMC_PRO_API_KEY # coinmarketcap key
```

## Running

```
# create a migration repository
flask db init
# generate an initial migration
flask db migrate
# apply the migration to the database
flask db upgrade

# run app
flask run
```