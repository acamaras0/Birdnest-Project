import { useEffect, useState } from "react";
import "./Radar.css";

const Radar = ({socket }) => {
	const [positions, setPositions] = useState([])

	useEffect(() => {
		if (socket) {
			socket.on("radar", (data) => {
				setPositions(data);
			});
		}
	}, [socket]);

	console.log(positions)
	return (
		<div className="radar">
			<div className="sweep"></div>
			{positions &&
				positions.map((pilot) => {
					return (
						<div className="dots" key={pilot.serialNumber}>
							<div className="dot">{pilot.serialNumber}</div>
						</div>
					);
				})}
		</div>
	);
};

export default Radar;
