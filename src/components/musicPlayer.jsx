import React from 'react';
import MainStyle from '../styles/mainPage.module.css';
import LeftNav from './leftNav';
import Listened from './listened';
import RightMusicPlayer from './rightMusicPlayer';
/*import { useParams } from "react-router-dom";*/


function MainPage() {

    /*let { musicId } = useParams();*/

    return (
        <div className={MainStyle.container}>
            <div className={MainStyle.leftside}>
                <LeftNav />
                <Listened />
            </div>

            <div className={MainStyle.rightside}>
                <RightMusicPlayer/>
            </div>
        </div>
    );
}

export default MainPage;