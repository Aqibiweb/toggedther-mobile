import { ENV } from "../environment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = ENV.API_URL;

export const getPostCall = async (url, method, data) =>{
    console.log("ALL API HIT ----",data)
    const userData = JSON.parse(await AsyncStorage.getItem('@userData'));
      return new Promise((resolve, reject) => {
        try {
          var config = {
            method: method,
            url: BASE_URL + url,
            data: data,
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${userData.token}`,
            },
          };
          axios(config)
            .then((e) => {
              resolve(e);
            })
            .catch((e) => {
              reject(e);
            });
        } catch (e) {
          reject(e);
        }
      });
    }