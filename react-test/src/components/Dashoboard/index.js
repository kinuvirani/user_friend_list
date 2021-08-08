import React, {useEffect} from 'react';
import { Button, Table } from 'antd';
import './index.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {getUserList} from '../../actions/user';
import {sendFriendRequest} from '../../actions/friend';
import LayoutWrapper from '../../common/wrapper';

const Dashboard = (props) => {

    useEffect(() => {
        props.getUserList(props.token);
    }, [props.token]);

    const sendRequest = (id) => {
        props.sendFriendRequest({friend_id: id},props.token);
      };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, row) => <div> { row.firstname + ' ' + row.lastname } </div>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <>
                  <Button
                    type="primary"
                    onClick={() => sendRequest(record._id)}
                  >
                      Add Friend
                  </Button>
                </>
              ),
        }
    ];

    return(
        <LayoutWrapper name="registration" defaultKey="2">
            <Table columns={columns} dataSource={props?.list || []} />
        </LayoutWrapper>
    )
};

const mapStateToProps = (state) => {
    return ({
        list: state.friend.list,
        token: state.user.token,

    })
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUserList, sendFriendRequest}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
