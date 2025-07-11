export interface CreateUsuarioRequest {
  nombre:string
  apellido:string
  email: string,
  password: string;
  passwordConfirm: string
  rol_id: number;
}

export interface Login {
  email: string,
  password: string;
}