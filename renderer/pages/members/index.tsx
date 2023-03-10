import { Button, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import { auth } from '../../lib/firebase/app';
import { addChatRoom, isDMChatRoomExist } from '../../lib/firebase/chats';
import { getUserList } from '../../lib/firebase/users';
import { TUser } from '../../lib/types';

const Member = styled('div')(({ theme }) => {
	return {
		padding: 20,
		paddingLeft: 30,
		borderBottom: `1px solid ${theme.palette.primary.light}`,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'white',
		':hover': {
			backgroundColor: theme.palette.primary.contrastText,
		},
	};
});

const MembersPage = () => {
	const router = useRouter();
	const [members, setMembers] = useState<TUser[]>([]);

	const handleDM = (member: string) => async () => {
		const users = [auth.currentUser?.email, member];
		let chatRoomId = await isDMChatRoomExist(users);

		if (!chatRoomId) {
			chatRoomId = await addChatRoom(users);
		}

		if (chatRoomId) {
			router.push(`/chat-room/${chatRoomId}`);
		}
	};

	useEffect(() => {
		getUserList().then((userList) => setMembers(userList));
	}, []);

	return (
		<Layout>
			<>
				<Member>
					<div>{auth.currentUser?.email}</div>
					<span>나</span>
				</Member>
				{members.map(
					(member) =>
						auth.currentUser?.email !== member.email && (
							<Member key={member.id}>
								<div>{member.email}</div>
								<Button onClick={handleDM(member.email)}>1:1 채팅</Button>
							</Member>
						)
				)}
			</>
		</Layout>
	);
};

export default MembersPage;
