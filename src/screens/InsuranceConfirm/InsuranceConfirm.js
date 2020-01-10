import React, { Component } from 'react';
import Back from 'common/Back';
import DeviceInfo from "devices/DeviceInfo";
import Box from "common/Box";
import PlanInfo from "insurance/insurancePlans/PlanInfo";
import BottomButton from "forms/BottomButton";

import styles from "../InsurancePlan/InsurancePlan.module.css";

class InsuranceConfirm extends Component {
  componentDidMount() {
    this.fetchSubscription();
    this.fetchInsurancePlan();
  }

  componentDidUpdate(prevProps, prevState) {
    const { contract, createDeviceInsurance, sku, insPlanId, insuredDevice, activateInsurance, subId } = this.props;

    if(prevProps.contract !== contract) {
      createDeviceInsurance(contract.id, sku, insPlanId);
    }

    if(prevProps.insuredDevices !== insuredDevice) {
      activateInsurance(contract.id, subId);
    }
  }

  fetchSubscription = () => {
    const { subId, findSubscription } = this.props;
    subId && findSubscription(subId);
  };

  fetchInsurancePlan = () => {
    const { insPlanId, findInsurancePlan } = this.props;
    insPlanId && findInsurancePlan(insPlanId);
  };

  handleConfirm = () => {
    const { subId, sku, insPlanId, createInsurancePurchase } = this.props;
    createInsurancePurchase(subId, sku, insPlanId);
  };

  render() {
    const { subId, sku, insurancePlanRoute, subscription, plan } = this.props;
    return (
      <div>
        <div className={styles.Back}>
          <Back to={insurancePlanRoute(subId, sku)} />
          <h1>Confirm insurance plan</h1>
        </div>

        {subscription && <DeviceInfo deviceId={subscription.device_specs} />}

        <Box>
          <div className={styles.pdb50}>
            <PlanInfo insurancePlan={plan} />
          </div>
          <BottomButton onClick={this.handleConfirm}>Confirm Plan Selection</BottomButton>
        </Box>
      </div>
    );
  }
}

export default InsuranceConfirm;
