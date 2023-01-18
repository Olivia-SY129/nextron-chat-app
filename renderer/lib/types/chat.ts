import { FieldValue } from "firebase/firestore";

export type TChatRoom = {
  id: string;
  createdAt: FieldValue;
  createdBy: string;
  users: string[];
  isGroup: boolean;
};

export type TMessage = {
  id: string;
  createdAt: FieldValue;
  text: string;
  user: string;
  chatRoomId: string;
};
