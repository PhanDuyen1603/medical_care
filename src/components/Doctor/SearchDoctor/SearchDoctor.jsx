import React, { useState, useCallback } from 'react';
import Footer from '../../Shared/Footer/Footer';
import SearchSidebar from './SearchSidebar';
import SearchContent from './SearchContent';
import { useDebounced } from '../../../utils/hooks/useDebounced';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { Empty } from 'antd';
import { Pagination } from 'antd';
import Header from '../../Shared/Header/Header';
import SubHeader from '../../Shared/SubHeader';

const initQuery = {
    size: 10,
    page: 1,
    sortBy: '',
    sortOrder: '',
    searchTerm: '',
    sortByGender: '',
    specialist: '',
    gender: '',
    priceRange: {},
    min: null,
    max: null,
}
const debouncedQuery = {
    min: null,
    max: null,
    searchTerm: '',
}

const SearchDoctor = () => {
    let query = debouncedQuery;
    const [canRefetch, setCanRefetch] = useState(true)
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [priceRange, setPriceRange] = useState({})
    const [searchTerm, setSearchTerm] = useState("");
    const [sQuery, setSQuery] = useState(initQuery);

    const setQuery = (key, val) => {
        setCanRefetch(false)
        setSQuery({
            ...sQuery,
            [key]: val
        })
    }

    const setSorByGender = (x) => setQuery('gender', x)
    const setSpecialist = (x) => setQuery('specialist', x)

    const priceDebounced = useDebounced({ searchQuery: priceRange, delay: 1000 });
    const debounced = useDebounced({ searchQuery: searchTerm, delay: 600 })

    if (!!priceDebounced && Object.keys(priceDebounced)?.length !== 0) {
        const { min, max } = priceDebounced
        query["min"] = min;
        query["max"] = max;
    }

    if (debounced !== null) {
        query['searchTerm'] = debounced
    }

    const resetFilter = () => {
        setCanRefetch(false)
        setSQuery({
            ...initQuery,
        })
        setTimeout(() => {
            setCanRefetch(true)
            query.searchTerm = ''
            query.min = null
            query.max = null
        }, 500)
    }

    const { data, isFetching, isError, refetch } = useGetDoctorsQuery({ ...sQuery, min: query.min, max: query.max, searchTerm: query.searchTerm }, { skip: !canRefetch })
    const doctorsData = data?.doctors;
    const meta = data?.meta;

    const handleSearch = () => {
        setCanRefetch(false)
        setQuery('limit', size);
        setQuery('page', page);
        setQuery('sortBy', sortBy);
        setQuery('sortOrder', sortOrder);
        setTimeout(() => {
            setCanRefetch(true)
        }, 500)
    }

    // render
    let content = null;
    if (isFetching) content = <>Loading ...</>;
    if (!isFetching && isError) content = <div>Something Went Wrong !</div>
    if (!isFetching && !isError && doctorsData?.length === 0) content = <div><Empty /></div>
    if (!isFetching && !isError && doctorsData?.length > 0) content =
        <>
            {
                doctorsData && doctorsData?.map((item, id) => (
                    <SearchContent key={id + item.id} data={item} />
                ))
            }
        </>

    const onShowSizeChange = (current, pageSize) => {
        setQuery('page', 1);
        setQuery('pageSize', pageSize);
        setCanRefetch(true)
        refetch()
    }

    const changePage = (page) => {
        setPage(page);
        setQuery('page', page);
        setCanRefetch(true)
    }

    useCallback(() => {
        if (canRefetch) {
            refetch();
            setCanRefetch(false)
        }
    }, [canRefetch, refetch]);

    return (
        <div>
            <Header />
            <SubHeader title='Doctors' />
            <div className="container" style={{ marginBottom: 200, marginTop: 80 }}>
                <div className="container-fluid">
                    <div className="row">
                        <SearchSidebar
                            setCanRefetch={setCanRefetch}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            setSorByGender={setSorByGender}
                            setSpecialist={setSpecialist}
                            setPriceRange={setPriceRange}
                            resetFilter={resetFilter}
                            handleSearch={handleSearch}
                            query={{ ...sQuery, ...query }}
                        />
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            {content}
                            <div className='text-center mt-5 mb-5'>
                                <Pagination
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                    total={meta?.total}
                                    defaultCurrent={page}
                                    pageSize={size}
                                    onChange={changePage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SearchDoctor