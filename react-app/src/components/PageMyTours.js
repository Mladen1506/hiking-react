
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TourItem from "./TourItem";

const PageMyTours = (props) => {

  const dispatch = useDispatch();

  const tours = useSelector(state => state.tours);

  const myTours = tours;

  let jsx = myTours.map((tour, index) => {
    return (
      <>
        <tr key={tour._id}>
          <td><TourItem tour={tour} /></td>
          <td>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >Edit</Button>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >Delete</Button>
          </td>
        </tr>

      </>
    );
  });

  const handleClickAddTour = (e) => {
    dispatch({
      type: 'ROUTE_SET',
      payload: 'ADD_TOUR'
    })
  };

  return (
    <>
      <h1>My Tours</h1>
      <table className="my-tours">
        <tbody>
          {jsx}
        </tbody>
      </table>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleClickAddTour}
      >Add New Tour</Button>
    </>
  );
};

export default PageMyTours;