const Default = {
  current: 0,
  name: "",
};
export default function (state = Default, action) {
  switch (action.type) {
    case "0":
      return { ...state, current: state.current + action.current };
    case "1":
      return { ...state, name: action.name };
    default:
      return state;
  }
}
