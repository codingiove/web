let address = "";

const development = "http://192.168.1.4:3000/";
const production = "http://47.114.38.181/";

process.env.NODE_ENV === "development"
  ? (address = development)
  : (address = production);

export { address };
 
 
