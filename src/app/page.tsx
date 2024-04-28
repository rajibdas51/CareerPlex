'use client';
import Image from 'next/image';
import styles from './page.module.css';
import axios from 'axios';
import { use, useEffect, useState } from 'react';
import { message } from 'antd';
export default function Home() {
  interface User {
    name: string;
    email: string;
    isAdmin: boolean;
    userType: string;
  }
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    isAdmin: false,
    userType: '',
  });
  const getUser = async () => {
    try {
      const response = await axios.get('/api/users/currentuser');
      setUser(response.data.data);
      console.log(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <h1>Carrerplex</h1>
      <h2>Current User:{user.name}</h2>
    </>
  );
}
