import logger from '../logger';
import fetchJson from './fetchJson';

const authRepository = ({ baseUrl = '', options = {} }) => ({
  getCurrentUser: () => fetchJson(`${baseUrl}/current_user`, options).catch(err => logger.log(err)),
});

export default authRepository;
