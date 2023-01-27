import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../../assets/deals.css";
import axios from "../../config/axios";
import { HiUsers } from "react-icons/hi";
import { MdLocalOffer, MdCategory, MdBorderColor } from "react-icons/md";
import { TbBrandAirtable } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaBoxes } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});

  const data = {
    labels: ["Users", "Products", "Brands", "Category", "Offers"],
    datasets: [
      {
        data: [counts.user,counts.product,counts.brand, counts.category, counts.offer],
        backgroundColor:'transparent',
        borderColor:'#f26c6d',
        pointBorderWidth:4
      }
    ],
  };

  const options={
    plugins:{
      legend:false
    },
    scales:{
      x:{
        grid:{
          display:false
        }
      },
      y:{
        min:0,
        ticks:{
          stepSize:2
        }
      }
    }
  }


  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    const { data } = await axios.get("auth/count");
    setCounts(data);
  };
  const handleGo = (id) => {
    switch (id) {
      case 1:
        navigate("/admin/products");
        break;
      case 2:
        navigate("/admin/users");
        break;
      case 3:
        navigate("/admin/specs");
        break;
      case 3:
        navigate("/admin/specs");
        break;
      default:
        navigate("/admin/offer");
        break;
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <Card
            className="text-center catecards"
            style={{ width: "13rem" }}
            role="button"
            onClick={() => handleGo(1)}
          >
            <Card.Body>
              <FaBoxes size={35} />
              <Card.Title>Products</Card.Title>
              <div>
                <span>{counts.product}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            className="text-center catecards"
            style={{ width: "13rem" }}
            role="button"
            onClick={() => handleGo(2)}
          >
            <Card.Body>
              <HiUsers size={35} />

              <Card.Title>Users</Card.Title>
              <div>
                <span>{counts.user}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            className="text-center catecards"
            style={{ width: "13rem" }}
            role="button"
            onClick={() => handleGo(3)}
          >
            <Card.Body>
              <TbBrandAirtable size={35} />

              <Card.Title>Brands</Card.Title>
              <div>
                <span>{counts.brand}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            className="text-center catecards"
            style={{ width: "13rem" }}
            role="button"
            onClick={() => handleGo(4)}
          >
            <Card.Body>
              <MdCategory size={35} />

              <Card.Title>Category</Card.Title>
              <div>
                <span>{counts.category}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            className="text-center catecards"
            style={{ width: "13rem" }}
            role="button"
            onClick={() => handleGo(5)}
          >
            <Card.Body>
              <MdLocalOffer size={35} />
              <Card.Title>Offers</Card.Title>
              <div>
                <span>{counts.offer}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="bg-info">
        <h3 className="text-black">Statistics</h3>
        <Col>
          <Card className="text-center mt-2">
            <Card.Body>
              <h3>Overall Statistics</h3>
            </Card.Body>

            <Line data={data} options={options}></Line>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
