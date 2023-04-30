import { Component } from 'react';
import { animateScroll } from 'react-scroll';
import getImages from './services/image-service';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Text from './Text/Text';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    per_page: 12,
    isLoading: false,
    showLoadMoreBtn: false,
    isEmpty: false,
    error: null,
    showModal: false,
    largeImageUrl: '',
    alt: '',
    id: null,
  };

  componentDidUpdate(props, prevState) {
    // console.log('start DidUpdate');
    // console.log(this);
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      getImages(this.state.query, this.state.page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            this.setState({ isEmpty: true });
            return;
          }
          // console.log(hits);
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            showLoadMoreBtn:
              prevState.page < Math.ceil(totalHits / prevState.per_page),
            error: null,
          }));
        })
        .catch(err => {
          this.setState({ error: err.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }
  onSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      isEmpty: false,
      error: '',
      showLoadMoreBtn: false,
    });
  };
  loadMore = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollOnMoreButton();
  };
  scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };
  openModal = (largeImageUrl, alt) => {
    this.setState({
      showModal: true,
      largeImageUrl: largeImageUrl,
      alt,
    });
  };
  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageUrl: '',
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />

        <ImageGallery images={this.state.images} openModal={this.openModal} />

        {this.state.showLoadMoreBtn && <Button loadMore={this.loadMore} />}

        {this.state.isLoading && <Loader />}

        {this.state.isEmpty && (
          <Text text="Sorry. There are no images ... 😭" />
        )}

        {this.state.error && <Text text={this.state.error} />}

        {!this.state.showLoadMoreBtn && this.state.images.length > 0 && (
          <Text text="No more images to load... 😭" />
        )}

        {this.state.showModal && (
          <Modal
            largeImageUrl={this.state.largeImageUrl}
            alt={this.state.alt}
            onClose={this.closeModal}
          />
        )}
      </>
    );
  }
}
