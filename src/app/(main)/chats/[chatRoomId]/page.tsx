const Page = ({ params }: { params: { chatRoomId: string } }) => {
  return <div>{params.chatRoomId}</div>;
};

export default Page;
