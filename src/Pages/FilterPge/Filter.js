// import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Axios from "../../Utils/AxiosConfi";
import ApiNames from "../../Constants/ApiUrls";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Accordion from "react-bootstrap/Accordion";
// import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import ProductItems from "../../Component/ProductItems/ProductItems";
import { useCart } from "../../Context/cartcontext";

const Filter = () => {
  const [filterprduct, setFilterproduct] = useState([]);
  const { id, type } = useParams();
  const [pricechange, setPricechange] = useState([8, 116]);
  const { updateCart } = useCart();
  const [fetchfilter, setFetchfilter] = useState("Sort by Price");
  const [sortby, setSortby] = useState();
  const [filterList, setFilterList] = useState([]);
  const [filterRange, setFilterRange] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);
  // console.log(id,type)
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [id, type]);
  useEffect(() => {
    const filterproducts = async () => {
      let filterBody = {
        type: type,
        id: id,
        sort: sortby,
        filters: selectedFilter,
      };
      console.log(filterBody);
      try {
        let url = ApiNames.filterProducts;
        const response = await Axios.post(url, filterBody);

        const productlist = response.data.products;
        console.log(productlist);
        setFilterproduct(productlist);
      } catch (error) {
        console.log(error);
      }
    };
    filterproducts();
  }, [id, type, updateCart, sortby, selectedFilter]);
  useEffect(() => {
    const filterList = async () => {
      let filterListBody = {
        type: type,
        id: id,
        sort: pricechange,
        filters: [],
      };

      try {
        let url = ApiNames.filtersList;
        const response = await Axios.post(url, filterListBody);
        console.log(response.data);
        setFilterList(response.data.filtersList);
        setFilterRange(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    filterList();
  }, [type, id]);

  const handlePriceChange = (value) => {
    setPricechange(value);

    // Update the selectedFilter with the new price range
    setSelectedFilter((prevFilters) => {
      const updatedFilters = prevFilters.filter(
        (filter) => filter.key !== "startPrice" && filter.key !== "endPrice"
      );

      return [
        ...updatedFilters,
        { key: "startPrice", value: value[0] },
        { key: "endPrice", value: value[1] },
      ];
    });
  };
  const fetFilterProducts = (filterType, displayText) => {
    console.log(`Fetching products sorted by ${filterType}`);

    setFetchfilter(displayText);
  };
  const addfilters = (value, keyName) => {
    setSelectedFilter((prevFilter) => {
      const existingFilterIndex = prevFilter.findIndex(
        (filter) => filter.key === keyName && filter.value === value
      );

      if (existingFilterIndex >= 0) {
        // Remove the filter if it's already selected
        const newFilters = [...prevFilter];
        newFilters.splice(existingFilterIndex, 1);
        return newFilters;
      } else {
        // Add the new filter
        return [...prevFilter, { key: keyName, value: value }];
      }
    });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="filterSections-below">
          <div className="mid-products"></div>
        </div>
        <div className="row">
          <div className="col-md-3 filterSwich">
            <div className="filterSection">
              <div className="filterByPrice">Filter by Price</div>
              <Slider
                className="range-slidess"
                range
                min={filterRange.minSellingPrice}
                max={filterRange.maxSellingPrice}
                // defaultValue={[10, 10]}
                value={pricechange}
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
                <Accordion
                  defaultActiveKey="0"
                  className="accordionBox"
                  alwaysOpen
                >
                  {filterList.map((item, index) => (
                    <Accordion.Item
                      className="acd-items"
                      key={index}
                      eventKey={index}
                    >
                      <Accordion.Header className="acd-buttons">{item.key}</Accordion.Header>
                      <Accordion.Body className=" acd-content">
                        {item?.values?.map((value, i) => (
                          <div className="form-check" key={i}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={value.value}
                              id={value.value}
                              checked={selectedFilter.some(
                                (filter) =>
                                  filter.key === item.key &&
                                  filter.value === value.value
                              )}
                              onChange={() => addfilters(value.value, item.key)} // Add this line
                            />
                            <label
                              className="form-check-label"
                              htmlFor={value.value}
                            >
                              {value.value}({value.count})
                            </label>
                          </div>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
              <button
                onClick={() => setSelectedFilter([])}
                className="clear-all-btn"
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="col-md-9">
           
            <div className="selectedProducts">
            {
              selectedFilter.length > 0 && ( <div className="selectedFilters">
                {selectedFilter.map((value, i) => (
                  <div className="filterName" key={i}>
                    <label     onClick={() => addfilters(value.value, value.key)}> {value.key}: {value.value}
                    <span className="closeIcon">×</span></label>
                   
                  </div>
                ))}

                <label className="clearAllBtn">
                  <span>
                    <img
                      src="/images/menubar/filter-x.svg"
                      className="closeIcon"
                      alt=".."
                    />
                  </span>
                  Clear Filters
                </label>
              </div>)
            }
             
              <div className="TotalProducts">
                <label className="foundedproducts">
                  We found
                  <span className="counting">{filterprduct.length}</span> items
                  for you!
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
                          {fetchfilter}
                        </span>
                      </span>
                      {/* <span className="upArrow-Icn">
                                    <i className="fas fa-angle-down arwUpIcon"></i>
                                  </span> */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="Relvence-Top">
                      <Dropdown.Item
                        className="relvence-Dropitems"
                        onClick={() =>
                          fetFilterProducts(
                            "pricelowtOHigh",
                            "Price: Low to High",
                            setSortby(1)
                          )
                        }
                      >
                        Price: Low to High
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="relvence-Dropitems"
                        onClick={() =>
                          fetFilterProducts(
                            "priceHightOLow",
                            "Price: High to Low",
                            setSortby(-1)
                          )
                        }
                      >
                        Price: High to Low
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="product-items">
                <ProductItems productObj={filterprduct} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="offcanvas offcanvas-bottom" id="offcanvasBottom">
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
                        <label className="form-check-label" htmlFor="category1">
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
                        <label className="form-check-label" htmlFor="category2">
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
      </div> */}
    </div>
  );
};

export default Filter;
