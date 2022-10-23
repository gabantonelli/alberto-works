import React, { useEffect, useState } from 'react';
import Card from './components/Card/Card';
import availableCards from './components/Card/availableCards';
import classes from './App.module.css';

const App = () => {
  const generateTheme = () => {
    const background = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
    const color = (Number(`0x1${background}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
    return {
      background: `#${background}`,
      color: `#${color}`
    }
  } 
  const [lastKey, setLastKey] = useState('');
  const [activeKey, setActiveKey] = useState('');
  const [theme, setTheme] = useState(generateTheme());

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.altKey) {
        // disable also keys combination
        if (e.keyCode == 67 && window.prevKey == 86)
          e.preventDefault();
        else if (e.keyCode == 86 && window.prevKey == 67)
          e.preventDefault();
        window.prevKey = e.keyCode
      }
      e.preventDefault();
      setLastKey(e.key);
    })
    document.addEventListener('click', (e) => {
      e.preventDefault();
      const randomItemIndex = Math.floor(Math.random() * (availableCards.length));
      setLastKey(availableCards[randomItemIndex].key);
    });

  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveKey(lastKey);
      setTheme(generateTheme());
    }, 600);
    return () => clearTimeout(timer);
  }, [lastKey])



  const activeItemIndex = availableCards.findIndex(item => item.key === activeKey);
  const activeItem = availableCards[activeItemIndex] || availableCards[0];

  return (
    <div className={classes.backdrop} style={{ background: theme.background }}>
      <h1 style={{color: theme.color}}>Alberto Works!</h1>
      <div className={classes.content}>
          <p style={{color: theme.color}}>Press any key on the keyboard or click on the screen</p>
          {activeItem && <Card image={activeItem} />}
      </div>
    </div>
  );
};

export default App;
