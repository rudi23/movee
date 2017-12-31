import fetchJson from './fetchJson';

const authRepository = ({ baseUrl = '', options = {} }) => ({
  getCurrentUser: () => fetchJson(`${baseUrl}/current_user`, options).catch(err => console.log(err)),
});

export default authRepository;
