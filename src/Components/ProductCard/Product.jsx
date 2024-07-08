import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Url } from '../../url';

function Product({product}) {

  return(
    <Link to={"/products/item/"+product._id}>
      <li className='flex flex-col justify-center items-center gap-4 w-full '>
        <img className=' lg:max-h-80 md:h-72 sm:h-72 xl:h-96 h-64 object-cover   transition duration-300 ease-in-out hover:scale-110' src={Url+ product.image} alt="product" />
        <h2 className='font-semibold text-md'>{product.title}</h2>
        <p className='font-semibold '> &#x20B9;{product.mrp}</p>
    </li>
    </Link>
  )
}

Product.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title :PropTypes.string.isRequired,
    mrp :PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
};


export default Product