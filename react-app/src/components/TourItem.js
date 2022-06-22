import { useSelector } from "react-redux";
import { Typography } from '@mui/material';
import { Rating } from '@mui/material';
import { calculateAverageRating } from "../utils/tour-utils";
import { useDispatch } from "react-redux";

const TourItem = (props) => {

  const dispatch = useDispatch();

  const tour = props.tour;


  const reviews = useSelector(state => state.reviews);
  const tour_id = tour._id;



  let averageRating = calculateAverageRating(reviews.data, tour_id);

  const handleClickSingleTour = (e) => {
    dispatch({
      type: 'ROUTE_WITH_PARAMS_SET',
      payload: {
        route: 'TOUR',
        params: {
          tour_id: tour_id
        }
      }
    })
  };

  return (
    <div>
      <h3 onClick={handleClickSingleTour}>Tour Name: {tour.name}</h3>
      <div>About Tour:{tour.description}</div>
      <div>Tour Date:{tour.date}</div>
      <div>Difficulty: {tour.difficulty}</div>
      <div>Trail Length:{tour.trail_length}</div>
      <div>Maximum Participants:{tour.max_participants}</div>
      <div>Average Rating: {averageRating}</div>
      <Typography component="legend">Average Rating</Typography>
      <Rating
        name="average_rating"
        value={averageRating}
        readOnly
      />
    </div>
  )
};

export default TourItem;