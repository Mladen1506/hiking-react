import { useSelector } from "react-redux";
import { Typography } from '@mui/material';
import { Rating } from '@mui/material';
import { calculateAverageRating } from "../utils/tour-utils";

const TourItem = (props) => {
  const tour = props.tour;


  const review = useSelector(state => state.reviews);
  const tour_id = tour._id;



  let averageRating = calculateAverageRating(review, tour_id);


  return (
    <div>
      <h3>Tour Name: {tour.name}</h3>
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