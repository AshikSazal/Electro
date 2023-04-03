import React from 'react'
import { useParams } from "react-router-dom";

const Television = () => {
    const {tv} = useParams();
    console.log(tv);
  return (
    <div>Television{tv}</div>
  )
}

export default Television