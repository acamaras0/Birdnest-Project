const DroneInfo = ({ pilot }) => {
  return (
    <div className="card-body">
      <h5 className="card-title" style={{ color: "#004849" }}>
        {pilot.serialnumber}
      </h5>
      <p className="card-text" style={{ color: "#007172" }}>
        Model: {pilot.model}{" "}
      </p>
      <p className="card-text" style={{ color: "#007172" }}>
        Ipv4: {pilot.ipv4}
      </p>
      <p className="card-text" style={{ color: "#007172" }}>
        Ipv6: {pilot.ipv6}
      </p>
      <p className="card-text" style={{ color: "#007172" }}>
        Mac: {pilot.mac}
      </p>
      <p className="card-text" style={{ color: "#007172" }}>
        Firmware: {pilot.firmware}
      </p>
      <p className="card-text" style={{ color: "#007172" }}>
        Manufacturer: {pilot.manufacturer}
      </p>
    </div>
  );
};

export default DroneInfo;
