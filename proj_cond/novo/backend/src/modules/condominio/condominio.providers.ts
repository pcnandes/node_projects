import { Connection, Repository } from 'typeorm';
import { Condominio } from './condominio.entity';

export const condominioProviders = [
  {
    provide: 'CONDOMINIO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Condominio),
    inject: ['DATABASE_CONNECTION'],
  },
];