import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../../contexts/ContactsProvider";
import { useConversations } from "../../contexts/ConversationsProvider";

export default function NewConversationModal({ closeModal }) {
	const [selectedContactIds, setSelectedContactIds] = useState([]);
	const { contacts } = useContacts();
	const { createConversation } = useConversations();

	function handleCheckboxChange(contactId) {
		setSelectedContactIds((prevSelectedContactIds) => {
			if (prevSelectedContactIds.includes(contactId)) {
				return prevSelectedContactIds.filter((prevId) => {
					return prevId !== contactId;
				});
			} else {
				return [...prevSelectedContactIds, contactId];
			}
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		createConversation(selectedContactIds);
		closeModal();
	}

	return (
		<>
			<Modal.Header closeButton>Contacts</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					{contacts.map((contact) => (
						<Form.Group controlId={contact.id} key={contact.id}>
							<Form.Check
								type="checkbox"
								value={selectedContactIds.includes(contact.id)}
								label={contact.name}
								onChange={() => handleCheckboxChange(contact.id)}
							/>
						</Form.Group>
					))}
					<Button
						type="submit"
						className="mt-2"
						style={{
							color: "black",
							backgroundColor: "white",
							border: "solid 1px lightgray",
							float: "right",
						}}>
						Let's chat!
					</Button>
				</Form>
			</Modal.Body>
		</>
	);
}
