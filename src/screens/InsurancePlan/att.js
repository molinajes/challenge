import { connect } from 'react-redux';
import { getAttSubscription, getInsurancePlansForValue } from 'reducers';
import {attInsuranceConfirm, attSubscription} from "app/routes";

import { fetchValue as fetchAllInsurancePlans } from 'insurance/insurancePlans/actions';

import InsurancePlan from './InsurancePlan';

const mapStateToProps = (state, ownProps) => {
  const subId = ownProps.subId && parseInt(ownProps.subId);
  const subscription = getAttSubscription(state, subId);
  const plans = getInsurancePlansForValue(state, subId);
  return {
    ...ownProps,
    subscription,
    plans,
    insuranceConfirmRoute: attInsuranceConfirm,
    subscriptionRoute: attSubscription
  }
};

const mapDispatchToProps = {
  fetchAllInsurancePlans,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InsurancePlan);

