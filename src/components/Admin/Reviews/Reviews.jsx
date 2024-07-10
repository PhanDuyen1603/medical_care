import React from 'react'
import AdminLayout from '../AdminLayout/AdminLayout'
import ReviewOverall from './ReviewOverall';
import { Space } from 'antd';
import './Reviews.css';
import { useGetAllReviewsQuery, useCountAllReviewsQuery } from '@/redux/api/reviewsApi'
import ReviewTable from './ReviewTable'

const AdminReviews = () => {
    const { data, isLoading, isError } = useGetAllReviewsQuery({});
    const { data: count, isLoading: isCountLoading, isError: isCountError } = useCountAllReviewsQuery();
    const getAverage = data => {
        let res = 0
        Array.from({ length: 5 }).forEach((_, i) => {
            res += data[`rate${i + 1}`] * (i + 1)
        })
        return Math.round(res / 15)
    }
    return (
        <>
            <AdminLayout >
                <Space Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    {
                        count && !isCountLoading && <ReviewOverall total={count?.total} average={getAverage(count)} />
                    }
                    <ReviewTable isLoading={isLoading} tableData={data} />
                </Space>
            </AdminLayout>
        </>
    )
}
export default AdminReviews;