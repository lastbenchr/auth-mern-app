import React, { useEffect, useState } from "react";
// import { CoursesWrapper, CourseCard, FormWrapper } from "./StyledCourses";
import styled from "styled-components";
import Modal from "./Modal";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    technologies: "",
    price: "",
    thumbnail: "",
    description: "",
  });
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const url = "https://auth-mern-app-schk.vercel.app/courses";
      const options = {
        method: "GET", // Optional, since GET is the default.
        headers: {
          Authorization: token,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingCourseId ? "PUT" : "POST";
    const url = editingCourseId
      ? `https://auth-mern-app-schk.vercel.app/courses/${editingCourseId}`
      : "https://auth-mern-app-schk.vercel.app/courses";

    const options = {
      method: method, // Optional, since GET is the default.
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...formData,
        technologies: formData.technologies.split(","),
      }),
    };

    try {
      await fetch(url, options);

      fetchCourses();
      resetForm();
    } catch (err) {
      console.error("Error saving course", err);
    }
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      technologies: course.technologies.join(", "),
      price: course.price,
      thumbnail: course.thumbnail,
      description: course.description,
    });
    setEditingCourseId(course._id);
    handleOpenModal();
  };

  const handleDelete = async (id) => {
    try {
      const options = {
        method: "DELETE", // Optional, since GET is the default.
        headers: {
          Authorization: token,
        },
      };
      await fetch(
        `https://auth-mern-app-schk.vercel.app/courses/${id}`,
        options
      );
      fetchCourses();
    } catch (err) {
      console.error("Failed to delete course", err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      technologies: "",
      price: "",
      thumbnail: "",
      description: "",
    });
    setEditingCourseId(null);
    handleCloseModal();
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        style={{ marginBottom: "20px", backgroundColor: "black" }}
      >
        Add Course
      </button>
      <Container>
        <Modal show={showModal} onClose={handleCloseModal}>
          <FormWrapper>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="technologies"
                placeholder="Technologies (comma-separated)"
                value={formData.technologies}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="thumbnail"
                placeholder="Thumbnail URL"
                value={formData.thumbnail}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
              <button type="submit">
                {editingCourseId ? "Update" : "Create"}
              </button>
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            </form>
          </FormWrapper>
        </Modal>

        <CoursesWrapper>
          {courses &&
            courses.map((course) => (
              <CourseCard key={course._id}>
                <img src={course.thumbnail} alt={course.title} />
                <h3>{course.title}</h3>
                <TechStack>
                  {course.technologies.map((tech, index) => (
                    <Tech key={index}>{tech}</Tech>
                  ))}
                </TechStack>
                <Price>₹{course.price}</Price>
                <Description>{course.description}</Description>
                <div className="btn-wrapper">
                  <button onClick={() => handleEdit(course)}>Edit</button>
                  <button onClick={() => handleDelete(course._id)}>
                    Delete
                  </button>
                </div>
              </CourseCard>
            ))}
        </CoursesWrapper>
      </Container>
    </>
  );
}

export default Courses;

// Wrapper for Courses

const TechStack = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin: 10px;
`;

const Tech = styled.span`
  background-color: green;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
`;
const Price = styled.h4`
  margin: 0px 10px;
  font-size: 24px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0px 10px;
`;
const Container = styled.div`
  border: 1px solid black;
  padding: 20px;
  border-radius: 20px;
`;
const CoursesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
  gap: 20px;
  //   padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    // padding: 10px;
  }
`;

// Individual Card
const CourseCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  h3 {
    margin: 10px;
    font-size: 1.5rem;
  }

  .btn-wrapper {
    display: flex;
  }

  button {
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    flex: 1;

    &:hover {
      background-color: #0056b3;
    }

    &:last-child {
      background-color: #dc3545;

      &:hover {
        background-color: #c82333;
      }
    }
  }
`;

// Form Wrapper
const FormWrapper = styled.div`
  margin: 20px auto;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input,
    textarea {
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;

      &:focus {
        outline: none;
        border-color: #007bff;
      }
    }

    button {
      padding: 10px;
      font-size: 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #28a745;
      color: white;

      &:hover {
        background-color: #218838;
      }

      &:last-child {
        background-color: #6c757d;

        &:hover {
          background-color: #5a6268;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;
