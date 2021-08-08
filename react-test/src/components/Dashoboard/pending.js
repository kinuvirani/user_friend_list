import React, {useEffect} from 'react';
import { Button, Table } from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {getPendingRequestList, updateFriendRequest} from '../../actions/friend';
import LayoutWrapper from '../../common/wrapper';

const PendingRequest = (props) => {

    useEffect(() => {
        props.getPendingRequestList(props.token);
    }, [props.token]);

    const updateRequest = (id, status) => {
        props.updateFriendRequest(id, {status});
      };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, row) => <div> { row.user.firstname + ' ' + row.user.lastname } </div>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <>
                  <Button
                    type="success"
                    onClick={() => updateRequest(record._id, 'ACCEPTED')}
                  >
                      Accept
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => updateRequest(record._id, 'DECLINED')}
                  >
                      Decline
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
        list: state.friend.requests,
        token: state.user.token,

    })
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getPendingRequestList, updateFriendRequest}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingRequest));
