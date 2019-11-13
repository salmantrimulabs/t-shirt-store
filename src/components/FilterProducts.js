import React, { Component } from "react";
import { Text, Box, TextInput, Select } from "grommet";
import styled from "styled-components";
import Theme from "../theme/theme";
import { Search } from "grommet-icons";
import { connect } from "react-redux";
import {
  searchProduct,
  priceHighToLow,
  priceLowToHigh,
  showAllProducts
} from "../redux/types/Filters";
const FilterContainer = styled(Box)`
  width: "100%";
  margin-bottom: 5.8rem;
  margin-top: 3rem;

  @media only screen and (max-width: 1050px) {
    flex-direction: column;
    margin-bottom: 1em;
    margin-right: 0;
  }
`;

const SearchWrapper = styled.div`
  width: 34rem;
  @media only screen and (max-width: 1140px) {
    width: 100%;
  }
`;

const SearchBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;

  & > svg {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
  }

  input {
    padding-right: 2.5rem;
    font-size: 1rem;
    font-weight: 400;
  }
`;

const OrderWrapper = styled.div`
  width: 13rem;
  padding-top: 0;
  padding-right: 0;

  input {
    font-size: 1rem;
    font-weight: 400;
  }
  button {
    width: 13rem;
    height: 3rem;
  }

  @media only screen and (max-width: 1140px) {
    width: 100%;

    button {
      width: 100%;
      height: 3rem;
    }
  }
`;

class FilterProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchStr: "Search Product",
      value: "All",
      order: ["All", "Price High To Low", "Price Low To High"]
    };
  }

  onSearchProduct = str => {
    this.props.searchProduct(str);
  };

  onSortOptionChange = option => {
    if (option.value === "All") {
      this.state.searchStr = "";
      this.props.showAllProducts();
    } else {
      option.value === "Price High To Low"
        ? this.props.sortByPriceHighToLow()
        : this.props.sortByPriceLowToHigh();
    }
  };

  render() {
    return (
      <FilterContainer direction="row" justify="between" align="center">
        <SearchWrapper>
          <Text>Search</Text>
          <SearchBarWrapper>
            <TextInput
              placeholder={this.state.searchStr}
              // value={}
              onChange={event => {
                this.onSearchProduct(event.target.value);
              }}
              dropHeight={"small"}
              size={"medium"}
            />
            <Search color={Theme.global.colors.active} />
          </SearchBarWrapper>
        </SearchWrapper>

        <OrderWrapper>
          <Text>Order</Text>

          <Select
            options={this.state.order}
            value={this.state.value}
            onChange={option => {
              this.setState({
                value: option.value
              });
              this.onSortOptionChange(option);
            }}
          />
        </OrderWrapper>
      </FilterContainer>
    );
  }
}

const mapDispatchToProps = {
  searchProduct: searchProduct,
  sortByPriceHighToLow: priceHighToLow,
  sortByPriceLowToHigh: priceLowToHigh,
  showAllProducts: showAllProducts
};

const mapStateToProps = state => {
  return {
    searchFilter: state.text
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterProducts);
