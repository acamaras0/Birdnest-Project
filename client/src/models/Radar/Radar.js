import "./Radar.css";

const Radar = ({ pilots }) => {
	return (
		<div className="radar">
			<div className="sweep"></div>
			{pilots &&
				pilots.map((pilot) => {
					return (
						<div className="dots" key={pilot.serialNumber}>
							<div className="dot"></div>
						</div>
					);
				})}
		</div>
	);
};

export default Radar;
