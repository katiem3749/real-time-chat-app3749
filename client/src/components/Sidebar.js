import React, { useState } from "react";
import { Tab, Nav, Modal, Button } from "react-bootstrap";
import Conversations from "./utils/Conversations";
import Contacts from "./utils/Contacts";
import NewConversationModal from "./modals/NewConversationModal";
import NewContactModal from "./modals/NewContactModal";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar({ id }) {
	const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
	const [modalOpen, setModalOpen] = useState(false);
	const conversationOpen = activeKey === CONVERSATIONS_KEY;

	function closeModal() {
		setModalOpen(false);
	}

	return (
		<div style={{ width: "250px" }} className="d-flex flex-column">
			<Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
				{/* **** header - top tabs **** */}
				<Nav variant="tabs" className="justify-content-center">
					<Nav.Item>
						<Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
					</Nav.Item>
				</Nav>

				{/* **** body **** */}
				<Tab.Content className="border-end overflow-auto flex-grow-1">
					<Tab.Pane eventKey={CONVERSATIONS_KEY}>
						<Conversations />
					</Tab.Pane>
					<Tab.Pane eventKey={CONTACTS_KEY}>
						<Contacts />
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
			{/* **** footer **** */}
			<div className="p-2 border-start border-top border-end small">
				Signed in with ID: <span>{id}</span>
			</div>
			{/* <Button
				className="rounded-1"
				style={{ backgroundColor: "rgb(76, 172, 188)", border: "none" }}
				onClick={() => setModalOpen(true)}>
				New {conversationOpen ? "Conversation" : "Contact"}
			</Button> */}

			{conversationOpen ? (
				<Button
					className="rounded-1"
					style={{ backgroundColor: "rgb(0, 110, 127)", border: "none" }}
					onClick={() => setModalOpen(true)}>
					New Conversation
				</Button>
			) : (
				<Button
					className="rounded-1"
					style={{ backgroundColor: "rgb(162, 91, 91)", border: "none" }}
					onClick={() => setModalOpen(true)}>
					New Contact
				</Button>
			)}

			<Modal show={modalOpen} onHide={closeModal}>
				{conversationOpen ? (
					<NewConversationModal closeModal={closeModal} />
				) : (
					<NewContactModal closeModal={closeModal} />
				)}
			</Modal>
		</div>
	);
}
