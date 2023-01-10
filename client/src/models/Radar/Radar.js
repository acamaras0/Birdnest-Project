import { useEffect, useState } from "react";
import "./Radar.css";

const Radar = ({ socket }) => {
	const [positions, setPositions] = useState([]);

	useEffect(() => {
		if (socket) {
			socket.on("radarPositions", (data) => {
				setPositions(data);
			});
		}
	}, [socket]);

	return (
		<div className="radar">
			<div className="sweep"></div>
			{positions &&
				positions.map((pilot) => {
					return (
						<div
							className="dots"
							key={pilot.serialNumber}
							style={{
								left: Math.floor(pilot.positionX / 10000),
								top: Math.floor(200 - pilot.positionY / 1000),
							}}
						>
							<div className="dot">
								<p className="serial">{pilot.serialNumber}</p>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default Radar;
