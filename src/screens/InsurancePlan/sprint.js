import { connect } from 'react-redux';
import { getSprintSubscription, getInsurancePlansForValue } from 'reducers';
import { sprintInsuranceConfirm, sprintSubscription } from "app/routes";

import { fetchValue as fetchAllInsurancePlans } from 'insurance/insurancePlans/actions';

import InsurancePlan from './InsurancePlan';

const mapStateToProps = (state, ownProps) => {
  const subId = ownProps.subId && parseInt(ownProps.subId);
  const subscription = getSprintSubscription(state, subId);
  const plans = getInsurancePlansForValue(state, subId);
  return {
    ...ownProps,
    subscription,
    plans,
    insuranceConfirmRoute: sprintInsuranceConfirm,
    subscriptionRoute: sprintSubscription
  }
};

const mapDispatchToProps = {
  fetchAllInsurancePlans
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsurancePlan);
