import { createLogger, transports, format } from "winston";
import jwtDecode from 'jwt-decode';

const customFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS" }),
  format.splat(),
  format.printf((info) => {
    return `${info.timestamp} [${info.level.toLocaleUpperCase()}] ${
      info.message
    }`;
  })
);

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.File({
      filename: "./logs/winstonBackendLog.log",
      level: "silly",
    }),
    new transports.Console({ level: "silly" }),
  ],
});

const userInfo = localStorage.getItem('authUser');
const user=JSON.parse(userInfo);

const loggingIn = async (user) => {
    const res = await axios.post('http://localhost:5000/api/users/login', {user})

    .then(res => {
        const token = res.data.token;
        const authUser = jwtDecode(token);
        localStorage.setItem('authUser', JSON.stringify(authUser))
        localStorage.setItem('token', token)
        window.location.reload();
    })

    .catch(err => alert(err.response.data))
}

const signUp = async (user) => {
  const res = await axios.post('http://localhost:5000/api/users/signup', {user})

  .then(res => {
    const token = res.data.token;
    const authUser = jwtDecode(token);
    localStorage.setItem('authUser', JSON.stringify(authUser))
    localStorage.setItem('token', token)
    window.location.reload();
  })

  .catch(err => alert(err.response.data))
}


export default (logger, loggingIn, signUp);
