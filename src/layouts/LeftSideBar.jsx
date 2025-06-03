import UserList from "@/components/UserList";


export default function LeftSideBar() {
	return (
		<div className="fixed w-70 h-[calc(100vh-80px)] border-r top-20 left-0">
			<div className="p-4">
				<h2 className="text-xl font-semibold">User List</h2>
				<div className="">
					<UserList />
				</div>
			</div>
		</div>
	);
}