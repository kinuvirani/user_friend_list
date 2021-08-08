import React, {useEffect} from 'react';
import { Button, Table } from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {getFriendList} from '../../actions/friend';
import LayoutWrapper from '../../common/wrapper';

const Friend = (props) => {

    useEffect(() => {
        props.getFriendList(props.token);
    }, [props.token]);

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
                  <Button            //We can implement remove user functionality
                    type="danger"
                  >
                      Remove
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
        list: state.friend.friends,
        token: state.user.token,

    })
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getFriendList}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Friend));
