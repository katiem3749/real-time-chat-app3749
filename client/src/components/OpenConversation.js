import React, { useState, useRef, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function OpenConversation() {
	const [text, setText] = useState("");
	const lastMessageRef = useRef();

	const { sendMessage, selectedConversation } = useConversations();
	const hours = new Date(Date.now()).getHours();
	const minutes = new Date(Date.now()).getMinutes();
	const time = minutes < 10 ? hours + ":0" + minutes : hours + ":" + minutes;

	function handleSubmit(e) {
		e.preventDefault();
		if (text) {
			sendMessage(
				selectedConversation.recipients.map((r) => r.id),
				text,
				time
			);
			setText("");
		}
	}

	useEffect(() => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({ smooth: true });
		}
	}, [selectedConversation.messages]);

	return (
		<div
			className="d-flex flex-column flex-grow-1 pt-3 rounded"
			style={{
				background:
					"linear-gradient(0deg, rgb(206, 229, 208,1) 25%, rgb(237, 223, 179,1) 50%)",
			}}>
			<div className="flex-grow-1 overflow-auto">
				<div className="d-flex flex-column align-items-start justify-content-end px-3">
					{selectedConversation.messages.map((message, index) => {
						const lastMessage =
							selectedConversation.messages.length - 1 === index;
						return (
							<div
								ref={lastMessage ? lastMessageRef : null}
								key={index}
								className={`my-1 d-flex flex-column ${
									message.fromMe
										? "align-self-end align-items-end"
										: "align-items-start"
								}`}>
								<div
									className="rounded px-2 py-1"
									style={{ backgroundColor: "white" }}>
									{message.text}
								</div>
								<i style={{ fontSize: "small" }}>
									{message.fromMe ? "You" : message.senderName} - {message.time}
								</i>
							</div>
						);
					})}
				</div>
			</div>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="m-2">
					<InputGroup>
						<Form.Control
							as="textarea"
							required
							value={text}
							onChange={(e) => setText(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
							style={{ height: "75px", resize: "none" }}
						/>
						<Button
							variant="primary"
							type="submit"
							style={{
								backgroundColor: "rgb(164, 126, 59)",
								border: "1px solid rgb(206, 171, 147)",
							}}>
							Send
						</Button>
					</InputGroup>
				</Form.Group>
			</Form>
		</div>
	);
}
