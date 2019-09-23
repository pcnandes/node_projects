package br.com.condominio.condominio.domain;

import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class Funcionario {

	private Long id;
	// verificar repeticao de dados novamente, como usuario e morador
}
