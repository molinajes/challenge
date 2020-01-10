import React from 'react';
import Link from 'common/Link';

import styles from './InsurancePlan.module.css';

const InsurancePlan = (props) => {
    return (
        <div className={[styles.planBox, props.featured && styles.featuredPlan].join(' ')}>
            <div className={styles.planInfo}>
                <h1>{props.plan.name}</h1>
                <span>Starting at</span>
                <strong className={styles.planPrice}>${props.plan.price}</strong>
                <div className={styles.planActions}>
                    <a href={'/#'}>Terms, fees and more info</a>
                    <br />
                    <Link to={props.insuranceConfirmRoute(props.subId, props.sku, props.plan.id)}>
                        <button>Select</button>
                    </Link>
                </div>

            </div>
            <div className={styles.protectionFeatures}>
                Protect your device against:
                {props.coverage.map((text, i) => (<div key={i}><div className={styles.check} />{text}</div>))}
            </div>
            <div className={styles.deductibleInfo}>
                Repair deductible: ${props.plan.repair_deductible}
                <br />
                Replacement deductible: ${props.plan.replacement_deductible}
            </div>
        </div>
    );
};

export default InsurancePlan;

