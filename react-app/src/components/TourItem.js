import { useSelector } from "react-redux";
import { Typography } from '@mui/material';
import { Rating } from '@mui/material';
import { calculateAverageRating } from "../utils/tour-utils";
import { useDispatch } from "react-redux";
import { actionRouteWithParamsSet } from "../redux/actions";
const TourItem = (props) => {

  const dispatch = useDispatch();

  const tour = props.tour;


  const reviews = useSelector(state => state.reviews);
  const tour_id = tour._id;
  
  // const [userName, setUserName] = useState('');

  // useEffect(() => {
  //   ajax.userProfileGet(tour.user_id)
  //   .then((response) => {
  //     console.log('response', response);
  //     if(response.data.data.userProfileGet.username) {
  //       setUserName(response.data.data.userProfileGet.username);
  //     }
  //   })
  // }, [])

  let averageRating = calculateAverageRating(reviews.data, tour_id);

  const handleClickSingleTour = (e) => {
    dispatch(actionRouteWithParamsSet('TOUR', {
      tour_id: tour_id
    }))
  };

  return (
    <div>
      <h3 onClick={handleClickSingleTour}>{tour.name}</h3>
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