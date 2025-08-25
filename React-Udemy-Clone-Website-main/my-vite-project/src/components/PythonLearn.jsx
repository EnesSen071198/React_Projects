import "../styles/LetsLearn.css";
import PropTypes from "prop-types";
import courses from "../data/PythonLearnData";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { IoStarSharp, IoStarOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Helper function to split courses into groups of 4
const groupCourses = (courses) => {
  const groups = [];
  for (let i = 0; i < courses.length; i += 4) {
    const group = courses.slice(i, i + 4);
    while (group.length < 4) {
      group.push(null);
    }
    groups.push(group);
  }
  return groups;
};

// Yıldız rating komponenti
const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.round(parseFloat(rating));

  return (
    <div className='star-rating'>
      {[...Array(totalStars)].map((_, index) => (
        <span key={index} className='star-icon'>
          {index < fullStars ? (
            <IoStarSharp className='filled-star' />
          ) : (
            <IoStarOutline className='empty-star' />
          )}
        </span>
      ))}
      <span className='rating-number'>({rating})</span>
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

function PythonLearn() {
  const groupedCourses = groupCourses(courses);

  return (
    <div className='course-container'>
      <Carousel
        className='carousel-container'
        nextIcon={
          <FaChevronRight className='carousel-button-icon carouselNextIcon' />
        }
        prevIcon={
          <FaChevronLeft className='carousel-button-icon carouselPrevIcon' />
        }
        interval={null}>
        {groupedCourses.map((group, index) => (
          <Carousel.Item key={index}>
            <div className='carousel-group'>
              <h1 className='course-group-title'>
                Python kategorisinde öne çıkan kurslar
              </h1>
              <div className='course-grid'>
                {group.map((course, courseIndex) =>
                  course ? (
                    <Link
                      to={`/course/${course.id}`}
                      key={course.id}
                      target='_blank' // Yeni sekmede açılması için
                      style={{ textDecoration: "none" }}>
                      <Card className='course-card'>
                        <Card.Img variant='top' src={course.courseImage} />
                        <Card.Body>
                          <Card.Title>{course.courseTitle}</Card.Title>
                          <Card.Text>{course.courseTeacher}</Card.Text>
                        </Card.Body>
                        <ListGroup className='list-group-flush'>
                          <ListGroup.Item className='list-group-flush-item'>
                            <StarRating rating={course.coursePoint} />
                          </ListGroup.Item>
                          <ListGroup.Item className='list-group-flush-item'>
                            <strong>Price:</strong> {course.coursePrice}
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </Link>
                  ) : (
                    <div
                      key={`empty-${index}-${courseIndex}`}
                      className='course-card empty-card'
                    />
                  )
                )}
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default PythonLearn;
