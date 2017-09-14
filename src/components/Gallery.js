import React from 'react';
import '../styles/css/Gallery.css';

import GalleryItem from './GalleryItem';
import PageNavigation from './PageNavigation';
import GalleryModal from './GalleryModal';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };

    this.renderGalleryItems = this.renderGalleryItems.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.renderPageNavigation = this.renderPageNavigation.bind(this);
    this.closeGalleryModal = this.closeGalleryModal.bind(this);
    this.openGalleryModal = this.openGalleryModal.bind(this);
  }

  closeGalleryModal() {
    this.setState({
      modalOpen: false,
    });
  }

  handlePageChange(event) {
    const direction = (event.target.innerHTML).toLowerCase();
    const pageUrl = event.target.dataset.pageUrl;
    this.props.onGetData(pageUrl);
  }

  openGalleryModal(event) {
    this.setState({
      modalOpen: true,
    });
  }

  renderGalleryItems() {
    if (Object.prototype.hasOwnProperty.call(this.props.galleryData, 'items')) {
      const imageArr = this.props.galleryData.items;
      const galleryItems = imageArr.map((image) => {
        return (<GalleryItem
          key={image.data[0].nasa_id}
          imageData={image}
          openModal={this.openGalleryModal}
        />);
      });
      return (
        <div>
          {galleryItems}
        </div>
      );
    }
    return null;
  }

  renderPageNavigation() {
    const pageNav = {
      next: null,
      prev: null,
      totalHits: null,
    };
    // Check for the metadata property, and get the total hits
    if (Object.prototype.hasOwnProperty.call(this.props.galleryData, 'metadata')) {
      pageNav.totalHits = this.props.galleryData.metadata.total_hits;
    }
    // Check for the links property
    if (Object.prototype.hasOwnProperty.call(this.props.galleryData, 'links')) {
      const linkArr = this.props.galleryData.links;
      // If linkArr > 0 there are buttons to display
      if (linkArr.length > 0) {
        linkArr.forEach((link) => {
          if ((link.rel).toLowerCase() === 'next') {
            pageNav.next = (<PageNavigation
              navType="Next"
              onPageChange={this.handlePageChange}
              dataUrl={link.href}
            />);
          } else if ((link.rel).toLowerCase() === 'prev') {
            pageNav.prev = (<PageNavigation
              navType="Previous"
              onPageChange={this.handlePageChange}
              dataUrl={link.href}
            />);
          }
        });
      }
    }
    return pageNav;
  }

  render() {
    const pageNav = this.renderPageNavigation();

    return (
      <div className="gallery-wrapper">
        <GalleryModal isModalOpen={this.state.modalOpen} closeModal={this.closeGalleryModal} />
        {pageNav.prev !== null ? pageNav.prev : null}
        {pageNav.next !== null ? pageNav.next : null}
        {pageNav.totalHits !== null ? pageNav.totalHits : null}
        {this.renderGalleryItems()}
      </div>
    );
  }
}

export default Gallery;
