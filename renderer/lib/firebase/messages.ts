import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	where,
} from 'firebase/firestore';
import { auth, db } from './app';

export const addMessage = async (text: string, chatRoomId: string) => {
	try {
		const docRef = await addDoc(collection(db, 'messages'), {
			text,
			createdAt: serverTimestamp(),
			user: auth.currentUser.email,
			chatRoomId,
		});
		return !!docRef.id;
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

export const getMessageList = (
	chatRoomId: string,
	setter: (value: React.SetStateAction<unknown[]>) => void
) => {
	try {
		const messagesRef = collection(db, 'messages');
		const messagesQuery = query(
			messagesRef,
			orderBy('createdAt'),
			where('chatRoomId', '==', chatRoomId)
		);

		onSnapshot(messagesQuery, (snapshot) => {
			const messages = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setter(messages);
		});
	} catch (e) {
		console.error('Error fetching document: ', e);
	}
};
