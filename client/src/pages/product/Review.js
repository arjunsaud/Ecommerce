import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Review = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [star, setStar] = useState(0);
  const review = useRef();
  const [err, setErr] = useState(false);

  const { userid } = useSelector((state) => {
    return state.auth;
  });

  const handleChange = (e) => {
    setStar(e);
  };

  const [recall,setRecall]=useState(true)

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, [state,recall]);

  const fetchReviews = async () => {
    if (userid) {
      const { data } = await axios.get(
        `review/checkreview/${userid}/${state.value._id}`
      );
      setReviews(data);
    }
  };

  const handleClick = async () => {
    if (review.current.value === "") {
      setErr(!err);
    } else {
      setErr(!err);
      const values = {
        userid,
        productid: state.value._id,
        comment: review.current.value,
        rating: star,
      };
      const { data } = await axios.post(`review/createreview`, values);
      setRecall(!recall)
      toast.success("Review Posted");
    }
    review.current.value = "";
  };

  const handleGo = (id) => {
    navigate("/product", { state: { id } });
  };

  return (
    <Card className="mt-2">
      <Card.Header>
        <div className="d-flex row">
          <h5>Review Product</h5>
          <div
            className="d-flex"
            role="button"
            onClick={() => handleGo(state.value._id)}
          >
            <img
              className="bg-dark"
              style={{ padding: "1px" }}
              src={`http://localhost:8000/public/products/${state.value.image}`}
              height="100px"
              width="100px"
              alt="img"
            />
            <div className="d-flex row m-2">
              <label role="button">{state.value.name}</label>
              <label role="button">${state.value.price}</label>
              <label role="button">{state.value.brand}</label>
            </div>
          </div>
        </div>
      </Card.Header>
      {reviews.length > 0 ? (
        <Card.Body>
          <Form.Group>
            <Form.Label>Change Rating</Form.Label>
            <br />
            <StarRatings
              starDimension="18px"
              rating={reviews[0].rating}
              starSpacing="0px"
              changeRating={handleChange}
              starRatedColor="blue"
              numberOfStars={5}
            />
            <Form.Control
              type="text"
              required
              disabled
              placeholder={reviews[0].comment}
            />
            <Form.Label className="text-danger">
              {err ? "Review is Required" : ""}
            </Form.Label>
          </Form.Group>
          <h4>Already Reviewed</h4>
        </Card.Body>
      ) : (
        <Card.Body>
          <Form.Group>
            <Form.Label>Change Rating</Form.Label>
            <br />
            <StarRatings
              starDimension="18px"
              rating={star}
              starSpacing="0px"
              changeRating={handleChange}
              starRatedColor="blue"
              numberOfStars={5}
            />
            <Form.Control
              type="text"
              name="comment"
              ref={review}
              required
              placeholder="Write A Review"
            />
            <Form.Label className="text-danger">
              {err ? "Review is Required" : ""}
            </Form.Label>
          </Form.Group>
          <Button onClick={handleClick}>Post Review</Button>
        </Card.Body>
      )}
    </Card>
  );
};

export default Review;
