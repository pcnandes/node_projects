package br.com.condominio.domain;

import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class Unidade {

	private Long id;
	private String nome;
	private String andar;
	private Bloco bloco;
	private Usuario usuario; // verificar essa associacao, se vai ser com o morador ou com o usuario
}
