import Text2Title from "../Title/Text2Title";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Utils/AxiosConfi";
import ApiNames from "../../Constants/ApiUrls";

const ShpMoreCard = () => {
  let navigation = useNavigate();
  const [getItems, setItems] = useState([]);
  const [titleTwo, setTitleTwo] = useState('');
  const [titleThree, setTitleThree] = useState('');
  useEffect(() => {
    const getMoreReason = async () => {
      try {
        let url = ApiNames.getSelectedCollection;
        const response = await Axios.get(`${url}`);
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    return () => getMoreReason();
  }, []);

  // function gotoSection(data){
  //   navigation(`/Filter/4/${data?.firstCollectionDetail?._id}`)
  // }

  useEffect(() => {
    const getMoreReason = async () => {
      try {
        let api = ApiNames.getTitles;
        const response = await Axios.get(`${api}`);
        response.data.forEach((element) => {
          if (element.index === "2") {
            setTitleTwo(element.title);
          }
          if (element.index === "3") {
            setTitleThree(element.title);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    return () => getMoreReason();
  }, []);
  return (
    <div className="ShopMore-cards">
      <Text2Title text={titleTwo} />
      <div className="row g-3">
        {getItems.map((item, index) => (
                    
          // <div onClick={()=>gotoSection(item)} key={index} className="col-6">
          <div key={index} className="col-6">
            <div className="shopMore-top">
              <div className="Shop_div">
                <h3 className="Shop_txt">
                  {item?.firstCollectionDetail?.name}
                </h3>
              </div>
              <img
                src={item?.firstCollectionDetail?.image}
                alt="..."
                className="CardBanner-insideImge"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShpMoreCard;
