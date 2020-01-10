import {connect} from 'react-redux';
import * as routes from 'app/routes';
import InsuranceConfirm from './InsuranceConfirm';
import {
  getSprintSubscription,
  getInsurancePlan,
  getInsuranceContract,
  getFilteredInsuranceContracts,
  getFilteredInsuredDevices,
  getInsuredDevice,
} from 'reducers';
import {find as findSubscription} from 'subscriptions/sprint/actions';
import {find as findInsurancePlan} from 'insurance/insurancePlans/actions'
import {createAttPurchase as createInsurancePurchase} from 'insurance/actions';
import {createDeviceInsurance} from 'insurance/insuredDevices/actions'
import {activateSprintInsurance as activateInsurance} from 'insurance/insuranceContracts/actions';

const mapStateToProps = (state, ownProps) => {
  const subId = ownProps.subId && parseInt(ownProps.subId);
  const filter = 'attSubscription';
  const contracts = getFilteredInsuranceContracts(state, { [filter]: subId });
  const contract = contracts && contracts.length > 0 && contracts[0];
  const insuredDevices = contract && getFilteredInsuredDevices(state, contract.id);
  const insuredDevice = insuredDevices && insuredDevices.length > 0 && insuredDevices[0];
  return {
    ...ownProps,
    subId,
    insurancePlanRoute: routes.sprintInsurancePlan,
    plan: getInsurancePlan(state, ownProps.insPlanId),
    subscription: getSprintSubscription(state, ownProps.subId),
    contract: getInsuranceContract(state, contract.id),
    insuredDevice: getInsuredDevice(state, insuredDevice.id)
  };
};

const mapDispatchToProps = {
  findSubscription,
  findInsurancePlan,
  createInsurancePurchase,
  createDeviceInsurance,
  activateInsurance
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsuranceConfirm);
