import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './app';

export const addUser = async (email: string) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      email,
    });
    console.log('Document written with ID: ', docRef.id);
    return !!docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getUserList = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const userList = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      userList.push({ id: doc.id, email: data.email });
    });

    return userList;
  } catch (e) {
    console.error('Error fetching document: ', e);
  }
};
