import {
	Table,
	Row,
	Col,
	Tooltip,
	User,
	Text,
	Loading,
} from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import React from "react";
import { getUsers } from "../../api/users.api";
export default function Tables() {
	const [users, setUsers] = React.useState([]);
	const columns = [
		{ name: "USER", uid: "name" },
		{ name: "GENDER", uid: "gender" },
		{ name: "STATUS", uid: "status" },
		{ name: "ACTIONS", uid: "actions" },
	];

	const renderCell = (user, columnKey) => {
		const cellValue = user[columnKey];
		switch (columnKey) {
			case "name":
				return (
					<Col>
						<Row>
							<User
								squared
								src={"https://i.pravatar.cc/150"}
								name={cellValue}
								css={{ p: 0 }}>
								{user.email}
							</User>
						</Row>
					</Col>
				);
			case "gender":
				return (
					<Col>
						<Row>
							<Text b size={14} css={{ tt: "capitalize" }}>
								{cellValue}
							</Text>
						</Row>
						<Row>
							<Text
								b
								size={13}
								css={{ tt: "capitalize", color: "$accents7" }}>
								{user._id}
							</Text>
						</Row>
					</Col>
				);
			case "status":
				return (
					<Col>
						<Row>
							<StyledBadge
								type={user.createdAt ? "active" : "paused"}>
								{user.createdAt}
							</StyledBadge>
						</Row>
					</Col>
				);

			case "actions":
				return (
					<Row justify='center' align='center'>
						<Col css={{ d: "flex" }}>
							<Tooltip content='Details'>
								<IconButton
									onClick={() =>
										console.log("View user", user.id)
									}>
									<EyeIcon size={20} fill='#979797' />
								</IconButton>
							</Tooltip>
						</Col>
						<Col css={{ d: "flex" }}>
							<Tooltip content='Edit user'>
								<IconButton
									onClick={() =>
										console.log("Edit user", user._id)
									}>
									<EditIcon size={20} fill='#979797' />
								</IconButton>
							</Tooltip>
						</Col>
						<Col css={{ d: "flex" }}>
							<Tooltip
								content='Delete user'
								color='error'
								onClick={() =>
									console.log("Delete user", user._id)
								}>
								<IconButton>
									<DeleteIcon size={20} fill='#FF0080' />
								</IconButton>
							</Tooltip>
						</Col>
					</Row>
				);
			default:
				return cellValue;
		}
	};

	const getdata = async () => {
		let data = await getUsers();
		console.log("👻 -> file: index.jsx:168 -> getdata -> data:", data);
		setUsers(data);
	};

	React.useEffect(() => {
		getdata();
	}, []);
	return (
		<Table
			color='error'
			aria-label='Example table with custom cells'
			css={{
				height: "auto",
				minWidth: "100%",
			}}
			selectionMode='none'>
			<Table.Header columns={columns}>
				{(column) => (
					<Table.Column
						key={column.uid}
						hideHeader={column.uid === "actions"}
						align={column.uid === "actions" ? "center" : "start"}>
						{column.name}
					</Table.Column>
				)}
			</Table.Header>
			{users ? (
				<Table.Body items={users}>
					{(item) => (
						<Table.Row
							justify='center'
							align='center'
							key={item._id}>
							{(columnKey) => (
								<Table.Cell>
									{renderCell(item, columnKey)}
								</Table.Cell>
							)}
						</Table.Row>
					)}
				</Table.Body>
			) : (
				<Loading type='spinner' color='currentColor' size='sm' />
			)}
			<Table.Pagination
				shadow
				noMargin
				align='center'
				rowsPerPage={3}
				onPageChange={(page) => console.log({ page })}
			/>
		</Table>
	);
}
