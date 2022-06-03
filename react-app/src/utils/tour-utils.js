

export const calculateAverageRating = (reviews, tour_id) => {
  let averageRating = 0;
  let totalRating = 0;
  let count = 0;

  reviews.forEach((review) => {
    if (review.tour_id === tour_id) {
      totalRating += review.rating;
      count++;
    }
  });
  if (count !== 0) {
    averageRating = totalRating / count;
  }
  return averageRating;
};

export const getSingleTourById = (tour_id, tours) => {
  let selected = null;
  tours.forEach((tour)=> {
    if(tour._id === tour_id){
      selected = tour;
    }
  })
  return selected;
};