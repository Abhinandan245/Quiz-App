import styled from "styled-components";

export const Button = styled.button`
border: none;
outline: none;
margin-right: 40px;
padding: 10px 14px;
color:white;
background-color: ${(props) =>props.bg || "dodgerblue"};
border-radius:1px;
font-size:15px;
&:hover{
    opacity:0.92;
    transform:scale(0.99);
}
`


