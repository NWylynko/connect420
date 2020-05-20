import React from 'react';
import styles from './EndScreen.module.css';
import MenuStyles from '../../Menu/Menu.module.css';

export function EndScreen() {
    return (
      <div className={styles.container}>
        <button className={MenuStyles.button} style={{width: '100%'}}>continue (0/2)</button>
        <button className={MenuStyles.button} style={{width: '100%'}}>replay (0/2)</button>
        <button className={MenuStyles.button} style={{width: '100%'}}>back to Menu</button>
      </div>
    )
  }