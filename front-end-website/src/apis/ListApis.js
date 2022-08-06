export const LinkApis = {
  getInfomationLink: {
    url: '/api/link/{0}',
    method: 'POST',
    contextType: 'application/json',
  },
}

export const UserApis = {
  login: {
    url: '/api/auth/get-token',
    method: 'POST',
    contextType: 'application/json',
  },
}