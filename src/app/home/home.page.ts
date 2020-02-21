import { Component } from '@angular/core';
import { DadosService } from '../servicos/dados.service';

export interface IPokemon{
  numero: string;
  nome: string;
  tipos: string[];
  img: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listaPokemons=[ //se exite um [](array), só tem como exibir TODOS OS DADOS usando FOR (ngFoR) - funcionando como um BD
    {
      numero:'001',
      nome:'Bulbasaur', 
      tipos:['Grass', 'Poison'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'
    },

    {numero: '004', nome: 'Charmander', tipos: ['Fire'], img:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'},
    {numero: '007', nome: 'Squirtle', tipos: ['Water'], img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png'},
    {numero: '012', nome: 'Butterfree', tipos: ['Bug', 'Flying'], img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png'},
    {numero: '025', nome: 'Pikachu', tipos: ['Eletric'], img:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'},
    {numero: '043', nome: 'Oddish', tipos: ['Grass', 'Poison'], img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/043.png'},
    {numero: '060', nome: 'Poliwag', tipos: ['Water'], img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/060.png'},
    {numero: '116', nome: 'Horsea', tipos: ['Water'], img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/116.png'},
    {numero: '133', nome: 'Eevee', tipos: ['Normal'], img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png'},
    {numero: '151', nome: 'Mew', tipos: ['Psychic'], img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png'}



  ];
  public listaFiltrada=[];

  constructor(dadosService: DadosService) {
    this.resetarLista();
  }

  abrirDadosPokemon(pokemon: IPokemon){
    console.log(pokemon);
  }

  private resetarLista(){
    this.listaFiltrada = this.listaPokemons;
  }

  public buscarPokemon(evento: any){
    let busca = evento.target.value;

    this.resetarLista();

    if(busca && busca.trim() != ''){
      this.listaFiltrada = this.listaFiltrada.filter(dados => {
        if (dados.nome.toLowerCase().indexOf(busca.toLowerCase()) > -1) {
          return true;
        }
        else if(dados.numero.indexOf(busca) > -1){
          return true; 
        }
        return false;
      });
    }
    
  }


}
