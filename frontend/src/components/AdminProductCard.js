import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false)
    return (
        <div className='bg-white p-4 rounded whitespace-nowrap'>

            <div className='w-40' translate="no">
                <div className='w-42 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} alt="" width={120} height={120} className='mx-auto object-fill h-full' />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div>
                    <p className='font-semibold hover:text-red-500'>
                        {
                            displayINRCurrency(data.sellingPrice)
                        }
                    </p>

                    <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                        <MdModeEditOutline />
                    </div>
                </div>
            </div>

            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
                )
            }


        </div>
    )
}
AdminProductCard.propTypes = {
    data: PropTypes.shape({
        productImage: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        sellingPrice: PropTypes.number.isRequired,
        // Thêm các thuộc tính khác nếu cần
    }).isRequired,
    fetchdata: PropTypes.func.isRequired,
};
export default AdminProductCard
