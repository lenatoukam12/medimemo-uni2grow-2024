import { Button } from '@mui/material';
import add from "../../assets/images/contact/add_circle.svg";
import { useNavigate } from 'react-router-dom';

interface Ipath {
    path: string;
}
export default function FabAdd({path}: Ipath) : JSX.Element {
     const navigate = useNavigate();

     const handleClick = () =>{
        if (path){
            navigate(path);
        }else{
            return;
        }
     }
  return (
   <Button onClick={handleClick}>
      <img src={add} alt="add icon" />
    </Button>
  )
}
