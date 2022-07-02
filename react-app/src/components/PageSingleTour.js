import { Button, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionReviewsNeeded } from "../redux/actions";
import { ajax } from "../utils/ajax-adapter";
import { calculateAverageRating, getSingleTourById } from "../utils/tour-utils";
import FormReview from "./FormReview";
import ReviewItem from "./ReviewItem";

const checkIfJoined = (isLoggedIn, myUserId, participants) => {

  let joined = false;

  if (isLoggedIn) {
    participants.forEach((item) => {
      if (item.user_id === myUserId) {
        joined = true;
      }
    })
  } else {

  }
  return joined;
};

const checkIfLiked = (isLoggedIn, myUserId, likeList) => {

  let if_liked = false;

  if (isLoggedIn) {
    likeList.forEach((item) => {
      if (item.user_id === myUserId) {
        if_liked = true;
      }
    })
  } else {

  }
  return if_liked;
};

const PageSingleTour = (props) => {

  const dispatch = useDispatch();
  const tours = useSelector((state) => state.tours);
  const routeParams = useSelector((state) => state.routeParams);
  const tour_id = routeParams.tour_id;
  const reviews = useSelector(state => state.reviews);
  const routeFreshness = useSelector(state => state.routeFreshness);

  const [participants, setParticipants] = useState([]);
  const numberOfParticipants = participants.length;
  const [likeList, setLikeList] = useState([]);
  const numberOfLikes = likeList.length;
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const myUserId = useSelector(state => state.myUserId);
  const joined = checkIfJoined(isLoggedIn, myUserId, participants);
  const if_liked = checkIfLiked(isLoggedIn, myUserId, likeList);


  useEffect(() => {
    dispatch(actionReviewsNeeded());
    // refresh participants
    ajax.tourParticipantsGet(tour_id)
      .then((response) => {
        console.log('response za participante se vratio');
        console.log(response);
        if (response && response.data && response.data.data && Array.isArray(response.data.data.tourParticipantsGet)) {
          setParticipants(response.data.data.tourParticipantsGet);
        }
      })

      // refresh likes
      ajax.tourLikeListGet(tour_id)
      .then((response) => {
        if (response && response.data && response.data.data && Array.isArray(response.data.data.tourLikeListGet)) {
          setLikeList(response.data.data.tourLikeListGet);
        }
      })

  }, [routeFreshness]);


  const [tour, setTour] = useState({});


  useEffect(() => {
    const tour = getSingleTourById(tour_id, tours.data);
    setTour(tour);

  }, [tour_id, tours]);

  const handleClickJoin = (e) => {
    console.log('click join');
    ajax.tourJoin(tour_id)
      .then((response) => {
        // ovde pozivamo refresh na osnovu kojeg cemo dobiti svjezije participante
        dispatch({
          type: 'REFRESH'
        })
      })
  };

  const handleClickLeave = (e) => {
    console.log('click leave...');
    ajax.tourLeave(tour_id)
      .then((response) => {
        // ovde pozivamo refrresh na osnovu kojeg cem oda dobijemo svezije participante
        dispatch({
          type: 'REFRESH'
        });
      })

  };

  const handleClickLike = (e) => {
    console.log('click like');
    ajax.tourLike(tour_id)
      .then((response) => {
        // ovde pozivamo refresh na osnovu kojeg cemo dobiti svjezije participante
        dispatch({
          type: 'REFRESH'
        })
      })
  };

  const handleClickUnlike = (e) => {
    console.log('click unlike...');
    ajax.tourUnlike(tour_id)
      .then((response) => {
        // ovde pozivamo refrresh na osnovu kojeg cem oda dobijemo svezije participante
        dispatch({
          type: 'REFRESH'
        });
      })

  };

  let averageRating = calculateAverageRating(reviews.data, tour_id);

  const filteredReviews = reviews.data.filter((review) => {
    if (review.tour_id === tour_id) {
      return true;
    }
    return false;
  });

  let jsxReviews = filteredReviews.map((review) => {
    return (
      <ReviewItem review={review} />
    );
  });

  let jsxBtnJoinLeave = null;
  if (joined) {
    jsxBtnJoinLeave = (
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        // onClick={handleClickEditTour}
        onClick={handleClickLeave}
      >Leave</Button>
    );

  } else {
    jsxBtnJoinLeave = (
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        // onClick={handleClickEditTour}
        onClick={handleClickJoin}
      >Join</Button>
    );
  }

  let jsxBtnLikeUnlike = null;

  if (if_liked) {
    jsxBtnLikeUnlike = (
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleClickUnlike}
      >Dislike</Button>
      );
      
    } else {
    jsxBtnLikeUnlike = (
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleClickLike}
      >Like</Button>
    );
  }

  return (
    <div>
      <h3>Tour Name: {tour.name}</h3>
      <div>About Tour:{tour.description}</div>
      <div>Tour Date:{tour.date}</div>
      <div>Difficulty: {tour.difficulty}</div>
      <div>Trail Length:{tour.trail_length}</div>
      <div>Maximum Participants:{tour.max_participants}</div>
      <div>Participants: {numberOfParticipants}</div>
      <div>Likes: {numberOfLikes}</div>
      <div>Average Rating: {averageRating}</div>
      <Typography component="legend">Average Rating</Typography>
      <Rating
        name="average_rating"
        value={averageRating}
        readOnly
      />
      <br />
      {jsxBtnJoinLeave}
      {jsxBtnLikeUnlike}

      <h3>Reviews:</h3>
      {jsxReviews}
      <FormReview tour_id={tour_id} />
    </div>
  );
};

export default PageSingleTour;