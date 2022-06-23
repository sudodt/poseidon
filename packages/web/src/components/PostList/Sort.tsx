
import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { connect } from 'react-redux';
import { filterToSlug, getUrl } from "@/utils/post";
import { useRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import { fetchPostsRequest, updateQuery } from "@/redux/actions/postCollectionAction";

const items = [
    {
        label: 'Mặc định',
        value: '',
    },
    {
        label: 'Mới nhất',
        value: 'id',
    },
    {
        label: 'Cũ nhất',
        value: '-id',
    },
    {
        label: 'Giá từ cao đến thấp',
        value: 'price',
    },
    {
        label: 'Giá từ thấp đến cao',
        value: '-price',
    },
]
const Sort = (props: any) => {
    const router = useRouter();
    const searchQuery = props.postCollection.query;
    const sortValue = items.find((item : any) => item.value === searchQuery.sort);

    const onChangeSelection = (option: any) => {
        const name: string = option.target.name || '';
        const value: any = option.value || {};
        const newSearchQuery = filterToSlug(searchQuery, name, value);
        
        props.updateQuery(newSearchQuery);
        props.fetchPostsRequest({
            isServer: false,
            data: newSearchQuery
        });

        const newUrl = getUrl(newSearchQuery);
        router.push(newUrl, newUrl, { shallow: true })
    }
    return (
        <>
            <div>
                <Dropdown 
                    options={items}
                    value={sortValue ? sortValue.value : undefined}
                    name="sort"
                    optionLabel="label" 
                    onChange={onChangeSelection}
                    placeholder={"Sắp xếp"} />
            </div>
        </>
    );
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        updateQuery: bindActionCreators(updateQuery, dispatch),
        fetchPostsRequest: bindActionCreators(fetchPostsRequest, dispatch),
    }
}
const mapStateToProps = ({ postCollection }: any) => ({
    postCollection: postCollection,
});
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
