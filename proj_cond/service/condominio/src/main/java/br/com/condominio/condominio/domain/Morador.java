package br.com.condominio.condominio.domain;

import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class Morador {

	private Long id;
	// verificar se a repeticao de dados usuario / morador
	// usuario e melhor ficar mais limpo, o morador que precisaria colocar mais info
	
	private Unidade unidade;
}
