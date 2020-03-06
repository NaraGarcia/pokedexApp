import { Component } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { Router } from '@angular/router';
import { IPokemon } from '../interfaces/IPokemon';
import { PokemonApiService } from '../servicos/pokemon-api.service';



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

  public listaPokemonApi =[];
  public totalPokemons;
  public offset = 0;
  public limit = 10;
  public paginaAtual = 0;

  constructor(public dadosService: DadosService, public router: Router, public pokeApi: PokemonApiService) {
    this.resetarLista();
    this.buscarPokemons(this.offset,this.limit);
  }

  public buscarPokemons(offset, limit){
    if(this.offset <= offset){
      this.paginaAtual++;
    } else{
     this.paginaAtual--;
    }
    this.offset = offset;

    this.pokeApi.buscaPokemons(offset, limit).subscribe(dados=>{
      this.listaPokemonApi =[];   //limpa os pokemons para exibir os da outra página
      //pega somente o total de pokemons
      this.totalPokemons = dados['count'];
      //pega somente a lista de pokemons
      let listaApi = dados['results'];

      // Percorre a lista e busca na Api todos os dados do pokemon
      for(let item of listaApi){
        this.pokeApi.buscaPokemonUrl(item.url).subscribe(dado=>{
          //Adiciona os dados do pokemon ao final da lista
          this.listaPokemonApi.push(dado);
        });
      }
      //Atualiza a listaFiltrada com os pokemons buscados.
      this.resetarLista();
    })
  }

  abrirDadosPokemon(pokemon: IPokemon){ 
    this.dadosService.setDados('dadosPokemon', pokemon);  //salva os dados do pokemon no BD virtual
    this.router.navigateByUrl('/dados-pokemon');          //Abre a página para exibir os dados
  }

  private resetarLista(){
    //this.listaFiltrada = this.listaPokemons;

    this.listaFiltrada = this.listaPokemonApi;
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
