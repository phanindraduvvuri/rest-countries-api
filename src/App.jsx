import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';


export const ThemeContext = createContext(null);

function App() {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <nav className="navbar">
          <div className="container">
            <h2 className="title">Where in the world?</h2>
            <button className="theme-switcher">
              <i className="fa fa-solid fa-moon"></i>
              Dark Mode
            </button>
          </div>
        </nav>
        <main className='container'>
          <Outlet />
        </main>
      </div>
    </ThemeContext.Provider>

  )
}

export default App
