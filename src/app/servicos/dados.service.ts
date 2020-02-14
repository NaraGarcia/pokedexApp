import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private dados = [];

  constructor() { }

  // Método para adicionar dados ao serviço
  public setDados(nome: string, dados: any) {
    // Verifica se o nome existe e se não está vazio(se tem ou não espaço   -trim()-).
    if (nome && nome.trim() !== '') {
      // Cria um indice no array com o nome do dado e coloca os dados dentro.
      this.dados[nome.trim()] = dados;
    }
  }

  // Método para pegar dados do serviço;
  public getDados(nome: string) {
    // Verifica se o nome não está vazio e se ele existe no array.
    if (nome.trim() !== '' && this.dados[nome.trim()]) {
      // Retorna os dados salvos no array.
      return this.dados[nome.trim()];
    } else {
      // Retorna nulo caso o nome não exista no indice.
      return null;
    }
  }

  // Método para limpar os dados guardados
  public removeDados(todos: boolean, nome: string) {
    // Caso deseje apagar todos os dados armazenados.
    if (todos) {
      this.dados = null;
      this.dados = [];
    } else if (nome.trim() !== '') {
      const index = this.dados.indexOf(nome);   //indexOf fala qual a posição que o dadoe stá
      this.dados.splice(index, 1);              //index, 1 = é a posição que o dado está
    }
  }
}