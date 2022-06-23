
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import AccountDataService from '@/services/Account';
import { Card } from 'primereact/card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getThumbImageSrc } from "@/utils/post"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Cookies from 'universal-cookie';
import { fetchAccountPostsRequest } from '@/redux/actions/accountsAction';
import { confirmDialog } from 'primereact/confirmdialog';
import { Chip } from 'primereact/chip';
import EditPost from './EditPost';

const PostTable = (props: any) => {
    const posts = props.posts;
    const cookie = new Cookies();
    const token = cookie.get('USER_TOKEN');

    const imageBodyTemplate = (rowData: any) => {
        return <LazyLoadImage
            alt={rowData.title}
            src={getThumbImageSrc(rowData.images)}
            effect="opacity"
            width={'100%'}
            height={"120px"}
        />
    }

    const typeTemplate = (rowData: any) => {
        return (
            <>
                <Chip label={rowData.demand.name} />
                <Chip label={rowData.category.name} />
            </>
        );
    }

    const statusBodyTemplate = (rowData: any) => {
        return <span className={`product-badge status-${rowData.status_text.toLowerCase()}`}>{rowData.status_text}</span>;
    }

    const actionTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <Action {...rowData} {...props} />
            </React.Fragment>
        );
    }
    const footer = `Tổng cộng ${posts ? posts.length : 0} tin đăng tìm thấy.`;
    return (
        <Card>
            <div className="datatable-templating-demo">
                <div className="card">
                    <DataTable value={posts} footer={footer}>
                        <Column body={imageBodyTemplate}></Column>
                        <Column field="title" style={{ 'width': '200px' }} header="Tiều đề"></Column>
                        <Column body={typeTemplate} header="Loại"></Column>
                        <Column field="created_at" header="Ngày đăng"></Column>
                        <Column header="Trạng thái" body={statusBodyTemplate}></Column>
                        <Column body={actionTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </Card>

    );
}

const Action = (props: any) => {
    const menu = useRef<any>(null);
    const cookie = new Cookies();
    const token = cookie.get('USER_TOKEN');
    const items = [
        {
            label: 'Xem thử',
            icon: 'pi pi-eye',
            command: async () => {
                window.open(`${process.env.APP_DOMAIN}/${props.slug}-pid-${props.uuid}`)
            }
        },
        {
            label: 'Chỉnh sửa',
            icon: 'pi pi-pencil',
            command: async () => {
                // setOpenEdit(true)
            }
        },
        {
            label: (props.status === 'ARCHIVE' ? 'Công khai' : 'Lưu trữ'),
            icon: (props.status === 'ARCHIVE' ? 'pi pi-cloud' : 'pi pi-bookmark'),
            command: async () => {
                archiveAction()
            }
        },
        {
            label: 'Xoá',
            icon: 'pi pi-fw pi-trash',
            command: async () => {
                deleteAction()
            }
        }
    ];

    const deleteAction = async () => {
        confirmDialog({
            message: 'Bạn có muốn xoá tin đăng này không? Tin đăng này sẽ không thể khôi phục sau khi xoá',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await AccountDataService.updateStatusPosts(token, props.uuid, 'DELETE');
                props.fetchAccountPostsRequest({ isServer: false, token: token });
            },
        });
    };

    const archiveAction = async () => {
        confirmDialog({
            message: 'Tin đăng này sẽ chuyển sang trạng thái nháp, sẽ cần kiểm duyệt lại trước khi công khai',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await AccountDataService.updateStatusPosts(token, props.uuid, 'ARCHIVE');
                props.fetchAccountPostsRequest({ isServer: false, token: token });
            },
        });
    };
    return (
        <React.Fragment>
            <Menu model={items} popup ref={menu} />
            <Button
                className="p-button-text p-button-rounded"
                icon="pi pi-ellipsis-v"
                onClick={(event: any) => menu.current.toggle(event)}
            />
            {/* <EditPost post={props} visible={openEdit}/> */}
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAccountPostsRequest: bindActionCreators(fetchAccountPostsRequest, dispatch),
    }
}
const mapStateToProps = ({ accounts, locations }: any) => ({
    account: accounts?.account || {},
    locations: locations || {},
    posts: accounts?.posts || [],
    isLoading: accounts.isLoading || false,
});
export default connect(mapStateToProps, mapDispatchToProps)(PostTable)