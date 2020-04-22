import React from 'react';
import { ReactComponent as TitleSVG } from '../../assets/connect420-title.svg';
import styles from './Title.module.css'

export default function Title() {
  return (
    <div>
      <TitleSVG className={styles.svg}/>
    </div>
  )
}