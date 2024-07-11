import { CognitoUserPool } from 'amazon-cognito-identity-js';
const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_CLIENT_ID,
};
const up = new CognitoUserPool(poolData);
export default up;