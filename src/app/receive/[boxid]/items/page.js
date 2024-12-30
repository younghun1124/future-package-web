// import { useState } from 'react';
import styles from './page.module.css';
import SendButton from '@/ui/buttons/SendButton';
import FutureItem from '@/ui/FutureItem';
import { dummyItems } from '@/mocks/items';

export default function ItemsPage() {

  

  const handleSaveImage = () => {
    // 이미지 저장 로직 구현 예정
    console.log('이미지 저장하기');
  };

  return (
      
      <div className={styles.buttonContainer}>
        <button 
          onClick={handleSaveImage}
          className={styles.button}
        >
          이미지 저장
        </button>
        <SendButton/>
      </div>    
  );
}