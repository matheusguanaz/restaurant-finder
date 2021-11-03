import React, {useState} from "react";
import { useSelector } from "react-redux";
import { Container, Search, Logo, Wrapper, Carousel, CarouselTitle, ModalTitle, ModalContent } from "./styles";
import {Card, RestaurantCard, Modal, Map, Loader, LoadingSkeleton} from '../../components';
import logo from '../../assets/logo.svg';
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import restaurante from '../../assets/restaurante-fake.png';
import {setRestaurant} from '../../redux/modules/restaurants';
import { useDispatch} from 'react-redux';



const Home = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState(null);
    const [modalOpened, setModelOpened] = useState(false);
    const [placeId, setPlaceId] = useState(null);
    const {restaurants, restaurantSelected} = useSelector((state) => state.restaurants)


    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true
    };

    function handleKeyPress(e){
      if(e.key === 'Enter'){
        setQuery(inputValue)
      }
    }

    function handleOpenModal(placeId){
      dispatch(setRestaurant(null));
      setPlaceId(placeId);
      setModelOpened(true);
    }

    return(

      
    <Wrapper>
        <Container>
          <Search><Logo src={logo} alt="logo"></Logo>
            <TextField
            outlined
            label="Pesquisar Restaurantes"
            trailingIcon={<MaterialIcon role="button" icon="search" />}>
            <Input type="text" value={inputValue} onKeyPress={handleKeyPress} onChange={(e) => setInputValue(e.target.value)} />
            </TextField>
            {restaurants.length > 0 ? (
              <>
                <CarouselTitle>Na sua área</CarouselTitle>
                <Carousel {...settings}>
                {restaurants.map((restaurant) => 
                <Card 
                key={restaurant.place_id} 
                photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante} 
                title={restaurant.name}/>)}
                </Carousel>
              </>
            ): (<Loader/>)}
          </Search>
          {restaurants.map((restaurant) => 
          <RestaurantCard
          key={restaurant.place_id}
          onClick={()=> handleOpenModal(restaurant.place_id)}
          restaurant={restaurant}/>)}
        </Container>
        <Map query={query} placeId={placeId}/>
        <Modal open={modalOpened} onClose={() => setModelOpened(!modalOpened)}>
          {restaurantSelected ? (
            <>
              <ModalTitle>{restaurantSelected?.name }</ModalTitle>
              <ModalContent>{restaurantSelected?.formatted_phone_number }</ModalContent>
              <ModalContent>{restaurantSelected?.formatted_address }</ModalContent>
              <ModalContent>{restaurantSelected?.opening_hours?.open_now ? 'Aberto' : 'Fechado neste momento' }</ModalContent>
            </>
          ) : (
            <>
              <LoadingSkeleton width="10px" height="10px" />
              <LoadingSkeleton width="10px" height="10px" />
              <LoadingSkeleton width="10px" height="10px" />
              <LoadingSkeleton width="10px" height="10px" />
            </>
          )}
        </Modal>
    </Wrapper>
    
)}
export default Home;