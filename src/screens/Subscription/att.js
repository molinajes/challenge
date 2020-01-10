import { connect } from 'react-redux';

import React, { Component } from 'react';
import SubscriptionSwitcher from 'subscriptions/SubscriptionSwitcher';

import { getFilteredInsuranceContracts, getAttSubscription } from 'reducers';
import { fetchFiltered as fetchFilteredInsuranceContracts } from 'insurance/insuranceContracts/actions';

import Box from 'common/Box';
import Link from 'common/Link';
import * as routes from 'app/routes';
import add_green_circle from 'common/img/add_green_circle.svg';
import styles from './Subscription.module.css';

class SubscriptionScreen extends Component {
  componentDidMount() {
    this.fetchContract();
  }

  fetchContract = () => {
    const { subId, fetchFilteredInsuranceContracts, filter } = this.props;
    subId && fetchFilteredInsuranceContracts({ [filter]: subId });
  };

  render () {
    const { subId, contractId, subscription } = this.props;
    return (
      <div className="Subscription">
        <SubscriptionSwitcher attSubId={subId} attRoute={routes.attSubscription} sprintRoute={routes.sprintSubscription} />
        <div className={styles.linkList}>
          {contractId && <Link className={styles.subscriptionLink} to={routes.attInsurance(subId)}>
            <Box>
              <img src={add_green_circle} alt="" />
              Insurance
            </Box>
          </Link>}
          {subscription && subscription.att_status === 'active' && <Link className={styles.subscriptionLink} to={routes.attInsurancePlan(subId, subscription.device_specs)}>
            <Box>
              <img src={add_green_circle} alt="" />
              Select Plan
            </Box>
          </Link>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const subId = ownProps.subId && parseInt(ownProps.subId);
  const filter = 'att_subscription';
  const contracts = getFilteredInsuranceContracts(state, { [filter]: subId });
  const subscription = getAttSubscription(state, subId);
  const contract = contracts && contracts.length > 0 && contracts[0];
  return {
    subId,
    subscription,
    filter,
    contract,
    contractId: contract && contract.id,
  }
};

const mapDispatchToProps = {
  fetchFilteredInsuranceContracts
};

// this order is really important
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SubscriptionScreen);
