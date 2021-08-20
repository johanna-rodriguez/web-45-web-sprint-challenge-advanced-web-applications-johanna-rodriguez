import axiosWithAuth from '../helpers/axiosWithAuth';

const fetchColorService = (setColors) => {
    
        axiosWithAuth()
          .get("/colors")
          .then((res) => {
          setColors(res.data)
          return res
          })
          .catch((err) => {
            console.log(err);
          return err

          });
      };


export default fetchColorService;