# React-Django Todo List
A Todo List app built in React.js and Django to keep track of incomplete or completed tasks.

Used React-Bootstrap to style the application.

You can add, delete, or edit tasks. All Todo List information is sent and received from the Django backend,
and displayed on the React frontend.

# Install
**Please make sure to install Python and Node.js**

### Python Dependencies
I recommend using a **Virtual Environment** to run the Python/Django part of the app.
\
Enter the **project** folder via the terminal
```
cd project
```

Next, run the following command to install all necessary Python dependencies
```
python -m pip install -r requirements.txt
```

or 
```
pip install -r requirements.txt
```

### React.js Dependencies
From the **project** folder, navigate into the **frontend** folder via the terminal
```
cd frontend
```

Then, run the following command
```
npm install
```
\
Everything should now be installed!

# Running the App
Open up two terminal windows, one for running Django and one for running React.

### First Terminal
Starting from the **React-Django-TodoList** folder, cd into the **project** folder
```
cd project
```

and run the following command
```
python manage.py runserver
```
\
The Django backend should now be running.

### Second Terminal
In the second terminal, also starting from the **React-Django-TodoList** folder, cd into the **frontend** folder
```
cd project/frontend
```

and run the following command
```
npm start
```
\
The React frontend should also now be running.

You can now use the Todo List app through a web browser at **http://localhost:3000**

