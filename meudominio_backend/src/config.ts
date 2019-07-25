export default {
  // configurações do servidor
  server: {
    port: +(process.env.BACKEND_PORT || 9000)
  },
  // configurações de autenticação
  auth: {
    clientId: process.env.KCLOAK_CLIENT_ID || 'd_meudominio',
    bearerOnly: true,
    serverUrl: process.env.KCLOAK_URL || 'https://d-keycloak.estaleiro.serpro.gov.br/auth',
    secret: process.env.KCLOAK_SECRET || '18293752-46c2-42ff-934e-78cb5ecb831c', 
    realm: 'serpro',
    realmPublicKey: process.env.KCLOAK_PUBLIC_KEY || 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhSDQ8eFdWP97vCUKywZo2hV/sh+yF6E+gs7YXDfPRDCVwNwHlmZ2OxKH/tG9/25/J3iynpd29CIiAToi0P3gKFAwxaulhHFW7UmbrQfno/YB11Jutg+X2SLcImeYgXIOmOAWgWPmOD4YVvx5HIOWqv9y6MXtT1tXQ2sB0PZa3w4n00Gcw6D/p5xRtwmJHvXX8v0OLduMe2Inu2/n/fze70jHV4n5fDic9REvlQ1TnPr8MuftRr+M53fYxFcAM9yDbz0+JyfsfOquhqFYwmRyDTu2YDiS0w1CkKUfBEZN9TXdbRtm1sXXLiwoRfi6JeaYPg2kACSE7NhUT1Nb4pf5HQIDAQAB',
    scope:'openid'
  },
  // configurações do banco de dados
  database: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    name: process.env.DB_NAME || 'meudominio',
    port: +(process.env.DB_PORT || 5432),
    host: process.env.DB_HOST || 'localhost'
  }
}