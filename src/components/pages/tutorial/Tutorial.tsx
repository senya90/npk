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


const Tutorial = () => {
    return (
        <div className={cn(style.tutorialWrapper, wrapperStyle.mainWrapper)}>
            <h1>{translate('howToUse')} npkcalculator?</h1>
            <h2>{translate('basicsTutor')}</h2>
            <article>
                <h3>• {translate('registerForUse')}</h3>

                <h3>• {translate('fertilizerAddition')}</h3>
                <img className={style.tutorialPicture} src={step1_1Img} alt="step 1.1"/>
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
                        <img className={style.tutorialPicture} src={step1_3Img} alt="step 1.3"/>
                    </li>
                </ol>

                <h3>• {translate('plantAddition')}</h3>
                <p>{translate('plantAdditionDescription')}</p>
                <ol>
                    <li><span>{translate('plantAdditionStep1')}</span></li>
                    <li><span>{translate('plantAdditionStep2')}</span></li>
                    <span>
                        <Note>{translate('plantAdditionStep2Note')}</Note>
                        <img className={style.tutorialPicture} src={step2_1Img} alt="step 2.2"/>
                    </span>
                </ol>

                <h3>• {translate('createSolutionTutor')}</h3>
                <ol>
                    <li>
                        <span>{translate('createSolutionTutorStep1')}</span>
                        <br/>
                        <span>{translate('createSolutionTutorStep1.1')}</span>
                        <img className={style.tutorialPicture} src={step3_1Img} alt="step 3.1"/>
                    </li>
                    <li>
                        <span>{translate('createSolutionTutorStep2')}</span>
                    </li>
                    <li>
                        <span>{translate('createSolutionTutorStep3')}</span>
                        <img className={style.tutorialPicture} src={step3_3Img} alt="step 3.3"/>
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
                        <img className={style.tutorialPicture} src={step4_2Img} alt="step 4.2"/>
                    </li>
                    <li>
                        <span>{translate('readySolutionsTutorStep3')}</span>
                        <img className={style.tutorialPicture} src={step4_3Img} alt="step 4.3"/>
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
                        <img className={style.tutorialPicture} src={step5_3Img} alt="step 5.3"/>
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