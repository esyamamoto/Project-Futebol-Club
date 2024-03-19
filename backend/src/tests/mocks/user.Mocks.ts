const userInvalid = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com', 
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }

  const userX = {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com', 
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }
  
  const emailInvalid = {
    email: 'rthrthsrth.com',
    password: 'secret_admin'
  }
  
  const passwordInvalid= {
    email: 'admin@admin.com',
    password: ' '
  }
  
  const loginOk = {
    email: 'admin@admin.com',
    password: 'secret_admin',
  }

  const tokenOk = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA3MjQ3NzM1LCJleHAiOjE3MDc4NTI1MzV9.4YGpnMQjHbZSTXl43Trs_4rVViUMNzFWCxh6r8vhO6E"
  }
  
  export { userInvalid, userX,  emailInvalid, passwordInvalid, loginOk , tokenOk};