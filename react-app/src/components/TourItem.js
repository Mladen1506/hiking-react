import { useSelector } from "react-redux";

const calculateAverageRating = (reviews, tour_id) => {
  let averageRating = 0;
  let totalRating = 0;
  let count = 0;

  reviews.forEach((review) => {
    if(review.tour_id === tour_id){
      totalRating += review.rating;
      count++;
    }
  });
  if(count !== 0){
    averageRating = totalRating / count;
  }
  return averageRating;
};

const TourItem = (props) => {
  const tour = props.tour;


  const review = useSelector(state => state.reviews);
  const tour_id = tour._id;



  let averageRating = calculateAverageRating(review, tour_id);


  return (
    <div>
      <h3>{tour.name}</h3>
      <div>{tour.description}</div>
      <div>{tour.date}</div>
      <div>{tour.difficulty}</div>
      <div>{tour.trail_length}</div>
      <div>{tour.max_participantsp}</div>
      <div>Average Rating: {averageRating}</div>
    </div>
  )
};

export default TourItem;