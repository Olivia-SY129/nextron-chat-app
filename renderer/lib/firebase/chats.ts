import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./app";

export const addMessage = async (text: string, chatRoomId: string) => {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      text,
      createdAt: serverTimestamp(),
      user: auth.currentUser.email,
      chatRoomId,
    });
    return !!docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getMessageList = (
  chatRoomId: string,
  setter: (value: React.SetStateAction<unknown[]>) => void
) => {
  try {
    const messagesRef = collection(db, "messages");
    const messagesQuery = query(
      messagesRef,
      orderBy("createdAt"),
      where("chatRoomId", "==", chatRoomId)
    );

    onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setter(messages);
    });
  } catch (e) {
    console.error("Error fetching document: ", e);
  }
};

export const getLastChat = (
  chatRoomId: string,
  setter: (value: React.SetStateAction<string>) => void
) => {
  try {
    const messagesRef = collection(db, "messages");
    const messagesQuery = query(
      messagesRef,
      orderBy("createdAt", "desc"),
      limit(1),
      where("chatRoomId", "==", chatRoomId)
    );

    onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        text: doc.data().text,
      }));
      if (messages.length > 0) {
        const text = messages[0].text;
        setter(text);
      } else {
        setter("");
      }
    });
  } catch (e) {
    console.error("Error fetching document: ", e);
  }
};

export const addChatRooms = async (
  users: string[],
  options?: { isGroup?: boolean }
) => {
  try {
    const docRef = await addDoc(collection(db, "chatRooms"), {
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.email,
      users,
      isGroup: options?.isGroup || false,
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addUserInChatRoom = async (docId: string, user: string) => {
  try {
    const docRef = await getDoc(doc(db, "chatRooms", docId));
    if (docRef.id) {
      await updateDoc(doc(db, "chatRooms", docId), {
        users: [...docRef.data().users, user],
      });
    }
  } catch (e) {
    alert("추가에 실패했습니다. 다시 시도해주세요.");
    console.log("Error adding user: ", e);
  }
};

export const checkChatRoom = async (user: string[]) => {
  try {
    const docRef = collection(db, "chatRooms");
    const chatRoomQuery = query(
      docRef,
      orderBy("createdAt"),
      where("users", "array-contains", user[0]),
      where("isGroup", "==", false)
    );

    const snapshot = await getDocs(chatRoomQuery);

    let chatRoomId: string | null = null;

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.users.includes(user[1])) {
        chatRoomId = doc.id;
      }
    });

    return chatRoomId;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getChatRoomList = async (
  user: string,
  setter: (value: React.SetStateAction<any[]>) => void,
  options: {
    isGroup: boolean;
  }
) => {
  try {
    const chatRoomRef = collection(db, "chatRooms");
    const chatRoomQuery = query(
      chatRoomRef,
      orderBy("createdAt"),
      where("users", "array-contains", user),
      where("isGroup", "==", options.isGroup)
    );

    onSnapshot(chatRoomQuery, (snapshot) => {
      const chatRooms = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setter(chatRooms);
    });
  } catch (e) {
    console.error("Error fetching document: ", e);
  }
};
