import React from "react";
import { Accordion } from "react-bootstrap";
import { useConversations } from "../../contexts/ConversationsProvider";

export default function Conversations() {
	const { conversations, selectConversationIndex } = useConversations();
	return (
		<Accordion defaultActiveKey="0">
			{conversations.map((conversation, index) => (
				<Accordion.Item
					eventKey={index}
					key={index}
					onClick={() => selectConversationIndex(index)}
					// active={conversation.selected}
				>
					<Accordion.Header>
						<div className="d-flex flex-column">
							<p className="mb-0">{`Room ${index + 1}`}</p>
							<i
								style={{
									fontSize: "15px",
								}}>{`[${conversation.recipients.length} friend(s) joined]`}</i>
						</div>
					</Accordion.Header>
					<Accordion.Body>
						<ul style={{ listStyleType: "circle", paddingLeft: "15px" }}>
							{conversation.recipients.map((recipient, i) => (
								<li key={i}>{recipient.name}</li>
							))}
						</ul>
					</Accordion.Body>
				</Accordion.Item>
			))}
		</Accordion>
	);
}
