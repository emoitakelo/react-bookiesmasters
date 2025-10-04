const VenueInfo = ({ venue, referee }) => {
  return (
    <div className="mb-4 text-gray-400 text-center">
      <div>Venue: {venue?.name ?? "Unknown"}</div>
      <div>Referee: {referee ?? "Unknown"}</div>
    </div>
  );
};
export default VenueInfo;
