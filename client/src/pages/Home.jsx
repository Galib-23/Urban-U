import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

const Home = () => {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async() => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings();
  }, [])
  

  return (
    <div>
      {/* top */}
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">Find your next <span className="text-slate-400">perfect</span> <br /> place with ease</h1>
          <div className="text-gray-400 text-xs sm:text-sm">
            Rial Estate will help you find your home fast easy and comfortable. <br /> Our expert support are always available
          </div>
          <Link className="text-xs sm:text-sm text-blue-800 font-bold hover:underline" to={`/search`}>
            Lets get started...
          </Link>
        </div>
      {/* swiper */}
      <Swiper navigation>
      {
        offerListings && offerListings.length > 0 && offerListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div style={{
              background: `url(${listing.imageUrls[0]}) center no-repeat`,
              backgroundSize: 'cover'
            }} className="h-[550px]"></div>
          </SwiperSlide>
        ))
      }
      </Swiper>

      {/* listing results for offer, sale and rent */}
      <div className="mx-1 md:mx-24 p-3 flex flex-col items-center gap-8 my-10">
        {
          offerListings && offerListings.length > 0 && (
            <div>
              <div className="my-6">
                <h2 className="text-2xl md:text-4xl font-bold text-slate-800">Recent Offers</h2>
                <Link to={'/search?offer=true'} className="text-md font-semibold text-blue-800 hover:underline">Show more offers...</Link>
              </div>
              <div className="flex flex-wrap gap-8">
                {
                  offerListings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div>
              <div className="my-6">
                <h2 className="text-2xl md:text-4xl font-bold text-slate-800">Recent places for rent</h2>
                <Link to={'/search?type=rent'} className="text-md font-semibold text-blue-800 hover:underline">Show more places for rent...</Link>
              </div>
              <div className="flex flex-wrap gap-8">
                {
                  rentListings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div>
              <div className="my-6">
                <h2 className="text-2xl md:text-4xl font-bold text-slate-800">Recent places for sale</h2>
                <Link to={'/search?type=sale'} className="text-md font-semibold text-blue-800 hover:underline">Show more places for sale...</Link>
              </div>
              <div className="flex flex-wrap gap-8">
                {
                  saleListings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home
