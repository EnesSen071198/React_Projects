import { useParams } from "react-router-dom";
import courses from "../data/LetsLearnData";
import { MdDone } from "react-icons/md";
import "../styles/CourseDetail.css";

function CourseDetail() {
  const { id } = useParams(); // URL parametresindeki kurs ID'sini al
  const course = courses.find((course) => course.id === parseInt(id)); // ID'ye göre kursu bul (id'yi sayıya dönüştür)

  if (!course) {
    return <div>Kurs bulunamadı.</div>;
  }

  return (
    <div className='course-detail-container'>
      <div className='course-detail'>
        <div className='course-info'>
          <h1>{course.courseTitle}</h1>
          <p>
            <strong>Oluşturan :</strong> {course.courseTeacher}
          </p>
          <p>
            <strong>Rating:</strong> {course.coursePoint}
          </p>
          <p>{course.courseDescription}</p>
          {course.courseLearn &&
            course.courseLearn.map((item, index) => (
              <p key={index}>
                <MdDone />
                {item}
              </p>
            ))}
        </div>
        <div className='sideCard'>
          <img src={course.courseImage} alt={course.courseTitle} />
          <p>
            <strong style={{ color: "black" }}>
              Udemynin en popüler kurslarına abone olun
            </strong>
          </p>
          <p style={{ color: "black" }}>
            Kişisel Plan ile bu kursa ve en yüksek puan alan 1.000+ kursumuza
            erişin.
          </p>
          <p className='price'>
            <strong>Price:</strong> {course.coursePrice}
          </p>
          <button className='addButton'>Sepete Ekle</button>
        </div>

        <div className='courseLearn'>
          <h2>Öğrenecekleriniz</h2>
          {course.courseLearn &&
            course.courseLearn.map((item, index) => (
              <p key={index}>
                <MdDone />
                {item}
              </p>
            ))}
        </div>

        <div className='courseInfo'>
          <h2>Kurs İçeriği</h2>
          {course.courseInfo &&
            course.courseInfo.map((item, index) => (
              <p key={index}>
                <MdDone />
                {item}
              </p>
            ))}

          <h2>Gereksinimler</h2>
          {course.necessary &&
            course.necessary.map((item, index) => (
              <p key={index}>
                <MdDone />
                {item}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
