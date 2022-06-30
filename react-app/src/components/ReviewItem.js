import { Rating } from "@mui/material";
const ReviewItem = (props) => {
  const review = props.review;

  // const [userName, setUserName] = useState('');

  // useEffect(() => {
  //   ajax.userProfileGet(review.user_id)
  //     .then((response) => {
  //       console.log('response', response);
  //       if (response.data.data.userProfileGet.username) {
  //         setUserName(response.data.data.userProfileGet.username);
  //       }
  //     })
  // }, []);
  
  return (
    <div key={review._id}>
      <Rating
        name="average_rating"
        value={review.rating}
        readOnly
      />
      <div>Review By: {review.user_id}</div>
      <div>{review.rating}</div>
      <div>{review.text}</div>
    </div>
  );
};

export default ReviewItem;