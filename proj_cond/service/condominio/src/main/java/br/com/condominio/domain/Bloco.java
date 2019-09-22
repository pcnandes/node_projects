package br.com.condominio.domain;

import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class Bloco {

	private Long id;
	private String nome;
	private Condominio condominio;
}
