import React, {useEffect, useState} from 'react';
import Card from './components/Card/Card';
import availableCards from './components/Card/availableCards';
import classes from './App.module.css';

const App = () => {
  const generateBackground = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;
  const [lastKey, setLastKey] = useState('');
  const [activeKey, setActiveKey] = useState('');
  const [background, setBackground] = useState('yellow');

  useEffect(()=>{
    document.addEventListener('keydown',(e)=>{
      e.preventDefault();
      setLastKey(e.key);
    })
    document.addEventListener('click',(e)=>{
      e.preventDefault();
      const randomItemIndex = Math.floor(Math.random() * (availableCards.length));
      setLastKey(availableCards[randomItemIndex].key);
    });

  },[]);


  useEffect(()=>{
    const timer = setTimeout(()=>{
      setActiveKey(lastKey);
      setBackground(generateBackground());
    },600);
    return () => clearTimeout(timer);
  },[lastKey])

  

  const activeItemIndex = availableCards.findIndex(item=> item.key === activeKey);
  const activeItem = availableCards[activeItemIndex];

  return (
    <div className={classes.backdrop} style={{background: background}}>
      <h1>Alberto Works!</h1>
      {activeItem && <Card image={activeItem}/>}
    </div>
  );
};

export default App;
