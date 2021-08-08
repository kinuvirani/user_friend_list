import React, { Component } from "react";
import { Button, Layout, Menu } from "antd";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./index.css";

class LayoutWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    localStorage.clear();
    window.location.pathname='/signin';
  };

  allUsers = () => {
    this.props.history.push("/");
  };

  allFriends = () => {
    this.props.history.push("/friends");
  };

  allPendings = () => {
    this.props.history.push("/pending-requests");
  };

  render() {
    const { Header, Content, Footer } = Layout;

    return (
      <Layout className="layout">
        <Layout>
          <Header
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
              color: "#fff",
              fontSize: "20px",
            }}
          >
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" onClick={this.allUsers}>All users</Menu.Item>
              <Menu.Item key="2" onClick={this.allFriends}>My Friends</Menu.Item>
              <Menu.Item key="3" onClick={this.allPendings}>Pending Requests</Menu.Item>
            </Menu>
            <Button
              type="primary"
              style={{
                position: "absolute",
                right: "10px",
                marginTop: "-48px",
              }}
              onClick={this.handleLogout}
              htmlType="submit"
            >
              Logout
            </Button>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
          Minddef @2020
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({  }, dispatch);
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LayoutWrapper)
);
