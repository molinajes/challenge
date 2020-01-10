import { connect } from 'react-redux';
import SwitcherList from './SwitcherList';
import { getAllSprintSubscriptions } from 'reducers';
import { fetchAll as fetchSubs } from 'subscriptions/sprint/actions';

const mapStateToProps = (state) => ({
  subs: getAllSprintSubscriptions(state)
});

const mapDispatchToProps = {
  fetchSubs
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitcherList);
