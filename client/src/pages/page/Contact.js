import React from "react";
import styled from "styled-components"

const Contact = () => {
  return (
    <Wrapper>
      <div class="wrapper">
        <div class="overlay">
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-9">
              <div class="contact-us text-center">
                <h3>Contact Us</h3>
                <p class="mb-5">
                Are easy to find, so a visitor can quickly get in touch with you.
                </p>
                <div class="row d-flex justify-content-center">
                  <div class="col-md-6">
                    <div class="text-center px-1">
                      <div class="forms p-4 py-5 bg-white">
                        <h5>Send Message</h5>
                        <div class="mt-4 inputs">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Name"
                          />
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Email"
                          />
                          <textarea
                            class="form-control"
                            placeholder="Type your message"
                          ></textarea>
                        </div>
                        <div class="button mt-4 text-left">
                          <button class="btn btn-dark">Send</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper=styled.section`
.wrapper {
  height: 100vh;
  background: #000;
  width: 100%
}

.overlay {
  width: 100%;
  background: red;
  background: linear-gradient(90deg, rgba(30,24,130,1) 0%, rgba(196,29,145,1) 35%, rgba(31,165,193,1) 100%);
}

.contact-us {
  margin-top: 50px;
  margin-bottom: 50px
}

.contact-us h3,
p {
  color: #fff
}

.address {
  margin-top: 14px !important;
  margin-left: 10px
}

.address span {
  color: #7B1FA2
}

.icons {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center
}

.icons i {
  font-size: 20px
}

.forms {
  padding: 20px
}

.inputs input {
  margin-bottom: 13px;
  border: none;
  border-bottom: 2px solid #eee
}

.inputs input:focus {
  margin-bottom: 13px;
  border: none;
  border-bottom: 2px solid #7B1FA2;
  box-shadow: none
}

.inputs textarea {
  margin-bottom: 13px;
  border: none;
  border-bottom: 2px solid #eee;
  width: 100%;
  resize: none
}

.inputs textarea:focus {
  margin-bottom: 13px;
  border: none;
  border-bottom: 2px solid #7B1FA2;
  box-shadow: none;
  resize: none
}

.form-control {
  padding: .375rem .25rem
}
`

export default Contact;
