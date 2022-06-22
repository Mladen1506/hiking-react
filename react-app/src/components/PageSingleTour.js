import { Rating, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { calculateAverageRating, getSingleTourById } from "../utils/tour-utils";

const PageSingleTour = (props) => {

  const tours = useSelector((state) => state.tours);
  const routeParams = useSelector((state) => state.routeParams);
  const tour_id = routeParams.tour_id;
  const reviews = useSelector(state => state.reviews);
  

  const [tour, setTour] = useState({});


  useEffect(() => {
    const tour = getSingleTourById(tour_id, tours);
    setTour(tour);

  }, [tour_id, tours]);

  let averageRating = calculateAverageRating(reviews.data, tour_id);

  const filteredReviews = reviews.data.filter((review) => {
    if (review.tour_id === tour_id){
      return true;
    } 
    return false;
  });

  let jsxReviews = filteredReviews.map((review) => {
    return(
      <div key={review._id}>
        <Rating
          name="average_rating"
          value={review.rating}
          readOnly
        />
        <div>{review.rating}</div>
        <div>{review.text}</div>
      </div>
    )
  });

  return (
    <div>
      <h3>Tour Name: {tour.name}</h3>
      <div>About Tour:{tour.description}</div>
      <div>Tour Date:{tour.date}</div>
      <div>Difficulty: {tour.difficulty}</div>
      <div>Trail Length:{tour.trail_length}</div>
      <div>Maximum Participants:{tour.max_participants}</div>
      {/* <div>Average Rating: {averageRating}</div> */}
      <Typography component="legend">Average Rating</Typography>
      <Rating
        name="average_rating"
        value={averageRating}
        readOnly
      />
      <h3>Reviews:</h3>
      {jsxReviews}
    </div>
  );
};

export default PageSingleTour;
