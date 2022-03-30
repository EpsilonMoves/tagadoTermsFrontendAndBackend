import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearReducerTerms, setReducerTerms } from "../../store/terms-slice";
import BarChart from "./bar-chart";
import "./main-page.css";
import axios from "axios";

export default function DisplayTermsView() {
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [termsObj, setTermsObj] = useState({});
  const url='http://localhost:3000/terms/'

  const dispatch = useDispatch();

  // idealy I would get from the db the types avaliable
  const typesArr = [1, 2, 3, 4, 5, 6];

  useEffect(() => {

    const getTermsObject = async () =>{

      setLoading(true);
      // clear the reducer
      dispatch(clearReducerTerms());
      
      // get TERMS of this type from the db
      const response=await axios.get(`${url}${type}`)
      console.log('response: ', response);
      setTermsObj(response.data);
      console.log('response.data: ', response.data);
      
      
      setLoading(false);
    }
    
    getTermsObject()

  }, [type]);

  const handleDisplayData = () => {
    // update the reducer
    dispatch(setReducerTerms(termsObj));
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
      <div className="display-term-top-row">
        <FormControl className="display-term-top-button">
          <InputLabel id="demo-simple-select-label">Term</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Term"
            onChange={handleChange}
          >
            {typesArr.map((e) => {
              return <MenuItem value={e}>{e}</MenuItem>;
            })}
          </Select>
        </FormControl>
        {loading ? (
          <Button
            variant="outlined"
            disabled
            className="display-term-top-button"
          >
            Display Data
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={handleDisplayData}
            className="display-term-top-button"
          >
            Display Data
          </Button>
        )}
      </div>
      <BarChart />
    </div>
  );
}
