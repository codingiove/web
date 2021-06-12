import React, { PureComponent } from "react";
import store from "../Redux/store";

export function connect(mapState, mapdispatch) {
  return function enhance(Component) {
    return class extends PureComponent {
      constructor(props) {
        super(props);
        this.state = {
          data: mapState(store.getState()),
        };
      }
      componentDidMount() {
        store.subscribe(() => {
          this.setState({
            data: mapState(store.getState()),
          });
        });
      }
      render() {
        return (
          <Component
            {...this.props}
            {...mapState(store.getState())}
            {...mapdispatch(store.dispatch)}
          />
        );
      }
    };
  };
}
