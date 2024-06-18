import { Button, Typography } from "@mui/material";
import { useEffect } from "react";

function Field(props) {
  return (
    <Button
      style={{ border: "1px solid black" }}
      className="column"
      id={props.rowIndex.toString() + props.columnIndex.toString()}
      onClick={(event) => {
        event.preventDefault();
        props.changeHandler(props.rowIndex, props.columnIndex);
      }}
    >
      <Typography variant="h2" color={props.value != "" && props.value =="x" ? "blue" : "green" }>{props.value}</Typography>
    </Button>
  );
}

export default Field;
