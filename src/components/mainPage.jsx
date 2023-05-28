import React from 'react';
import MainStyle from '../styles/mainPage.module.css';
import LeftNav from './leftNav';
import Listened from './listened';
import ListMusic from './listMusic';
import SearchMusic from './searchMusic';
import { useSelector } from 'react-redux';


function MainPage() {

    const value = useSelector(state => state.rightSideReducer.value)
    console.log(value)
    return (
        <div className={MainStyle.container}>
            <div className={MainStyle.leftside}>
                <LeftNav />
                <Listened />
            </div>

            <div className={MainStyle.rightside}>
                {value === "ListMusic" ?
                    <ListMusic />
                    :
                    <SearchMusic />
                }
            </div>
        </div>
    );
}

export default MainPage;