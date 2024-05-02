import styles from './page.module.css';
import axios from 'axios';
//import { message } from 'antd';
import { cookies } from 'next/headers';

export default async function Home() {
  return (
    <>
      <h1>Carrerplex</h1>
      <h2>Current User</h2>
    </>
  );
}
