
import * as dotenv from 'dotenv';
dotenv.config();

const url = process.env.URL_TOKEN || 'http://localhost:4000';
export const verifyToken = async (token) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    return await fetch(`${url}/session`, requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                return null;
            }
        })
        .catch(error => console.log('error', error));
}