import React, { Component } from 'react';

import Plan from './plan';
import * as routes from 'app/routes';
import Back from 'common/Back';
import styles from './InsurancePlan.module.css';

const coverage = [
    [
        'Malfunction (after the original manufacturer\'s warranty expires)'
    ],
    [
        'Accidental damage',
        'Loss and theft',
        'Malfunction',
        'Water Damage',
        'Broken Screens'
    ]
];

export class InsurancePlan extends Component {
    componentDidMount() {
        this.fetchPlans();
    }

    fetchPlans = () => {
        const { subId, fetchAllInsurancePlans } = this.props;
        fetchAllInsurancePlans(subId);
    };

    selectHandler = (planId) => {
        const { createPlanPurchase, subId, sku } = this.props;
        createPlanPurchase(subId, sku, planId);
    };

    renderPlans = (plans) => {
        return (<div className={styles.plansWrapper}>
            <Plan plan={plans[2]} selectHandler={this.selectHandler} {...this.props} coverage={coverage[0]} />
            <Plan featured plan={plans[0]} selectHandler={this.selectHandler} {...this.props} coverage={coverage[1]} />
            <Plan plan={plans[1]} selectHandler={this.selectHandler} {...this.props} coverage={coverage[1]} />
        </div>);
    };

    render() {
        const { subId, plans, subscriptionRoute } = this.props;
        return (
            <div>
                <div className={styles.Back}>
                    <Back to={subscriptionRoute(subId)} />
                </div>
                <h1>
                    Select an insurance plan
                </h1>
                <div>
                    {plans && plans.length && this.renderPlans(plans)}
                </div>
            </div>
        );
    }

}

export default InsurancePlan;
