import { FaSwimmingPool, FaCouch } from "react-icons/fa";
import { GiShower } from "react-icons/gi"
import { MdBalcony } from "react-icons/md"
import { CgGym } from "react-icons/cg"

export const getIcon = (title) => {
    if(title.match(/pool|swim/ig)){
        return <FaSwimmingPool />
    }else if(title.match(/furnished/ig)){
      return <FaCouch className="gray-text" />
    }else if(title.match(/(air|condition)/ig)){
    }else if(title.match(/(balcony|terrace)/ig)){
        return <MdBalcony className="gray-text" />
    }else if(title.match(/(gym|health care)/ig)){
        return <CgGym className="gray-text" />
    }

    
  }