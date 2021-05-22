import React from 'react';
import cn from 'classnames'
import {translate} from "../../../helpers/translate/translate";

import createFertilizersLibrary from 'core/images/home/createFertilizersLibrary.png'
import makeSolutionVolume from 'core/images/home/makeSolutionVolume.png'
import findSolution from 'core/images/home/findSolution.png'
import {ROUTES} from "../../../core/routes/routes";

import style from './home.module.scss'
import wrapperStyle from 'components/atom/mainWrapper/mainWrapper.module.scss'
import {Helmet} from "react-helmet";


const Home = () => {
    return (
        <div className={cn(style.homeWrapper, wrapperStyle.mainWrapper)}>
            <Helmet>
                <title>{translate('helmetHomeTitle')}</title>
                <meta name="keywords" content={`Add fertilizers, make solutions, grow plants. Добавляйте удобрения, создавайте растворы, выращивайте растения`} />
                <meta name="keywords" content={`growing, growing plants, npk, npk calculator, fertilizers, fertilizer, solution, micro elements, macronutrients, nutritions, how to fertilize plants, nitrogen, potassium, phosphorus, calcium, magnesium, how to use npk calculator, выращивание, выращивание растений, нпк, нпк кальулятор, удобрения, удобрение, раствор, микроэлементы, макроэлементы, подкормка, как удобрять растения, азот, калий, фосфор, кальций, магний, как пользоваться нпк калькулятором`} />
            </Helmet>
            <article>
                <h1 className={style.mainTitle}><span className={style.keyword}>npkcalculator</span> - {translate('homePageP1')}</h1>
                <section className={style.homeSection}>
                    <h2 className={style.homeSubtitle}>{translate('homePageP2_2')}</h2>
                    <img src={createFertilizersLibrary} alt="create your fertilizers library"/>
                </section>
                <section className={style.homeSection}>
                    <img src={findSolution} alt="add fertilizers"/>
                    <h2 className={style.homeSubtitle}>{translate('homePageP3')}</h2>
                </section>
                <section className={style.homeSection}>
                    <h2 className={style.homeSubtitle}>{translate('homePageP4')}</h2>
                    <img src={makeSolutionVolume} alt="make solution"/>
                </section>
                <section>
                    <a className={cn(style.homeSection, style.tutorialLink)} href={ROUTES.TUTORIAL} >
                        <span className={style.questionTutorial}>?</span>
                        <h2 className={style.homeSubtitle}>{translate('homePageP5')}</h2>
                    </a>
                </section>

            </article>
        </div>
    );
};

export {Home}