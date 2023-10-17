import React from 'react'
import useCategory from '../../hooks/useCategory'
import Layout from '../../components/Layout/Layout'
import { Link } from 'react-router-dom';
function CategoryPage() {
    const category = useCategory();
  return (
    <Layout>
        <h1 className='text-center my-3'>All Categories</h1>
        <div className='container'>
        
        <div className='row gx-2'>
            {
                category?.map((cate)=>(
                    <div className='col-md-6 shadow p-4' key={cate._id}>
                        <Link className='nav-link' to={`/category/${cate.slug}`}>{cate.name}</Link>
                    </div>
                ))
            }
        </div>

        </div>
    </Layout>
  )
}

export default CategoryPage