import React from 'react';
import NavStyle from '../styles/leftNav.module.css';
import MainImg from '../images/main.png';
import SearchImg from '../images/search.png';
import { useDispatch, /*useSelector*/ } from 'react-redux';
import { listMusicAction, searchMusicAction } from '../store/rightSideReducer';



function LeftNav() {
    const dispatch = useDispatch()
    //const value = useSelector(state => state.value)

    const toMain = () => {
        dispatch(listMusicAction())
    }

    const toSearch = () => {
        dispatch(searchMusicAction())
    }


    return (
        <div className={NavStyle.leftnav}>
            <button className={NavStyle.btn} onClick={() => toMain()}>
                <img className={NavStyle.mainImg} src={MainImg} alt='main' />
                <span className={NavStyle.text}>Main</span>
            </button>
            <button className={NavStyle.btn} onClick={() => toSearch()}>
                <img className={NavStyle.mainImg} src={SearchImg} alt='search' />
                <span className={NavStyle.text}>Search</span>
            </button>
        </div>
    );
}

export default LeftNav;