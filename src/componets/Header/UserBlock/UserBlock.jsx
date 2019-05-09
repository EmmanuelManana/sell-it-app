import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserBlock.module.css';
import userPhoto from '../../../images/user-photo.jpg';
import logoutIcon from '../../../images/logout-icon.png';
import { connect } from 'react-redux';
import { userLogin, userLogout } from '../../../actions/user';

const mapStateToProps = (state) => ({
    isLogin: state.userReducer.isLogin
});

const mapDispatchToProps = (dispatch) => ({
    userLogin: (value) => {
        dispatch(userLogin(value));
    },
    userLogout: () => {
        dispatch(userLogout());
    }
});

const UserBlock = ({ isLogin, userLogin, userLogout }) => {
    let userId = 1;
    let path = `/userdetails/${userId}`;
    return (
        <React.Fragment>
            <Link to="/newproduct">Add new item</Link>
            <div className={styles.user_block}>
                {!isLogin ?
                    <p className={styles.user_block__text}> Welcome, <Link to="/sign-in" className={styles.user_block__link}>login</Link> or <Link to="/sign-up" className={styles.user_block__link}> register </Link> for start !</p>
                    : 
                    <div className={styles.user_login}>
                        <Link to={path} className={styles.user_login_link}>
                            <img src={userPhoto} alt=""/>
                            <span>Kim Evans</span>
                        </Link>
                        <div>
                            <img onClick={userLogout} className={styles.logout_icon} src={logoutIcon} alt=""/>
                        </div>
                    </div>
                }
            </div>
        </React.Fragment>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBlock);