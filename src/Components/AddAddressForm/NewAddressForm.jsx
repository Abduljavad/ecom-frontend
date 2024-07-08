import PropTypes from "prop-types";
import { useState } from "react";

function NewAddressForm({ onCloseForm, onSubmit }) {

  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    phone: "",
    pin: "",
  });
  console.log(newAddress)
  const handleClick = () => {
    onCloseForm();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target

    const name = form["name"].value
    const phone = form["phone"].value
    const country = form["country"].value
    const area = form["area"].value
    const pin = form["pin"].value
    const address = form["address"].value


    const updatedAddress = {
      name: name,
      address: address + ", "+ area + ", " + country,
      phone: phone,
      pin: pin,
    }
    setNewAddress(updatedAddress)
    onSubmit(updatedAddress)
    onCloseForm()

  };
  
  return (
    <div className="flex flex-col justify-center items-center relative  dark:bg-black">
      <button onClick={handleClick} className="mb-8">
        <img
          className="w-6 h-6 absolute top-0 right-0"
          src="/icons/Close.svg"
          alt=""
        />
      </button>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium "
          >
            Full name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            placeholder="John"
            required
          />
        </div>
        <div className="grid gap-6 mb-6 mt-4 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium ">
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="123-45-678"
              required
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium "
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="United States"
              defaultValue={"United States"}
              required
            />
          </div>
          <div>
            <label htmlFor="area" className="block mb-2 text-sm font-medium ">
              Area
            </label>
            <input
              type="text"
              id="area"
              name="area"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              required
            />
          </div>
          <div>
            <label htmlFor="pin" className="block mb-2 text-sm font-medium ">
              PIN
            </label>
            <input
              type="tel"
              id="pin"
              name="pin"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="Pin code"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block mb-2 text-sm font-medium">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            placeholder="Your address"
            required
          />
        </div>

        <button type="submit" className="text-white bg-teal-600 py-2 px-4 ">
          Add Address
        </button>
      </form>
    </div>
  );
}
NewAddressForm.propTypes = {
  onCloseForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default NewAddressForm;
