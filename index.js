const mysql = require('mysql');
const readline = require('readline');

// Create a connection to your MySQL database
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sroy',
});

// Connect to the database
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define a function to insert data into the database
function insertData(data) {
  const sql = 'INSERT INTO students (name, email, password) VALUES (?, ?, ?)';

  dbConnection.query(sql, data, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      console.log('Data inserted successfully:', result);
    }
  });
}

// Define a function to delete a student record by ID
function deleteStudentById(id) {
  const sql = 'DELETE FROM students WHERE id = ?';

  dbConnection.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error deleting student:', err);
    } else {
      console.log('Student deleted successfully');
    }
  });
}

// Define a function to update a student record by ID
function updateStudentById(id, newData) {
  const sql = 'UPDATE students SET name = ?, email = ?, password = ? WHERE id = ?';
  const values = [newData.name, newData.email, newData.password, id];

  dbConnection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating student:', err);
    } else {
      console.log('Student updated successfully');
    }
  });
}

// Create a readline interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter a command (insert/delete/update): ', (command) => {
  if (command === 'insert') {
    rl.question('Enter student data in JSON format: ', (input) => {
      try {
        const studentData = JSON.parse(input);
        const values = [studentData.name, studentData.email, studentData.password];
        insertData(values);
        rl.close();
      } catch (error) {
        console.error('Invalid JSON input:', error);
        rl.close();
      }
    });
  } else if (command === 'delete') {
    rl.question('Enter the ID of the student to delete: ', (id) => {
      id = parseInt(id, 10);
      if (isNaN(id)) {
        console.error('Invalid ID. Please enter a valid numeric ID.');
        rl.close();
        return;
      }
      deleteStudentById(id);
      rl.close();
    });
  } else if (command === 'update') {
    rl.question('Enter the ID of the student to update and also enter what to update : ', (id,field) => {
      id = parseInt(id, 10);
      if (isNaN(id)) {
        console.error('Invalid ID. Please enter a valid numeric ID.');
        rl.close();
        return;
      }
      rl.question('Enter updated student data in JSON format: ', (input) => {
        try {
          const studentData = JSON.parse(input);
          updateStudentById(id, studentData);
          rl.close();
        } catch (error) {
          console.error('Invalid JSON input:', error);
          rl.close();
        }
      });
    });
  } else {
    console.error('Invalid command. Please enter "insert," "delete," or "update."');
    rl.close();
  }
});

// Close the database connection when done
function closeDatabaseConnection() {
  dbConnection.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err);
    } else {
      console.log('Database connection closed');
    }
  });
}

// Handle SIGINT (Ctrl+C) to close the database connection before exiting
process.on('SIGINT', () => {
  closeDatabaseConnection();
  process.exit();
});
