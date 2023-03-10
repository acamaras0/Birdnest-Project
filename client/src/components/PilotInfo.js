import { format } from "timeago.js";

const PilotInfo = ({ pilot }) => {
  return (
    <div className="card-body">
      <div>
        <h5 className="card-title" style={{ color: "#004849" }}>
          {pilot.firstname} {pilot.lastname}
        </h5>
      </div>
      <div>
        <p className="card-text" style={{ color: "#007172" }}>
          {pilot.phone}
        </p>
        <p className="card-text" style={{ color: "#007172" }}>
          {pilot.email}
        </p>
      </div>
      <div>
        <p className="card-text" style={{ color: "#ae3e07", fontSize: "17px" }}>
          {Math.round(pilot.distance / 1000)}m away
        </p>
        <p className="card-text" style={{ color: "#7a8484", fontSize: "15px" }}>
          {format(pilot.time)}
        </p>
      </div>
    </div>
  );
};

export default PilotInfo;
