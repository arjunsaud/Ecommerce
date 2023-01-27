import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "../../config/axios"

const Faq = () => {
  const [faq, setFaq] = useState([]);

  useEffect(()=>{
    fetchFaq()
  },[])

  const fetchFaq=async()=>{
    const {data}=await axios.get("faq/getfaq")
    setFaq(data)
  }
  return (
    <Container>
      {faq.length>0? faq.map((value) => {
        return (
          <details key={value._id} className="my-3">
            <summary> {value.question}</summary>
            <p> {value.answer}</p>
          </details>
        );
      }):""
    }
    </Container>
  );
};

export default Faq;
