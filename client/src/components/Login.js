import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

export default function Login({ submitId }) {
	const idRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		submitId(idRef.current.value);
	};
	return (
		<Container
			className="align-items-center d-flex"
			style={{
				height: "100vh",
			}}>
			<Form
				onSubmit={handleSubmit}
				className="w-100"
				style={{ margin: "0 50px" }}>
				<Form.Group className="mb-5">
					<Form.Label>User ID</Form.Label>
					<div className="d-flex">
						<Form.Control type="text" ref={idRef} required />
						<Button type="submit" className="ms-2 me-2 " variant="warning">
							Login
						</Button>
					</div>
				</Form.Group>
				<hr />
				<Form.Group className="mt-5 d-grid">
					<Button onClick={() => submitId(uuidV4())} variant="outline-dark">
						Create an ID
					</Button>
				</Form.Group>
			</Form>
		</Container>
	);
}
