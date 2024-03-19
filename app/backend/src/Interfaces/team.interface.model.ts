import Teams from './Teams.interface';

export interface TeamModelInterface {
  findAll(): Promise<Teams[]>;
  findByPk(id: number): Promise<Teams | null>;
}
