import styled from "styled-components";

export const Input = styled.input`
background: ${(props) => (props.primary ? "palevioletred" : "white")};
font-weight:bold;
font-size: 1em;
margin: 5px 5px 5px 5px;
padding: 0.5em 1em;
border: 2px solid palevioletred;
border-radius: 3px;
`;

export const Div = styled.div`
display: flex;
background: ${(props) => (props.primary ? "palevioletred" : "white")};
margin-top:10px;
justify-content: center;
flex-direction:column;
align-items:center
`;

export const Form =styled.form`
display:flex;
justify-content:center;
flex-direction:column;
`


