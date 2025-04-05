import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import configureStore from './store/configureStore';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import Logout from './components/Logout';
import { AuthProvider, useAuth } from './AuthContext';
import './styles/App.css'; // Import the CSS file


const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Login />;
};

const App = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <AuthProvider>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/task-page" element={
                  <PrivateRoute>
                    <div className="task-page">
                      <div className="logout-container">
                        <Logout />
                      </div>
                      <div className="task-form-container">
                        <TaskForm />
                      </div>
                      <div className="task-list-container">
                        <TaskList />
                      </div>
                    </div>
                  </PrivateRoute>
                } />
                <Route path="/" element={<Login/>} />
              </Routes>
            </div>
          </Router>
        </DndProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
