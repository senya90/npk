import React from 'react';
import cn from 'classnames'
import { translate } from 'helpers/translate/translate';

import style from './tutorial.module.scss'
import wrapperStyle from 'components/atom/mainWrapper/mainWrapper.module.scss'
import { Note } from 'components/atom/note/Note';

import step1_1Img from 'core/images/tutorial/step1/step1_1.png'
import step1_3Img from 'core/images/tutorial/step1/step1_3.png'

import step2_1Img from 'core/images/tutorial/step2/step2_1.png'

import step3_1Img from 'core/images/tutorial/step3/step3_1.png'
import step3_3Img from 'core/images/tutorial/step3/step3_3.png'

import step4_2Img from 'core/images/tutorial/step4/step4_2.png'
import step4_3Img from 'core/images/tutorial/step4/step4_3.png'

import step5_3Img from 'core/images/tutorial/step5/step5_3.png'
import {Helmet} from "react-helmet";


const Tutorial = () => {
    return (
        <div className={cn(style.tutorialWrapper, wrapperStyle.mainWrapper)}>
            <Helmet>
                <title>{translate('helmetTutorialTitle')}</title>
                <meta name="keywords" content={`Add fertilizers, make solutions, grow plants. Добавляйте удобрения, создавайте растворы, выращивайте растения`} />
                <meta name="keywords" content={`growing, growing plants, npk, npk calculator, fertilizers, fertilizer, solution, micro elements, macronutrients, nutritions, how to fertilize plants, nitrogen, potassium, phosphorus, calcium, magnesium, how to use npk calculator, выращивание, выращивание растений, нпк, нпк кальулятор, удобрения, удобрение, раствор, микроэлементы, макроэлементы, подкормка, как удобрять растения, азот, калий, фосфор, кальций, магний, как пользоваться нпк калькулятором`} />
            </Helmet>

            <h1>{translate('howToUse')} npkcalculator?</h1>
            <h2>{translate('basicsTutor')}</h2>
            <article>
                <h3>• {translate('registerForUse')}</h3>

                <h3>• {translate('fertilizerAddition')}</h3>
                <a href={step1_1Img} className={style.imageLink} target="_blank" rel="noreferrer">
                    <img className={style.tutorialPicture} src={step1_1Img} alt="step 1.1"/>
                </a>
                <ol>
                    <li>
                        <span>{translate('fertilizerAdditionStep1')}</span>
                    </li>
                    <li>
                        <span>{translate('fertilizerAdditionStep2')}</span>
                        <span><Note>{translate('fertilizerAdditionStep2Note')}</Note></span>
                    </li>
                    <li>
                        <span>{translate('fertilizerAdditionStep3')}</span>
                        <a href={step1_3Img} className={style.imageLink} target="_blank" rel="noreferrer">
                            <img className={style.tutorialPicture} src={step1_3Img} alt="step 1.3"/>
                        </a>
                    </li>
                </ol>

                <h3>• {translate('plantAddition')}</h3>
                <p>{translate('plantAdditionDescription')}</p>
                <ol>
                    <li><span>{translate('plantAdditionStep1')}</span></li>
                    <li><span>{translate('plantAdditionStep2')}</span></li>
                    <span>
                        <Note>{translate('plantAdditionStep2Note')}</Note>
                        <a href={step2_1Img} className={style.imageLink} target="_blank" rel="noreferrer">
                            <img className={style.tutorialPicture} src={step2_1Img} alt="step 2.2"/>
                        </a>
                    </span>
                </ol>

                <h3>• {translate('createSolutionTutor')}</h3>
                <ol>
                    <li>
                        <span>{translate('createSolutionTutorStep1')}</span>
                        <br/>
                        <span>{translate('createSolutionTutorStep1.1')}</span>
                        <a href={step3_1Img} className={style.imageLink} target="_blank" rel="noreferrer">
                            <img className={style.tutorialPicture} src={step3_1Img} alt="step 3.1"/>
                        </a>
                    </li>
                    <li>
                        <span>{translate('createSolutionTutorStep2')}</span>
                    </li>
                    <li>
                        <span>{translate('createSolutionTutorStep3')}</span>
                        <a href={step3_3Img} className={style.imageLink} target="_blank" rel="noreferrer">
                            <img className={style.tutorialPicture} src={step3_3Img} alt="step 3.3"/>
                        </a>
                    </li>
                    <li>
                        <span>{translate('createSolutionTutorStep4')}</span>
                    </li>
                </ol>

                <h3>• {translate('readySolutionsTutor')}</h3>
                <ol>
                    <li><span>{translate('readySolutionsTutorStep1')}</span></li>
                    <li>
                        <span>{translate('readySolutionsTutorStep2')}</span>
                        <a href={step4_2Img} className={style.imageLink} target="_blank" rel="noreferrer">
                            <img className={style.tutorialPicture} src={step4_2Img} alt="step 4.2"/>
                        </a>
                    </li>
                    <li>
                        <span>{translate('readySolutionsTutorStep3')}</span>
                        <a href={step4_3Img} className={style.imageLink} target="_blank" rel="noreferrer">
                            <img className={style.tutorialPicture} src={step4_3Img} alt="step 4.3"/>
                        </a>
                    </li>
                </ol>
            </article>

            <h2>{translate('advancedTutor')}</h2>
            <article>
                <h3>{translate('constructorTutor')}</h3>
                <p>{translate('constructorTutorDescription1')}</p>
                <p>{translate('constructorTutorDescription2')}</p>

                <h3>{translate('compoundsCreatingTutor')}</h3>
                <ol>
                    <li><span>{translate('compoundsCreatingTutorStep1')}</span></li>
                    <li><span>{translate('compoundsCreatingTutorStep2')}</span></li>
                    <li>
                        <span>{translate('compoundsCreatingTutorStep3')}</span>
                        <a href={step5_3Img} className={style.imageLink} target="_blank" rel="noreferrer">
                            <img className={style.tutorialPicture} src={step5_3Img} alt="step 5.3"/>
                        </a>
                    </li>
                </ol>

                <h3>{translate('compoundsDeletingTutor')}</h3>
                <p>
                    {translate('compoundsDeletingTutorDescription1')}
                    <Note>{translate('compoundsDeletingTutorNote')}</Note>
                </p>
            </article>
        </div>
    );
};

export {Tutorial}