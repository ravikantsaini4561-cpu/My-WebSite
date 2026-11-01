import { useCallback, useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  
  const [list, setList] = useState([]);

  const fetchlist = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error(response.data.message || 'Error fetching food list');
      }
    } catch {
      toast.error('Error fetching food list');
    }
    return null;
  }, [url]);

  const refreshList = async () => {
    const foods = await fetchlist();
    if (foods) {
      setList(foods);
    }
  };

  const removeFood = async(foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        await refreshList();
      } else {
        toast.error(response.data.message || 'Failed to remove food');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error removing food');
    }
  }

  useEffect(() => {
    let active = true;
    fetchlist().then((foods) => {
      if (active && foods) {
        setList(foods);
      }
    });

    return () => {
      active = false;
    };
  }, [fetchlist]);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
