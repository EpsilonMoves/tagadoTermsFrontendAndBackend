import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useReducer, useState } from "react";
import "./main-page.css";

export default function AddTermView() {
  const [type, setType] = useState("0");
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:3000/terms";

  const handleSubmitTerm = async () => {
    setLoading(true);
    const termObj = { type: type, terms: term.split(",") };
    console.log("termObj: ", termObj);

    await axios.post(url, termObj);
    setLoading(false);

  };

  useReducer(() => {}, [loading]);

  return (
    <div className="add-term-root">
      <TextField
        className="add-term-text-field"
        label="Type"
        variant="standard"
        type="number"
        defaultValue="0"
        onChange={(e) => setType(e.target.value)}
      />
      <TextField
        className="add-term-text-field"
        label="Terms (seperate with ,)"
        variant="standard"
        defaultValue=""
        onChange={(e) => setTerm(e.target.value)}
      />
      {loading ? (
        <Button variant="outlined" disabled className="">
          Submit Term
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleSubmitTerm} className="">
          Submit Term
        </Button>
      )}
    </div>
  );
}
