import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import SearchBar from './SearchBar';

const StyledHeader = styled.div`
  padding-top: 20px;
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.ghostWhite};
  height: 180px;
  text-align: center;
  margin-bottom: 1em;

  @media screen and (max-width: 400px) {
    height: 150px;
    padding-top: 10px;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 36px;
    color: ${({ theme }) => theme.ghostWhite};

    @media screen and (max-width: 360px) {
      font-size: 24px;
    }

    @media screen and (max-width: 700px) {
      font-size: 28px;
    }

    @media screen and (max-width: 900px) {
      font-size: 32px;
    }

    span {
      font-weight: 200;
    }
  }
`;

const Header = ({ searchValues, setSearchValues, doFetch }) => (
  <StyledHeader>
    <h1>
      NASA&nbsp;
      <span>Media Library</span>
    </h1>
    <SearchBar
      doFetch={doFetch}
      searchValues={searchValues}
      setSearchValues={setSearchValues}
    />
  </StyledHeader>
);

Header.propTypes = {
  searchValues: PropTypes.shape({
    searchTerm: PropTypes.string,
    searchImages: PropTypes.bool,
    searchVideo: PropTypes.bool,
    searchAudio: PropTypes.bool,
  }).isRequired,
  setSearchValues: PropTypes.func.isRequired,
  doFetch: PropTypes.func.isRequired,
};

export default Header;
