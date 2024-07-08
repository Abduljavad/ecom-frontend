import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Url } from '../../url';

function ReviewsPage() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      axios
        .get(Url+"/reviews")
        .then((response) => {
          setReviews(response.data);
          
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    }, []);
    const handleDelete = async (reviewId) => {
      try {
        await axios.delete(Url+"/reviews/"+reviewId);
        setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
        toast.success("Review successfully deleted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log(`Review with ID ${reviewId} deleted successfully`);
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    };
    console.log(reviews);
    return (
      <main className="container mx-auto my-8">
        <h1 className="text-2xl font-bold mb-4">All Reviews</h1>
        <table className="min-w-full bg-white rounded-2xl shadow-lg font-semibold">
          <thead className="bg-teal-400 rounded-2xl">
            <tr>
              <th className="py-5 px-4 border-b">Review</th>
              <th className="py-5 px-4 border-b">Author</th>
              <th className="py-5 px-4 border-b">Created at</th>
              <th className="py-5 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-b text-center">

                <td className="py-8 px-4 w-2/5">{review.content}</td>
                <td>{review.author}</td>
                <td>{new Date(review.createdAt).toLocaleString()}</td>
  
                <td className="py-8 px-4">
                  
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
  )
}

export default ReviewsPage