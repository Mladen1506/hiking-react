import { useSelector } from "react-redux";

const PageHome = (props) => {
  const tours = useSelector(state => state.tours);

  let jsx = tours.map((tour, index) => {
    return(
      <div key={tour._id}>
        <h3>{tour.name}</h3>
        <div>{tour.description}</div>
        <div>{tour.date}</div>
        <div>{tour.difficulty}</div>
        <div>{tour.trail_length}</div>
        <div>{tour.max_participantsp}</div>
      </div>
    );
  })

  return (
    <>
      <h1>Welcome</h1>
      {jsx}
    </>
  );
};

export default PageHome;