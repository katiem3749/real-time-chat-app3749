const io = require("socket.io")(3001, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	const id = socket.handshake.query.id;
	socket.join(id);
	console.log(`user connected with socket ID - ${id}`);

	socket.on("send-message", ({ recipients, text }) => {
		recipients.forEach((recipient) => {
			const newRecipients = recipients.filter((r) => r !== recipient);
			newRecipients.push(id);
			const hours = new Date(Date.now()).getHours();
			const minutes = new Date(Date.now()).getMinutes();

			socket.broadcast.to(recipient).emit("receive-message", {
				recipients: newRecipients,
				sender: id,
				text,
				time: minutes < 10 ? hours + ":0" + minutes : hours + ":" + minutes,
			});
		});
	});
});
