
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actionRouteSet, actionRouteWithParamsSet, actionTourDelete, actionToursNeeded } from "../redux/actions";
import Spinner from "./Spinner";
import TourItem from "./TourItem";

const PageMyTours = (props) => {

  const dispatch = useDispatch();
  const tours = useSelector(state => state.tours);
  const routeFreshness = useSelector(state => state.routeFreshness);
  const myUserId = useSelector(state => state.myUserId);

  useEffect(() => {
    dispatch(actionToursNeeded());
  }, [routeFreshness]);

  const handleClickAddTour = (e) => {
    dispatch(actionRouteSet('ADD_TOUR'));
  };

  const _handleClickEditTour = (tour_id) => {
      dispatch(actionRouteWithParamsSet('EDIT_TOUR', {
        tour_id: tour_id
      }))
  };

  const _handleClickDeleteTour = (tour_id) => {
      if(window.confirm('Are you sure you want to delete this tour?')) {
        console.log('deleting tour_id:', tour_id);
        dispatch(actionTourDelete(tour_id));
      }
  };

  // const myTours = tours.data;
  const myTours = tours.data.filter((tour) => {
    if(tour.user_id === myUserId){
      return true;
    }
    return false;
  });

  let jsxSpinner = null;
  if (tours.fetching) {
    jsxSpinner = (
      <Spinner />
    );
  }

  let jsx = myTours.map((tour, index) => {
    const tour_id = tour._id;
    return (
      <>
        <tr key={tour._id}>
          <td><TourItem tour={tour} /></td>
          <td>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={handleClickEditTour}
              onClick={(e) => {_handleClickEditTour(tour_id)}}
            >Edit</Button>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => { _handleClickDeleteTour(tour_id) }}
            >Delete</Button>
          </td>
        </tr>

      </>
    );
  });

  return (
    <>
      <h1>My Tours</h1>
      <table className="my-tours">
        <tbody>
          {jsxSpinner}
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