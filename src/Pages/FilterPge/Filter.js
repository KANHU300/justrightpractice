// import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Axios from "../../Utils/AxiosConfi";
import ApiNames from "../../Constants/ApiUrls";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import ProductItems from "../../Component/ProductItems/ProductItems";

const Filter = () => {
  const [filterprduct,setFilterproduct] = useState([])
  const { id, type } = useParams();
  const [pricechange ,setPricechange] = useState ([10,90])
  // console.log(id,type)
  useEffect(()=>{
    const filterproducts = async()=>{

      let filterBody ={
        type: type,
        id:id,
        filters:[]
      }
      try {
        let url = ApiNames.filterProducts;
        const response = await Axios.post(url,filterBody);
        
      const  productlist = response.data.products;
      console.log(productlist)
      setFilterproduct(productlist);
      
       
        
      } catch (error) {
        
      }

    }
    filterproducts ()
  },[id, type])

  const handlePriceChange = (value) =>{
    setPricechange(value)
  }

  return (
    <div>
      <div className="container">
        <div className="filterSections-below">
          <div className="mid-products"></div>
        </div>
        <div className="row">
          {/* <button className="filter-btns">
        <i className="fas fa-filter"></i>Filters
      </button> */}
          <div className="col-md-3 filterSwich">
            <div className="filterSection">
              <div className="filterByPrice">Filter by Price</div>
              <Slider
                className="range-slidess"
                range
                min={10}
                max={90}
                // defaultValue={[10, 10]}
                onChange={handlePriceChange}
              />
              <div className="slidePrices">
                <label className="priceTxt">
                  From:<span className="priceAccess"> {pricechange[0]} </span>
                </label>
                <label className="priceTxt">
                  To: <span className="priceAccess">{pricechange[1]}</span>
                </label>
              </div>
              <div className="accordionSection">
                {/* <div className="accordion accordionBox" id="accordionPanelsStayOpenExample">
                         
                            <div className="accordion-item acd-items" >
                              <h2 className="accordion-header">
                                <button
                                  className={`accordion-button acd-buttons ${openIndexes.includes(index) ? '' : 'collapsed'}`}
                                  type="button"
                                  onClick={() => toggleAccordion(index)}
                                  aria-expanded={openIndexes.includes(index) ? 'true' : 'false'}
                                >
                                  {item?.key}
                                </button>
                              </h2>
                              <div className={`accordion-collapse collapse ${openIndexes.includes(index) ? 'show' : ''}`}>
                                <div className="accordion-body acd-content">
                                  {item?.values?.map((value, i) => (
                                    <div key={i} className="form-check">
                                      <input
                                        className="form-check-input form-check-Data"
                                        type="checkbox"
                                        value={value.value}
                                        id={value.value}
                                        checked={selectedFilters.some((filter) => filter.key === item.key && filter.value === value.value)}
                                        onChange={() => handleFilterSelect(value.value, item.key)}
                                      />
                                      <label className="form-check-label" htmlFor={value.value}>
                                        {value.value} ({value.count})
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                      
                        </div> */}

                <Accordion
                  defaultActiveKey="0"
                  className="accordionBox"
                  alwaysOpen
                >
                  <Accordion.Item className="acd-items" eventKey="0">
                    <Accordion.Header>color</Accordion.Header>
                    <Accordion.Body className=" acd-content">
                      {["red", "pink", "orange"].map((type, index) => (
                        <div key={`${type}`} className="mb-3">
                          <Form.Check // prettier-ignore
                            type={type}
                            id={`${type}`}
                            label={type}
                          />
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Brand</Accordion.Header>
                    <Accordion.Body>
                      {["samsung", "apple", "orange"].map((type, index) => (
                        <div key={`${type}`} className="mb-3">
                          <Form.Check // prettier-ignore
                            type={type}
                            id={`${type}`}
                            label={` ${type} `}
                          />
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <button className="clear-all-btn">Clear All</button>
            </div>
          </div>
          <div className="col-md-9">
            <div className="selectedProducts">
              <div className="selectedFilters">
                <div className="filterName">
                  Category: Category 1<span className="closeIcon">×</span>
                </div>
                <label className="clearAllBtn">
                  <span>
                    <img
                      src="/images/menubar/filter-x.svg"
                      className="closeIcon"
                    />
                  </span>
                  Clear Filters
                </label>
              </div>
              <div className="TotalProducts">
                <label className="foundedproducts">
                  We found <span className="counting">{filterprduct.length}</span> items for you!
                </label>
                <div className="right-relevance">
                  <Dropdown className="relvence-Ddown">
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="relvence-Inside"
                    >
                      <span className="upDwn-arrw">
                        {/* <img src="/images/range.svg" className="ranges" /> */}
                        <span className="relvance-filterTitle">
                          low to high
                        </span>
                      </span>
                      {/* <span className="upArrow-Icn">
                                    <i className="fas fa-angle-down arwUpIcon"></i>
                                  </span> */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="Relvence-Top">
                      <Dropdown.Item className="relvence-Dropitems" on>
                        Price: Low to High
                      </Dropdown.Item>
                      <Dropdown.Item className="relvence-Dropitems">
                        Price: High to Low
                      </Dropdown.Item>
                      {/* <Dropdown.Item onClick={() => fetFilterProducts('lowTohighRating')} className="relvence-Dropitems" >Rating: Low to High</Dropdown.Item>
                                <Dropdown.Item onClick={() => fetFilterProducts('highTolowRating')} className="relvence-Dropitems" >Rating: High to Low</Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="product-items">
              <ProductItems productObj={filterprduct}  />

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas offcanvas-bottom" id="offcanvasBottom">
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="filter-section">
            <div className="filter-by-price">Filter by Price</div>
            <div className="range-slider">
              <input
                type="range"
                min="1"
                max="100"
                value="50"
                className="slider"
              />
            </div>
            <div className="slide-prices">
              <label className="price-txt">
                From: <span className="price-access">10 AED</span>
              </label>
              <label className="price-txt">
                To: <span className="price-access">100 AED</span>
              </label>
            </div>
            <div className="accordion-section">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      Category
                    </button>
                  </h2>
                  <div className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="category1"
                          id="category1"
                        />
                        <label className="form-check-label" for="category1">
                          Category 1
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="category2"
                          id="category2"
                        />
                        <label className="form-check-label" for="category2">
                          Category 2
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="clear-all-btn">Clear All</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
